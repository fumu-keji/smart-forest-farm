// 引入画图的对象
import Draw, { createBox, createRegularPolygon } from "ol/interaction/Draw";
import { unByKey } from "ol/Observable.js";
import Overlay from "ol/Overlay";
import { getArea, getLength } from "ol/sphere.js";
import { LineString, Polygon } from "ol/geom.js";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import GeoJSON from "ol/format/GeoJSON";
export default {
  measure(map, operateType, measureType) {
    const baseSrs = map.getView().getProjection().getCode();
    // 创建一个当前要绘制的对象
    let sketch;
    // 创建一个帮助提示框对象
    let helpTooltipElement;
    // 创建一个帮助提示信息对象
    let helpTooltip;
    // 创建一个测量提示框对象
    let measureTooltipElement;
    // 创建一个测量提示信息对象
    let measureTooltip;
    // 继续绘制多边形的提示信息
    let continuePolygonMsg = "单击以继续绘制多边形";
    // 继续绘制线段的提示信息
    let continueLineMsg = "单击以继续绘制直线";
    let helpMsg = "";
    let featureGeoJson;
    //鼠标移动触发的函数
    let pointerMoveHandler = evt => {
      // 如果是平移地图则直接结束
      if (evt.dragging) {
        return;
      }
      //帮助提示信息
      helpMsg = "请点击开始绘制";
      if (sketch) {
        // 获取绘图对象的几何要素
        let geom = sketch.getGeometry();
        // 如果当前绘制的几何要素是多线段，则将绘制提示信息设置为多线段绘制提示信息
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }
      // 设置帮助提示要素的内标签为帮助提示信息
      helpTooltipElement.innerHTML = helpMsg;
      // 设置帮助提示信息的位置
      helpTooltip.setPosition(evt.coordinate);
      // 移除帮助提示要素的隐藏样式
      helpTooltipElement.classList.remove("hidden");
    };
    // 触发pointermove事件
    map.on("pointermove", pointerMoveHandler);
    // 当鼠标移除地图视图的时为帮助提示要素添加隐藏样式
    map.getViewport().addEventListener("mouseout", () => {
      helpTooltipElement.classList.add("hidden");
    });
    // 格式化测试线的单位
    let formatLength = line => {
      let length = getLength(line, { projection: baseSrs });
      let output;
      if (length > 100) {
        output = (Math.round((length / 1000) * 100) / 100) + " " + "km";
      } else {
        output = (Math.round(length * 100) / 100) + " " + "m";
      }
      return output;
    };
    // 格式化测面积的单位
    let formatArea = polygon => {
      let area = getArea(polygon, { projection: baseSrs });
      let output;
      if (area > 10000) {
        output = (Math.round((area / 1000000) * 100) / 100) + " " + "km<sup>2</sup>";
      } else {
        output = (Math.round(area * 100) / 100) + " " + "m<sup>2</sup>";
      }
      return output;
    };
    // 定义一个交互式绘图对象
    let source;
    let type, draw;
    let listener;
    // 获取画图的图层
    map.getLayers().forEach(layer => {
      if (layer.name === "measureLayer") {
        source = layer.getSource();
      }
    });
    //添加交互式绘图对象的函数
    function addInteraction() {
      // 获取当前选择的绘制类型
      if (operateType === "measure") {
        type = measureType == "area" ? "Polygon" : "LineString";
        draw = new Draw({
          source: source,
          type: type,
          style: new Style({
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new Stroke({
              color: "rgba(255, 0, 0, 0.7)",
              width: 2,
            }),
            image: new CircleStyle({
              radius: 5,
              stroke: new Stroke({
                color: "rgba(0, 0, 0, 0.7)",
              }),
              fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)",
              }),
            }),
          }),
        });
      } else {
        let geometryFunction;
        type = "Circle";
        if (measureType === "square") {
          geometryFunction = createRegularPolygon(4);
        } else if (measureType === "circle") {
          geometryFunction = createBox();
        } else {
          geometryFunction = createRegularPolygon(5);
        }
        draw = new Draw({
          source: source,
          type: type,
          style: new Style({
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new Stroke({
              color: "rgba(255, 0, 0, 0.7)",
              lineDash: [10, 10],
              width: 2,
            }),
            image: new CircleStyle({
              radius: 5,
              stroke: new Stroke({
                color: "rgba(0, 0, 0, 0.7)",
              }),
              fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)",
              }),
            }),
          }),
          geometryFunction: geometryFunction,
        });
      }
      //将交互绘图对象添加到地图中
      map.addInteraction(draw);
      //创建测量提示框
      createMeasureTooltip();
      //创建帮助提示框
      createHelpTooltip();
      draw.on("drawstart", evt => {
        // set sketch
        sketch = evt.feature;
        //提示框的坐标
        let tooltipCoord = evt.coordinate;
        //监听几何要素的change事件
        listener = sketch.getGeometry().on("change", evt => {
          //获取绘制的几何对象
          let geom = evt.target;
          //定义一个输出对象，用于记录面积和长度
          let output;
          if (geom instanceof Polygon) {
            //输出多边形的面积
            output = formatArea(geom);
            //获取多变形内部点的坐标
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            //输出多线段的长度
            output = formatLength(geom);
            //获取多线段的最后一个点的坐标
            tooltipCoord = geom.getLastCoordinate();
          }
          //设置测量提示框的内标签为最终输出结果
          measureTooltipElement.innerHTML = output;
          //设置测量提示信息的位置坐标
          measureTooltip.setPosition(tooltipCoord);
        });
      });
      draw.on("drawend", () => {
        //设置测量提示框的样式
        measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
        measureTooltip.setOffset([0, -7]);
        if (operateType === "select") {
          measureTooltipElement.className = "hidden";
        }
        //清空绘制要素
        sketch = null;
        //清空测量提示要素
        measureTooltipElement = null;
        //创建测量提示框
        createMeasureTooltip();
        //移除事件监听
        unByKey(listener);
        // 绘制只绘制一次
        map.un("pointermove", pointerMoveHandler);
        map.removeInteraction(draw);
        helpTooltipElement.classList.add("hidden");
      });
    }
    function createHelpTooltip() {
      //如果已经存在帮助提示框则移除
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      //创建帮助提示要素的div
      helpTooltipElement = document.createElement("div");
      //设置帮助提示要素的样式
      helpTooltipElement.className = "ol-tooltip hidden";
      //创建一个帮助提示的覆盖标注
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left",
      });
      //将帮助提示的覆盖标注添加到地图中
      map.addOverlay(helpTooltip);
    }
    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      // 创建测量提示框的div
      measureTooltipElement = document.createElement("div");
      // 设置测量提示要素的样式
      measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      // 创建一个测量提示的覆盖标注
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
      });
      //将测量提示的覆盖标注添加到地图中
      map.addOverlay(measureTooltip);
    }
    // 绘制结束抛出对象
    function drawEndFunction() {
      draw.on("drawend", evt => {
        let geoJson = JSON.parse(
          new GeoJSON().writeFeature(evt.feature)
        );
        geoJson.geometry.type = measureType == "area" ? "Polygon" : "LineString";
        geoJson.properties = {};
        featureGeoJson = geoJson;
      });
      return featureGeoJson;
    }
    // 量测调用
    addInteraction();
    drawEndFunction();
    function removeOverlay() {
      map.removeOverlay(measureTooltip);
      map.removeOverlay(helpTooltip);
      // 转换nodelist为数组
      let toolsTipsArray = Array.prototype.slice.call(
        document.querySelectorAll(".ol-tooltip-static")
      );
      toolsTipsArray.forEach(dom => {
        dom.innerHTML = "";
      });
    }
    function removeDraw() {
      //清空绘制要素
      sketch = null;
      unByKey(listener);
      map.un("pointermove", pointerMoveHandler);
      map.removeInteraction(draw);
    }
    let eventObject = {
      removeDrawEvent: removeDraw,
      removeOverlayEvent: removeOverlay,
      drawEndFunctionEvent: drawEndFunction,
    };
    return eventObject;
  },
};
