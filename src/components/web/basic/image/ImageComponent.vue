<template>
  <el-image
    draggable="false"
    :src="imageUrl"
    :fit="fit"
    :preview-teleported="true"
    :preview-src-list="preview ? [imageUrl] : []"
  >
    <template #error>
      <div class="image-slot">
        <el-icon><Picture /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<script setup>
import { ref, computed, getCurrentInstance, watch } from "vue";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const { proxy } = getCurrentInstance();
const props = defineProps({
  fit: {
    type: String,
    default: "contain"
  },
  preview: {
    type: Boolean,
    default: false
  },
  fileIds: {
    type: String,
    default: ""
  }
});
let src = defineModel("src", {
  type: String,
  default: "https://fmy-prod.oss-cn-hangzhou.aliyuncs.com/assets/image/fumucloud.png"
});
let imageUrl = ref("");
watch(() => props.fileIds, fileId => {
  if (fileId) {
    let fileIds = fileId.split(",");
    if (fileIds.length > 0) {
      imageUrl.value = `${BASE_FILE_PREVIEW_URL}/${fileIds[0]}`;
    }
  } else {
    imageUrl.value = "";
  }
}, { immediate: true });
watch(() => src.value, () => {
  if (props.fileIds) {
    return;
  }
  imageUrl.value = "";
  if (src.value) {
    imageUrl.value = proxy.$setAssetType(src.value);
  }
}, { immediate: true });
defineExpose({
  src
});
</script>

<style lang="less" scoped>
:deep(.image-slot) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 30px;
}
</style>