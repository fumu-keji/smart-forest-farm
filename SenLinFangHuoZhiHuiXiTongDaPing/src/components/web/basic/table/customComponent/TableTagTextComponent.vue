<template>
  <span class="tag-text-style">
    <tag-component
      v-if="tagInsertType === 'before' && showTagFlag"
      :class="{ 'before-tag': formatValue !== '' }"
      :tagText="formatTagValue"
      v-bind="tagAttr"
    />
    <span :style="textStyle">{{ formatValue }}</span>
    <tag-component
      v-if="tagInsertType === 'after' && showTagFlag"
      :class="{ 'after-tag': formatValue !== '' }"
      :tagText="formatTagValue"
      v-bind="tagAttr"
    />
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
const showTagFlag = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.tagName !== "";
  } else {
    return props.configObject.tagName !== "";
  }
});
const tagInsertType = computed(() => {
  return filterItemData.value ? filterItemData.value.insertType : props.configObject.insertType;
});
const tagAttr = computed(() => {
  return {
    compSize: filterItemData.value ? filterItemData.value.tagSize : props.configObject.tagSize,
    type: filterItemData.value ? filterItemData.value.tagType : props.configObject.tagType
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
const formatTagValue = computed(() => {
  return filterItemData.value ? filterItemData.value.tagName : props.configObject.tagName;
});
</script>

<style lang="less" scoped>
.tag-text-style {
  display: flex;
  align-items: center;
  .before-tag {
    margin-right: 5px;
  }
  .after-tag {
    margin-left: 5px;
  }
}
</style>