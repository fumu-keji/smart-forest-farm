<template>
  <span class="image-text-style">
    <el-image
      v-if="imageInsertType === 'before' && showImageFlag"
      :style="imageStyle"
      :class="{ 'before-image': formatValue !== '' }"
      :src="formatImageValue"
      :preview-teleported="true"
      :preview-src-list="imagePreviewList"
    >
      <template #error>
        <div class="error-slot">
          <el-icon><Picture /></el-icon>
        </div>
      </template>
    </el-image>
    <span :style="textStyle">{{ formatValue }}</span>
    <el-image
      v-if="imageInsertType === 'after' && showImageFlag"
      :style="imageStyle"
      :class="{ 'after-image': formatValue !== '' }"
      :src="formatImageValue"
      :preview-teleported="true"
      :preview-src-list="imagePreviewList"
    >
      <template #error>
        <div class="error-slot">
          <el-icon><Picture /></el-icon>
        </div>
      </template>
    </el-image>
  </span>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  filterArray: {
    type: Array,
    require: true
  },
  configObject: {
    type: Object,
    require: true
  },
  columnValue: {
    type: [String, Number],
    require: true
  }
});
// 配置信息
const filterItemData = computed(() => {
  return props.filterArray.find(filterData => {
    return filterData.value === props.columnValue;
  });
});
const showImageFlag = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.imageUrl !== "";
  } else {
    return props.configObject.imageUrl !== "";
  }
});
const imageInsertType = computed(() => {
  return filterItemData.value ? filterItemData.value.insertType : props.configObject.insertType;
});
const imageStyle = computed(() => {
  return {
    width: filterItemData.value ? `${filterItemData.value.imageWidth || 24}px` : `${props.configObject.imageWidth || 24}px`,
    height: filterItemData.value ? `${filterItemData.value.imageHeight || 24}px` : `${props.configObject.imageHeight || 24}px`,
  };
});
const textStyle = computed(() => {
  let resultStyle = {};
  if (filterItemData.value) {
    if (filterItemData.value.textColor) {
      resultStyle.color = filterItemData.value.textColor;
    }
    if (filterItemData.value.textFontSize) {
      resultStyle.fontSize =  `${filterItemData.value.textFontSize}px`;
    }
  }
  return resultStyle;
});
const formatValue = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.text;
  } else {
    return props.configObject.showDefaultValue ? props.columnValue : "";
  }
});
const formatImageValue = computed(() => {
  return filterItemData.value ? filterItemData.value.imageUrl : props.configObject.imageUrl;
});
const imagePreviewList = computed(() => {
  return [formatImageValue.value];
});
</script>

<style lang="less" scoped>
.image-text-style {
  display: flex;
  align-items: center;
  :deep(.error-slot) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #f4f7fa;
    color: #909399;
    font-size: 15px;
  }
  // i {
  //   display: inline-block;
  // }
  .before-image {
    margin-right: 5px;
  }
  .after-image {
    margin-left: 5px;
  }
}
</style>