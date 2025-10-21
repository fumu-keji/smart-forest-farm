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
        "1时",
        "2时",
        "3时",
        "4时",
        "5时",
        "6时",
        "7时",
        "8时",
        "9时",
        "10时",
        "11时",
        "12时",
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
        name: "烟雾浓度",
        type: "line",
        data: [12, 15, 18, 22, 28, 35, 32, 25, 20, 18, 16, 14],
        lineStyle: {
          color: "#ffa726",
          width: 3,
        },
        itemStyle: {
          color: "#ffa726",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(255,167,38,0.6)",
            },
            {
              offset: 1,
              color: "rgba(255,167,38,0.1)",
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
