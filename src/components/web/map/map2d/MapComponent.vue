<template>
  <div class="online-map">
    <!-- 地图容器 -->
    <div class="map-container" :id="getMapId" />
    <!-- 工具栏 -->
    <map-toolbar-control
      ref="mapToolbarControl"
      :toolBarAttr="mapAttribute.toolBarAttr"
      :mapData="mapData"
      @toolBarDrawEnd="handleOnDrawEnd"
    />
    <!-- 切换底图栏 -->
    <map-toggle-control
      ref="mapToggleControl"
      v-show="mapAttribute.mapToggleAttr.show"
      :mapToggleAttr="mapAttribute.mapToggleAttr"
      :baseLayer="baseLayer"
      :mapData="mapData"
      :projection="projection"
    />
    <!-- 坐标缩放等其他工具栏 -->
    <map-other-control
      :mapAttribute="mapAttribute"
      :mapZoom="mapZoom"
      :mapData="mapData"
      @handleOnSetZoom="handleOnCloseMeasure"
    />
    <!-- 各类overlay -->
    <span id="queryPositionMark" class="el-icon-aim" />
  </div>
</template>

<script setup>
// map对象和视图对象
import { createStringXY } from "ol/coordinate";
// 引入注册坐标系方法
import Register from "@/utils/registerProjUtil";
// 矢量图层和矢量源对象
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { ScaleLine } from "ol/control";
import MousePosition from "ol/control/MousePosition";
// 样式对象
import "ol/ol.css";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import GeoJSON from "ol/format/GeoJSON";
//vue相关
import { computed, onMounted, ref, nextTick, getCurrentInstance } from "vue";
import MapToggleControl from "./component/MapToggleControl.vue";
import MapToolbarControl from "./component/MapToolbarControl.vue";
import MapOtherControl from "./component/MapOtherControl.vue";
//函数相关
import { generateShortStr } from "@/utils/functionUtil";
import { mapEventArrangeHooks } from "./common/mapEventArrangeHooks";
const { proxy } = getCurrentInstance();

const props = defineProps({
  baseLayer: {
    type: Object,
    require: true
  },
  mapAttribute: {
    type: Object,
    require: true
  }
});
const emit = defineEmits(["drawEnd", "featureClick", "mounted"]);

// map的zoom等级
const mapZoom = ref(props.mapAttribute.defaultZoom || 3.5);
// 当前map的绘制geoJson集合
const drawGeoJson = ref({});
const mapToggleControl = ref(null);

const getMapId = computed(() => `map-${generateShortStr()}`);
const projection = computed(() => {
  if (!props.mapAttribute.projection) { return "EPSG:4490"; }
  return props.mapAttribute.projection;
});

onMounted(async () => {
  await nextTick();
  initMapData();
});

