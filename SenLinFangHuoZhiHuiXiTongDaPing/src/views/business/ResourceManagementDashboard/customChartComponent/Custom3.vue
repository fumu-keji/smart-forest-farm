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
    color: ["#39AD93", "#0CE7B6", "#FFA500", "#FF6347"],
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
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
        name: "已完成",
        type: "line",
        smooth: true,
        data: [18, 22, 19, 25, 21, 20, 24],
        itemStyle: {
          color: "#39AD93",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(57, 173, 147, 0.3)",
            },
            {
              offset: 1,
              color: "rgba(57, 173, 147, 0.05)",
            },
          ]),
        },
      },
      {
        name: "进行中",
        type: "line",
        smooth: true,
        data: [8, 6, 9, 5, 7, 6, 4],
        itemStyle: {
          color: "#0CE7B6",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(12, 231, 182, 0.3)",
            },
            {
              offset: 1,
              color: "rgba(12, 231, 182, 0.05)",
            },
          ]),
        },
      },
      {
        name: "发现问题",
        type: "line",
        smooth: true,
        data: [2, 1, 3, 2, 1, 2, 1],
        itemStyle: {
          color: "#FFA500",
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
