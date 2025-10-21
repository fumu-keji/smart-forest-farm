import { Map, View } from "ol";
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import VectorSorce from "ol/source/Vector";
import TileGrid from "ol/tilegrid/TileGrid";
import WMTS from "ol/source/WMTS";
import MVT from "ol/format/MVT";
import { TileWMS, ImageStatic } from "ol/source";
import ImageLayer from "ol/layer/Image";
import { get as getProj } from "ol/proj.js";
import { getWidth, getTopLeft } from "ol/extent";
// 控制器对象
import { defaults as defaultControls } from "ol/control";
import VectorSource from "ol/source/Vector";
import GeoJSONFormat from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { Stroke, Style, Fill, Text, Icon } from "ol/style.js";
import { getArea, getLength } from "ol/sphere.js";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { transform } from "ol/proj";
//vue相关
import { app } from "@/main";
import { ref } from "vue";
//函数
import { getQueryVariable, isEmpty } from "@/utils/functionUtil";

export function mapEventArrangeHooks() {
  const AppInstance = app.config.globalProperties;
  // 二维地图的实例
  const mapData = ref(null);
  const projectionCode = ref("");
  // 初始化地图
  const initMap = (target, zoom, center, projection, minZoom, maxZoom, resultControl) => {
    projectionCode.value = projection;
    // 初始化地图
    mapData.value = new Map({
      target,
      view: new View({
        zoom,
        center,
        projection,
        minZoom: minZoom || 2,
        maxZoom: maxZoom || 24
      }),
      // 设置控制器
      controls: defaultControls({
        attributionmapAttribute: {
          collapsible: false,
          zoomWheelEnabled: false
        },
        zoom: false
        // 扩展设置好的比例尺和鼠标控制器  
      }).extend([
        resultControl.mousePositionControl,
        resultControl.scaleLine
      ])
    });
  };
  /**
   * 通用方法（非事件编排的动作方法）
   */
  // 添加静态图片
  const addStaticImgLayer = (imgUrl, layerName) => {
    if (!imgUrl) { return; }
    let url = AppInstance.$setAssetType(imgUrl);
    let center = transform([0, 0], "EPSG:4490", "EPSG:3857");
    let img = new Image();
    img.src = url;
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      let picEXtent = [center[0] - ((width * 1000) / 2), center[1] - ((height * 1000) / 2), center[0] + ((width * 1000) / 2), center[1] + ((height * 1000) / 2)];
      mapData.value.getView().fit(picEXtent);
      let imageLayer = new ImageLayer({
        source: new ImageStatic({
          url,
          imageExtent: picEXtent
        })
      });
      imageLayer.name = layerName;
      mapData.value.addLayer(imageLayer);
    };
  };
  // 自适应图层位置
  const fitLayerPosition = bboxArray => {
    if (!bboxArray) {
      AppInstance.$message.error("图层没有边界，请手动设置中心点和缩放层级");
      return;
    }
    const view = mapData.value.getView();
    view.fit(bboxArray, mapData.value.getSize());
  };
  // 根据经纬度设置坐标中心点并缩放
  const setMapcenterAndZoom = (coordinate, zoom) => {
    const lnglatArr = coordinate.split(",");
    const view = mapData.value.getView();
    view.setCenter([parseFloat(lnglatArr[0]), parseFloat(lnglatArr[1])]);
    view.setZoom(view.getZoom() + zoom);
  };
  // 创建矢量图层
  const createPointVectorLayer = (layerName, zIndex) => {
    const source = new VectorSorce({ wrapX: false });
    const vectorLayer = new VectorLayer({
      source,
      zIndex: zIndex || 10
    });
    vectorLayer.name = layerName;
    vectorLayer.tag = "addPointLayer";
    mapData.value.addLayer(vectorLayer);
    return vectorLayer;
  };
  // 加载wms图层
  const addWmsLayer = (layerName, layerUrl) => {
    let addlayer = new TileLayer({
      // 注意这里用的是TileWMS类而不是ImageWMS类
      source: new TileWMS({
        url: layerUrl, // WMS服务的URL.
        // WMS请求参数
        params: {
          LAYERS: layerName // 请求的图层名
        },
        serverType: "geoserver" // 服务器类型
      })
    });
    addlayer.name = layerName;
    addlayer.tag = "addLayer";
    const getBboxArray = getQueryVariable(layerUrl, "bbox");
    if (getBboxArray) {
      addlayer.bboxArray = getBboxArray.split(",");
    }
    mapData.value.addLayer(addlayer);
  };
  // 加载wmts图层
  const addWmtsLayer = (layerName, layerUrl) => {
    let projection = getProj(projectionCode.value);
    let projectionExtent = projection.getExtent(); // web墨卡托投影坐标系的四至
    let width = getWidth(projectionExtent); //web墨卡托投影坐标系的水平宽度，单位：米
    let origin = getTopLeft(projectionExtent); //坐标系起点
    // 计算瓦片分辨率数组，每片分辨率256
    let resolutions = [];
    let matrixIds = [];
    for (let z = 0; z < 22; ++z) {
      resolutions[z] = width / (256 * Math.pow(2, z + 1));
      matrixIds[z] = projectionCode.value + ":" + z;
    }
    let tileGrid = new WMTSTileGrid({
      origin: origin,
      tileSize: [256, 256],
      resolutions: resolutions,
      matrixIds: matrixIds
    });
    //通过WMTS加载
    let addlayer = new TileLayer({
      opacity: 0.7, //图层透明度
      source: new WMTS({
        url: layerUrl, //WMTS服务基地址
        matrixSet: projectionCode.value, //投影坐标系设置矩阵
        format: "image/png", //图片格式
        projection: projection, //数据的投影坐标系
        //瓦片网格对象
        tileGrid: tileGrid,
        wrapX: true
      })
    });
    addlayer.name = layerName;
    addlayer.tag = "addLayer";
    const getBboxArray = getQueryVariable(layerUrl, "bbox");
    if (getBboxArray) {
      addlayer.bboxArray = getBboxArray.split(",");
    }
    mapData.value.addLayer(addlayer);
  };
  // 加载矢量切片图层
  const addVertorLayer = (layerName, layerUrl) => {
    let projection = getProj(projectionCode.value);
    let projectionExtent = projection.getExtent(); // web墨卡托投影坐标系的四至
    let width = getWidth(projectionExtent); //web墨卡托投影坐标系的水平宽度，单位：米
    let origin = getTopLeft(projectionExtent); //坐标系起点
    // 计算瓦片分辨率数组，每片分辨率256
    let resolutions = [];
    for (let z = 0; z < 22; ++z) {
      resolutions[z] = width / (256 * Math.pow(2, z + 1));
    }
    let addlayer = new VectorTileLayer({
      declutter: true,
      source: new VectorTileSource({
        tileGrid: new TileGrid({
          origin: origin,
          resolutions: resolutions,
          tileSize: [256, 256]
        }),
        projection: projection,
        format: new MVT(),
        url: layerUrl
      })
    });
    addlayer.name = layerName;
    addlayer.tag = "addLayer";
    const getBboxArray = getQueryVariable(layerUrl, "bbox");
    if (getBboxArray) {
      addlayer.bboxArray = getBboxArray.split(",");
    }
    mapData.value.addLayer(addlayer);
  };
  // 加载featureCollection集合图层
  const addFeatureCollection = (features, layerName) => {
    const style = new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0, 0.2)"
      }),
      stroke: new Stroke({
        color: "rgba(255, 0, 0, 0.7)",
        width: 2
      })
    });
    const addSource = new VectorSource({
      features: new GeoJSONFormat().readFeatures(features)
    });
    let addLayer = new VectorLayer({ source: addSource, style });
    addLayer.name = layerName;
    addLayer.tag = "addLayer";
    mapData.value.addLayer(addLayer);
  };
  // 根据图层名称获取图层
  const getLayerByLayerName = layerName => {
    const layerArr = mapData.value.getLayers().getArray();
    return layerArr.find(layer => layer.name === layerName);
  };
  // 获取GeoJson的面积
  const getGeoJsonArea = (parameter, calcType, precision) => {
    let area = 0;
    let featuresArea;
    // 获取单个Feature面积
    if (parameter.type === "Feature") {
      const geometry = new GeoJSONFormat().readFeature(parameter).getGeometry();
      area = getArea(geometry, { projection: projectionCode.value });
    } else if (parameter.type === "FeatureCollection") {
      area = 0;
      // 获取FeatureCollection内的所有feature合集面积
      parameter.features.forEach(feature => {
        const geometry = new GeoJSONFormat().readFeature(feature).getGeometry();
        area += getArea(geometry, { projection: projectionCode.value });
      });
    }
    if (calcType === "km²") {
      featuresArea = (((area / 1000000) * 100) / 100).toFixed(parseInt(precision));
    } else {
      featuresArea = ((area * 100) / 100).toFixed(parseInt(precision));
    }
    return parseFloat(featuresArea);
  };
  // 获取GeoJson的长度
  const getGeoJsonLength = (parameter, calcType, precision) => {
    let length = 0;
    let featuresLength;
    // 获取单个Feature面积
    if (parameter.type === "Feature") {
      const geometry = new GeoJSONFormat().readFeature(parameter).getGeometry();
      length = getLength(geometry, { projection: projectionCode.value });
    } else if (parameter.type === "FeatureCollection") {
      length = 0;
      // 获取FeatureCollection内的所有feature合集面积
      parameter.features.forEach(feature => {
        const geometry = new GeoJSONFormat().readFeature(feature).getGeometry();
        length += getLength(geometry, { projection: projectionCode.value });
      });
    }
    if (calcType === "km") {
      featuresLength = (((length / 1000) * 100) / 100).toFixed(parseInt(precision));
    } else {
      featuresLength = ((length * 100) / 100).toFixed(parseInt(precision));
    }
    return parseFloat(featuresLength);
  };
  // 高亮一个图层
  const highLightLayerByLayerName = layerName => {
    const highlightStyle = new Style({
      stroke: new Stroke({
        color: "rgba(255, 255, 0, 1",
        width: 2
      }),
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.5)"
      }),
    });
    const source = getLayerByLayerName(layerName).getSource();
    source.getFeatures().forEach(feature => {
      feature.setStyle(highlightStyle);
    });
    fitLayerPosition(getLayerByLayerName(layerName).getSource().getExtent());
  };
  /**
   * 事件编排的动作方法
   */
  // 设置地图中心点
  const set2DMapCenter = lnglatString => {
    const transValue = lnglatString.replace("，", ",").replaceAll(" ", "");
    let lnglatArr = transValue.split(",");
    if (lnglatArr.length < 2) {
      AppInstance.$message.warning("请输入正确的查询坐标！");
      return;
    }
    let lnglat = [parseFloat(lnglatArr[0]), parseFloat(lnglatArr[1])];
    const view = mapData.value.getView();
    view && view.setCenter(lnglat);
  };
  // 设置地图缩放等级
  const set2DMapZoom = zoom => {
    const view = mapData.value.getView();
    view.setZoom(zoom);
  };
  // 聚焦图层
  const focus2DMapLayer = layerName => {
    const foucsLayer = getLayerByLayerName(layerName);
    if (!foucsLayer) {
      AppInstance.$message.error("图层获取失败，请检查图层名称是否正确");
      return;
    }
    if (foucsLayer.bboxArray) {
      fitLayerPosition(foucsLayer.bboxArray);
      return;
    }
    if (foucsLayer.getSource().getExtent()) {
      fitLayerPosition(foucsLayer.getSource().getExtent());
      return;
    }
    AppInstance.$message.error("获取不到图层的边界，请手动设置中心点和缩放层级");
  };
  // 聚焦要素
  const focus2DMapFeature = layerName => {
    // 获取到featureCollection的集合
    const markPointlayer = getLayerByLayerName(layerName);
    const source = markPointlayer.getSource();
    const featureCollection = source.getFeatures();
    // 生成一个随机的index并居中这个feature
    const randomIndex = Math.floor(Math.random() * featureCollection.length);
    const featureToFocus = featureCollection[randomIndex];
    // 判断随机的feature是什么类型
    const featureType = featureToFocus.getGeometry().getType();
    if (featureType === "Point") {
      const coordinate = featureToFocus.getGeometry().getCoordinates();
      set2DMapCenter(coordinate.join(","));
    } else {
      const featureExtent = featureToFocus.getGeometry().getExtent();
      fitLayerPosition(featureExtent);
    }
  };
  const filterFnc = {
    "WMS": addWmsLayer,
    "WMTS": addWmtsLayer,
    "VERTOR": addVertorLayer,
  };
  // 添加一个图层
  const add2DMapLayer = (layerType, serviceType, layerName, layerUrl) => {
    try {
      if (layerType === "service") {
        filterFnc[serviceType](layerName, layerUrl);
      }
      if (layerType === "geojson") {
        let featureCollection = {
          features: [],
          crs: {
            type: "name",
            properties: { name: projectionCode.value }
          },
          type: "FeatureCollection"
        };
        const layerObj = JSON.parse(layerUrl);
        if (layerObj.type === "Feature") {
          featureCollection.features.push(layerObj);
          addFeatureCollection(featureCollection, layerName);
        }
        if (layerObj.type === "FeatureCollection") {
          featureCollection = layerObj;
          addFeatureCollection(featureCollection, layerName);
        }
      }
    } catch (err) {
      AppInstance.$message.error(`${err}配置错误，请联系管理员处理`);
    }
  };
  // 通过图层名称删除一个图层
  const delete2DMapLayer = layerName => {
    mapData.value.removeLayer(getLayerByLayerName(layerName));
  };
  // 清除所有手动添加的图层
  const clear2DMapLayer = () => {
    let layers = mapData.value.getLayers().getArray();
    for (let i = layers.length - 1; i >= 0; i--) {
      let layer = layers[i];
      if (layer && layer["tag"] === "addLayer") {
        mapData.value.removeLayer(layer);
      }
    }
  };
  // 添加overlay
  const add2DMapOverlay = (markId, markUrl, markWidth, markHeight, lnglat) => {
    const mapDiv = document.querySelector(".online-map");
    // 新生成一个overlay的div
    let overLayElement = document.createElement("div");
    overLayElement.id = markId;
    mapDiv.appendChild(overLayElement);
    // 创建一个div并设置样式和图标名
    let problemPointDiv = document.createElement("img");
    problemPointDiv.src = AppInstance.$setAssetType(markUrl);
    problemPointDiv.style.width = `${markWidth}px`;
    problemPointDiv.style.height = `${markHeight}px`;
    overLayElement.appendChild(problemPointDiv);
    // 设置添加的overlay
    let overlay = new Overlay({
      id: markId,
      element: overLayElement,
      autoPan: true,
      position: lnglat.split(","),
      positioning: "center-center"
    });
    overlay.tag = "addOverlay";
    mapData.value.addOverlay(overlay);
  };
  // 删除overlay
  const delete2DMapOverlay = markId => {
    const overlays = mapData.value.getOverlays().getArray();
    for (let i = overlays.length - 1; i >= 0; i--) {
      const overlay = overlays[i];
      if (overlay.id === markId) {
        mapData.value.removeOverlay(overlay);
      }
    }
  };
  // 清除所有的overlay
  const clear2DMapOverlay = () => {
    const overlays = mapData.value.getOverlays().getArray();
    for (let i = overlays.length - 1; i >= 0; i--) {
      const overlay = overlays[i];
      if (overlay.tag === "addOverlay") {
        mapData.value.removeOverlay(overlay);
      }
    }
  };
  // 添加文字标注点图层
  const add2DMapMarkPoint = (layerName, pointData, textStyle) => {
    const { textColor, textFontSize, textFill } = textStyle;
    try {
      let markPointlayer = getLayerByLayerName(layerName);
      if (markPointlayer) {
        markPointlayer.getSource().clear();
      } else {
        markPointlayer = createPointVectorLayer(layerName, 9999);
      }
      pointData.forEach(point => {
        let style = new Style({});
        style.setText(new Text({
          text: point.textName,
          font: (textFontSize || 12) + "px sans-serif",
          textAlign: "center",
          textBaseline: "middle",
          offsetX: point.textOffsetX || 0,
          offsetY: point.textOffsetY || -40,
          fill: new Fill({
            color: textColor || "#000"
          }),
          backgroundFill: new Fill({ color: textFill || "transprent" }),
          stroke: new Stroke({
            color: "#fff",
            width: 1
          }),
          padding: [5, 5, 5, 5]
        }));
        style.setImage(new Icon({
          src: point.imageUrl || "",
          scale: point.imageScale || 0.8
        }));
        let feature = new Feature({
          geometry: new Point(point.coordinate.split(","))
        });
        Object.keys(point).forEach(key => {
          feature.set(key, point[key]);
        });
        feature.setStyle(style);
        markPointlayer.getSource().addFeature(feature);
      });
      if (!getLayerByLayerName(layerName)) {
        mapData.value.addLayer(markPointlayer);
      }
    } catch (err) {
      AppInstance.$message.error(`${err}配置错误，请联系管理员处理`);
    }
  };
  // 删除标注图层
  const delete2DMapMarkPoint = layerName => {
    mapData.value.removeLayer(getLayerByLayerName(layerName));
  };
  // 计算要素面积
  const calculate2DMapFeaturesArea = (parameter, calcType, precision) => {
    if (isEmpty(parameter)) {
      return 0;
    }
    try {
      parameter = JSON.parse(parameter);
    } catch {
      return 0;
    }
    // 判断传入的类型
    const paramType = Object.prototype.toString.apply(parameter);
    // 传入对象判断是否为Feature或者FeatureCollection
    if (paramType === "[object Object]") {
      if (Object.keys(parameter).length) {
        return getGeoJsonArea(parameter, calcType, precision);
      } else {
        return 0;
      }
    } else if (paramType === "[object Array]") {
      let resultArea = 0;
      // 数组长度不为0
      if (parameter.length) {
        // 如果是数组就判断数据中是否有一个对象里有the_geojson
        const flag = parameter.some(item => {
          return item.the_geojson;
        });
        if (flag) {
          parameter.forEach(item => {
            if (item.the_geojson) {
              resultArea += parseFloat(getGeoJsonArea(item.the_geojson, calcType, precision));
            }
          });
        }
      }
      return resultArea;
    } else {
      return 0;
    }
  };
  // 计算要素长度
  const calculate2DMapFeaturesLength = (parameter, calcType, precision) => {
    if (isEmpty(parameter)) {
      return 0;
    }
    try {
      parameter = JSON.parse(parameter);
    } catch {
      return 0;
    }
    // 判断传入的类型
    const paramType = Object.prototype.toString.apply(parameter);
    // 传入对象判断是否为Feature或者FeatureCollection
    if (paramType === "[object Object]") {
      if (Object.keys(parameter).length) {
        return getGeoJsonLength(parameter, calcType, precision);
      } else {
        return 0;
      }
    } else if (paramType === "[object Array]") {
      let resultLength = 0;
      // 数组长度不为0
      if (parameter.length) {
        // 如果是数组就判断数据中是否有一个对象里有the_geojson
        const flag = parameter.some(item => {
          return item.the_geojson;
        });
        if (flag) {
          parameter.forEach(item => {
            if (item.the_geojson) {
              resultLength += parseFloat(getGeoJsonLength(item.the_geojson, calcType, precision));
            }
          });
        }
      }
      return resultLength;
    } else {
      return 0;
    }
  };
  // 叠加分析
  const overlayLayers2DMapAnalysis = (layerName, geojsonData) => {
    add2DMapLayer("geojson", null, layerName, geojsonData);
    highLightLayerByLayerName(layerName);
  };
  return {
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
  };
}
