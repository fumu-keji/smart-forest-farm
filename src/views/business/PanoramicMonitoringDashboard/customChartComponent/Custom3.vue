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
      borderColor: "#39ad93",
      textStyle: {
        color: "#ffffff",
      },
    },
    series: [
      {
        name: "热源强度",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "50%"],
        data: [
          {
            value: 35,
            name: "低风险区",
          },
          {
            value: 28,
            name: "中风险区",
          },
          {
            value: 22,
            name: "高风险区",
          },
          {
            value: 15,
            name: "极高风险区",
          },
        ],
        itemStyle: {
          borderRadius: 5,
          borderColor: "#000",
          borderWidth: 1,
        },
        label: {
          color: "#ffffff",
          fontSize: 14,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        color: ["#39ad93", "#0ce7b6", "#ffa726", "#ff6b6b"],
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
