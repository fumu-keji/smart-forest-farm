<template>
  <div class="web-toolbar-panel" :style="toolbarStyle">
    <template v-for="(item, index) in toolbarItem">
      <el-dropdown
        trigger="click"
        size="small"
        v-if="setButtonVisable(item.type)"
        :key="index"
        :disabled="item.type !== 'draw'"
        @command="drawClick"
      >
        <div class="bar-item" @click="handleOnClick(item.type)">
          <div class="tool-icon" :class="item.icon"></div>
          <div class="tool-name">{{ setButtonText(item) }}</div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="Point">
              <i class="fmy-mapDropPoint" />
              点
            </el-dropdown-item>
            <el-dropdown-item command="LineString">
              <i class="fmy-mapDropLine" />
              线
            </el-dropdown-item>
            <el-dropdown-item command="Polygon">
              <i class="fmy-mapDropPlane" />
              面
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <el-button
      v-if="measureData.drawing"
      class="draw-end-button"
      size="small"
      type="primary"
      @click="drawEndClick"
    >
      结束绘制
    </el-button>
    <!-- 定位弹窗 -->
    <transition name="el-zoom-in-top">
      <div v-show="positionData.showDialog" class="position-input">
        <el-row>
          <el-col :span="14">
            <el-input
              size="small"
              placeholder="请输入经纬度"
              v-model="positionData.queryValue"
              @keyup.enter="movePosition"
            />
          </el-col>
          <el-col :span="5">
            <el-button size="small" @click="movePosition">查询</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="small" @click="closePositionDialog"
              >关闭
            </el-button>
          </el-col>
        </el-row>
      </div>
    </transition>
  </div>
</template>
<script setup>
// 引入openlayers相关
import Overlay from "ol/Overlay";
import { Draw } from "ol/interaction";
// 矢量图层和矢量源对象
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
// 样式对象
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
// 工具方法类
import { TOOLBAR_OPTION_ITEM } from "@/config/pageDesign/mapConfig";
import { isEmpty } from "@/utils/functionUtil";
import Measure from "../common/measure";
import { computed, ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  toolBarAttr: {
    type: Object,
    require: true
  },
  mapData: {
    type: Object,
    require: true
  },
  projection: {
    type: String,
    require: true
  }
});
const emit = defineEmits(["toolBarDrawEnd"]);

const toolbarItem = computed(() => TOOLBAR_OPTION_ITEM);
//判断清除按钮是否显示
const hasClearAllButton = computed(() => {
  const toolBarAttr = props.toolBarAttr;
  return toolBarAttr.area || toolBarAttr.length || toolBarAttr.draw;
});
//当前工具栏的偏移量
const toolbarStyle = computed(() => {
  const right = props.toolBarAttr.right;
  const top = props.toolBarAttr.top;
  return { right: right ? `${right}%` : "", top: top ? `${top}%` : "" };
});

let functionObj = {
  positionClick,
  fullscreenClick,
  lengthClick,
  areaClick,
  drawClick,
  clearClick
};
// 按钮点击事件
function handleOnClick(type) {
  functionObj[`${type}Click`]();
}
/** 
 * 定位相关方法
*/
// 定位相关数据
const positionData = ref({
  // 定位弹窗显示隐藏标识
  showDialog: false,
  // 定位弹窗输入框值
  queryValue: ""
});
// 点击定位按钮
function positionClick() {
  positionData.value.showDialog = !positionData.value.showDialog;
}
// 定位到输入的坐标点
function movePosition() {
  const queryValue = positionData.value.queryValue;
  // 将字符串类型的坐标转成Corrdinate（数组）类型
  const transValue = queryValue.replace("，", ",").replaceAll(" ", "");
  let lnglatArr = transValue.split(",");
  if (lnglatArr.length < 2) {
    proxy.$message.warning("请输入正确的查询坐标");
    return;
  }
  let lnglat = [parseFloat(lnglatArr[0]), parseFloat(lnglatArr[1])];
  // 在地图上标识一个标识
  if (props.mapData.getOverlayById("queryPositionMark") == null) {
    // 如果是第一次生成overlay
    let overlay = new Overlay({
      id: "queryPositionMark",
      element: document.getElementById("queryPositionMark"),
      autoPan: true,
      position: lnglat,
      positioning: "center-center"
    });
    props.mapData.addOverlay(overlay);
  } else {
    // 如果这个overlay已经存在
    props.mapData.getOverlayById("queryPositionMark").setPosition(lnglat);
  }
  // 最后将镜头定位过去
  props.mapData.getView().setCenter(lnglat);
}
// 关闭定位输入框
function closePositionDialog() {
  positionData.value.showDialog = false;
  positionData.value.queryValue = "";
  let overlay = props.mapData.getOverlayById("queryPositionMark");
  if (overlay != null) {
    // 此处不用removeOverlay，此方法会直接删除dom，无法在此生成
    overlay.setPosition(undefined);
  }
}
/** 
 * 全屏相关方法
*/
// 全屏
function fullscreenClick() {
  let el = document.querySelector(".online-map");
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}
/**
 * 测距相关
 */
