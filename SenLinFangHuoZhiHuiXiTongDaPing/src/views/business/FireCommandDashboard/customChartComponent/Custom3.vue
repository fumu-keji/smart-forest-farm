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
      data: ["主攻方向", "侧翼防守", "隔离带", "水源保障", "后勤支援"],
      axisLine: {
        lineStyle: {
          color: "#39AD93",
        },
      },
      axisLabel: {
        color: "#ffffff",
        fontSize: 12,
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
      name: "兵力部署(人)",
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
        data: [120, 80, 45, 25, 16],
        type: "bar",
        barWidth: "50%",
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
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          color: "#ffffff",
          fontSize: 12,
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
