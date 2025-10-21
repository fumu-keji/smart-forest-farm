<template>
  <span :style="textStyle">{{ formatValue }} </span>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  filterArray: {
    type: Array,
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
    return props.columnValue;
  }
});
</script>