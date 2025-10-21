/**
 * Created by csz on 2024/02/20.
 */
const modules = import.meta.glob(
  [
    "./axiosPlugin/*.js",
    "./alertDialogPlugin/*.js",
    "./commonPlugin/*.js",
  ],
  { eager: true, import: "default" }
);
export default {
  install(app) {
    for (const path in modules) {
      app.use(modules[path]);
    }
  }
};
