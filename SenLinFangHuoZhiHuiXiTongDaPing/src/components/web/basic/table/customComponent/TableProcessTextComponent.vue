<template>
  <span class="process-text-style">
    <el-progress v-if="processInsertType === 'before'" v-bind="processAttr" />
    <span>{{ formatValue }}</span>
    <el-progress v-if="processInsertType === 'after'" v-bind="processAttr" />
  </span>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  configObject: {
    type: Object,
    require: true
  },
  columnValue: {
    type: [String, Number],
    require: true
  }
});
const processInsertType = computed(() => {
  return props.configObject.insertType;
});
const processAttr = computed(() => {
  const customColor = [
    { color: "#909399", percentage: "35" },
    { color: "#1778ff", percentage: "70" },
    { color: "#67C23A", percentage: "100" }
  ];
  const maxValue = props.configObject.processMaxValue || 0;
  const minValue = props.configObject.processMinValue || 100;
  const value = isNaN(props.columnValue) ? 0 : parseFloat(props.columnValue);
  let percentage = (value / (parseInt(maxValue) -  parseFloat(minValue))) * 100;
  if (isNaN(percentage)) {
    percentage = 0;
  }
  if (percentage > 100) {
    percentage = 100;
  }
  return {
    strokeWidth: parseInt(props.configObject.processStroke) || 6,
    percentage: Number(percentage.toFixed(2)),
    color: customColor
  };
});
const formatValue = computed(() => {
  return props.configObject.showDefaultValue ? props.columnValue : "";
});
</script>