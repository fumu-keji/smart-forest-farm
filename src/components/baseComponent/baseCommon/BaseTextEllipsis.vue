<template>
  <div class="line-clamp" :style="{ backgroundColor: bgColor }">
    <input type="checkbox" class="line-clamp-checkbox" :id="id" />
    <div class="line-clamp-content" :style="{ maxHeight: maxHeight }">
      <label :for="id" class="line-clamp-btn line-clamp-btn-open">
        <span :style="{ color: btn.color }">{{ btn.open }}</span>
      </label>
      <slot />
      <label :for="id" class="line-clamp-btn line-clamp-btn-close">
        <span :style="{ color: btn.color }">{{ btn.close }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  bgColor: {
    type: String,
    default: "#ffffff"
  },
  line: {
    type: Number,
    default: 2
  },
  btn: {
    type: Object,
    default: () => ({
      color: "#1778ff",
      open: "更多",
      close: "收起"
    })
  }
});
const height = computed(() => {
  return ((props.line - 1) * 1.5) + 0.005 + "em";
});
const maxHeight = computed(() => {
  return (props.line * 1.5) + "em";
});
const id = computed(() => {
  return "line-clamp-" + new Date().getTime() + Math.floor(Math.random() * 100);
});
</script>

<style lang="less" scoped>
.line-clamp {
  display: flex;
  &-checkbox {
    display: none;
  }
  &-content {
    line-height: 1.5;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    background-color: inherit;
    &::before {
      content: "";
      width: 0;
      float: right;
      height: calc(100% - 1.5em + 1px);
    }
    &::after {
      content: "";
      position: absolute;
      width: 200vw;
      height: 100vh;
      box-shadow: inset -100vw calc(1.5em - 100vh) 0 0 #fff;
      margin-left: -100vw;
    }
  }
  &-btn {
    float: right;
    clear: both;
    position: relative;
    cursor: pointer;
    &-open {
      margin-left: 1.3em;
      transform: translate(0, -1px);
      &::before {
        content: "...";
        transform: translate(-1.3em, 0);
        position: absolute;
      }
    }
    &-close {
      display: none;
      margin-left: 0.5em;
    }
  }
  &-checkbox:checked + &-content {
    max-height: inherit !important;
    &::before {
      display: none;
    }
    &::after {
      visibility: hidden;
    }
  }
  &-checkbox:checked + &-content > &-btn {
    &-open {
      display: none;
    }
    &-close {
      display: inline;
    }
  }
}
</style>