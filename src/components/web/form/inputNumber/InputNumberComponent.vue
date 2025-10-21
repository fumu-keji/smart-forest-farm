<template>
  <el-input-number
    v-if="showComponent"
    :class="customClass"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    :step="step"
    :stepStrictly="stepStrictly"
    :controls="controls"
    :controlsPosition="controlsPosition"
    :disabled="effectDisabled"
    :readonly="effectReadonly"
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
  placeholder: {
    type: String,
    default: "请输入"
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
  stepStrictly: {
    type: Boolean,
    default: false
  },
  controls: {
    type: Boolean,
    default: true
  },
  controlsPosition: {
    type: String,
    default: ""
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
  return `custom-input-number-${props.compSize}`;
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
.is-controls-right {
  :deep(.el-input-number__decrease) {
    height: 50% !important;
  }
  :deep(.el-input-number__increase) {
    height: 50% !important;
  }
}
.custom-input-number-superLarge.el-input-number {
  height: 52px;
  :deep(.el-input__inner) {
    font-size: 22px;
  }
  :deep(.el-input-number__decrease) {
    font-size: 22px;
  }
  :deep(.el-input-number__increase) {
    font-size: 22px;
  }
}
.custom-input-number-big.el-input-number {
  height: 48px;
  :deep(.el-input__inner) {
    font-size: 20px;
  }
  :deep(.el-input-number__decrease) {
    font-size: 20px;
  }
  :deep(.el-input-number__increase) {
    font-size: 20px;
  }
}
.custom-input-number-large.el-input-number {
  height: 44px;
  :deep(.el-input__inner) {
    font-size: 18px;
  }
  :deep(.el-input-number__decrease) {
    font-size: 18px;
  }
  :deep(.el-input-number__increase) {
    font-size: 18px;
  }
}
.custom-input-number-default.el-input-number {
  height: 40px;
  :deep(.el-input__inner) {
    font-size: 16px;
  }
  :deep(.el-input-number__decrease) {
    font-size: 16px;
  }
  :deep(.el-input-number__increase) {
    font-size: 16px;
  }
}
.custom-input-number-medium.el-input-number {
  height: 36px;
  :deep(.el-input__inner) {
    font-size: 15px;
  }
  :deep(.el-input-number__decrease) {
    font-size: 15px;
  }
  :deep(.el-input-number__increase) {
    font-size: 15px;
  }
}
.custom-input-number-small.el-input-number {
  height: 32px;
  :deep(.el-input__inner) {
    font-size: 14px;
  }
  :deep(.el-input-number__decrease) {
    font-size: 14px;
  }
  :deep(.el-input-number__increase) {
    font-size: 14px;
  }
}
.custom-input-number-mini.el-input-number {
  height: 28px;
  :deep(.el-input__inner) {
    height: 26px;
    font-size: 13px;
  }
  :deep(.el-input-number__decrease) {
    font-size: 13px;
  }
  :deep(.el-input-number__increase) {
    font-size: 13px;
  }
}
</style>

