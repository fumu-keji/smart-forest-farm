<template>
  <span class="table-file-style">
    <el-tooltip
      placement="top"
      effect="dark"
      :disabled="fileName === '文件'"
      :content="fileName"
    >
      <tag-component type="primary" :tagText="tagText" />
    </el-tooltip>
    <el-icon v-if="configObject.showFilePreview" @click="previewFile">
      <View />
    </el-icon>
    <el-icon v-if="configObject.showFileDownload" @click="downloadFile">
      <Download />
    </el-icon>
  </span>
</template>

<script setup>
import { ref, getCurrentInstance, watch } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  configObject: {
    type: Object,
    require: true
  },
  columnValue: {
    type: [String, Number],
    require: true
  }
});
let fileName = ref("文件");
let tagText = ref("文件");
watch(() => props.columnValue, value => {
  if (value) {
    setTableFileInfo();
  } else {
    fileName.value = "文件";
    tagText.value = "暂无文件";
  }
}, { immediate: true });
// 文件名称
function setTableFileInfo() {
  if (props.columnValue.includes("http")) {
    fileName.value = "文件";
    tagText.value = "文件";
    return;
  }
  proxy.$getDataAxios.getUrlByFileId(props.columnValue).then(res => {
    fileName.value = res.data.map(item => item.name).join("，");
    tagText.value = `${res.data.length}个文件`;
  });
}
// 预览文件
function previewFile() {
  if (props.columnValue.includes("http")) {
    window.open(props.columnValue);
  } else {
    if (!props.columnValue) {
      return;
    }
    const fileArray = props.columnValue.split(",");
    if (fileArray.length > 1) {
      proxy.$message.warning("不支持多个文件的在线预览，请导出查看");
    } else {
      proxy.$getDataAxios.previewFile(fileArray[0]);
    }
  }
}
// 下载文件
function downloadFile() {
  if (props.columnValue.includes("http")) {
    const tempArr = props.columnValue.split("/");
    const fileName =  tempArr[tempArr.length - 1];
    const onlineFileUrl = props.columnValue;
    proxy.$exportFile(onlineFileUrl, fileName);
  } else {
    if (!props.columnValue) {
      return;
    }
    const fileArray = props.columnValue.split(",");
    fileArray.forEach(item => {
      proxy.$getDataAxios.downLoadFile(item);
    });
  }
}
</script>

<style lang="less" scoped>
.table-file-style {
  display: flex;
  align-items: center;
  :deep(.el-icon) {
    margin-left: 5px;
    cursor: pointer;
    color: #606266 !important;
    &:hover {
      color: var(--el-color-primary) !important;
    }
  }
}
</style>