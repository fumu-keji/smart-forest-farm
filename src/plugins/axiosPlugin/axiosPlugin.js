import axios from "axios";
import { showNotify } from "vant";
import { app } from "@/main";
import { router } from "@/router/index";
// 引入方法依赖
import { generateShortStr, exportFile } from "@/utils/functionUtil";
import { Encrypt } from "@/utils/secretUtil";
import { SHA256 } from "@/utils/sha256Util";
// 引入配置文件
import { BASE_SERVER_URL, APPLICATION_TYPE } from "@/config/ip";
// 引入对应模块的方法集合
import businessAxios from "./module/businessAxios";
import commonAxios from "./module/commonAxios";
import dataCenterAxios from "./module/dataCenterAxios";
import mapAxios from "./module/mapAxios";
import processAxios from "./module/processAxios";
import systemAxios from "./module/systemAxios";

// 设置请求次数
let seq = 0;
// 线上基础服务的接口
export async function axiosFn(options, isDownload = false, apiBaseUrl = BASE_SERVER_URL) {
  // 接口的密钥
  const secretKey = "bY737TGAacSGG1XTdK";
  // 获取token
  const AppInstance = app.config.globalProperties;
  const authenticationParam = AppInstance.$getUserInfoItem("Authentication") || "";
  // 当前时间戳
  const timestamp = Date.now();
  // 当前的uuid
  const uuid = generateShortStr();
  // 设置请求头
  const headerContentType = options.headers && options.headers["Content-Type"]
      ? options.headers["Content-Type"] : "application/json;charset=utf-8";
  // 设置配置项
  const config = {
    method: "get",
    headers: {
      "Content-Type": headerContentType,
      Authentication: authenticationParam,
      timestamp,
      uuid: Encrypt(uuid),
      sign: SHA256(`${timestamp}${secretKey}${uuid}`)
    },
    timeout: 1800000
  };
  // 跨域设置请求头
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] = "*";
  config.headers["Access-Control-Allow-Headers"] = "*";
  // 配置流程相关请求头
  if (options["tenantId"]) {
    config.headers["tenantId"] = options["tenantId"];
  }
  // 配置锁相关请求头
  if (options["lockToken"]) {
    config.headers["lockToken"] = options["lockToken"];
  }
  // 参数设置
  for (const k in options) {
    // 请求参数和请求头不需要配置
    if (k !== "param" && k !== "headers") {
      // 请求地址做一层转换
      if (k === "url" && options[k].indexOf("http://") === -1) {
        config[k] = `${apiBaseUrl}${options[k]}`;
      } else {
        config[k] = options[k];
      }
    }
  }
  // 设置传参方式
  let method = config.method;
  // 处理post put delete等传参
  if (method == "post" || method == "put" || method == "delete") {
    // 处理formData数据上传
    if (config.headers["Content-Type"] === "multipart/form-data") {
      let formData = new FormData();
      Object.keys(options.param).forEach(key => {
        formData.append(key, options.param[key]);
      });
      config["data"] = formData;
    }
    // 请求头为application/json的请求参数传递
    if (config.headers["Content-Type"] === "application/json;charset=utf-8") {
      config["data"] = options.param;
    }
    // 请求头为application/x-www-form-urlencoded的请求参数传递
    if (config.headers["Content-Type"] === "application/x-www-form-urlencoded;charset=UTF-8") {
      let postData = "";
      for (const key in options.param) {
        // 设置传参为数组时使用jsonStringfy方法转字符串
        let optionKey = Object.prototype.toString.apply(options.param[key]);
        if (optionKey === "[object Array]" || optionKey === "[object Object]") {
          options.param[key] = JSON.stringify(options.param[key]);
        }
        postData += encodeURIComponent(key);
        postData += "=";
        postData += encodeURIComponent(options.param[key]);
        postData += "&";
      }
      config["data"] = postData;
    }
    // 处理get请求  
  } else if (config.method === "get") {
    // 有可能是字符串这里暂时先写非全等
    if (options["param"] != undefined || options["param"] != null) {
      Object.keys(options["param"]).forEach(v => {
        let paramKey = Object.prototype.toString.apply(options["param"][v]);
        let optionKey = Object.prototype.toString.apply(options.param[v]);
        if (paramKey === "[object Array]" || optionKey === "[object Object]") {
          options["param"][v] = JSON.stringify(options["param"][v]);
        }
      });
    }
    config["params"] = options["param"];
  }
  // return axios的new promise对象
  const response = await axios(config);
  return isDownload ? response : response.data;
}
// 下载文件通用方法
export async function downloadAxiosFn(options) {
  options.responseType = "blob";
  axiosFn(options, true).then(res => {
    exportFile(res, options.fileName, options.fileType);
  }).catch(err => {
    notifyError(err);
  });
}
// 请求拦截器
axios.interceptors.request.use(
    function (config) {
      const AppInstance = app.config.globalProperties;
      AppInstance.$openLoading();
      return config;
    },
    function (error) {
      const AppInstance = app.config.globalProperties;
      AppInstance.$closeLoading();
      return Promise.reject(error);
    }
);
// 设置响应拦截器
axios.interceptors.response.use(
    function (response) {
      const AppInstance = app.config.globalProperties;
      AppInstance.$closeLoading();
      response.seq = seq;
      // 请求成功返回response
      if (response.status !== 200) {
        return;
      }
      if (response.config.responseType === "blob") {
        if (response.data.type !== "application/json") {
          return response;
        } else {
          return Promise.reject(response.data);
        }
      }
      if (response.data.code == 200) {
        return response;
      } else {
        return Promise.reject(response.data);
      }
    },
    function (error) {
      const AppInstance = app.config.globalProperties;
      AppInstance.$closeLoading();
      //判断请求超时
      if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
        showErrorMessage("请求超时，请刷新页面重试！");
        return;
      }
      error.seq = seq;
      return Promise.reject(error);
    }
);
// 统一错误返回接口
export function notifyError(err) {
  console.log(err);
  const AppInstance = app.config.globalProperties;
  // 如果不是文件流走正常报错逻辑
  if (err.code) {
    notifyErrorCode(err);
  } else {
    // 处理js错误的返回
    const ErrorType = [TypeError, ReferenceError, SyntaxError, RangeError, SyntaxError, EvalError];
    if (ErrorType.includes(err.constructor)) {
      if (APPLICATION_TYPE === "h5") {
        showNotify({ type: "danger", message: "当前操作不支持" });
      } else {
        AppInstance.$Alert("当前操作不支持", "error");
        return;
      }
    }
    // 处理文件流的报错
    if (err.type === "application/json") {
      const reader = new FileReader();
      reader.readAsText(err, "utf-8");
      reader.onload = () => {
        const { message } = JSON.parse(reader.result);
        showErrorMessage(message);
      };
      return;
    }
    showErrorMessage("网络异常，请检查网络连接是否正常");
  }
}
export function notifyErrorCode(err) {
  const currentRoute = router.currentRoute._value;
  const AppInstance = app.config.globalProperties;
  // 处理通用登录相关错误
  function notifyLogin(errorMsg) {
    if (currentRoute.name === "Login") {
      return;
    }
    router.replace({ name: "Login" });
    showErrorMessage(errorMsg);
    AppInstance.$clearUserInfo();
    sessionStorage.clear();
  }
  // 截取当前的返回的code码和错误信息
  const code = err.code;
  const message = err.message;
  // 登录超时返回登录页面
  if (code == "401") {
    notifyLogin("用户未登录，请登录！");
    return;
  }
  // token过期
  if (code == "404") {
    notifyLogin("登录超时，请重新登录！");
    return;
  }
  // 账号挤下线
  if (code == "411") {
    notifyLogin("当前账号已在其他地方登录，请重新登录！");
    return;
  }
  // 其它状态码输出错误提示
  showErrorMessage(message || "网络异常，请检查网络连接是否正常");
}
// 错误提示方法
function showErrorMessage(message) {
  const AppInstance = app.config.globalProperties;
  if (APPLICATION_TYPE === "h5") {
    showNotify({ type: "danger", message });
  } else {
    AppInstance.$message.error(message);
  }
}
// 引入各个模块定义的接口结构并绑定到vue的原型上
const getDataAxios = {
  notifyError,
  ...businessAxios,
  ...commonAxios,
  ...dataCenterAxios,
  ...mapAxios,
  ...processAxios,
  ...systemAxios
};
export default {
  install(app) {
    app.config.globalProperties.$getDataAxios = getDataAxios;
  }
};