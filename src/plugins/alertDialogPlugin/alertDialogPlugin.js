import AlertComponent from "./alertDialogPlugin.vue";
import { render, createVNode } from "vue";

const Alert = {};

// 注册Alert
Alert.install = app => {
  // 生成Vue Alert组件vNode
  const vNode = createVNode(AlertComponent);
  // 挂载dom结构
  const vNodeDom = document.createElement("div");
  document.body.appendChild(vNodeDom);
  // 更改vNode的appContext为main.js中的app的_context
  vNode.appContext = app._context;
  // 绑定dom结构
  render(vNode, vNodeDom);
  // 通过Vue的原型注册一个方法
  app.config.globalProperties.$Alert = (message, type) => {
    vNode.component.props.alertShow = true;
    vNode.component.props.alertMessage = message;
    vNode.component.props.alertType = type;
    vNode.component.props.closeAlert = () => {
      vNode.component.props.alertShow = false;
    };
  };
};

export default Alert;