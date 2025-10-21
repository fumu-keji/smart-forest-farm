<template>
  <div class="pdf-render-box" v-loading="pdfData.loadingProcess">
    <div class="pdf-box" v-if="pdfData.readStatus">
      <VuePdf
        class="pdf-preview-box"
        :key="pdfData.currentPage"
        :src="$attrs.documentUrl"
        :page="pdfData.currentPage"
      />
      <div class="oprate-box">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :page-size="1"
          :total="pdfData.pageCount"
          v-model:current-page="pdfData.currentPage"
          @current-change="pageChange"
        />
        <el-button
          v-if="$attrs.showDownloadBtn"
          class="download-btn"
          @click="downloadFile"
        >
          下载
        </el-button>
      </div>
    </div>
    <el-empty v-else description=" ">
      <el-tag type="warning">读取文件失败</el-tag>
    </el-empty>
  </div>
</template>

<script setup>
import { reactive, useAttrs, getCurrentInstance, watch } from "vue";
import { VuePdf, createLoadingTask } from "vue3-pdfjs";
const { proxy } = getCurrentInstance();
const attrs = useAttrs();
// 基础配置
let pdfData = reactive({
  currentPage: 1,
  pageCount: 0,
  loadingProcess: false,
  readStatus: true
});
watch(() => attrs.documentUrl, () => {
  loadPdf();
}, { immediate: true });
function loadPdf() {
  const loadingTask = createLoadingTask(attrs.documentUrl);
  pdfData.readStatus = false;
  pdfData.loadingProcess = true;
  loadingTask.promise.then(pdf => {
    pdfData.readStatus = true;
    pdfData.pageCount = pdf.numPages;
  }).catch(() => {
    pdfData.readStatus = false;
  }).finally(() => {
    pdfData.loadingProcess = false;
  });
}
function pageChange(pageNumber) {
  pdfData.currentPage = pageNumber;
}
function downloadFile() {
  if (!pdfData.readStatus) {
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
    proxy.$exportFile(onlineFileUrl, `${fileName}.pdf`);
  }
}
</script>

<style lang="less" scoped>
.pdf-render-box {
  display: flex;
  align-items: center;
  justify-content: center;
  .pdf-box {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .pdf-preview-box {
    height: max-content;
    max-height: calc(100% - 62px);
    overflow-y: auto;
    overflow-x: hidden;
    :deep(canvas) {
      width: 100% !important;
    }
    :deep(.vue-pdf__wrapper-annotation-layer) {
      width: 100%;
    }
  }
  .oprate-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.el-button) {
      margin-left: 20px;
    }
  }
}
</style>