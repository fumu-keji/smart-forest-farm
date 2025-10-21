import { app } from "@/main";
import { ElLoading } from "element-plus";

window.loadingInstance = null;
window.loadingCount = 0;
// 开始加载
const startLoading = () => {
  window.loadingInstance = ElLoading.service({
    fullscreen: true,
    customClass: "pageLoading",
    spinner: "",
    background: "rgba(0,0,0,0.6)",
    text: "加载中..."
  });
};
// 结束加载
const endLoading = () => {
  window.loadingInstance && window.loadingInstance.close();
};
// 开启加载遮罩
const openLoading = () => {
  if (window.loadingCount === 0) {
    startLoading();
  }
  window.loadingCount += 1;
};
// 关闭加载遮罩
const closeLoading = () => {
  if (window.loadingCount <= 0) {
    return;
  }
  window.loadingCount -= 1;
  if (window.loadingCount === 0) {
    endLoading();
  }
};
// 全局的确认弹窗
const loadingConfirm = (confirmText, confirmTitle, callback, cancelText = "已取消") => {
  const AppInstance = app.config.globalProperties;
  AppInstance.$confirm(confirmText, confirmTitle, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    draggable: true,
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "执行中...";
        callback(done, instance);
      } else {
        if (instance.confirmButtonLoading) {
          return;
        } else {
          AppInstance.$message.warning(cancelText);
          done();
        }
      }
    }
  }).catch(() => { });
};

export default {
  install(app) {
    app.config.globalProperties.$openLoading = openLoading;
    app.config.globalProperties.$closeLoading = closeLoading;
    app.config.globalProperties.$loadingConfirm = loadingConfirm;
  }
};