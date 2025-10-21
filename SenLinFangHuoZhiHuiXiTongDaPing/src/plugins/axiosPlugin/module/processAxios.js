import { axiosFn } from "../axiosPlugin";

// 流程相关接口
const processAxios = {
  /**
   * 调用流程审批记录-相关API
   */
  // 获取流程审批记录详情
  getProcessTask(param) {
    return axiosFn({ url: `/v1/processTask/${param.id}` });
  },
  // 查询单条流程审批记录
  findOneProcessTask(param) {
    return axiosFn({ url: "/v1/processTask/find/one", param });
  },
  // 获取流程审批记录列表
  queryProcessTask(param) {
    return axiosFn({ url: "/v1/processTask", param });
  },
  // 新增流程审批记录
  addProcessTask(param) {
    return axiosFn({ url: "/v1/processTask", param, method: "post" });
  },
  // 编辑流程审批记录
  editProcessTask(param) {
    return axiosFn({ url: `/v1/processTask/${param.id}`, param, method: "put" });
  },
  // 删除流程审批记录，ids为数组
  removeProcessTask(param) {
    return axiosFn({ url: "/v1/processTask", param, method: "delete" });
  },
  // 批量新增流程审批记录
  addBatchProcessTask(param) {
    return axiosFn({ url: "/v1/processTask/batch/add", param, method: "post" });
  },
  /**
   * 调用流程数据-相关API
   */
  // 获取流程数据详情
  getProcess(param) {
    return axiosFn({ url: `/v1/process/${param.id}` });
  },
  // 查询单条流程数据
  findOneProcess(param) {
    return axiosFn({ url: "/v1/process/find/one", param });
  },
  // 获取流程数据列表
  queryProcess(param) {
    return axiosFn({ url: "/v1/process", param });
  },
  // 新增流程数据
  addProcess(param) {
    return axiosFn({ url: "/v1/process", param, method: "post" });
  },
  // 编辑流程数据
  editProcess(param) {
    return axiosFn({ url: `/v1/process/${param.id}`, param, method: "put" });
  },
  // 删除流程数据，ids为数组
  removeProcess(param) {
    return axiosFn({ url: "/v1/process", param, method: "delete" });
  },
  // 批量新增流程数据
  addBatchProcess(param) {
    return axiosFn({ url: "/v1/process/batch/add", param, method: "post" });
  }
};

export default processAxios;