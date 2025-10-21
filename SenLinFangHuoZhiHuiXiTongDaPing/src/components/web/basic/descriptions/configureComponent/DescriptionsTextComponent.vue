<template>
  <span :style="textStyle"> {{ formatValue }} </span>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  filterArray: {
    type: Array,
    require: true
  },
  contentValue: {
    type: [String, Number],
    require: true
  }
});
// 过滤值的数据
const filterItemData = computed(()=> {
  return props.filterArray.find(filterData => {
    return filterData.value === props.contentValue;
  });
});
// 文字的相关样式
const textStyle = computed(()=> {
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
// 过滤后的文案
const formatValue = computed(()=> {
  if (filterItemData.value) {
    return filterItemData.value.text;
  } else {
    return props.contentValue;
  }
});
</script>