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
    color: ["#39AD93", "#0CE7B6", "#057165", "#FFA500", "#FFD700"],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,0.8)",
      borderColor: "#39AD93",
      textStyle: {
        color: "#ffffff",
      },
    },
    xAxis: {
      type: "category",
      data: ["北林区", "南林区", "西林区", "东林区", "中心区"],
      axisLine: {
        lineStyle: {
          color: "#aeb5bb",
        },
      },
      axisLabel: {
        color: "#ffffff",
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#aeb5bb",
        },
      },
      axisLabel: {
        color: "#ffffff",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(174, 181, 187, 0.2)",
        },
      },
    },
    series: [
      {
        data: [32, 28, 45, 38, 13],
        type: "bar",
        barWidth: "40%",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#39AD93",
            },
            {
              offset: 1,
              color: "#057165",
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
