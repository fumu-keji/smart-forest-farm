<template>
  <el-image-viewer
    v-if="showImageViewer"
    :initialIndex="0"
    :zIndex="99999"
    :url-list="imageList"
    :teleported="true"
    @close="closeImageViewer"
  />
</template>

<script setup>
import { computed, watch, ref } from "vue";
const props = defineProps({
  file: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
const emit = defineEmits(["close"]);
let showImageViewer = ref(false);
let imageList = ref([]);
const isImage = ref("jpeg, jpg, png, apng, bmp, svg, gif, webp, tif, pcx, tga, exif, raw, JPEG, JPG, PNG, APNG, BMP, SVG, GIF, WEBP, TIF, PCX, TGA, EXIF, RAW");
watch(() => props.file, file => {
  file.url && previewFile(file);
});
// 预览文件
function previewFile(file) {
  if (isImage.value.includes(file.suffix)) {
    showImageViewer.value = true;
    imageList.value = [file.url];
  } else {
    window.open(file.url);
  }
}
// 关闭图片浏览器
function closeImageViewer() {
  showImageViewer.value = false;
  imageList.value = [];
  emit("close");
}
</script>