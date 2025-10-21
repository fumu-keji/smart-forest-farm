<template>
  <el-input
    v-if="showComponent"
    :class="customClass"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :showWordLimit="showWordLimit"
    :showPassword="showPassword"
    :prefixIcon="prefixIcon"
    :suffixIcon="suffixIcon"
    :clearable="clearable"
    :disabled="effectDisabled"
    :readonly="effectReadonly"
    v-model="modelValue"
    @change="emit('change', $event)"
  >
    <template v-if="prependContent" #prepend>
      {{ prependContent }}
    </template>
    <template v-if="appendContent" #append>
      {{ appendContent }}
    </template>
  </el-input>
</template>

<script setup>
import { computed } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
// 基础相关
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  placeholder: {
    type: String,
    default: "请输入"
  },
  maxlength: {
    type: [String, Number],
    default: "30"
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: ""
  },
  suffixIcon: {
    type: String,
    default: ""
  },
  prependContent: {
    type: String,
    default: ""
  },
  appendContent: {
    type: String,
    default: ""
  },
  clearable: {
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
const emit = defineEmits(["change"]);
const customClass = computed(() => {
  return `custom-input-${props.compSize}`;
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
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}
input[type="number"] {
  appearance: textfield;
}
.custom-input-superLarge.el-input {
  height: 52px;
  font-size: 22px;
  :deep(.el-input__icon) {
    font-size: 22px !important;
  }
}
.custom-input-big.el-input {
  height: 48px;
  font-size: 20px;
  :deep(.el-input__icon) {
    font-size: 20px !important;
  }
}
.custom-input-large.el-input {
  height: 44px;
  font-size: 18px;
  :deep(.el-input__icon) {
    font-size: 18px !important;
  }
}
.custom-input-default.el-input {
  height: 40px;
  font-size: 16px;
  :deep(.el-input__icon) {
    font-size: 16px !important;
  }
}
.custom-input-medium.el-input {
  height: 36px;
  font-size: 15px;
  :deep(.el-input__icon) {
    font-size: 15px !important;
  }
}
.custom-input-small.el-input {
  height: 32px;
  font-size: 14px;
  :deep(.el-input__icon) {
    font-size: 14px !important;
  }
}
.custom-input-mini.el-input {
  height: 28px;
  font-size: 13px;
  :deep(.el-input__icon) {
    font-size: 13px !important;
  }
}
</style>