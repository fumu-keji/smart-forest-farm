<template>
  <div class="iframe-box" v-loading="loading">
    <iframe v-if="src" :src="src" frameborder="0" ref="iframe" />
    <el-empty v-else description="暂无数据" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  src: {
    type: String,
    default: ""
  }
});
const loading = ref(false);
const iframe = ref(null);
onMounted(() => {
  loadIframe();
});
watch(() => props.src, () => {
  loadIframe();
});
async function loadIframe() {
  if (!props.src) { return; }
  loading.value = true;
  iframe.value.onload = () => { loading.value = false; };
}
</script>

<style lang="less" scoped>
.iframe-box {
  display: flex;
  align-items: center;
  justify-content: center;
  iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>