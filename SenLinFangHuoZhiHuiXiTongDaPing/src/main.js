import App from "./App.vue";
import { createApp } from "vue";
import { router } from "@/router/index";
import ElementPlus from "element-plus";
import Vant from "vant";
import "vant/lib/index.css";
import binAceEditor from "bin-editor-next";
import "brace";
import "brace/ext/language_tools";
import "brace/ext/searchbox";
import "brace/mode/html";
import "brace/mode/json";
import "brace/mode/javascript";
import "brace/mode/css";
import "brace/mode/sql";
import "brace/mode/xml";
import "brace/snippets/html";
import "brace/snippets/json";
import "brace/snippets/javascript";
import "brace/snippets/css";
import "brace/snippets/sql";
import "brace/snippets/xml";
import "brace/theme/chrome";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import moment from "moment";
import plugins from "@/plugins/index";
import customMessage from "@/utils/customMessageUtil";
import commonComponents from "@/components/index";

/**
 * 引入相关样式
*/
import "./style/theme/theme.scss";
import "./style/index.less";
import "./assets/fmySimpleIcon/iconfont.css";
import "./assets/fmySimpleIcon/iconfont";
import "./assets/menuIcon/iconfont.css";
import "./assets/menuIcon/iconfont";

export const app = createApp(App);
// 全局注册组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus, { locale: zhCn });
app.use(Vant);
app.use(commonComponents);
app.use(plugins);
app.use(router);
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$message = customMessage;
app.component(binAceEditor.name, binAceEditor);

app.mount("#app");