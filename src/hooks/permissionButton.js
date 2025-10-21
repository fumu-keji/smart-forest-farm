import { ref } from "vue";
import { app } from "@/main";

export function permissionButton() {
  const AppInstance = app.config.globalProperties;
  const buttonList = ref([]);
  const getButtonList = param => {
    return AppInstance.$getDataAxios.getButtons(param).then(res => {
      buttonList.value = res.data;
    }).catch(err => {
      AppInstance.$getDataAxios.notifyError(err);
    });
  };
  const showButton = buttonName => {
    return buttonList.value.some(item => {
      return buttonName === item.name;
    });
  };
  // 返回对应的显示字段和相关方法
  return {
    buttonList,
    getButtonList,
    showButton
  };
}