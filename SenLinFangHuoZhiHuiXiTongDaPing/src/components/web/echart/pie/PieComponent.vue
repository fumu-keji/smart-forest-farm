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
const pieAttribute = {
  legendOrient: "vertical",
  pieRadius: "70",
  showLabel: true,
  labelPosition: "outer",
  labelFontSize: "16",
  labelColor: "#464646",
  showTotal: true,
  totalLeft: "center",
  totalTop: "90",
  centerLeft: "50",
  centerTop: "50",
  numColor: "#a9a9a9",
  numFontSize: "14",
  totalColor: "#000",
  totalFontSize: "12"
};
const attrs = useAttrs();
let defaultAttrs = computed(() => {
  return Object.assign({}, defaultEchartAttribute, pieAttribute);
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
  await setPieData(options, resResultItem, resultAttrs);
  renderOptions.value = options;
  renderModel.value = resultAttrs.darkModel ? "dark" : "light";
  renderRef.value.initRenderChart();
}
// 设置面积图的各个值
async function setPieData(options, resResultItem, resultAttrs) {
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
  let pieRadius = resultAttrs.pieRadius ? resultAttrs.pieRadius : "70";
  let centerLeft = resultAttrs.centerLeft ? resultAttrs.centerLeft : "50";
  let centerTop = resultAttrs.centerTop ? resultAttrs.centerTop : "50";
  options.series = [];
  if (resultItem.length === 0) {
    return;
  }
  // 设置统计和整体饼图的数据
  let pieDataTotal = 0;
  let resultPieData = {
    type: "pie",
    radius: `${pieRadius}%`,
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
  resultItem.forEach((pie, index) => {
    let pieColor = "";
    // 判断当前角标是否超出颜色数组长度
    if (index < colorList.length) {
      pieColor = colorList[index];
    }
    pieDataTotal += parseFloat(pie.value);
    resultPieData.data.push({
      name: pie.name,
      value: pie.value,
      itemStyle: { color: pieColor }
    });
  });
  options.series.push(resultPieData);
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
            text: pieDataTotal,
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
