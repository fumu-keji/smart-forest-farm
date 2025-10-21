// 移动端二维地图工具栏
export const APP_TOOLBAR_OPTION_ITEM = [
  {
    name: "开始绘制",
    type: "draw",
    icon: "fmy-vantMapDraw",
  },
  {
    name: "结束绘制",
    type: "closeDraw",
    icon: "fmy-vantMapEndDraw",
  },
  {
    name: "清除绘制",
    type: "clearDraw",
    icon: "fmy-vantMapClearDraw",
  },
  {
    name: "切换图层",
    type: "changeMapLayer",
    icon: "fmy-vantMapChange",
  },
  {
    name: "我的位置",
    type: "position",
    icon: "fmy-vantMapPosition",
  },
];
// 二维地图工具栏
export const TOOLBAR_OPTION_ITEM = [
  {
    name: "定位",
    type: "position",
    icon: "fmy-mapLocate",
  },
  {
    name: "全屏",
    type: "fullscreen",
    icon: "fmy-mapFullscreen",
  },
  {
    name: "长度测量",
    type: "length",
    icon: "fmy-mapLength",
  },
  {
    name: "面积测量",
    type: "area",
    icon: "fmy-mapArea",
  },
  {
    name: "标绘",
    type: "draw",
    icon: "fmy-mapDraw",
  },
  {
    name: "清除",
    type: "clear",
    icon: "fmy-mapDelete",
  },
];
// 三维地图工具栏
export const THREE_TOOLBAR_OPTION_ITEM = [
  {
    name: "距离量算",
    type: "length",
    icon: "fmy-map3dLength",
  },
  {
    name: "面积量算",
    type: "area",
    icon: "fmy-map3dArea",
  },
  {
    name: "高度量算",
    type: "height",
    icon: "fmy-map3dHeight",
  },
  {
    name: "标绘",
    type: "draw",
    icon: "fmy-mapDraw",
  },
  {
    name: "模型挖空裁剪分析",
    type: "clipModelAnalysis",
    icon: "fmy-map3dProfile",
  },
  {
    name: "剖面分析",
    type: "profileAnalysis",
    icon: "fmy-map3dProfile",
  },
  {
    name: "限高分析",
    type: "heightAnalysis",
    icon: "fmy-map3dHeightLimit",
  },
  {
    name: "淹没分析",
    type: "floodAnalysis",
    icon: "fmy-map3dSubmerge",
  },
  {
    name: "通视分析",
    type: "visualAnalysis",
    icon: "fmy-map3dIntervisib",
  },
  {
    name: "可视域分析",
    type: "fieldAnalysis",
    icon: "fmy-map3dIntervisib",
  },
  {
    name: "清除",
    type: "clear",
    icon: "fmy-mapDelete",
  },
];
// cesium初始化viewer时的公共配置
export const THREE_VIEWER_COMMON_OPTIONS = {
  baseLayerPicker: true,
  sceneModePicker: false,
  geocoder: false,
  homeButton: false,
  navigationHelpButton: false,
  fullscreenButton: false,
  animation: false,
  timeline: false,
  infoBox: false,
  selectionIndicator: false
};
// 三维地图的一些常量配置
export const TDConfig = {
  //数据地址
  DATA_URL: {
    //小区的倾斜摄影模型
    BASE_MODEL:
      "https://www.fumucloud.com/swmx/data-server/3dtiles/building-safe/tileset.json",
  },
  TIAN_MAP_URL: {
    // 矢量底图
    Cvec: "http://t0.tianditu.gov.cn/vec_c/wmts?tk=",
    Wvec: "http://t0.tianditu.gov.cn/vec_w/wmts?tk=",
    // 矢量注记
    Ccva: "http://t0.tianditu.gov.cn/cva_c/wmts?tk=",
    Wcva: "http://t0.tianditu.gov.cn/cva_w/wmts?tk=",
    // 矢量英文注记
    Ceva: "http://t0.tianditu.gov.cn/eva_c/wmts?tk=",
    Weva: "http://t0.tianditu.gov.cn/eva_w/wmts?tk=",
    // 影像底图
    Cimg: "http://t0.tianditu.gov.cn/img_c/wmts?tk=",
    Wimg: "http://t0.tianditu.gov.cn/img_w/wmts?tk=",
    // 影像注记
    Ccia: "http://t0.tianditu.gov.cn/cia_c/wmts?tk=",
    Wcia: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=",
    // 影像英文注记
    Ceia: "http://t0.tianditu.gov.cn/eia_c/wmts?tk=",
    Weia: "http://t0.tianditu.gov.cn/eia_w/wmts?tk=",
    // 地形晕渲
    Cter: "http://t0.tianditu.gov.cn/ter_c/wmts?tk=",
    Wter: "http://t0.tianditu.gov.cn/ter_w/wmts?tk=",
    // 地形注记
    Ccta: "http://t0.tianditu.gov.cn/cta_c/wmts?tk=",
    Wcta: "http://t0.tianditu.gov.cn/cta_w/wmts?tk=",
    // 全球境界
    Cibo: "http://t0.tianditu.gov.cn/ibo_c/wmts?tk=",
    Wibo: "http://t0.tianditu.gov.cn/ibo_w/wmts?tk=",

    // 三维地名 不能直接调用 先写着放在这里
    PlaceName: "https://[ t0-t7 ].tianditu.gov.cn/mapservice/GetTiles?tk=",
    // 三维地形 不能直接调用 先写着放在这里
    Terrain: "https://[ t0-t7 ].tianditu.gov.cn/DataServer?T=elv_c&tk=",
    //天地图的token
    token: "03dd8495c94ffa92a3f1ffe4ed647be8",
  },
  //相机视角补偿
  VIEW_OFFSET: {
    //坐标
    destination: {
      x: 0,
      y: -0.00005,
      z: 0,
    },
    //视角
    orientation: {
      heading: 0 * (Math.PI / 180),
      pitch: -90 * (Math.PI / 180),
      roll: 360 * (Math.PI / 180),
    },
  },
  //模型偏移补偿
  MODEL_OFFSET: {
    longitude: 0.000020421,
    latitude: -0.000000587,
    height: 15.6671,
  },
  GEOJSON: {
    BASE_URL:
      "https://www.fumucloud.com/swmx/data-server/geojson/nczjd_geojson.json",
    REVIEW_URL:
      "https://www.fumucloud.com/swmx/data-server/geojson/nczjd_review_geojson.json",
  },
};
// 三维地图初始模型
export const DATA_MODEL_LIST = [
  {
    name: "建筑群",
    value: "buildGroup",
    defaultHeight: 20,
    url: "https://www.fumucloud.com/swmx/data-server/3dtiles/building-safe/tileset.json",
    defaultCameraInfo: {
      defaultX: "119.098799",
      defaultY: "25.356830",
      defaultZ: "214.637368",
      defaultRoll: "359.963026",
      defaultPitch: "-25.238123",
      defaultHeading: "347.0101989",
    }
  },
  {
    name: "学校",
    value: "school",
    defaultHeight: -45,
    url: "https://www.fumucloud.com/swmx/data-server/3dtiles/baoli/tileset.json",
    defaultCameraInfo: {
      defaultX: "113.069089",
      defaultY: "22.646385",
      defaultZ: "374.552296",
      defaultRoll: "359.845984",
      defaultPitch: "-23.343259",
      defaultHeading: "270.032954",
    }
  },
  {
    name: "人工建模",
    value: "manualModel",
    defaultHeight: 60,
    url: "https://www.fumucloud.com/swmx/data-server/3dtiles/tile/artificialModel/tileset.json",
    defaultCameraInfo: {
      defaultX: "113.365977",
      defaultY: "31.714200",
      defaultZ: "323.316846",
      defaultRoll: "359.994564",
      defaultPitch: "-38.619659",
      defaultHeading: "358.587231",
    }
  },
];