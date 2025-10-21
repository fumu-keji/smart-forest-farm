<template>
  <!-- 卡片 -->
  <el-card
    :style="computedStyle"
    :bodyStyle="cardBodyStyle"
    :class="customClass"
    :shadow="shadow"
  >
    <template v-if="headerShow" #header>
      <div class="card-header">
        <div class="text">{{ title }}</div>
        <span class="operate-box">
          <slot name="operateButtonBox" />
        </span>
      </div>
    </template>
    <slot />
  </el-card>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  shadow: {
    type: String,
    default: "never"
  },
  title: {
    type: String,
    default: "标题"
  },
  contentPadding: {
    type: String,
    default: "20"
  },
  headerColor: {
    type: String,
    default: "#303133"
  },
  buttonData: {
    type: Array,
    default: () => []
  },
  headerShow: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(["clickButton"]);
const customClass = computed(() => {
  return `custom-card-${props.compSize} card-render-box`;
});
const computedStyle = computed(() => {
  return {
    "--headerColor": props.headerColor
  };
});
const cardBodyStyle = computed(() => {
  return {
    padding: props.contentPadding ? `${props.contentPadding}px` : "20px"
  };
});
</script>
<style lang="less" scoped>
.card-render-box {
  border-radius: 0;
  overflow: hidden !important;
  :deep(.el-card__header) {
    position: relative;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }
  :deep(.el-card__body) {
    box-sizing: border-box;
    overflow: auto;
  }
  .text {
    border-left: 1px solid var(--el-color-primary);
    font-weight: bolder;
    padding-left: 15px;
    display: inline-block;
    color: var(--headerColor);
  }
  .card-header {
    display: flex;
    align-items: center;
  }
  .operate-box {
    position: absolute;
    right: 20px;
  }
}
.custom-card-superLarge.card-render-box {
  :deep(.el-card__header) {
    font-size: 24px;
    height: 70px;
  }
  :deep(.el-card__body) {
    height: calc(100% - 70px);
  }
  .text {
    border-left-width: 8px;
    height: 40px;
    line-height: 40px;
  }
}
.custom-card-big.card-render-box {
  :deep(.el-card__header) {
    font-size: 22px;
    height: 65px;
  }
  :deep(.el-card__body) {
    height: calc(100% - 65px);
  }
  .text {
    border-left-width: 7px;
    height: 35px;
    line-height: 35px;
  }
}
.custom-card-large.card-render-box {
  :deep(.el-card__header) {
    font-size: 20px;
    height: 60px;
  }
  :deep(.el-card__body) {
    height: calc(100% - 60px);
  }
  .text {
    border-left-width: 6px;
    height: 30px;
    line-height: 30px;
  }
}
.custom-card-default.card-render-box {
  :deep(.el-card__header) {
    font-size: 18px;
    height: 55px;
  }
  :deep(.el-card__body) {
    height: calc(100% - 55px);
  }
  .text {
    border-left-width: 5px;
    height: 25px;
    line-height: 25px;
  }
}
.custom-card-medium.card-render-box {
  :deep(.el-card__header) {
    font-size: 16px;
    height: 50px;
  }
  :deep(.el-card__body) {
    height: calc(100% - 50px);
  }
  .text {
    border-left-width: 4px;
    height: 20px;
    line-height: 20px;
  }
}
.custom-card-small.card-render-box {
  :deep(.el-card__header) {
    font-size: 16px;
    height: 45px;
  }
  :deep(.el-card__body) {
    height: calc(100% - 45px);
  }
  .text {
    border-left-width: 4px;
    height: 20px;
    line-height: 20px;
  }
}
.custom-card-mini.card-render-box {
  :deep(.el-card__header) {
    font-size: 15px;
    height: 40px;
  }
  :deep(.el-card__body) {
    height: calc(100% - 40px);
  }
  .text {
    border-left-width: 4px;
    height: 20px;
    line-height: 20px;
  }
}
</style>