<template>
  <echart-render
    ref="renderRef"
    :options="renderOptions"
    :chartModel="renderModel"
  />
</template>

<script setup>
import { ref, computed, useAttrs, onMounted, getCurrentInstance } from "vue";
import { cloneObject, setEchartCommonOption, setChartAttribute } from "@/utils/functionUtil";
import { defaultEchartAttribute } from "@/config/pageDesign/componentConfig";
const { proxy } = getCurrentInstance();
const barLineAttribute = {
  showBackground: false,
  backgroundColor: "rgba(180, 180, 180, 0.2)",
  smoothLine: false,
  xUnit: "",
  yUnit: "",
  gridLeft: "12",
  gridRight: "10",
  gridTop: "20",
  gridBottom: "10",
  unitFontSize: "12",
  unitColor: "#5e5e5e",
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return Object.assign({}, defaultEchartAttribute, barLineAttribute);
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
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false, title: "数据视图" },
        saveAsImage: { show: true, title: "保存为图片" }
      }
    },
    legend: { textStyle: {} },
    title: { textStyle: {} },
    grid: {},
    xAxis: { 
      type: "category", 
      name: resultAttrs.xUnit, 
      nameTextStyle: {
        fontWeight: "bolder",
        fontSize: resultAttrs.unitFontSize || 12,
        color: resultAttrs.unitColor
      },
      axisLabel: {
        fontSize: resultAttrs.unitFontSize || 12,
        color: resultAttrs.unitColor
      },  
    },
    yAxis: { 
      type: "value", 
      name: resultAttrs.yUnit,
      nameTextStyle: {
        fontWeight: "bolder",
        fontSize: resultAttrs.unitFontSize || 12,
        color: resultAttrs.unitColor
      },
      axisLabel: {
        fontSize: resultAttrs.unitFontSize || 12,
        color: resultAttrs.unitColor
      },  
    },
    series: []
  };
  options = setEchartCommonOption(resultAttrs, options);
  await setBarLineData(options, resResultItem, resultAttrs);
  renderOptions.value = options;
  renderModel.value = resultAttrs.darkModel ? "dark" : "light";
  renderRef.value.initRenderChart();
}
// 设置面积图的各个值
async function setBarLineData(options, resResultItem, resultAttrs) {
  let resultItem = [];
  // resResultItem当查询图表时手动更改图表数据
  if (resResultItem) {
    resultItem = resResultItem;
  } else {
    if (attrs.setting.bindType === "static") {
      resultItem = attrs.setting.optionItem.length ? cloneObject(attrs.setting.optionItem)  : [];
    } else {
      await proxy.$getChartOptionItem(attrs.setting, resultItem);
    }
  }
  // 初始化x，y轴数据
  options.xAxis.data = [];
  options.series = [];
  if (resultItem.length === 0) {
    return;
  }
  // 处理相同的数据混合
  let dataInfo = {};
  resultItem.forEach(item => {
    const { catalog, type } = item;
    if (!dataInfo[catalog]) {
      dataInfo[catalog] = {
        catalog,
        type,				
        data: []
      };
    }
    dataInfo[catalog].data.push({ name: item.name, value: item.value });
  });
  let optionItem = Object.values(dataInfo);
  // 处理x轴数据
  optionItem[0].data.forEach(item => {
    options.xAxis.data.push(item.name);
  });
  // 处理y轴数据
  const colorList = attrs.setting.colorList;
  optionItem.forEach((item, index) => {
    let barLineColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      barLineColor = colorList[index];
    }
    if (item.type === "bar") {
      // 设置y轴数据集合
      let seriesObject = {
        name: item.catalog,
        type: "bar",
        showBackground: resultAttrs.showBackground,
        backgroundStyle: { color: resultAttrs.backgroundColor },
        itemStyle: { color: barLineColor },
        data: []
      };
      item.data.forEach(child => {
        seriesObject.data.push(child.value);
      });
      // 添加所有的分类到series
      options.series.push(seriesObject);
    }
    if (item.type === "line") {
      // 设置y轴数据集合
      let seriesObject = {
        name: item.catalog,
        type: "line",
        smooth: resultAttrs.smoothLine,
        itemStyle: { color: barLineColor },
        data: []
      };
      item.data.forEach(child => {
        seriesObject.data.push(child.value);
      });
      // 添加所有的分类到series
      options.series.push(seriesObject);
    }
  });
}
defineExpose({
  initChart
});
</script>
