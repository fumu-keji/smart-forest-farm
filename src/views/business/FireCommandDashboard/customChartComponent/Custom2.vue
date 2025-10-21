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
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.8)",
      borderColor: "#39AD93",
      textStyle: {
        color: "#ffffff",
      },
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "#ffffff",
        fontSize: 12,
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["60%", "50%"],
        data: [
          {
            value: 156,
            name: "消防队伍",
          },
          {
            value: 42,
            name: "救援车辆",
          },
          {
            value: 88,
            name: "扑火设备",
          },
          {
            value: 25,
            name: "医疗救护",
          },
          {
            value: 18,
            name: "通讯设备",
          },
        ],
        itemStyle: {
          borderRadius: 8,
          borderColor: "#1a1a1a",
          borderWidth: 2,
        },
        label: {
          color: "#ffffff",
          fontSize: 12,
        },
        labelLine: {
          lineStyle: {
            color: "#39AD93",
          },
        },
        color: ["#39AD93", "#0CE7B6", "#057165", "#4CAF50", "#66BB6A"],
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
