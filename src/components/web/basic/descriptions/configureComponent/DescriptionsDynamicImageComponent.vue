<template>
  <span class="dynamic-image-style">
    <template v-if="imagePreviewList.length">
      <el-image
        v-for="item in imageValue"
        :key="item"
        :style="imageStyle"
        :src="item"
        :preview-teleported="true"
        :preview-src-list="imagePreviewList"
      >
        <template #error>
          <div class="error-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
    </template>
    <span v-else>暂无图片</span>
  </span>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const props = defineProps({
  configObject: {
    type: Object,
    require: true
  },
  contentValue: {
    type: [String, Number],
    require: true
  }
});
let imageValue = ref([]);
watch(() => props.contentValue, value => {
  if (value) {
    setContentValue();
  } else {
    imageValue.value = [];
  }
}, { immediate: true });
const imageStyle = computed(() => {
  return {
    width: `${props.configObject.dynamicImageWidth || 24}px`,
    height: `${props.configObject.dynamicImageHeight || 24}px`
  };
});
const imagePreviewList = computed(() => {
  return imageValue.value;
});
// 设置图片的地址
function setContentValue() {
  if (props.contentValue.includes("http")) {
    imageValue.value = [props.contentValue];
  } else {
    imageValue.value = [];
    if (!props.contentValue) {
      return;
    }
    const fileArray = props.contentValue.split(",");
    fileArray.forEach(item => {
      imageValue.value.push(`${BASE_FILE_PREVIEW_URL}/${item}`);
    });
  }
}
</script>

<style lang="less" scoped>
.dynamic-image-style {
  display: inline-flex;
  align-items: center;
  :deep(.error-slot) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f4f7fa;
    color: #909399;
    font-size: 16px;
  }
  :deep(.el-image) {
    margin-left: 8px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>