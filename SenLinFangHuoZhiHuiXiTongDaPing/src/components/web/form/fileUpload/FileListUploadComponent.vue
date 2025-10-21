<template>
  <div v-if="showComponent" :class="customClass">
    <!-- 文件列表 -->
    <div class="file-list" v-for="(item, index) in fileList" :key="index">
      <div class="file-name" :title="item.name">{{ item.name }}</div>
      <i
        :style="{ color: formatFileIcon(item).iconColor }"
        :class="[formatFileIcon(item).icon, 'file-type']"
      />
      <span class="file-wrap">
        <el-icon @click.stop="previewFile(item)">
          <View />
        </el-icon>
        <el-icon @click.stop="downloadFile(item)">
          <Download />
        </el-icon>
        <el-icon
          v-if="!effectDisabled && !effectReadonly"
          @click.stop="deleteFile(index)"
        >
          <Delete />
        </el-icon>
      </span>
    </div>
    <!-- 上传组件 -->
    <el-upload
      v-show="showUpload"
      :class="[{ 'upload-disabled': effectDisabled }]"
      action
      list-type="picture-card"
      :disabled="effectDisabled"
      :limit="limitNumber"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :show-file-list="false"
      :http-request="uploadFunction"
    >
      <el-icon>
        <Plus />
      </el-icon>
      <template #tip>
        <div class="el-upload-tip">
          <span v-if="showTipsText">{{ tipsText }}</span>
        </div>
      </template>
    </el-upload>
    <!-- 暂无数据的显示 -->
    <div v-if="showPlaceTips" class="place-tips">暂无数据</div>
    <!-- 预览弹窗 -->
    <base-preview-file :file="currentFile" @close="currentFile = {}" />
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref, getCurrentInstance, inject, nextTick } from "vue";
import { useFormItemAttr } from "@/hooks/VantFormItemHooks.js";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
import { isEmpty } from "@/utils/functionUtil";
import { FILE_TYPE_ICON } from "@/config/pageDesign/componentConfig";
const { proxy } = getCurrentInstance();
/**
 * 基础相关
 */
const formItemRef = inject("formItemRef", null);
const props = defineProps({
  staticFiles: {
    type: String,
    default: "default"
  },
  fileIds: {
    type: String,
    default: "default"
  },
  compSize: {
    type: String,
    default: "default"
  },
  buttonName: {
    type: String,
    default: "文件上传"
  },
  buttonType: {
    type: String,
    default: "default"
  },
  buttonPlain: {
    type: Boolean,
    default: false
  },
  buttonRound: {
    type: Boolean,
    default: false
  },
  limitNumber: {
    type: Number,
    default: 3
  },
  limitTypeArray: {
    type: Array,
    default: () => []
  },
  limitSize: {
    type: String,
    default: ""
  },
  showTipsText: {
    type: Boolean,
    default: false
  },
  tipsText: {
    type: String,
    default: ""
  },
  formItemDisabled: {
    type: [String, Boolean],
    default: ""
  },
  compDisabled: {
    type: Boolean,
    default: false
  },
  formItemReadonly: {
    type: [String, Boolean],
    default: ""
  },
  compReadonly: {
    type: Boolean,
    default: false
  },
});
const emit = defineEmits(["update:fileIds", "update:staticFiles"]);
const customClass = computed(() => {
  return `custom-file-upload-${props.compSize} file-upload-box`;
});
const fileTypeIcon = computed(() => FILE_TYPE_ICON);
const showUpload = computed(() => !effectReadonly.value);
const showPlaceTips = computed(() => {
  return effectReadonly.value && fileList.value.length === 0;
});
/**
 * 文件列表相关
 */
