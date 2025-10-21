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
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: "#ffffff",
      },
    },
    series: [
      {
        name: "火情类型",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#1a1a1a",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 35,
            name: "人为火源",
          },
          {
            value: 28,
            name: "自然火源",
          },
          {
            value: 18,
            name: "雷击",
          },
          {
            value: 12,
            name: "其他",
          },
          {
            value: 7,
            name: "原因不明",
          },
        ],
      },
    ],
    color: ["#39AD93", "#0CE7B6", "#057165", "#2ECC71", "#27AE60"],
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
