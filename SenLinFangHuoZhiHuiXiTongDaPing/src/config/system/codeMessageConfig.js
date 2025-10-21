export const ADD_SUCCESS = 1; //新增成功
export const EDIT_SUCCESS = 2; //修改成功
export const DELETE_SUCCESS = 3; //删除成功
export const SET_SUCCESS = 4; //设置成功
export const ERR_NET_FAIL = "500";
export const ERR_API_NO_LOGIN_OHTER = "5"; // 未登录
export const ERR_API_NO_LOGIN = "401";
export const ERR_API_NO_SESSION = "404";
export const message = {
  [ERR_NET_FAIL]: "网络异常，请检查网络连接是否正常",
  [ERR_API_NO_SESSION]: "未登录，请重新登录"
};
export const successMessage = {
  [ADD_SUCCESS]: "新增成功",
  [EDIT_SUCCESS]: "修改成功",
  [DELETE_SUCCESS]: "删除成功",
  [SET_SUCCESS]: "设置成功",
};
