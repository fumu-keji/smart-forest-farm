<template>
  <el-color-picker
    v-if="showComponent"
    :popper-class="popperClass"
    :class="customClass"
    :showAlpha="showAlpha"
    :predefine="predefineColorItem"
    :disabled="effectDisabled || effectReadonly"
    v-model="modelValue"
  />
</template>

<script setup>
import { computed } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { APPLICATION_TYPE } from "@/config/ip";
import { PREDEFINE_COLOR_ITEM } from "@/config/pageDesign/componentConfig";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  showAlpha: {
    type: Boolean,
    default: true
  },
  showPredefine: {
    type: Boolean,
    default: true
  },
  formItemDisabled: {
    type: [String, Boolean],
    default: ""
  },
  compDisabled: {
    type: Boolean,
    default: false
  },
  formItemReadonly: {
    type: [String, Boolean],
    default: ""
  },
  compReadonly: {
    type: Boolean,
    default: false
  },
});
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const predefineColorItem = computed(() => {
  return props.showPredefine ? PREDEFINE_COLOR_ITEM : [];
});
const popperClass = computed(() => {
  let className = `large-popper ${props.compSize}-web-popper`;
  if (APPLICATION_TYPE !== "large") {
    className = `${props.compSize}-web-popper`;
  }
  return className;
});
const customClass = computed(() => {
  return [
    "color-picker-render-box",
    `custom-color-picker-${props.compSize}`,
    { "readonly-wrap": !effectDisabled.value && effectReadonly.value }
  ];
});
// 控制组件属性
const {
  showComponent,
  disabledComponent,
  effectDisabled,
  effectReadonly,
  readonlyComponent
} = useFormItemAttr(props);
// 导出配置属性
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>
