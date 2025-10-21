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
      backgroundColor: "rgba(0,0,0,0.8)",
      borderColor: "#39ad93",
      textStyle: {
        color: "#ffffff",
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      top: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: [
        "00:00",
        "03:00",
        "06:00",
        "09:00",
        "12:00",
        "15:00",
        "18:00",
        "21:00",
        "24:00",
      ],
      axisLine: {
        lineStyle: {
          color: "#39ad93",
        },
      },
      axisLabel: {
        color: "#ffffff",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#39ad93",
        },
      },
      axisLabel: {
        color: "#ffffff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(57,173,147,0.2)",
        },
      },
    },
    series: [
      {
        name: "温度",
        type: "line",
        data: [22, 21, 20, 23, 28, 32, 30, 26, 23],
        lineStyle: {
          color: "#39ad93",
          width: 3,
        },
        itemStyle: {
          color: "#39ad93",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(57,173,147,0.6)",
            },
            {
              offset: 1,
              color: "rgba(57,173,147,0.1)",
            },
          ]),
        },
      },
      {
        name: "湿度",
        type: "line",
        data: [65, 68, 70, 62, 55, 48, 52, 58, 63],
        lineStyle: {
          color: "#0ce7b6",
          width: 3,
        },
        itemStyle: {
          color: "#0ce7b6",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(12,231,182,0.6)",
            },
            {
              offset: 1,
              color: "rgba(12,231,182,0.1)",
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
