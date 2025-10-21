<template>
  <el-radio-group
    v-if="showComponent"
    :class="customClass"
    :textColor="textColor"
    :disabled="effectDisabled || effectReadonly"
    v-model="modelValue"
    @change="emit('change', $event)"
  >
    <template v-if="buttonType">
      <el-radio-button
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item[dataModelFieldValue]"
      >
        {{ item[dataModelFieldLabel] }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item[dataModelFieldValue]"
        :border="border"
      >
        {{ item[dataModelFieldLabel] }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup>
import { computed } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  border: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: "#ffffff"
  },
  buttonType: {
    type: Boolean,
    default: false
  },
  optionItem: {
    type: Array,
    default: () => []
  },
  dataModelFieldValue: {
    type: String,
    default: "value"
  },
  dataModelFieldLabel: {
    type: String,
    default: "name"
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
const emit = defineEmits(["change"]);
const customClass = computed(() => {
  return [
    `custom-radio-${props.compSize}`,
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
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>

<style lang="less" scoped>
.readonly-wrap {
  // 非按钮模式无边框
  :deep(.el-radio.is-disabled) {
    cursor: pointer !important;
  }
  :deep(.el-radio__inner::after) {
    cursor: pointer !important;
    background-color: #ffffff !important;
  }
  :deep(.el-radio__input.is-checked.is-disabled .el-radio__inner) {
    border-color: var(--el-color-primary) !important;
    background-color: var(--el-color-primary) !important;
    cursor: pointer !important;
  }
  :deep(.el-radio__input.is-disabled .el-radio__inner) {
    cursor: pointer !important;
    background-color: #fff !important;
  }
  :deep(.el-radio__input.is-checked.is-disabled + .el-radio__label) {
    color: var(--el-color-primary) !important;
    cursor: pointer !important;
  }
  :deep(.el-radio__input.is-disabled + .el-radio__label) {
    color: #606266 !important;
    cursor: pointer !important;
  }
  // 按钮模式
  :deep(.el-radio-button.is-active.is-disabled .el-radio-button__inner) {
    color: #ffffff !important;
  }
  :deep(.el-radio-button.is-disabled .el-radio-button__inner) {
    color: #606266 !important;
    cursor: pointer !important;
  }
}
</style>
<style lang="less">
.custom-radio-superLarge {
  .el-radio__inner {
    width: 28px;
    height: 28px;
  }
  .el-radio__inner::after {
    width: 10px;
    height: 10px;
  }
  .el-radio__label {
    font-size: 22px;
  }
  .el-radio-button__inner {
    padding: 14px 26px;
    font-size: 22px;
  }
  .el-radio.is-bordered {
    padding: 25px 20px;
  }
}
.custom-radio-big {
  .el-radio__inner {
    width: 26px;
    height: 26px;
  }
  .el-radio__inner::after {
    width: 8px;
    height: 8px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 20px;
  }
  .el-radio-button__inner {
    padding: 13px 24px;
    font-size: 20px;
  }
  .el-radio.is-bordered {
    padding: 23px 18px;
  }
}
.custom-radio-large {
  .el-radio__inner {
    width: 24px;
    height: 24px;
  }
  .el-radio__inner::after {
    width: 7px;
    height: 7px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 18px;
  }
  .el-radio-button__inner {
    padding: 12px 22px;
    font-size: 18px;
  }
  .el-radio.is-bordered {
    padding: 21px 16px;
  }
}
.custom-radio-default {
  .el-radio__inner {
    width: 22px;
    height: 22px;
  }
  .el-radio__inner::after {
    width: 6px;
    height: 6px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 16px;
  }
  .el-radio-button__inner {
    padding: 10px 20px;
    font-size: 16px;
  }
  .el-radio.is-bordered {
    padding: 19px 14px;
  }
}
.custom-radio-medium {
  .el-radio__inner {
    width: 20px;
    height: 20px;
  }
  .el-radio__inner::after {
    width: 5px;
    height: 5px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 15px;
  }
  .el-radio-button__inner {
    padding: 9px 18px;
    font-size: 15px;
  }
  .el-radio.is-bordered {
    padding: 17px 12px;
  }
}
.custom-radio-small {
  .el-radio__inner {
    width: 18px;
    height: 18px;
  }
  .el-radio__inner::after {
    width: 4px;
    height: 4px;
  }
  .el-radio__label {
    font-size: 14px;
  }
  .el-radio-button__inner {
    padding: 8px 16px;
    font-size: 14px;
  }
  .el-radio.is-bordered {
    padding: 15px 10px;
  }
}
.custom-radio-mini {
  .el-radio__inner {
    width: 16px;
    height: 16px;
  }
  .el-radio__inner::after {
    width: 4px;
    height: 4px;
  }
  .el-radio__label {
    font-size: 13px;
  }
  .el-radio-button__inner {
    padding: 6px 14px;
    font-size: 13px;
  }
  .el-radio.is-bordered {
    height: 28px !important;
    padding: 0 8px;
  }
}
</style>