<template>
  <div class="upload-file-style">
    <input
      type="file"
      class="file-input"
      ref="fileInputRef"
      @change="fileChange"
    />
    <div class="file-info-box" v-if="fileName === ''">
      <el-icon class="upload-icon"><Upload /></el-icon>
      <span>{{ placeholderText }}</span>
    </div>
    <div class="file-info-box">
      <span class="file-name-span">{{ fileName }}</span>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  placeholderText: {
    type: String,
    default: "需要上传的文件"
  },
  limitTypeArray: {
    type: Array,
    default() {
      return [];
    }
  },
  limitSize: {
    type: Number,
    default: 0
  }
});
const emit = defineEmits(["fileUpload"]);
const fileInputRef = ref(null);
let fileName = ref("");
watch(() => props.visible, () => {
  fileName.value = "";
  fileInputRef.value.value = null;
});
function fileChange(event) {
  if (event.target.files.length === 0) {
    return;
  }
  // 如果有文件限制
  if (props.limitTypeArray.length !== 0) {
    let suffixArr = event.target.files[0].name.split(".");
    if (!props.limitTypeArray.some(type => {
      return suffixArr[suffixArr.length - 1] === type;
    })) {
      proxy.$message.warning("暂不支持该类型的文件上传");
      return;
    }
  }
  // 如果有大小限制
  if (props.limitSize !== 0) {
    if (event.target.files[0].size > props.limitSize * 1024 * 1024) {
      proxy.$message.warning("上传文件超过限制大小，请重新上传");
      return;
    }
  }
  let files = event.target.files[0];
  fileName.value = files.name;
  emit("fileUpload", files);
}
</script>

<style lang="less" scoped>
.upload-file-style {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  z-index: 2;
  .file-input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .file-info-box {
    position: absolute;
    top: 0px;
    left: 15px;
    z-index: -1;
    .upload-icon {
      position: relative;
      top: 2px;
      right: 5px;
      font-size: 15px;
      color: #276bd7;
    }
    span {
      font-size: 13px;
      color: #606266;
    }
    .file-name-span {
      display: inline-block;
      height: 35px;
      line-height: 32px;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>