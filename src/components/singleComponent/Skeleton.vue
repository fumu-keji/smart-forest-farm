<template>
  <div class="skeleton-container large-skeleton-container">
    <router-view class="main-container" />
  </div>
</template>
<script setup>
  import { onMounted } from "vue";
  import autofit from "@/utils/autofit.js";
  import { APPLICATION_TYPE } from "@config/ip";
  onMounted(() => {
    if (APPLICATION_TYPE == "large") {
      autofit.init({
        el: ".skeleton-container",
        dw: 1920,
        dh: document.body.clientHeight,
        resize: true,
        ignore: [
          {
            el: ".map-container"
          },
        ]
      }, false);
    }
  });
</script>

<style lang="less">
.skeleton-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  .main-container {
    width: 100%;
    height: 100%;
  }
}
</style>
