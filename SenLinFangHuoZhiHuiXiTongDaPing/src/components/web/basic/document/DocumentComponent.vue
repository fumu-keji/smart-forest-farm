<template>
  <component
    :is="componentName"
    :documentUrl="resultDocumentUrl"
    :showDownloadBtn="showDownloadBtn"
  />
</template>

<script setup>
import { ref, computed, getCurrentInstance, watch } from "vue";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const { proxy } = getCurrentInstance();
const props = defineProps({
  documentUrl: {
    type: String,
    default: ""
  },
  showDownloadBtn: {
    type: Boolean,
    default: false
  },
  documentType: {
    type: String,
    require: true
  },
  fileIds: {
    type: String,
    default: ""
  }
});
let resultDocumentUrl = ref("");
let resultType = ref("");
let componentName = ref("");
watch(() => props.fileIds, fileId => {
  if (fileId) {
    resultDocumentUrl.value = `${BASE_FILE_PREVIEW_URL}/${fileId}`;
    setComponentName();
  }
}, { immediate: true });
watch(() => props.documentUrl, () => {
  if (!props.fileIds) {
    resultDocumentUrl.value = proxy.$setAssetType(props.documentUrl);
    setComponentName();
  }
}, { immediate: true });
// 指定动态组件名
async function setComponentName() {
  if (!resultDocumentUrl.value) {
    componentName.value = "DocumentEmptyComponent";
    return;
  }
  if (props.fileIds) {
    await getFileType();
  } else {
    resultType.value = props.documentType;
  }
  const componentsNameObj = {
    "pdf": "DocumentPdfComponent",
    "docx": "DocumentDocxComponent",
    "doc": "DocumentDocxComponent"
  };
  componentName.value = componentsNameObj[resultType.value] ? componentsNameObj[resultType.value] : "DocumentEmptyComponent";
}
// 获取文件后缀名
function getFileType() {
  return proxy.$getDataAxios.getUrlByFileId(props.fileIds).then(res => {
    if (res.data && res.data.length) {
      resultType.value = res.data[0].suffix;
    }
  }).catch(err => {
    proxy.$getDataAxios.notifyError(err);
  });
}
</script>