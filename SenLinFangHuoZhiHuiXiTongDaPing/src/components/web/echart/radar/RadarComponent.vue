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
const radarAttribute = {
  shape: "polygon",
  radarRadius: "90",
  centerLeft: "50",
  centerTop: "65"
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return Object.assign({}, defaultEchartAttribute, radarAttribute);
});
let renderRef = ref(null);
let renderOptions = ref(null);
let renderModel = ref("");
onMounted(() => {
  initChart();
});
async function initChart(resResultItem) {
  const resultAttrs = setChartAttribute(attrs, defaultAttrs.value);
  let radarRadius = resultAttrs.radarRadius ? resultAttrs.radarRadius : "90";
  let centerLeft = resultAttrs.centerLeft ? resultAttrs.centerLeft : "50";
  let centerTop = resultAttrs.centerTop ? resultAttrs.centerTop : "65";
  let options = {
    tooltip: { trigger: "item" },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false, title: "数据视图" },
        saveAsImage: { show: true, title: "保存为图片" }
      }
    },
    legend: { textStyle: {} },
    title: { textStyle: {} },
    radar: {
      shape: resultAttrs.shape,
      center: [`${centerLeft}%`, `${centerTop}%`],
      radius: `${radarRadius}%`,
      indicator: []
    },
    series: []
  };
  options = setEchartCommonOption(resultAttrs, options);
  await setRadarData(options, resResultItem);
  renderOptions.value = options;
  renderModel.value = resultAttrs.darkModel ? "dark" : "light";
  renderRef.value.initRenderChart();
}
// 设置面积图的各个值
async function setRadarData(options, resResultItem) {
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
  // 初始化坐标，数值轴数据
  options.radar.indicator = [];
  options.series = [];
  if (resultItem.length === 0) {
    return;
  }
  // 处理相同的数据混合
  let dataInfo = {};
  resultItem.forEach(item => {
    const { catalog } = item;
    if (!dataInfo[catalog]) {
      dataInfo[catalog] = {
        catalog,			
        data: []
      };
    }
    dataInfo[catalog].data.push({ 
      name: item.name, 
      value: item.value,
      max: item.max 
    });
  });
  let optionItem = Object.values(dataInfo);
  // 处理坐标轴数据
  optionItem[0].data.forEach(item => {
    options.radar.indicator.push({
      name: item.name,
      max: item.max
    });
  });
  // 处理value数据
  const colorList = attrs.setting.colorList;
  optionItem.forEach((item, index) => {
    let radarColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      radarColor = colorList[index];
    }
    // 设置y轴数据集合
    let seriesObject = {
      type: "radar",
      itemStyle: { color: radarColor },
      data: []
    };
    let dataObject = {
      value: [],
      name: item.catalog
    };
    item.data.forEach(child => {
      dataObject.value.push(child.value);
    });
    seriesObject.data.push(dataObject);
    // 添加所有的分类到series
    options.series.push(seriesObject);
  });
}
defineExpose({
  initChart
});
</script>
