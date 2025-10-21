<template>
  <div class="docx-render-box" v-loading="docxData.loadingProcess">
    <div class="docx-box" v-if="docxData.readStatus">
      <el-button
        v-if="$attrs.showDownloadBtn"
        class="download-btn"
        @click="downloadFile"
      >
        下载
      </el-button>
      <div class="docx" ref="docxRef" />
    </div>
    <el-empty v-else description=" ">
      <el-tag type="warning">读取文件失败</el-tag>
    </el-empty>
  </div>
</template>

<script setup>
import { ref, reactive, useAttrs, getCurrentInstance, watch } from "vue";
import { renderAsync } from "docx-preview";
const { proxy } = getCurrentInstance();
const attrs = useAttrs();
// 基础配置
const docxRef = ref(null);
let docxData = reactive({
  loadingProcess: false,
  readStatus: true
});
watch(() => attrs.documentUrl, () => {
  loadDocx();
}, { immediate: true });
function loadDocx() {
  docxData.loadingProcess = true;
  docxData.readStatus = true;
  fetch(attrs.documentUrl).then(async res => {
    const docxData = res.blob();
    await renderAsync(docxData, docxRef.value).catch(() => {
      docxData.readStatus = false;
    });
  }).catch(() => {
    docxData.readStatus = false;
  }).finally(() => {
    docxData.loadingProcess = false;
  });
}
function downloadFile() {
  if (!docxData.readStatus) {
    proxy.$notify.warning("读取文件失败，无法下载");
    return;
  }
  if (attrs.documentUrl.indexOf("oss-cn") !== -1) {
    const tempArr = attrs.documentUrl.split("/");
    const fileName =  tempArr[tempArr.length - 1];
    const onlineFileUrl = attrs.documentUrl;
    proxy.$exportFile(onlineFileUrl, fileName);
  } 
  if (attrs.documentUrl.indexOf("http") !== -1) {
    const tempArr = attrs.documentUrl.split("/");
    const fileName =  tempArr[tempArr.length - 1];
    const onlineFileUrl = attrs.documentUrl;
    proxy.$exportFile(onlineFileUrl, `${fileName}.docx`);
  }
}
</script>

<style lang="less" scoped>
.docx-render-box {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .docx-box {
    height: 100%;
    width: 100%;
    position: relative;
    .download-btn {
      position: absolute;
      top: 5px;
      right: 12px;
      z-index: 1;
    }
    .docx {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      :deep(.docx-wrapper) {
        background: transparent;
      }
    }
  }
}
</style>