//测量相关
const measureData = ref({
  measureLine: {},
  measureArea: {},
  drawing: false,
  measureType: ""
});
// 测量线长
function lengthClick() {
  beforeDraw();
  measureData.value.measureType = "line";
  measureData.value.measureLine = Measure.measure(props.mapData, "measure", "LineString");
}
// 测量面积
function areaClick() {
  beforeDraw();
  measureData.value.measureType = "area";
  measureData.value.measureArea = Measure.measure(props.mapData, "measure", "area");
}
// 关闭测量
function closeMeasure() {
  if (isEmpty(measureData.value.measureType)) {
    return;
  }
  if (measureData.value.measureType === "area") {
    measureData.value.measureArea.removeDrawEvent();
  } else if (measureData.value.measureType === "line") {
    measureData.value.measureLine.removeDrawEvent();
  }
}
// 清除标绘图层
function clearMapPlottingLayer() {
  let num = drawGeoJson.value.features === null;
  num = num || drawGeoJson.value.features.length === 0;
  num = num ? 1 : drawGeoJson.value.features.length + 1;
  for (let i = 0; i < num; i++) {
    //先清空地图上的图层
    props.mapData.getLayers().getArray().forEach(layer => {
      if (layer.name === "mapPlottingLayer") {
        props.mapData.removeLayer(layer);
      }
    });
  }
  drawGeoJson.value.features = [];
}
// 打开画图前的准备
function beforeDraw() {
  measureData.value.drawing = false;
  // 移除范围绘制
  let drawExtent = props.mapData.getInteractions().getArray().find(interaction => {
    return interaction instanceof Draw;
  });
  props.mapData.removeInteraction(drawExtent);
}
/**
 * 标绘相关
 */
//标绘初始化
function drawClick(command) {
  if (!command) {
    return;
  }
  beforeDraw();
  draw(command);
}
//绘制、测量等工具的图层
const drawGeoJson = ref({
  features: [],
  crs: {
    type: "name",
    properties: { name: props.projection }
  },
  type: "FeatureCollection"
});
//标绘画笔样式
const drawVar = ref(null);
function draw(command) {
  measureData.value.drawing = true;
  // 定义绘制vector图层
  let source = new VectorSource();
  let vector = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0, 0.2)"
      }),
      stroke: new Stroke({
        color: "rgba(255, 0, 0, 1)",
        width: 2
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: "rgba(255, 0, 0, 1)"
        })
      })
    }),
    zIndex: 99
  });
  // 添加绘制图层
  vector.name = "mapPlottingLayer";
  props.mapData.addLayer(vector);
  // 设置绘制的draw
  drawVar.value = new Draw({
    source: source,
    type: command
  });
  props.mapData.addInteraction(drawVar.value);
  drawVar.value.on("drawend", evt => {
    let featureGeoJson = JSON.parse(
      new GeoJSON().writeFeature(evt.feature)
    );
    featureGeoJson.geometry.type = command;
    featureGeoJson.properties = {};
    drawGeoJson.value.features.push(featureGeoJson);
  });
}
/**
 * 清除相关
 */
// 清除所有覆盖物
function clearClick() {
  //先清空地图上的图层
  props.mapData.getLayers().getArray().forEach(layer => {
    if (layer.name === "measureLayer") {
      layer.getSource().getFeatures().forEach(feature => {
        layer.getSource().removeFeature(feature);
      });
      if (isEmpty(measureData.value.measureType)) {
        return;
      }
      if (measureData.value.measureType === "area") {
        measureData.value.measureArea.removeOverlayEvent();
      } else if (measureData.value.measureType === "line") {
        measureData.value.measureLine.removeOverlayEvent();
      }
    }
  });
  // 清除所有覆盖物
  props.mapData.getOverlays().forEach(overlay => {
    props.mapData.removeOverlay(overlay);
  });
  // 关闭测量相关
  closeMeasure();
  clearMapPlottingLayer();
  beforeDraw();
}
/** 
 * 结束绘制相关
*/
function drawEndClick() {
  closeMeasure();
  beforeDraw();
  emit("toolBarDrawEnd", drawGeoJson.value);
}
// 设置toolbar按钮是否显示
function setButtonVisable(type) {
  if (type === "clear") {
    return hasClearAllButton.value;
  } else {
    return props.toolBarAttr[type];
  }
}
// 设置toolbar按钮文案
function setButtonText(item) {
  return item.name;
}
defineExpose({
  clearClick,
  measureData
});
</script>

<style lang="less" scoped>
.web-toolbar-panel {
  position: absolute;
  z-index: 1000;
  height: 40px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  :deep(.el-dropdown:nth-child(6)) {
    .bar-item {
      border: none;
    }
  }
  .bar-item {
    display: flex;
    align-items: center;
    width: max-content;
    height: 20px;
    padding: 0 10px;
    color: #666666;
    font-size: 12px;
    border-right: 1px dashed #c6c9d0;
    background-color: #ffffff;
    cursor: pointer;
    .tool-icon {
      font-size: 16px;
    }
  }
  .bar-item:hover > div {
    color: #4497f7;
  }
  .tool-icon {
    margin-right: 5px;
  }
  .draw-end-button {
    position: absolute;
    right: 0px;
    top: 45px;
  }
}
/* 定位输入框 */
.position-input {
  position: sticky;
  width: 270px;
}
</style>