let fileList = ref([]);
let currentFile = ref(null);
// 监听id的改变
watch(() => props.fileIds, val => {
  if (val !== "default") {
    getFileData();
  }
}, { immediate: true });
// 监听静态数据的改变
watch(() => props.staticFiles, val => {
  if (val !== "default") {
    getStaticFileData();
  }
}, { immediate: true });
// 初始化数据绑定的文件数据
function getFileData() {
  if (isEmpty(props.fileIds)) {
    return;
  }
  proxy.$getDataAxios.getUrlByFileId(props.fileIds).then(res => {
    if (!res.data) {
      return;
    }
    fileList.value = [];
    res.data.forEach(item => {
      fileList.value.push({
        name: item.name,
        suffix: item.suffix,
        url: `${BASE_FILE_PREVIEW_URL}/${item.id}`,
        id: item.id
      });
    });
  }).catch(err => {
    proxy.$getDataAxios.notifyError(err);
  });
}
// 初始化静态数据的文件数据
function getStaticFileData() {
  fileList.value = [];
  if (props.staticFiles === "") {
    return;
  }
  const fileArray = JSON.parse(props.staticFiles);
  fileArray.forEach(item => {
    fileList.value.push({
      name: item.name, 
      suffix: item.suffix,
      url: item.url, 
      id: item.id
    });
  });
}
// 预览文件
function previewFile(file) {
  currentFile.value = {
    url: proxy.$setAssetType(file.url),
    suffix: file.suffix
  };
}
// 下载文件
function downloadFile(file) {
  const fileUrl = file.url;
  const fileName = file.name;
  if (fileUrl.indexOf("oss-cn") !== -1) {
    proxy.$exportFile(fileUrl, fileName);
  } else if (fileUrl.indexOf("http") !== -1) {
    proxy.$exportFile(fileUrl, fileName);
  } else {
    proxy.$exportStaticFile(fileUrl);
  }
}
// 文件移除
function deleteFile(index) {
  fileList.value.splice(index, 1);
  fileListChange();
  uploadValidate();
}
// 上传文件改变之前
function beforeUpload(file) {
  // 如果有文件限制
  const suffixArr = file.name.split(".");
  const suffix = suffixArr[suffixArr.length - 1];
  if (props.limitTypeArray.length && props.limitTypeArray.indexOf("全部") === -1) {
    let limitFlag = props.limitTypeArray.some(type => {
      return suffix === type;
    });
    if (!limitFlag) {
      proxy.$message.warning("不支持该类型的文件上传");
      return false;
    }
  }
  // 如果有大小限制
  if (props.limitSize !== "") {
    if (file.size > props.limitSize * 1024 * 1024) {
      proxy.$message.warning("上传文件超过限制大小，请重新上传");
      return false;
    }
  }
  return true;
}
// 超出文件上传限制函数
function handleExceed() {
  proxy.$message.warning(`当前上传文件个数最多为 ${props.limitNumber} 个`);
}
// 上传文件函数
function uploadFunction(params) {
  if (props.fileIds !== "default") {
    const { file, onError } = params;
    proxy.$getDataAxios.uploadFile({ file }).then(res => {
      fileList.value.push({ 
        name: res.data.name, 
        id: res.data.id,
        suffix: res.data.suffix,
        url: `${BASE_FILE_PREVIEW_URL}/${res.data.id}`,
      });
      fileListChange();
      uploadValidate();
    }).catch(err => {
      onError();
      proxy.$getDataAxios.notifyError(err);
    });
  } else {
    proxy.$message.warning("请绑定数据模型并导出后台运行后上传文件");
  }
}
// 文件发生修改
function fileListChange() {
  let fileArray = [];
  let fileIdArray = [];
  fileList.value.forEach(item => {
    fileArray.push(item);
    fileIdArray.push(item.id);
  });
  if (props.fileIds !== "default") {
    emit("update:fileIds", fileIdArray.join(","));
  } else {
    const resultStaticFiles = fileArray.length ? JSON.stringify(fileArray) : "";
    // 更新组件内部的值
    emit("update:staticFiles", resultStaticFiles);
  }
}
// 过滤当前文件的文件图标
function formatFileIcon(file) {
  const suffix = file.suffix;
  let result = { icon: "fmy-otherFile", iconColor: "#7A7F82" };
  fileTypeIcon.value.forEach(file => {
    if (suffix === file.type) {
      result.icon = file.icon;
      result.iconColor = file.color;
    }
  });
  return result;
}
// 文件改变触发校验
async function uploadValidate() {
  if (!formItemRef) {
    return;
  }
  await nextTick();
  formItemRef.value.validate().catch(err => {});
}

// 控制组件属性
const {
  showComponent,
  disabledComponent,
  effectDisabled,
  effectReadonly,
  readonlyComponent
} = useFormItemAttr(props);
// 导出配置属性
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>

