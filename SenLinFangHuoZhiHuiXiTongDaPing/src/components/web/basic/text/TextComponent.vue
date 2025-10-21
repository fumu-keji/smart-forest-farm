<template>
  <div :style="textStyle">
    <span v-if="!isMultLine" class="web-text">{{ text }}</span>
    <template v-else>{{ text }}</template>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  textIndent: {
    type: String,
    default: "0"
  },
  letterSpacing: {
    type: String,
    default: "0"
  },
  rowAlign: {
    type: String,
    default: "flex-start"
  },
  columnAlign: {
    type: String,
    default: "center"
  },
  isMultLine: {
    type: Boolean,
    default: false
  },
  lineClamp: {
    type: [String, Number],
    default: 1
  }
});
let text = defineModel("text");
const textStyle = computed(() => {
  if (props.isMultLine) {
    const defaultStyle = {
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      textIndent: `${props.textIndent}px`,
      letterSpacing: `${props.letterSpacing}px`,
      "-webkit-line-clamp": props.lineClamp || 1,
      textAlign: "left",
      lineHeight: "normal"
    };
    return Object.assign({}, props.textStyle, defaultStyle);
  } else {
    const textAlignValue = {
      "flex-start": "left",
      "center": "center",
      "flex-end": "right",
    };
    const defaultStyle = {
      display: "flex",
      alignItems: props.columnAlign,
      justifyContent: props.rowAlign,
      textIndent: `${props.textIndent}px`,
      letterSpacing: `${props.letterSpacing}px`,
      textAlign: textAlignValue[props.rowAlign],
    };
    return Object.assign({}, props.textStyle, defaultStyle);
  }
});
defineExpose({
  text
});
</script>
<style lang="less" scoped>
.web-text {
  display: inline-block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: inherit;
  color: inherit;
  align-self: auto;
  overflow-wrap: break-word;
}
</style>