//获取hooks函数
const {
  mapData,
  initMap,
  addStaticImgLayer,
  fitLayerPosition,
  setMapcenterAndZoom,
  createPointVectorLayer,
  addWmsLayer,
  addWmtsLayer,
  addVertorLayer,
  addFeatureCollection,
  getLayerByLayerName,
  getGeoJsonArea,
  getGeoJsonLength,
  highLightLayerByLayerName,
  set2DMapCenter,
  set2DMapZoom,
  focus2DMapLayer,
  focus2DMapFeature,
  add2DMapLayer,
  delete2DMapLayer,
  clear2DMapLayer,
  add2DMapOverlay,
  delete2DMapOverlay,
  clear2DMapOverlay,
  add2DMapMarkPoint,
  delete2DMapMarkPoint,
  calculate2DMapFeaturesArea,
  calculate2DMapFeaturesLength,
  overlayLayers2DMapAnalysis
} = mapEventArrangeHooks();
async function initMapData() {
  // 注册自定义坐标系
  if (mapData.value == null) {
    Register.registerProjection();
  } else {
    mapData.value.destroy();
    mapData.value = null;
  }
  // 移除所有的绘制geojson
  drawGeoJson.value = {};
  // 控制工具的集合
  const resultControl = setBaseControl();
  // 基本图层的集合
  const resultLayer = setInitMapLayer();
  // 地图中心点
  const defaultValue = props.mapAttribute.defaultCenterPoint;
  const defaultArray = defaultValue && defaultValue.split(",");
  let mapCenter = "";
  if (defaultArray.length <= 1) {
    mapCenter = projection.value === "EPSG:4490" ? [91.076298, 42.500263] : [12192758.010932, 3909689.336326];
  } else {
    mapCenter = [parseFloat(defaultArray[0]), parseFloat(defaultArray[1])];
  }
  initMap(getMapId.value, mapZoom.value, mapCenter, projection.value, props.mapAttribute.minZoom, props.mapAttribute.maxZoom, resultControl);
  // 加入基础的测量图层图层
  mapData.value.addLayer(resultLayer.measureLayer);
  mapData.value.addLayer(resultLayer.highlightLayer);
  await nextTick();
  if (props.mapAttribute.showBaseLayer) {
    mapToggleControl.value.toggleBaseLayer("image");
  } else {
    addStaticImgLayer(props.mapAttribute.staticImgUrl, "staticImgLayer");
  }
  // 设置基础的相关事件
  setInitMapEvent();
  // 设置比列尺的位置
  setScalePosition();
  emit("mounted");
}
// 设置地图基本的控件
function setBaseControl() {
  // 比例尺
  let scaleLine = new ScaleLine({
    units: "metric",
    target: "scalebar",
    className: props.mapAttribute.scaleAttr.show ? "ol-scale-line" : "hidden"
  });
  // 鼠标控制器
  let mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(6),
    projection: projection.value,
    className: props.mapAttribute.zoomAttr.show ? "custom-mouse-position" : "hidden",
    target: document.getElementById("srsbox"),
    undefinedHTML: "0.00,0.00"
  });
  // 返回生成的实例
  return { scaleLine, mousePositionControl };
}
// 设置需要初始化添加的图层
function setInitMapLayer() {
  // 测量线和面积的矢量图层
  let measureLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0, 0.6)"
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
    zIndex: 9
  });
  measureLayer.name = "measureLayer";
  // 要素点击高亮的图层
  let highlightLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      stroke: new Stroke({
        color: "rgba(255, 255, 0, 1",
        width: 2
      }),
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.5)"
      }),
    }),
    zIndex: 999
  });
  highlightLayer.name = "highlightLayer";
  // 返回生成的图层实例
  return { measureLayer, highlightLayer };
}
// 初始地图后的默认监听方法
// map的点击事件
const clickEvent = ref(null);
// map的缩放事件
const scaleEvent = ref(null);
const mapToolbarControl = ref(null);
function setInitMapEvent() {
  // 监听地图放大缩小移动事件
  scaleEvent.value = mapData.value.on("moveend", () => {
    // 获取当前地图的缩放级别
    mapZoom.value = parseInt(mapData.value.getView().getZoom());
  });
  // 监听地图要素点击事件
  clickEvent.value = mapData.value.on("singleclick", e => {
    // 还在标绘的时候点击事件无效
    if (mapToolbarControl.value.measureData.drawing) {
      return;
    }
    // 区分要素点击和非要素点击
    const featureClickFlag = mapData.value.hasFeatureAtPixel(e.pixel);
    // 如果是要素点击
    if (featureClickFlag) {
      getLayerByLayerName("highlightLayer").getSource().clear();
      // 先获取feature和layer
      const featureLayerData = mapData.value.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
        return { feature, layer };
      });
      if (!featureLayerData) {
        return;
      }
      // 如果是测量图层就不高亮
      if (!featureLayerData.layer) {
        return;
      }
      if (featureLayerData.layer.name === "measureLayer") {
        return;
      }
      // 如果点击的是其他要素高亮该要素的图层
      getLayerByLayerName("highlightLayer").getSource().addFeature(featureLayerData.feature);
      // 对外传递点击的GeoJson
      const resultGeoJson = new GeoJSON().writeFeature(featureLayerData.feature);
      emit("featureClick", JSON.parse(resultGeoJson));
    }
    // 如果不是要素点击
    if (!featureClickFlag) {
      // 目前只作高亮手动添加的图层并抛出对应的GeoJson
      const coordinate = mapData.value.getCoordinateFromPixel(e.pixel);
      const viewResolution = (mapData.value.getView().getResolution());
      getLayerByLayerName("highlightLayer").getSource().clear();
      let layerData = [];
      mapData.value.forEachLayerAtPixel(e.pixel, layer => {
        if (layer.tag === "addLayer") {
          layerData.push(layer);
        }
      });
      if (!layerData.length) {
        return;
      }
      const url = layerData[0].getSource().getFeatureInfoUrl(
        coordinate,
        viewResolution,
        projection.value,
        { INFO_FORMAT: "application/json" }
      );
      if (url) {
        fetch(url).then(response => response.text()).then(geoJson => {
          try {
            const feature = new GeoJSON().readFeatures(geoJson);
            getLayerByLayerName("highlightLayer").getSource().addFeatures(feature);
            // 对外传递点击的GeoJson
            emit("featureClick", JSON.parse(geoJson));
          } catch (err) {
            proxy.$message.error(err);
          }
        });
      }
    }
  });
}
// 设置比例尺的偏移量
function setScalePosition() {
  const scale = document.getElementsByClassName("ol-scale-line")[0];
  if (!scale) {
    return;
  }
  const left = props.mapAttribute.scaleAttr.left;
  const bottom = props.mapAttribute.scaleAttr.bottom;
  scale.style.left = left ? `${left}%` : "";
  scale.style.bottom = bottom ? `${bottom}%` : "";
}
// 结束绘制事件
function handleOnDrawEnd(drawGeoJson) {
  let geoJson = JSON.parse(JSON.stringify(drawGeoJson));
  console.log(geoJson);
  drawGeoJson.value = geoJson;
  emit("drawEnd", geoJson);
}
// 清除绘制
function handleOnCloseMeasure() {
  mapToolbarControl.value.clearClick();
}
// 绘制结束
function drawEnd2DMap() {
  return JSON.stringify(drawGeoJson.value);
}

