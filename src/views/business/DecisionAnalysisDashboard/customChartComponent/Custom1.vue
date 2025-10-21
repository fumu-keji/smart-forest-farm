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
        type: "shadow",
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
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
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
        name: "处置效率",
        type: "bar",
        data: [88, 92, 85, 90, 95, 93, 91, 94, 89, 96, 92, 98],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#39AD93",
            },
            {
              offset: 1,
              color: "#0CE7B6",
            },
          ]),
        },
      },
      {
        name: "损失控制",
        type: "line",
        data: [75, 82, 78, 85, 88, 86, 84, 89, 87, 91, 90, 94],
        itemStyle: {
          color: "#057165",
        },
        lineStyle: {
          width: 3,
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
