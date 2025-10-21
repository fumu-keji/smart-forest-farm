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
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["经济损失", "生态损失"],
      textStyle: {
        color: "#ffffff",
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "10%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["2019", "2020", "2021", "2022", "2023", "2024"],
      axisLine: {
        lineStyle: {
          color: "#4a5568",
        },
      },
      axisLabel: {
        color: "#a0aec0",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#4a5568",
        },
      },
      axisLabel: {
        color: "#a0aec0",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(74, 85, 104, 0.3)",
        },
      },
    },
    series: [
      {
        name: "经济损失",
        type: "bar",
        data: [320, 280, 240, 180, 120, 85],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#E67E22",
            },
            {
              offset: 1,
              color: "#F39C12",
            },
          ]),
        },
      },
      {
        name: "生态损失",
        type: "bar",
        data: [450, 380, 320, 250, 180, 130],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#E74C3C",
            },
            {
              offset: 1,
              color: "#C0392B",
            },
          ]),
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