//往外暴露方法
defineExpose({
  mapData,
  fitLayerPosition,
  setMapcenterAndZoom,
  createPointVectorLayer,
  addWmsLayer,
  addWmtsLayer,
  addVertorLayer,
  addFeatureCollection,
  getLayerByLayerName,
  getGeoJsonArea,
  getGeoJsonLength,
  highLightLayerByLayerName,
  set2DMapCenter,
  set2DMapZoom,
  focus2DMapLayer,
  focus2DMapFeature,
  add2DMapLayer,
  delete2DMapLayer,
  clear2DMapLayer,
  add2DMapOverlay,
  delete2DMapOverlay,
  clear2DMapOverlay,
  add2DMapMarkPoint,
  delete2DMapMarkPoint,
  calculate2DMapFeaturesArea,
  calculate2DMapFeaturesLength,
  overlayLayers2DMapAnalysis,
  addStaticImgLayer
});
</script>

<style lang="less">
.online-map {
  position: absolute;
  left: 0px;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  .map-container {
    width: 100%;
    height: 100%;
  }
}
.ol-selectable {
  font-size: 20px;
  color: #ffffff;
}
.ol-scale-line {
  background-color: transparent;
  border-radius: 4px;
  width: 100px;
  padding: 2px;
  position: absolute;
  text-align: left;
  .ol-scale-line-inner {
    display: inline-block;
    width: 100px !important;
    line-height: 1.1;
    overflow: hidden;
    padding: 2px 5px 1px;
    border: 2px solid #777;
    border-top: none;
    color: #333333;
    font-size: 13px;
    white-space: nowrap;
    box-sizing: border-box;
  }
}
#queryPositionMark {
  font-size: 28px;
  color: #f56c6c;
}
.hidden {
  display: none !important;
}
</style>