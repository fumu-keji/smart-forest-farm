<template>
  <echart-render
    ref="renderRef"
    :options="renderOptions"
    :chartModel="renderModel"
  />
</template>

<script setup>
import { ref, computed, useAttrs, onMounted } from "vue";
import { setEchartCommonOption, setChartAttribute } from "@/utils/functionUtil";
const gaugeAttribute = {
  darkModel: false,
  gaugeRadius: "80",
  centerLeft: "50",
  centerTop: "55",
  gaugeValue: "70",
  gaugeName: "分数",
  detailFontSize: "20",
  detailColor: "#464646",
  detailUnit: "分",
  min: "0",
  max: "100",
  splitNumber: "10",
  startAngle: "225",
  endAngle: "-45",
  tipsTitle: "分数仪表图"
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return gaugeAttribute;
});
let renderRef = ref(null);
let renderOptions = ref(null);
let renderModel = ref("");
onMounted(() => {
  initChart();
});
async function initChart(resResultItem) {
  const resultAttrs = setChartAttribute(attrs, defaultAttrs.value);
  let options = {
    tooltip: { formatter: `{a} <br/>{b} : {c}${resultAttrs.detailUnit}` },
    series: []
  };
  setGaugeData(options, resultAttrs);
  renderOptions.value = options;
  renderModel.value = resultAttrs.darkModel ? "dark" : "light";
  renderRef.value.initRenderChart();
}
// 设置面积图的各个值
function setGaugeData(options, resultAttrs) {
  let gaugeRadius = resultAttrs.gaugeRadius ? resultAttrs.gaugeRadius : "80";
  let centerLeft = resultAttrs.centerLeft ? resultAttrs.centerLeft : "50";
  let centerTop = resultAttrs.centerTop ? resultAttrs.centerTop : "55";
  options.series.push({
    name: resultAttrs.tipsTitle,
    type: "gauge",
    progress: { show: true },
    radius: `${gaugeRadius}%`,
    center: [`${centerLeft}%`, `${centerTop}%`],
    min: parseFloat(resultAttrs.min) || 0,
    max: parseFloat(resultAttrs.max) || 100,
    startAngle: resultAttrs.startAngle,
    endAngle: resultAttrs.endAngle,
    splitNumber: parseFloat(resultAttrs.splitNumber) || 10,
    detail: {
      formatter: `{value}${resultAttrs.detailUnit}`,
      valueAnimation: true,
      fontSize: resultAttrs.detailFontSize || 20,
      color: resultAttrs.detailColor
    },
    data: [{ value: resultAttrs.gaugeValue, name: resultAttrs.gaugeName }]
  });
}
defineExpose({
  initChart
});
</script>
