/**
 * Created by csz on 2024/02/22.
 */
const components = import.meta.glob(
  [
    "./web/*/*/*.vue",
    "./web/*/*/*/*.vue",
    "./form/*/*/*.vue",
    "./baseComponent/*/*.vue",
    "./singleComponent/*.vue"
  ],
  { eager: true }
);
export default {
  install(app) {
    for (const key in components) {
      const label = key.split("/").pop().split(".")[0];
      app.component(label, components[key].default);
    }
  }
};