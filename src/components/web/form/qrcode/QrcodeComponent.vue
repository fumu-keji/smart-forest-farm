<template>
  <div @click="showImage">
    <qrcode-vue
      class="qrcode-style"
      :id="getQrcodeId"
      :value="staticUrl"
      :size="qrcodeSize"
      level="H"
    />
    <el-image-viewer
      v-if="showImageViewer"
      :initialIndex="0"
      :zIndex="99999"
      :url-list="imageList"
      :teleported="true"
      @close="closeImageViewer"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import QrcodeVue from "qrcode.vue";
import { generateShortStr } from "@/utils/functionUtil";
const props = defineProps({
  qrcodeSize: {
    type: Number,
    default: 200
  },
  staticUrl: {
    type: String,
    default: "https://fmy-prod.oss-cn-hangzhou.aliyuncs.com/assets/image/fumucloud.png"
  },
  preview: {
    type: Boolean,
    default: false
  }
});
const getQrcodeId = computed(() => {
  return `qrcode-${generateShortStr()}`;
});
let showImageViewer = ref(false);
let imageList = ref([]);
function showImage() {
  if (!props.preview) {
    return;
  }
  showImageViewer.value = true;
  const canvas = document.querySelector(`#${getQrcodeId.value}`);
  imageList.value = [canvas.toDataURL("image/png")];
}
function closeImageViewer() {
  showImageViewer.value = false;
  imageList.value = [];
}
</script>