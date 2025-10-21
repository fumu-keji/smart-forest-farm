<template>
  <div v-if="showComponent" :class="customClass">
    <!-- 上传组件 -->
    <el-upload
      v-if="showUpload"
      action
      :disabled="effectDisabled"
      :limit="limitNumber"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :show-file-list="false"
      :http-request="uploadFunction"
    >
      <button-component
        :disabled="effectDisabled"
        :compSize="compSize"
        :type="buttonType"
        :plain="buttonPlain"
        :round="buttonRound"
        :icon="buttonIcon"
        :buttonText="buttonName"
      />
      <template #tip>
        <div class="el-upload-tip">
          <span v-if="showTipsText">{{ tipsText }}</span>
        </div>
      </template>
    </el-upload>
    <!-- 暂无数据的显示 -->
    <button-component
      v-if="showPlaceTips"
      disabled
      plain
      type="default"
      :compSize="compSize"
      :round="buttonRound"
      buttonText="暂无数据"
    />
    <!-- 文件列表 -->
    <div class="file-list" v-for="(item, index) in fileList" :key="index">
      <i
        :style="{ color: formatFileIcon(item).iconColor }"
        :class="[formatFileIcon(item).icon, 'file-type']"
      />
      <span class="file-name" :title="item.name">{{ item.name }}</span>
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
    <!-- 预览弹窗 -->
    <base-preview-file :file="currentFile" @close="currentFile = {}" />
  </div>
</template>

<script setup>
import { computed, watch, ref, getCurrentInstance } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
import { FILE_TYPE_ICON } from "@/config/pageDesign/componentConfig";
const { proxy } = getCurrentInstance();
/**
 * 基础相关
 */
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
  buttonIcon: {
    type: String,
    default: "Plus"
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
const showUpload = computed(() => {
  return !effectReadonly.value;
});
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
  overflow: auto;
  .file-list {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 5px 15px 5px 0;
    background-color: #ffffff;
    border-radius: 2px;
    box-sizing: border-box;
    .file-name {
      margin-left: 10px;
      display: inline-block;
      width: calc(100% - 120px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #1778ff;
      }
    }
    .file-wrap {
      display: flex;
      align-items: center;
      position: absolute;
      right: 15px;
      opacity: 0;
      i {
        margin-left: 10px;
        cursor: pointer;
        &:hover {
          color: #1778ff;
        }
      }
    }
  }
  .file-list:hover {
    background-color: #f5f7fa;
    transition: background-color 0.2s;
    .file-wrap {
      opacity: 1;
      transition: background-color 0.2s;
    }
  }
  .el-upload-tip {
    position: relative;
    margin: 0;
    color: #e6a23c;
  }
}
.custom-file-upload-superLarge {
  .file-wrap {
    :deep(.el-icon) {
      font-size: 24px !important;
    }
  }
  .file-type {
    font-size: 24px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 22px;
  }
}
.custom-file-upload-big {
  .file-wrap {
    :deep(.el-icon) {
      font-size: 22px !important;
    }
  }
  .file-type {
    font-size: 22px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 20px;
  }
}
.custom-file-upload-large {
  .file-wrap {
    :deep(.el-icon) {
      font-size: 20px !important;
    }
  }
  .file-type {
    font-size: 20px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 18px;
  }
}
.custom-file-upload-default {
  .file-wrap {
    :deep(.el-icon) {
      font-size: 18px !important;
    }
  }
  .file-type {
    font-size: 18px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 16px;
  }
}
.custom-file-upload-medium {
  .file-wrap {
    :deep(.el-icon) {
      font-size: 16px !important;
    }
  }
  .file-type {
    font-size: 16px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 14px;
  }
}
.custom-file-upload-small {
  .file-wrap {
    :deep(.el-icon) {
      font-size: 15px !important;
    }
  }
  .file-type {
    font-size: 15px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 13px;
  }
}
.custom-file-upload-mini {
  .file-wrap {
    :deep(.el-icon) {
      font-size: 14px !important;
    }
  }
  .file-type {
    font-size: 14px !important;
  }
  .file-name,
  .el-upload-tip {
    font-size: 12px;
  }
}
</style>