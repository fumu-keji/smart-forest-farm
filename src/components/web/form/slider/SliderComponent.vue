<template>
  <el-slider
    v-if="showComponent"
    :class="customClass"
    :min="min"
    :max="max"
    :step="step"
    :range="range"
    :showStops="showStops"
    :showTooltip="showTooltip"
    :showInput="showInput"
    :showInputControls="showInputControls"
    :disabled="effectDisabled || effectReadonly"
    v-model="modelValue"
    @change="emit('change', $event)"
  />
</template>

<script setup>
import { computed } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  range: {
    type: Boolean,
    default: false
  },
  showStops: {
    type: Boolean,
    default: false
  },
  showTooltip: {
    type: Boolean,
    default: false
  },
  showInput: {
    type: Boolean,
    default: false
  },
  showInputControls: {
    type: Boolean,
    default: false
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
    `custom-slider-${props.compSize}`,
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

<style lang="less" scoped>
.el-slider {
  height: auto;
}
.readonly-wrap {
  :deep(.el-input__wrapper) {
    background-color: #fff !important;
  }
  :deep(.el-input__inner) {
    background-color: #fff !important;
    border-color: #dcdfe6 !important;
    color: #606266 !important;
    -webkit-text-fill-color: #606266 !important;
    cursor: pointer !important;
  }
  :deep(.el-input-number__decrease) {
    border-color: #dcdfe6 !important;
    color: #606266 !important;
    cursor: pointer !important;
  }
  :deep(.el-input-number__increase) {
    border-color: #dcdfe6 !important;
    color: #606266 !important;
    cursor: pointer !important;
  }
  :deep(.el-slider__button-wrapper:hover) {
    cursor: pointer !important;
  }
  :deep(.el-slider__bar) {
    background-color: var(--el-color-primary) !important;
  }
  :deep(.el-slider__button) {
    border-color: var(--el-color-primary) !important;
    &:hover {
      cursor: pointer !important;
    }
  }
}
</style>
<style lang="less">
.custom-slider-superLarge .el-input-number {
  height: 52px;
  width: 160px !important;
  .el-input__inner {
    font-size: 22px;
  }
  .el-input-number__decrease {
    font-size: 22px;
  }
  .el-input-number__increase {
    font-size: 22px;
  }
}
.custom-slider-big .el-input-number {
  height: 48px;
  width: 150px !important;
  .el-input__inner {
    font-size: 20px;
  }
  .el-input-number__decrease {
    font-size: 20px;
  }
  .el-input-number__increase {
    font-size: 20px;
  }
}
.custom-slider-large .el-input-number {
  height: 44px;
  width: 140px !important;
  .el-input__inner {
    font-size: 18px;
  }
  .el-input-number__decrease {
    font-size: 18px;
  }
  .el-input-number__increase {
    font-size: 18px;
  }
}
.custom-slider-default .el-input-number {
  height: 40px;
  width: 130px !important;
  .el-input__inner {
    font-size: 16px;
  }
  .el-input-number__decrease {
    font-size: 16px;
  }
  .el-input-number__increase {
    font-size: 16px;
  }
}
.custom-slider-medium .el-input-number {
  height: 36px;
  width: 120px !important;
  .el-input__inner {
    font-size: 15px;
  }
  .el-input-number__decrease {
    font-size: 15px;
  }
  .el-input-number__increase {
    font-size: 15px;
  }
}
.custom-slider-small .el-input-number {
  height: 32px;
  width: 110px !important;
  .el-input__inner {
    font-size: 14px;
  }
  .el-input-number__decrease {
    font-size: 14px;
  }
  .el-input-number__increase {
    font-size: 14px;
  }
}
.custom-slider-mini .el-input-number {
  height: 28px;
  width: 100px !important;
  .el-input__inner {
    height: 26px;
    font-size: 13px;
  }
  .el-input-number__decrease {
    font-size: 13px;
  }
  .el-input-number__increase {
    font-size: 13px;
  }
}
</style>
