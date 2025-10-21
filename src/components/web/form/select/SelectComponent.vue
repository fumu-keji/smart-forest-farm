<template>
  <el-select
    v-if="showComponent"
    ref="selectRef"
    :popper-class="popperClass"
    :class="customClass"
    :placeholder="placeholder"
    :filterable="filterable"
    :allowCreate="allowCreate"
    :clearable="clearable"
    :disabled="effectDisabled || effectReadonly"
    v-model="modelValue"
    @change="handleOnChange"
  >
    <el-option
      v-for="(item, index) in optionItem"
      :key="index"
      :label="item[dataModelFieldLabel]"
      :value="item[dataModelFieldValue]"
    />
  </el-select>
</template>

<script setup>
import { computed, ref } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { APPLICATION_TYPE } from "@/config/ip";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  filterable: {
    type: Boolean,
    default: false
  },
  allowCreate: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
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
const name = defineModel("name");
const emit = defineEmits(["change"]);
const popperClass = computed(() => {
  let className = `large-popper ${props.compSize}-web-popper`;
  if (APPLICATION_TYPE !== "large") {
    className = `${props.compSize}-web-popper`;
  }
  return className;
});
const customClass = computed(() => {
  return [
    `custom-select-${props.compSize}`,
    { "readonly-wrap": !effectDisabled.value && effectReadonly.value }
  ];
});
const selectRef = ref(null);
function handleOnChange(value) {
  let data = props.optionItem.find(item =>item[props.dataModelFieldValue] === value);
  name.value = data ? data[props.dataModelFieldLabel] : "";
  emit("change", value);
}
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
.readonly-wrap {
  :deep(.el-select__wrapper) {
    cursor: pointer !important;
    background-color: #fff !important;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    .el-select__selected-item {
      color: #606266 !important;
    }
    .el-select__placeholder.is-transparent {
      color: #a8abb2 !important;
    }
  }
}
.custom-select-superLarge.el-select {
  :deep(.el-select__wrapper) {
    height: 52px !important;
    padding: 15px 12px;
    font-size: 22px;
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 22px !important;
  }
}
.custom-select-big.el-select {
  :deep(.el-select__wrapper) {
    height: 48px !important;
    padding: 14px 12px;
    font-size: 20px;
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 20px !important;
  }
}
.custom-select-large.el-select {
  :deep(.el-select__wrapper) {
    height: 44px !important;
    padding: 13px 12px;
    font-size: 18px;
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 18px !important;
  }
}
.custom-select-default.el-select {
  :deep(.el-select__wrapper) {
    height: 40px !important;
    padding: 12px 12px;
    font-size: 16px;
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 16px !important;
  }
}
.custom-select-medium.el-select {
  :deep(.el-select__wrapper) {
    height: 36px !important;
    padding: 11px 12px;
    font-size: 15px;
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 15px !important;
  }
}
.custom-select-small.el-select {
  :deep(.el-select__wrapper) {
    height: 32px !important;
    min-height: 32px;
    font-size: 14px;
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 14px !important;
  }
}
.custom-select-mini.el-select {
  :deep(.el-select__wrapper) {
    height: 28px !important;
    min-height: 28px;
    font-size: 13px;
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 13px !important;
  }
}
</style>
