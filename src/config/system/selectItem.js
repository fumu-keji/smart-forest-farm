// 审批类型
export const APPROVE_TYPE = [
  ["1", "指定角色"],
  ["2", "指定用户"],
  ["3", "流程变量-用户（指定用户）"],
  ["4", "指定发起人"],
  ["5", "指定审批人"],
  ["6", "指定发起人部门角色"],
  ["7", "流程变量-机构（指定机构下所有用户）"],
];
// 服务关联的服务类型下拉框数据
export const SERVER_TYPE_DATA = [
  { label: "WMS", value: "WMS" },
  { label: "WFS", value: "WFS" },
  { label: "WMTS", value: "WMTS" },
  { label: "矢量瓦片服务", value: "矢量瓦片服务" },
];
// 服务状态
export const SERVER_STATUS_ITEM = [
  { label: "启动", value: 0 },
  { label: "停止", value: 1 },
  { label: "注销", value: 2 },
];
// 目录
export const DIRECTORY_THEME_TYPE = [
  { label: "政务资源", value: "zwzy" },
  { label: "部门来源", value: "bmly" },
];
// 数据格式类型
export const GEO_DATA_TYPE = [
  { label: "二维数据", value: "二维数据" },
  { label: "三维数据", value: "三维数据" },
];
// 是否建立索引
export const IS_HAVE_INDEX = [
  { label: "否", value: 0 },
  { label: "是", value: 1 },
];
// 数据状态
export const DATA_STATUS = [
  { label: "已注册", value: 0 },
  { label: "注销", value: 1 },
  { label: "未注册", value: 2 },
];
// 数据中心支持的上传文件格式
export const LIMIT_DATA_CETER_FILE_TYPE = [
  "mdb",
  "dwg",
  "dxf",
  "tiff",
  "shp",
  "zip",
  "geojson",
  "gdb",
  "jpg",
  "jpeg",
  "png",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "pdf",
  "ppt",
  "pptx",
];
// 数据中心的数据格式
export const GEO_DATA_FROMAT_2D_ITEM = [
  { label: "shapefiles", value: "1" },
  { label: "gdb数据   ", value: "2" },
  { label: "影像数据  ", value: "3" },
];
export const GEO_DATA_FROMAT_3D_ITEM = [
  { label: "3dtiles", value: "4" },
  { label: "czml", value: "5" },
  { label: "geojson", value: "6" },
  { label: "glb", value: "7" },
  { label: "gltf", value: "8" },
  { label: "json", value: "9" },
  { label: "kml", value: "10" },
];
// 服务数据来源
export const SERVICE_SOURCE_ITEM = [
  { label: "本地数据资源", value: "0" },
  { label: "外部数据资源", value: "1" },
  { label: "本地栅格瓦片", value: "2" },
  { label: "三维服务资源", value: "3" },
];
// 服务类型
export const SERVICE_TYPE_ITEM = [
  { label: "WMS", value: "WMS" },
  { label: "WFS", value: "WFS" },
  { label: "WMTS", value: "WMTS" },
  { label: "矢量瓦片服务", value: "矢量瓦片服务" },
];
// 数据模型定义的字段转换
export const FIELD_TYPE_DATA = [
  {
    typeStr: "文本",
    type: "varchar",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "长整型",
    type: "bigint",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "数字",
    type: "integer",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "真假",
    type: "boolean",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "关联字段",
    type: "aggregation",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "文件",
    type: "file",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "小数",
    type: "double",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "日期",
    type: "date",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "时间",
    type: "time",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "日期时间",
    type: "timestamp",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
  {
    typeStr: "长文本",
    type: "text",
    desp: "允许用户输入任何字母和数字的组合，最多可输入255个字符。",
  },
];
