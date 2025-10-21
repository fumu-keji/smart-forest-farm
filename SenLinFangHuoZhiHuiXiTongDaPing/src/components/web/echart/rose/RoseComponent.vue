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
const roseAttribute = {
  legendOrient: "vertical",
  roseInnerRadius: "30",
  roseOutSideRadius: "100",
  roundedModel: true,
  showLabel: true,
  labelPosition: "inside",
  labelFontSize: "16",
  labelColor: "#464646",
  showTotal: true,
  totalLeft: "center",
  totalTop: "57",
  centerLeft: "50",
  centerTop: "60",
  numColor: "#a9a9a9",
  numFontSize: "14",
  totalColor: "#000",
  totalFontSize: "12"
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return Object.assign({}, defaultEchartAttribute, roseAttribute);
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
    tooltip: { trigger: "item" },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false, title: "数据视图" },
        saveAsImage: { show: true, title: "保存为图片" }
      }
    },
    legend: { textStyle: {} },
    title: { textStyle: {} },
    series: []
  };
  options = setEchartCommonOption(resultAttrs, options);
  await setRoseData(options, resResultItem, resultAttrs);
  renderOptions.value = options;
  renderModel.value = resultAttrs.darkModel ? "dark" : "light";
  renderRef.value.initRenderChart();
}
// 设置面积图的各个值
async function setRoseData(options, resResultItem, resultAttrs) {
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
  // 初始相关数据
  options.series = [];
  if (resultItem.length === 0) {
    return;
  }
  // 设置统计和整体环图的数据
  let roseDataTotal = 0;
  let roseInnerRadius = resultAttrs.roseInnerRadius ? resultAttrs.roseInnerRadius : "30";
  let roseOutSideRadius = resultAttrs.roseOutSideRadius ? resultAttrs.roseOutSideRadius : "100";
  let centerLeft = resultAttrs.centerLeft ? resultAttrs.centerLeft : "50";
  let centerTop = resultAttrs.centerTop ? resultAttrs.centerTop : "60";
  let resultRoseData = {
    type: "pie",
    roseType: "area",
    radius: [`${roseInnerRadius}%`, `${roseOutSideRadius}%`],
    center: [`${centerLeft}%`, `${centerTop}%`],
    // 设置文本标签
    label: { 
      show: resultAttrs.showLabel, 
      position: resultAttrs.labelPosition, 
      formatter: "{c}",
      fontSize: resultAttrs.labelFontSize || 16,
      color: resultAttrs.labelColor
    },
    labelLine: { show: resultAttrs.labelPosition === "outer" },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)"
      }
    },
    data: []
  };
  const colorList = attrs.setting.colorList;
  // 设置每一项和计算统计
  resultItem.forEach((rose, index) => {
    let roseColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      roseColor = colorList[index];
    }
    roseDataTotal += parseFloat(rose.value);
    resultRoseData.data.push({
      name: rose.name,
      value: rose.value,
      itemStyle: { color: roseColor }
    });
  });
  options.series.push(resultRoseData);
  // 设置环状图的圆角
  if (resultAttrs.roundedModel) {
    resultRoseData.itemStyle = {
      borderRadius: 15,
      borderColor: "#fff",
      borderWidth: 2
    };
  }
  // 设置统计显示
  const totalTop = resultAttrs.totalTop ? `${resultAttrs.totalTop}%` : "90";
  const subTotalTop = resultAttrs.totalTop ? `${parseFloat(resultAttrs.totalTop) + 4}%` : "94";
  if (resultAttrs.showTotal) {
    options.graphic = {
      elements: [
        {
          type: "text",
          left: resultAttrs.totalLeft,
          top: totalTop,
          style: {
            text: "总数",
            textAlign: "center",
            fill: resultAttrs.totalColor,
            width: 30,
            height: 30,
            fontSize: resultAttrs.totalFontSize || 12,
            color: "#ffffff"
          }
        },
        {
          type: "text",
          left: resultAttrs.totalLeft,
          top: subTotalTop,
          style: {
            text: roseDataTotal,
            textAlign: "center",
            fill: resultAttrs.numColor,
            width: 30,
            height: 25,
            fontSize: resultAttrs.numFontSize || 14,
            color: "red"
          }
        }
      ]
    };
  }
}
defineExpose({
  initChart
});
</script>