<style lang="less" scoped>
.file-upload-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  .upload-card-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .upload-disabled {
    :deep(.el-upload--picture-card) {
      background-color: #f5f7fa !important;
    }
  }
  .place-tips {
    text-align: center;
    border: 1px solid #e7e7eb;
    border-radius: 5px;
    box-sizing: border-box;
    vertical-align: top;
    color: #909399;
    font-size: 14px;
  }
  .file-list {
    position: relative;
    padding: 1px;
    margin: 0 5px 5px 0;
    background-color: #ffffff;
    border: 1px solid #e7e7eb;
    border-radius: 5px;
    box-sizing: border-box;
    vertical-align: top;
    .file-type {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    .file-name {
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      left: 1px;
      right: 1px;
      top: 0;
      cursor: pointer;
      text-align: center;
      color: #fff;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .file-wrap {
      position: absolute;
      height: 40px;
      left: 1px;
      right: 1px;
      bottom: 0;
      cursor: pointer;
      text-align: center;
      color: #fff;
      opacity: 0;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.2s;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      :deep(.el-icon) {
        cursor: pointer;
        &:hover {
          color: #1778ff;
        }
      }
    }
  }
  .file-list:hover {
    .file-wrap {
      opacity: 1;
      transition: opacity 0.2s;
    }
  }
  .el-upload-tip {
    position: relative;
    margin: 0;
    color: #e6a23c;
  }
  :deep(.el-upload--picture-card) {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #e7e7eb;
    border-radius: 5px;
    box-sizing: border-box;
    text-align: center;
    --el-upload-picture-card-size: 0;
    background-color: #ffffff;
  }
}
.custom-file-upload-superLarge {
  :deep(.el-upload--picture-card) {
    width: 200px;
    height: 200px;
    line-height: 200px;
    .el-icon {
      font-size: 80px !important;
    }
  }
  .place-tips {
    width: 200px;
    height: 200px;
    line-height: 199px;
  }
  .file-list {
    width: 200px;
    height: 200px;
  }
  .file-wrap {
    width: 200px;
    :deep(.el-icon) {
      font-size: 24px !important;
    }
  }
  .file-type {
    font-size: 120px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 22px;
  }
}
.custom-file-upload-big {
  :deep(.el-upload--picture-card) {
    width: 180px;
    height: 180px;
    line-height: 180px;
    .el-icon {
      font-size: 70px !important;
    }
  }
  .place-tips {
    width: 180px;
    height: 180px;
    line-height: 179px;
  }
  .file-list {
    width: 180px;
    height: 180px;
  }
  .file-wrap {
    width: 180px;
    :deep(.el-icon) {
      font-size: 22px !important;
    }
  }
  .file-type {
    font-size: 100px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 20px;
  }
}
.custom-file-upload-large {
  :deep(.el-upload--picture-card) {
    width: 160px;
    height: 160px;
    line-height: 160px;
    .el-icon {
      font-size: 60px !important;
    }
  }
  .place-tips {
    width: 160px;
    height: 160px;
    line-height: 159px;
  }
  .file-list {
    width: 160px;
    height: 160px;
  }
  .file-wrap {
    width: 160px;
    :deep(.el-icon) {
      font-size: 20px !important;
    }
  }
  .file-type {
    font-size: 80px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 18px;
  }
}
.custom-file-upload-default {
  :deep(.el-upload--picture-card) {
    width: 140px;
    height: 140px;
    line-height: 140px;
    .el-icon {
      font-size: 50px !important;
    }
  }
  .place-tips {
    width: 140px;
    height: 140px;
    line-height: 139px;
  }
  .file-list {
    width: 140px;
    height: 140px;
  }
  .file-wrap {
    :deep(.el-icon) {
      font-size: 18px !important;
    }
  }
  .file-type {
    font-size: 60px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 16px;
  }
}
.custom-file-upload-medium {
  :deep(.el-upload--picture-card) {
    width: 120px;
    height: 120px;
    line-height: 120px;
    .el-icon {
      font-size: 40px !important;
    }
  }
  .place-tips {
    width: 120px;
    height: 120px;
    line-height: 119px;
  }
  .file-list {
    width: 120px;
    height: 120px;
  }
  .file-wrap {
    height: 35px !important;
    :deep(.el-icon) {
      font-size: 16px !important;
    }
  }
  .file-type {
    font-size: 50px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 14px;
  }
}
.custom-file-upload-small {
  :deep(.el-upload--picture-card) {
    width: 100px;
    height: 100px;
    line-height: 100px;
    .el-icon {
      font-size: 30px !important;
    }
  }
  .place-tips {
    width: 100px;
    height: 100px;
    line-height: 99px;
  }
  .file-list {
    width: 100px;
    height: 100px;
  }
  .file-wrap {
    height: 30px !important;
    :deep(.el-icon) {
      font-size: 15px !important;
    }
  }
  .file-type {
    font-size: 40px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 13px;
  }
}
.custom-file-upload-mini {
  :deep(.el-upload--picture-card) {
    width: 90px;
    height: 90px;
    line-height: 90px;
    .el-icon {
      font-size: 30px !important;
    }
  }
  .place-tips {
    width: 90px;
    height: 90px;
    line-height: 89px;
  }
  .file-list {
    width: 90px;
    height: 90px;
  }
  .file-wrap {
    height: 25px !important;
    :deep(.el-icon) {
      font-size: 14px !important;
    }
  }
  .file-type {
    font-size: 30px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 12px;
  }
}
</style>