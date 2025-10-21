import { shallowRef, onMounted, onBeforeUnmount } from "vue";
import echarts from "@/utils/chartUtils";

export function useEcharts() {
  const charts = shallowRef(echarts.ECharts);
  function initCharts(echartsRef, options, chartModel) {
    if (charts.value) {
      charts.value.dispose();
    }
    charts.value = echarts.init(echartsRef.value, chartModel);
    setOptions(options);
  }
  function setOptions(options) {
    charts.value && charts.value.setOption(options);
  }
  function echartsResize() {
    charts.value && charts.value.resize();
  }
  onMounted(() => {
    window.addEventListener("resize", echartsResize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize);
  });
  return {
    initCharts,
    setOptions,
    echartsResize
  };
}
