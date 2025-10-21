import { ElMessage } from "element-plus";
import { showNotify } from "vant";
import { APPLICATION_TYPE } from "@/config/ip";

let customMessage = {};
function createMessage(type, options = {}) {
  if (typeof options === "string") {
    options = { message: options };
  }
  const defaultOptions = {
    showClose: true,
    grouping: true,
  };
  const finalOptions = { ...defaultOptions, ...options };
  ElMessage[type](finalOptions);
}
function createVantMessage(type, options = {}) {
  if (typeof options === "string") {
    options = { message: options };
  }
  showNotify({ type, ...options });
}
// 区分移动端和web端
if (APPLICATION_TYPE === "h5") {
  customMessage = {
    success(options) {
      return createVantMessage("success", options);
    },
    info(options) {
      return createVantMessage("primary", options);
    },
    warning(options) {
      return createVantMessage("warning", options);
    },
    error(options) {
      return createVantMessage("danger", options);
    }
  };
} else {
  customMessage = {
    success(options) {
      return createMessage("success", options);
    },
    warning(options) {
      return createMessage("warning", options);
    },
    info(options) {
      return createMessage("info", options);
    },
    error(options) {
      return createMessage("error", options);
    }
  };
}
export default customMessage;
