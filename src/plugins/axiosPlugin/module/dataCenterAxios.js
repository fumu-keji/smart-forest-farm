import { axiosFn, downloadAxiosFn } from "../axiosPlugin";

// 数据中心目录管理相关
const directoryAxios = {
  // 获取目录树
  getDirectoryTreeList(param) {
    return axiosFn({ url: "/sourceDir/role/tree", param });
  },
  // 获取角色列表
  getDirectoryList(param) {
    return axiosFn({ url: "/sourceDir", param });
  },
  // 目录详细
  getDirectoryById(param) {
    return axiosFn({ url: `/sourceDir/${param.id}`, param });
  },
  //编辑目录
  editDirectoryById(param) {
    return axiosFn({ url: `/sourceDir/${param.id}`, param, method: "put" });
  },
  // 新增目录
  addDirectory(param) {
    return axiosFn({ url: "/sourceDir", param, method: "post" });
  },
  // 批量删除
  deleteDirectoryByIds(param) {
    return axiosFn({ url: "/sourceDir", param, method: "delete" });
  },
  // 删除
  deleteDirectoryById(url) {
    return axiosFn({ url, method: "delete" });
  },
  // 目录操作
  operateDirectoryById(param) {
    return axiosFn({ url: `/sourceDir/${param.id}/operationType`, param, method: "put" });
  },
};
// 系统设置-图层树管理-相关Api
const layerTreeAxios = {
  getMapTreeData(url) {
    return axiosFn({ url });
  },
  // 获取页面配置地图
  getMapSelectList() {
    return axiosFn({ url: "/mapTreeComponent" });
  },
  // 获取图层树目录
  getLayerTreeMenu(param) {
    return axiosFn({ url: `/mapTreeMenu/tree/${param.id}` });
  },
  // 新增图层树目录
  addLayerTreeDirectory(param) {
    return axiosFn({ url: "/mapTreeMenu", param, method: "post" });
  },
  // 编辑图层树目录
  editLayerTreeDirectory(param) {
    return axiosFn({ url: `/mapTreeMenu/${param.id}`, param, method: "put" });
  },
  // 删除图层树目录
  deleteLayerTreeDirectory(param) {
    return axiosFn({ url: `/mapTreeMenu/${param.id}`, method: "delete" });
  },
  // 获取图层服务列表
  getLayerTreeSeverList(param) {
    return axiosFn({ url: "/mapTreeService", param });
  },
  // 新增图层服务
  addLayerTreeServer(param) {
    return axiosFn({ url: "/mapTreeService", param, method: "post" });
  },
  // 编辑图层服务
  editLayerTreeServer(param) {
    return axiosFn({ url: `/mapTreeService/${param.id}`, param, method: "put" });
  },
  // 获取图层服务详情
  getLayerTreeServerInfo(param) {
    return axiosFn({ url: `/mapTreeService/${param.id}`, param });
  },
  // 删除图层服务
  deleteLayerTreeServer(param) {
    return axiosFn({ url: `/mapTreeService/${param.ids}`, method: "delete" });
  },
  // 获取图层绑定的角色
  getLayerRoleList(param) {
    return axiosFn({ url: `/mapTreeService/${param.id}/role` });
  },
  // 保存图层的角色分配
  addLayerRole(param) {
    return axiosFn({ url: `/mapTreeService/${param.id}/role`, param, method: "post" });
  },
  // 获取图层目录绑定的角色
  getDirectoryRoleList(param) {
    return axiosFn({ url: `/mapTreeMenu/${param.id}/role` });
  },
  //保存图层目录的角色分配
  addDirectoryRole(param) {
    return axiosFn({ url: `/mapTreeMenu/${param.id}/role`, param, method: "post" });
  },
};
// 服务相关
const serverAxios = {
  // 获取服务列表
  getServerList(param) {
    return axiosFn({ url: "/mapService", param });
  },
  // 获取服务的数据
  getServerDataList(param) {
    return axiosFn({ url: "/mapService/dataList", param });
  },
  // 获取单个服务
  getServerInfo(param) {
    return axiosFn({ url: `/mapService/${param.id}`, param });
  },
  // 删除服务
  deleteServer(param) {
    return axiosFn({ url: "/mapService", param, method: "delete" });
  },
  // 发布服务
  addServer(param) {
    return axiosFn({ url: "/mapService", param, method: "post" });
  },
  // 修改服务
  editServer(param) {
    return axiosFn({ url: `/mapService/${param.id}`, param, method: "put" });
  },
  //更新服务状态
  editServerStatus(param) {
    return axiosFn({ url: `/mapService/${param.id}/${param.type}`, param, method: "put" });
  },
  // 获取资源目录树（在线地图）
  getResourceTree(param) {
    return axiosFn({ url: "/resources/tree", param });
  },
  // 获取资源树列表
  getResourcesTreeList(param) {
    return axiosFn({ url: "/v1/data/connect", param, });
  },
  // 远程服务发布提交方法
  publishServer(param) {
    return axiosFn({ url: "/v1/data/publish", param, method: "post" });
  },
  // 获取瓦片文件路径信息
  getLocalTilesPath(param) {
    return axiosFn({ url: "/mapService/files", param });
  },
  // 获取所有的本地瓦片文件数据
  getLocalTilesDataList() {
    return axiosFn({ url: "/mapService/video/dataList" });
  },
  // 本地瓦片上传文件路径接口
  localTilesPathPublish(param) {
    return axiosFn({ url: "/mapService/tile", param, method: "post" });
  },
  // 本地瓦片上传数据路径接口
  localTilesDataPublish(param) {
    return axiosFn({ url: "/mapService/video", param, method: "post" });
  },
  // 获取所有的三维服务文件数据
  getThreeDimensionalDataList() {
    return axiosFn({ url: "/mapService/threeDimensional/dataList" });
  },
  // 三维服务路径数据接口
  threeDimensionalPathPublish(param) {
    return axiosFn({ url: "/mapService/threeDimensional", param, method: "post" });
  },
  // 三维服务上传数据发布接口
  threeDimensionalDataPublish(param) {
    return axiosFn({ url: "/mapService/data", param, method: "post" });
  },
  // 获取本地瓦片服务所需的参数
  getTileArgs(param) {
    return axiosFn({ url: "/mapService/tileArgs", param });
  },
  // 下载3D数据
  downloadThreeDimensionalData(param) {
    return downloadAxiosFn({ url: `/mapService/download/${param.id}` });
  },
};
// 数据管理接口
const dataAxios = {
  // 获取数据管理列表
  getDataManagementList(param) {
    return axiosFn({ url: "/v1/data/file", param });
  },
  // 获取数据详情
  getDataManagementInfo(param) {
    return axiosFn({ url: `/v1/data/file/${param.id}`, param });
  },
  // 新增文件数据
  addDataManagement(param) {
    return axiosFn({ url: "/v1/data/file", param, method: "post", headers: { "Content-Type": "multipart/form-data" } });
  },
  // 编辑文件数据
  editDataManagement(param) {
    return axiosFn({
      url: `/v1/data/file/${param.id}`,
      param,
      method: "put",
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
  // 删除文件数据
  deleteDataManagementByIds(param) {
    return axiosFn({ url: "/v1/data/file", param, method: "delete" });
  },
  // 效验数据包
  verifyPacket(param) {
    return axiosFn({ url: "/v1/data/file/checkout", param, method: "post", headers: { "Content-Type": "multipart/form-data" } });
  },
  // 查询地图模型列表
  getSpatialModelList(param) {
    return axiosFn({ url: "/spatialModel", param });
  },
  // 数据历史树
  getDataHistoryTree(param) {
    return axiosFn({ url: "/v1/data/file/version", param });
  },
  // 设置有效版本
  setDataHistoryTree(param) {
    return axiosFn({ url: `/v1/data/file/version/${param.id}`, param, method: "put" });
  },
  // 下载历史树数据
  downloadDataHistoryTree(param) {
    return downloadAxiosFn({ url: `/file/download/${param.id}` });
  },
  // 注册注销接口
  registerOrLogoutData(param) {
    return axiosFn({ url: `/v1/data/${param.id}`, param, method: "put" });
  },
  // 元数据列表
  getMetaDataList(param) {
    return axiosFn({ url: "/realMetadata", param });
  },
  // 编辑元数据
  addMetaData(param) {
    return axiosFn({ url: "/realMetadata", param, method: "post" });
  },
  // 编辑元数据
  editMetaDataById(param) {
    return axiosFn({ url: `/realMetadata/${param.id}`, param, method: "put" });
  },
  // 获取元数据详情
  getMetaDataById(param) {
    return axiosFn({ url: `/realMetadata/${param.id}`, param });
  },
  // 批量删除元数据
  deleteMetaDataByIds(param) {
    return axiosFn({ url: "/realMetadata", param, method: "delete" });
  },
  // 删除元数据
  deleteMetaDataById(param) {
    return axiosFn({ url: `/realMetadata/${param.id}`, method: "delete" });
  },
  // 导入元数据
  importMetaData(param) {
    return axiosFn({ url: "/realMetadata/excel", param, method: "post", headers: { "Content-Type": "multipart/form-data" } });
  },
  // 导出元数据
  downloadMetaData(param) {
    return downloadAxiosFn({ url: `/realMetadata/excel/${param.id}` });
  },
  // 元数据列表
  getMappingDataList(param) {
    return axiosFn({ url: "/metaData", param });
  },
  // 编辑元数据
  addMappingData(param) {
    return axiosFn({ url: "/metaData", param, method: "post" });
  },
  // 编辑元数据
  editMappingDataById(param) {
    return axiosFn({ url: `/metaData/${param.id}`, param, method: "put" });
  },
  // 获取元数据详情
  getMappingDataById(param) {
    return axiosFn({ url: `/metaData/${param.id}`, param });
  },
  // 批量删除元数据
  deleteMappingDataByIds(param) {
    return axiosFn({ url: "/metaData", param, method: "delete" });
  },
  // 删除元数据
  deleteMappingDataById(param) {
    return axiosFn({ url: `/metaData/${param.id}`, method: "delete" });
  },
  // 导入元数据
  importMappingData(param) {
    return axiosFn({ url: "/metaData/excel", param, method: "post", headers: { "Content-Type": "multipart/form-data" } });
  },
  // 导出元数据
  downloadMappingData(param) {
    return downloadAxiosFn({ url: `/metaData/excel/${param.id}` });
  },
};
// 服务来源相关接口
const serviceSourceAxios = {
  // 获取服务关联的表格数据
  getServiceSourceList(param) {
    return axiosFn({ url: "/v1/serviceSource", param });
  },
  // 新增服务关联
  addServiceSource(param) {
    return axiosFn({ url: "/v1/serviceSource", param, method: "post" });
  },
  // 编辑服务关联
  editServiceSource(param) {
    return axiosFn({ url: `/v1/serviceSource/${param.id}`, param, method: "put" });
  },
  // 删除服务关联
  deleteServiceSourceByIds(param) {
    return axiosFn({ url: `/v1/serviceSource/${param.ids}`, method: "delete" });
  },
  // 获取服务关联详情
  getServiceSourceById(param) {
    return axiosFn({ url: `/v1/serviceSource/${param.id}` });
  },
};
// 样式相关接口
const styleAxios = {
  // 获取样式列表
  getStyleList(param) {
    return axiosFn({ url: "/style", param });
  },
  // 获取样式详情
  getStyleById(param) {
    return axiosFn({ url: `/style/${param.id}` });
  },
  // 新增样式
  addStyle(param) {
    return axiosFn({ url: "/style", param, method: "post" });
  },
  // 编辑样式
  editStyle(param) {
    return axiosFn({ url: `/style/${param.id}`, param, method: "put" });
  },
  // 删除样式
  deleteStyle(param) {
    return axiosFn({ url: "/style", param, method: "delete" });
  },
};
// 图层相关接口
const layerAxios = {
  // 查询图层列表
  getLayerList(param) {
    return axiosFn({ url: "/layer", param });
  },
  // 查询单个图层详情
  getLayerById(param) {
    return axiosFn({ url: `/layer/${param.id}` });
  },
  // 编辑图层
  editLayerById(param) {
    return axiosFn({ url: `/layer/${param.id}`, param, method: "put" });
  },
  // 图层下载
  downloadLayer(params) {
    return downloadAxiosFn({ url: "/layer/download/form", params });
  },
  // 获取所有的图层的属性字段
  getLayerAllAttribute(param) {
    return axiosFn({ url: `/layer/${param.id}/attributes/structure` });
  },
  // 获取当前图层的属性字段列表
  getLayerAttributeList(param) {
    return axiosFn({ url: "/index", param });
  },
  // 保存图层的拥有属性
  setDataManagementLayerIndex(param) {
    return axiosFn({ url: "/index/relate", param, method: "post" });
  },
};
const dataCenterAxios = {
  ...directoryAxios,
  ...layerTreeAxios,
  ...serverAxios,
  ...serviceSourceAxios,
  ...styleAxios,
  ...layerAxios,
  ...dataAxios
};

export default dataCenterAxios;