<template>
  <video ref="videoRef" :controls="controls" :loop="loop" :src="resultUrl" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, getCurrentInstance } from "vue";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const { proxy } = getCurrentInstance();
const props = defineProps({
  videoUrl: {
    type: String,
    default: ""
  },
  controls: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  fileIds: {
    type: String,
    default: ""
  }
});
let videoRef = ref(null);
let resultUrl = ref("");
watch(() => props.fileIds, fileId => {
  if (fileId) {
    resultUrl.value = `${BASE_FILE_PREVIEW_URL}/${fileId}`;
  } else {
    resultUrl.value = "";
  }
}, { immediate: true });
watch(() => props.videoUrl, () => {
  if (props.fileIds) {
    return;
  }
  resultUrl.value = "";
  if (props.videoUrl) {
    resultUrl.value = proxy.$setAssetType(props.videoUrl);
  }
}, { immediate: true });
onMounted(() => {
  if (props.autoplay) {
    videoRef.value.muted = true;
    videoRef.value.play();
    if (!props.controls) {
      videoRef.value.addEventListener("click", listenerFunction);
    }
  }
});
onBeforeUnmount(() => {
  if (!props.controls) {
    videoRef.value.removeEventListener("click", listenerFunction);
  }
});
function listenerFunction() {
  videoRef.value.muted = false;
}
</script>
