<template>
  <div>
    <!-- 地图放大缩小等工具栏 -->
    <div v-if="zoomAttr.show" class="zoom-box" :style="setZoomStyle">
      <div
        style="margin-bottom: -1px"
        class="interaction-item"
        @click="scaleMap('big')"
      >
        <Plus />
      </div>
      <div class="interaction-item" @click="scaleMap('small')">
        <Minus />
      </div>
    </div>
    <!-- 底部工具栏 -->
    <div
      v-if="coordinateAttr.show"
      class="bottom-box"
      :style="setCoordinateAttrStyle"
    >
      <div class="srs-box">
        <span style="margin-right: 10px">当前坐标:</span>
        <div id="srsbox" style="display: inline-block" />
      </div>
      <span class="split-span" />
      <template>
        <div class="layer-level-box">缩放等级: {{ mapZoom }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  mapAttribute: {
    type: Object,
    require: true
  },
  mapData: {
    type: Object,
    require: true
  },
  mapZoom: {
    type: [Number, String],
    require: true
  }
});
const emit = defineEmits(["handleOnSetZoom"]);
const coordinateAttr = computed(() => props.mapAttribute.coordinateAttr);
const zoomAttr = computed(() => props.mapAttribute.zoomAttr);
// 当前工具栏的偏移量
const setCoordinateAttrStyle = computed(() => {
  const left = coordinateAttr.value.left;
  const bottom = coordinateAttr.value.bottom;
  return { left: left ? `${left}%` : "", bottom: bottom ? `${bottom}%` : "" };
});
// 当前缩放小工具的偏移量
const setZoomStyle = computed(() => {
  const right = zoomAttr.value.right;
  const top = zoomAttr.value.top;
  return { right: right ? `${right}%` : "", top: top ? `${top}%` : "" };
});
// 缩放地图
function scaleMap(type) {
  // 最大缩放和最小缩放
  const minZoom = props.mapAttribute.minZoom;
  const maxZoom = props.mapAttribute.maxZoom;
  let view = props.mapData.getView();
  let zoom = view.getZoom();
  let sum = type === "big" ? 1 : -1;
  if (type === "small" && zoom <= minZoom) {
    return;
  }
  if (type === "big" && zoom >= maxZoom) {
    return;
  }
  let result = zoom + sum;
  // 缩放
  view.setZoom(result);
  // 关闭测量相关
  emit("handleOnSetZoom");
}
</script>

<style lang="less">
.zoom-box {
  position: absolute;
  width: 34px;
  padding: 0 8px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  border-radius: 3px;
  box-sizing: border-box;
  .interaction-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 2px 0;
    border-bottom: 1px dashed #dcdee2;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 16px;
    }
    &:last-child {
      border: none;
    }
  }
  .interaction-item:hover {
    color: #1778ff !important;
  }
}
.bottom-box {
  position: absolute;
  color: white;
  height: 30px;
  line-height: 30px;
  padding: 0 30px 0 20px;
  font-size: 12px;
  z-index: 1;
  .split-span {
    position: relative;
    top: 2px;
    display: inline-block;
    background-color: #333131;
    width: 2px;
    height: 13px;
    margin: 0 30px 0 0;
  }
  .srs-box {
    display: inline-block;
    .custom-mouse-position {
      width: 210px;
    }
  }
  .layer-level-box {
    display: inline-block;
  }
}
.bottom-box:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
</style>
