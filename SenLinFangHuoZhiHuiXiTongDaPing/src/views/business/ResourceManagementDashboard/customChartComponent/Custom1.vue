<template>
  <echart-render
    ref="renderRef"
    :options="renderOptions"
    :chartModel="renderModel"
  />
</template>
<script setup>
import { ref, useAttrs, onMounted } from "vue";
import * as echarts from "echarts/core";
const attrs = useAttrs();
let renderRef = ref(null);
let renderOptions = ref(null);
let renderModel = ref("");
onMounted(() => {
  initChart();
});
function initChart() {
  let optionRow = {
    color: ["#39AD93", "#0CE7B6", "#057165", "#2E8B7D", "#4FBFA7", "#6CD5BB"],
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.8)",
      borderColor: "#39AD93",
      textStyle: {
        color: "#ffffff",
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "50%"],
        data: [
          {
            value: 3560,
            name: "松树林",
          },
          {
            value: 2840,
            name: "阔叶林",
          },
          {
            value: 3120,
            name: "混交林",
          },
          {
            value: 1860,
            name: "竹林",
          },
          {
            value: 1200,
            name: "经济林",
          },
        ],
        label: {
          color: "#ffffff",
          fontSize: 14,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(57, 173, 147, 0.5)",
          },
        },
      },
    ],
  };
  if (optionRow) {
    renderOptions.value = optionRow;
    renderModel.value = attrs.darkModel ? "dark" : "light";
    renderRef.value.initRenderChart();
  }
}
defineExpose({
  initChart,
});
</script>
