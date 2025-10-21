<template>
  <el-config-provider value-on-clear="">
    <div class="app-box">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from "element-plus";
export default {
  components: {
    ElConfigProvider,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.app-box {
  width: 100%;
  height: 100%;
}
</style>
