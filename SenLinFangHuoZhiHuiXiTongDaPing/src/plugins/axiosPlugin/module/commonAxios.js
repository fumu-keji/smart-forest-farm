import { axiosFn } from "../axiosPlugin";
import { BASE_SERVER_URL } from "@/config/ip";

// 公共相关接口
const commonAxios = {
  // 通用函数可以传递url和参数
  commonFunctionAxios(url, param) {
    return axiosFn({ url: url, param: param, method: "post" });
  },
  // 获取验证码
  getCaptcha(param) {
    return axiosFn({ url: "/captcha", param });
  },
  // 用户登录
  userLogin(param) {
    return axiosFn({ url: "/user/token", param: param, method: "post", headers: { "Content-Type": "multipart/form-data" } });
  },
  // 用户注销
  userLogOut() {
    return axiosFn({ url: "/user/token", method: "delete" });
  },
  // 获取菜单
  getMenus(param) {
    return axiosFn({ url: "/menu/permission", param });
  },
  //获取菜单下的按钮
  getButtons(param) {
    return axiosFn({ url: "/menu/permission/function", param });
  },
  // 上传
  uploadFile(param) {
    return axiosFn({ url: "/file/upload1", param, method: "post", headers: { "Content-Type": "multipart/form-data" } });
  },
  // 下载文件
  downLoadFile(id) {
    window.open(`${BASE_SERVER_URL}/file/download/${id}`);
  },
  // 预览文件
  previewFile(id) {
    window.open(`${BASE_SERVER_URL}/file/preview/${id}`);
  },
  // 获取文件信息
  getUrlByFileId(fileIds) {
    return axiosFn({ url: `/file/fileIds?fileIds=${fileIds}` });
  }
};
export default commonAxios;