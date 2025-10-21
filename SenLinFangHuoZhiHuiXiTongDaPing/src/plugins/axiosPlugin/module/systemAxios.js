import { axiosFn } from "../axiosPlugin";

// 机构相关接口
const organizationAxios = {
  // 获取机构tree接口
  getOrganizationTreeList() {
    return axiosFn({ url: "/organization/tree" });
  },
  // 获取机构列表的接口
  getOrganizationList(param) {
    return axiosFn({ url: "/organization", param });
  },
  // 获取机构详情
  findOneOrganization(param) {
    return axiosFn({ url: `/organization/${param.id}` });
  },
  // 获取机构详情
  getOrganizationById(param) {
    return axiosFn({ url: `/organization/${param.id}` });
  },
  // 新增机构接口
  addOrganization(param) {
    return axiosFn({ url: "/organization", param, method: "post" });
  },
  // 编辑机构
  editOrganizationtById(param) {
    return axiosFn({ url: `/organization/${param.id}`, param, method: "put" });
  },
  // 批量删除机构
  deleteOrganization(param) {
    return axiosFn({ url: "/organization", param, method: "delete" });
  },
};
// 角色相关接口
const roleAxios = {
  //获取角色列表
  getRoleList(param) {
    return axiosFn({ url: "/role", param });
  },
  //获取角色详情
  getRoleInfoById(param) {
    return axiosFn({ url: `/role/${param.id}`, param });
  },
  //批量删除角色
  deleteRoleInfoByIds(param) {
    return axiosFn({ url: "/role", param, method: "delete" });
  },
  //编辑角色详情
  editRoleInfoById(param) {
    return axiosFn({ url: `/role/${param.id}`, param, method: "put" });
  },
  //新增角色
  addRole(param) {
    return axiosFn({ url: "/role", param, method: "post" });
  },
  // 给角色绑定成员
  allocationRoleUser(param) {
    return axiosFn({ url: `/role/${param.id}/user`, param, method: "post" });
  },
  // 获取当前绑定角色的用户
  getRoleUser(param) {
    return axiosFn({ url: `/role/${param.id}/user` });
  },
  // 获取当前角色绑定的菜单
  getRoleModuleList(param) {
    return axiosFn({ url: `/menu/${param.id}/role` });
  },
  // 获取指定模块下的所有菜单和功能
  getAllModulesById(param) {
    return axiosFn({ url: `/menu/${param.id}` });
  },
  // 获取指定菜单下的子模块和功能
  getModuleChildren(param) {
    return axiosFn({ url: `/menu/${param.id}/group` });
  },
  // 给角色绑定菜单权限
  authorityRoleModules(param) {
    return axiosFn({ url: `/menu/${param.id}/role`, param, method: "post" });
  }
};
// 模块相关接口
const moduleAxios = {
  // 获取菜单tree接口
  getMenuTreeList() {
    return axiosFn({ url: "/menu/tree" });
  },
  // 获取菜单列表的接口
  getMenuList(param) {
    return axiosFn({ url: "/menu", param });
  },
  // 获取菜单详情
  getMenuById(param) {
    return axiosFn({ url: `/menu/${param.id}`, param });
  },
  // 新增菜单接口
  addMenu(param) {
    return axiosFn({ url: "/menu", param, method: "post" });
  },
  // 编辑菜单
  editMenuById(param) {
    return axiosFn({ url: `/menu/${param.id}`, param, method: "put" });
  },
  // 批量删除菜单
  deleteMenuByIds(param) {
    return axiosFn({ url: "/menu", param, method: "delete" });
  },
  // 菜单操作
  operateMenuById(param) {
    return axiosFn({ url: `/menu/${param.id}/operation`, param: { operationType: param.operationType }, method: "put" });
  }
};
// 用户相关接口
const userAxios = {
  // 获取当前用户绑定的角色列表
  getUserRoleList(param) {
    return axiosFn({ url: `/user/${param.id}/role` });
  },
  // 保存用户的角色分配
  assignUserRole(param) {
    return axiosFn({ url: `/user/${param.id}/role`, param, method: "post" });
  },
  // 获取用户列表
  getUserList(param) {
    return axiosFn({ url: "/user", param });
  },
  // 获取用户详情
  getUserById(param) {
    return axiosFn({ url: `/user/${param.id}` });
  },
  // 编辑用户
  editUserById(param) {
    return axiosFn({ url: `/user/${param.id}`, param, method: "put" });
  },
  // 新增用户
  addUser(param) {
    return axiosFn({ url: "/user", param, method: "post" });
  },
  // 批量删除用户
  deleteUserByIds(param) {
    return axiosFn({ url: "/user", param, method: "delete" });
  },
  // 重置用户密码
  resetUserPassword(param) {
    return axiosFn({ url: `/user/reset/${param.id}`, param, method: "put" });
  },
  // 修改用户密码
  editUserPassword(param) {
    return axiosFn({ url: "/user/password", param, method: "put" });
  },
};
// 日志相关接口
const logAxios = {
  // 获取单条日志详细
  getLogInfo(param) {
    return axiosFn({ url: `/log/${param.id}` });
  },
  // 获取日志列表
  getLogList(param) {
    return axiosFn({ url: "/log", param });
  },
};
// 数据字典相关接口
const dictionaryAxios = {
  // 获取数据字典列表
  getDictionaryList(param) {
    return axiosFn({ url: "/dictionary", param });
  },
  // 新增数据字典
  addDictionary(param) {
    return axiosFn({ url: "/dictionary", param, method: "post" });
  },
  // 获取数据字典详情
  getDictionaryById(param) {
    return axiosFn({ url: `/dictionary/${param.id}`, param });
  },
  // 编辑数据字典详情
  editDictionaryById(param) {
    return axiosFn({ url: `/dictionary/${param.id}`, param, method: "put" });
  },
  // 批量删除数据字典
  deleteDictionaryInfoByIds(param) {
    return axiosFn({ url: `/dictionary?ids=${param.ids}`, param, method: "delete" });
  },
  // 新增数据字典项
  addDictionaryItem(param) {
    return axiosFn({ url: `/dictionary/${param.dictionaryId}/dictionaryItem`, param, method: "post" });
  },
  // 编辑数据字典项
  editDictionaryItem(param) {
    return axiosFn({ url: `/dictionary/${param.dictionaryId}/dictionaryItem/${param.itemId}`, param, method: "put" });
  },
  // 批量删除数据字典项
  deleteDictionaryItemByIds(param) {
    return axiosFn({ url: `/dictionary/${param.dictionaryId}/dictionaryItem?ids=${param.ids}`, param, method: "delete" });
  },
  //根据字典id集合获取字典子项
  getDictionaryItemByIds(param) {
    return axiosFn({ url: "/dictionary/item/ids", param });
  },
  getDictionaryItemByCodes(param) {
    return axiosFn({ url: "/dictionary/item/codes", param });
  },
  getDictionaryItemByCode(param) {
    return axiosFn({ url: `/dictionary/${param.code}/dictionaryItem`});
  },
};
// 系统流程配置相关
const processConfigAxios = {
  // 获取流程列表
  getProcessNodeList(param) {
    return axiosFn({ url: "/v1/flowable/task-definition", param });
  },
  // 获取流程列表
  getProcessLists(param) {
    return axiosFn({ url: "/v1/flowable/process-definition", param });
  },
  // 获取流程详情
  getProcessModelInfo(param) {
    return axiosFn({ url: `/v1/flowable/dataModel/${param.id}` });
  },
  // 获取流程节点数据
  getNodeConfigData(param) {
    return axiosFn({ url: `/v1/flowable/${param.processKey}/task-definition/${param.nodeId}/approver` });
  },
  // 获取审批节点数据
  getApproverNodeList(param) {
    return axiosFn({ url: `/v1/flowable/flowElement/${param.id}/${param.processKey}` });
  },
  // 保存流程节点配置信息
  saveProcessNodeConfig(param) {
    return axiosFn({ url: `/v1/flowable/${param.processKey}/task-definition/${param.nodeId}/approver`, param, method: "post" });
  }
};
// 流程相关API
const flowServers = {
  // 查询多条流程
  getProcessList(param) {
    return axiosFn({ url: "/v1/flowable/process", param });
  },
  //查询流程定义（通过流程定义标识）
  getProcessDefinition(key) {
    return axiosFn({ url: `/v1/flowable/process-definition/${key}` });
  },
  // 获取流程实例的详情
  getFlowInstance(param) {
    return axiosFn({ url: `/v1/flowable/task/${param.currentTaskId}` });
  },
  // 发起申请
  startFlow(param) {
    return axiosFn({ url: "/v1/flowable/process", param, method: "post" });
  },
  // 审批流程
  approveFlow(param) {
    param.approverStatus = 1;
    return axiosFn({ url: "/v1/flowable/task", param, method: "put" });
  },
  // 获取流程审批记录
  getProcessRecord(param) {
    let processId = param.processId ? param.processId : param.id;
    return axiosFn({ url: `/v1/flowable/process/${processId}/tasks` });
  },
  // 获取流程节点以及xml信息
  getProcessNodeAndXml(param) {
    let processId = param.processId ? param.processId : param.id;
    return axiosFn({ url: `/v1/flowable/process/nodeAndXml/${processId}` });
  },
  //获取流程节点详细信息
  getProcessNodeDetail(param) {
    return axiosFn({ url: "/v1/processTask/find/one", param });
  },
  // 挂起流程
  suspendFlow(param) {
    return axiosFn({ url: "/v1/flowable/suspend", param, method: "put" });
  },
  // 激活流程
  activateFlow(param) {
    return axiosFn({ url: "/v1/flowable/activate", param: { "id": param.id }, method: "put" });
  },
  // 撤回流程
  revocateFlow(param) {
    return axiosFn({ url: "/v1/flowable/revocate", param: { "id": param.id }, method: "put" });
  }
};
// API管理相关接口
const apiServers = {
  // 获取模型分类目录
  getModelCatalog(param) {
    return axiosFn({ url: "/v1/lcProjectDataModelCatalog", param });
  },
  // 新增模型分类
  addModelClassification(param) {
    return axiosFn({ url: "/v1/lcProjectDataModelCatalog", param, method: "post" });
  },
  // 编辑分类
  editModelClassification(param) {
    return axiosFn({ url: `/v1/lcProjectDataModelCatalog/${param.id}`, param, method: "put" });
  },
  // 查询模型字段
  getDataModelFieldVOList(param) {
    return axiosFn({ url: "/v1/lcProjectDataModelField", param });
  },
  // 获取API树
  getApiTreeList(param) {
    return axiosFn({ url: "/v1/apiInbound/catalog", param });
  },
  // 新增API接口
  addApiInbound(param) {
    return axiosFn({ url: "/v1/apiInbound", param, method: "post" });
  },
  // 编辑API接口
  editApiInbound(param) {
    return axiosFn({ url: `/v1/apiInbound/${param.id}`, param, method: "put" });
  },
  // 删除API接口
  deleteApiInbound(param) {
    return axiosFn({ url: `/v1/apiInbound/${param.ids}`, param, method: "delete" });
  },
  // 获取API接口详情
  getApiInboundInfo(param) {
    return axiosFn({ url: `/v1/apiInbound/${param.id}` });
  },
  // 发送请求
  sendApiInboundRequest(param) {
    return axiosFn({ url: "/v1/apiInbound/request", param, method: "post" });
  },
  // 执行脚本请求
  executeApiInboundScript(param) {
    return axiosFn({ url: "/v1/apiInbound/execute", param, method: "post" });
  },
  // 生成数据模型
  generateApiInboundDataModel(param) {
    return axiosFn({ url: "/v1/apiInbound/generate/datamodel", param, method: "post" });
  },
  // 改变API分组
  changeApiInboundGroup(param) {
    return axiosFn({ url: `/v1/apiInbound/catalog/${param.id}`, param, method: "put" });
  },
  // 获取API输出树
  getApiOutputTreeList(param) {
    return axiosFn({ url: "/v1/apiOutbound/catalog", param });
  },
  // 新增API输出接口
  addApiOutbound(param) {
    return axiosFn({ url: "/v1/apiOutbound", param, method: "post" });
  },
  // 编辑API输出接口
  editApiOutbound(param) {
    return axiosFn({ url: `/v1/apiOutbound/${param.id}`, param, method: "put" });
  },
  // 删除API输出接口
  deleteApiOutbound(param) {
    return axiosFn({ url: `/v1/apiOutbound/${param.ids}`, param, method: "delete" });
  },
  // 获取API输出接口详情
  getApiOutboundInfo(param) {
    return axiosFn({ url: `/v1/apiOutbound/${param.id}` });
  },
  // 改变API分组
  changeApiOutboundGroup(param) {
    return axiosFn({ url: `/v1/apiOutbound/catalog/${param.id}`, param, method: "put" });
  },
  // 生成请求示例
  generateApiOutboundBodyExample(param) {
    return axiosFn({ url: "/v1/apiOutbound/generateBodyExample", param, method: "post" });
  },
  // 生成响应请求示例
  generateApiOutboundResponseExample(param) {
    return axiosFn({ url: "/v1/apiOutbound/generateResponseExample", param, method: "post" });
  },
  // 生成响应接口文档
  generateApiOutboundDocument(param) {
    return axiosFn({ url: "/v1/apiOutbound/generateApiDocument", param, method: "post" });
  },
  // 获取认证token信息列表
  getAuthorizationList() {
    return axiosFn({ url: "/v1/apiToken" });
  },
  // 新增认证token信息
  addAuthorization(param) {
    return axiosFn({ url: "/v1/apiToken", param, method: "post" });
  },
  // 编辑认证token信息
  editAuthorization(param) {
    return axiosFn({ url: `/v1/apiToken/${param.id}`, param, method: "put" });
  },
  // 删除认证token信息
  deleteAuthorization(param) {
    return axiosFn({ url: "/v1/apiToken", param, method: "delete" });
  }
};

const systemAxios = {
  ...organizationAxios,
  ...roleAxios,
  ...logAxios,
  ...moduleAxios,
  ...userAxios,
  ...dictionaryAxios,
  ...flowServers,
  ...processConfigAxios,
  ...apiServers
};

export default systemAxios;