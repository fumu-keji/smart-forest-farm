<template>
  <div ref="echartsRef" />
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useEcharts } from "@/hooks/chartHooks";
const { initCharts } = useEcharts();
const props = defineProps({
  options: {
    type: Object,
    require: true
  },
  chartModel: {
    type: String,
    require: true
  }
});
const echartsRef = ref(null);
async function initRenderChart() {
  await nextTick();
  initCharts(echartsRef, props.options, props.chartModel);
}
defineExpose({
  initRenderChart
});
</script>