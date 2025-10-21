<template>
  <el-carousel
    class="carousel-render-style"
    :class="{
      'carousel-outside': indicatorPositionData === 'outside',
    }"
    :style="carouselStyle"
    :direction="direction"
    :type="type"
    :autoplay="autoplay"
    :interval="Number(interval)"
    :arrow="arrow"
    :indicatorPosition="indicatorPositionData"
    :trigger="trigger"
  >
    <el-carousel-item v-for="item in optionItem" :key="item.id">
      <el-image
        style="width: 100%; height: 100%"
        draggable="false"
        fit="fill"
        :src="setImageSrc(item.url)"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  direction: {
    type: String,
    default: "horizontal"
  },
  type: {
    type: String,
    default: ""
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: [String, Number],
    default: "3000"
  },
  arrow: {
    type: String,
    default: "hover"
  },
  arrowBackColor: {
    type: String,
    default: "rgba(255, 255, 255, 0.7)"
  },
  arrowHoverBackColor: {
    type: String,
    default: "rgba(255, 255, 255, 1)"
  },
  arrowColor: {
    type: String,
    default: "#333333"
  },
  indicatorPosition: {
    type: String,
    default: "default"
  },
  trigger: {
    type: String,
    default: "hover"
  },
  indicatorBackColor: {
    type: String,
    default: "#ffffff"
  },
  optionItem: {
    type: Array,
    default: () => []
  }
});
const indicatorPositionData = computed(() => {
  return props.indicatorPosition === "default" ? "" : props.indicatorPosition;
});
const carouselStyle = computed(() => {
  return {
    "--arrowBackColor": props.arrowBackColor,
    "--arrowHoverBackColor": props.arrowHoverBackColor,
    "--arrowColor": props.arrowColor,
    "--indicatorBackColor": props.indicatorBackColor,
  };
});
function setImageSrc(value) {
  return proxy.$setAssetType(value);
}
</script>
<style lang="less" scoped>
.carousel-outside {
  :deep(.el-carousel__container) {
    height: calc(100% - 34px) !important;
  }
}
.carousel-render-style {
  :deep(.el-carousel__container) {
    height: 100%;
  }
  :deep(.el-carousel__arrow) {
    width: 40px;
    height: 40px;
    background-color: var(--arrowBackColor);
    font-size: 25px;
    font-weight: bolder;
    color: var(--arrowColor);
    &:hover {
      background-color: var(--arrowHoverBackColor);
      color: var(--el-color-primary);
    }
    .el-icon-arrow-right {
      position: relative;
      left: 1px;
    }
    .el-icon-arrow-left {
      position: relative;
      left: -1px;
    }
  }
  :deep(.el-carousel__button) {
    width: 10px !important;
    height: 10px !important;
    border-radius: 50% !important;
    opacity: 0.9 !important;
  }
  :deep(.el-carousel__indicator button) {
    background-color: var(--indicatorBackColor);
    background-color: var(--el-color-primary);
  }
}
</style>
