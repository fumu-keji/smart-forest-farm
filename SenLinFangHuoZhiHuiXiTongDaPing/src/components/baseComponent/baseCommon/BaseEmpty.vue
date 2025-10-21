<template>
  <div :style="emptyStyle" :class="['empty-box', descriptionPosition]">
    <el-empty
      :image="imgUrl"
      :image-size="imgSize"
      :description="description"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
  imgSize: {
    type: Number,
    default: 60
  },
  description: {
    type: String,
    default: "暂无数据"
  },
  descriptionPosition: {
    type: String,
    default: "bottom"
  }
});
const emptyStyle = computed(() => {
  return {
    width: props.width,
    height: props.height
  };
});
const imgUrl = computed(() => {
  return require("@/assets/image/noData.png");
});
</script>

<style lang="less" scoped>
.empty-box {
  :deep(.el-empty) {
    padding: 0px;
  }
  &.right {
    :deep(.el-empty) {
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    :deep(.el-empty__description) {
      margin-top: 0;
      margin-left: 15px;
    }
  }
}
</style>