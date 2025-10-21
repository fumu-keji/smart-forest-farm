import { axiosFn } from "../axiosPlugin";

// 二维地图相关接口
const mapAxios = {
  // 要素查询
  queryFeature(param) {
    return axiosFn({ url: "/v1/space/featureSearch", param, method: "post" });
  },
  // 叠加分析
  mapOverlayAnalysis(param) {
    return axiosFn({ url: "/v1/space/overlayAnalysis2", param, method: "post" });
  }
};
export default mapAxios;