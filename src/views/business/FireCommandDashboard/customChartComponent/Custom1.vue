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
      borderColor: "#39AD93",
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
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
      ],
      axisLine: {
        lineStyle: {
          color: "#39AD93",
        },
      },
      axisLabel: {
        color: "#ffffff",
        fontSize: 12,
      },
    },
    yAxis: {
      type: "value",
      name: "蔓延速度(km/h)",
      nameTextStyle: {
        color: "#ffffff",
      },
      axisLine: {
        lineStyle: {
          color: "#39AD93",
        },
      },
      axisLabel: {
        color: "#ffffff",
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(57,173,147,0.2)",
        },
      },
    },
    series: [
      {
        data: [1.2, 1.8, 2.5, 3.2, 3.8, 4.2, 3.9, 3.5, 3.1, 2.8, 2.4, 2.1],
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#ff4757",
            },
            {
              offset: 1,
              color: "#ffa502",
            },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(255,71,87,0.4)",
            },
            {
              offset: 1,
              color: "rgba(255,165,2,0.1)",
            },
          ]),
        },
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#ff4757",
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
