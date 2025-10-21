<template>
  <span v-if="showTextFlag" :style="textStyle" class="calendar-text">
    {{ formatTagValue }}
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
  componentValue: {
    type: [String, Number],
    require: true
  }
});
const filterItemData = computed(() => {
  return props.filterArray.find(filterData => {
    return filterData.value === props.componentValue;
  });
});
const showTextFlag = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.text !== "";
  } else {
    return props.configObject.text !== "";
  }
});
const formatTagValue = computed(() => {
  return filterItemData.value ? filterItemData.value.text : props.configObject.text;
});
const textStyle = computed(() => {
  let resultStyle = {};
  if (props.configObject.textColor) {
    resultStyle.color = props.configObject.textColor;
  }
  if (props.configObject.textFontSize) {
    resultStyle.fontSize =  `${props.configObject.textFontSize}px`;
  }
  if (!filterItemData.value) {
    return resultStyle;
  }
  if (filterItemData.value.textColor) {
    resultStyle.color = filterItemData.value.textColor;
  }
  if (filterItemData.value.textFontSize) {
    resultStyle.fontSize =  `${filterItemData.value.textFontSize}px`;
  }
  return resultStyle;
});
</script>

<style lang="less" scoped>
.current.is-selected {
  .calendar-text {
    color: #ffffff !important;
  }
}
.calendar-text {
  color: var(--dateColor);
  font-size: var(--dateFontSize);
}
</style>