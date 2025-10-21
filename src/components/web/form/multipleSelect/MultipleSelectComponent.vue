<template>
  <el-select
    v-if="showComponent"
    :popper-class="popperClass"
    :class="customClass"
    :multiple="true"
    :placeholder="placeholder"
    :filterable="filterable"
    :allowCreate="allowCreate"
    :collapseTags="collapseTags"
    :multipleLimit="multipleLimit"
    :clearable="clearable"
    :disabled="effectDisabled || effectReadonly"
    v-model="bindValue"
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
import { computed, ref, watch } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
import { APPLICATION_TYPE } from "@/config/ip";
/**
 * 基础相关
 */
const props = defineProps({
  value: {
    type: String,
    default: ""
  },
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
  multipleLimit: {
    type: Number,
    default: 3
  },
  collapseTags: {
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
const emit = defineEmits(["change", "update:value"]);
const popperClass = computed(() => {
  let className = `large-popper ${props.compSize}-web-popper`;
  if (APPLICATION_TYPE !== "large") {
    className = `${props.compSize}-web-popper`;
  }
  return className;
});
const customClass = computed(() => {
  return [
    `custom-multiple-select-${props.compSize}`,
    { "readonly-wrap": !effectDisabled.value && effectReadonly.value }
  ];
});
/**
 * 值绑定相关
 */
let bindValue = ref([]);
watch(() => props.value, newValue=> {
  bindValue.value = !isEmpty(newValue) ? newValue.split(",") : [];
}, { immediate: true });
function handleOnChange(value) {
  const updateValue = !isEmpty(value) ? value.join(",") : "";
  emit("update:value", updateValue);
  emit("change", updateValue);
}
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
.custom-multiple-select-superLarge.el-select {
  :deep(.el-select__wrapper) {
    padding: 15px 12px;
    font-size: 22px;
    .el-tag {
      padding: 17px 9px;
    }
    .el-select__tags-text {
      position: relative;
      top: -1px;
      font-size: 22px;
    }
    .el-tag__close {
      margin-left: 10px;
      width: 22px;
      height: 22px;
      font-size: 20px;
    }
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 22px !important;
  }
}
.custom-multiple-select-big.el-select {
  :deep(.el-select__wrapper) {
    padding: 14px 12px;
    font-size: 20px;
    .el-tag {
      padding: 15px 9px;
    }
    .el-select__tags-text {
      position: relative;
      top: -1px;
      font-size: 20px;
    }
    .el-tag__close {
      margin-left: 10px;
      width: 20px;
      height: 20px;
      font-size: 18px;
    }
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 20px !important;
  }
}
.custom-multiple-select-large.el-select {
  :deep(.el-select__wrapper) {
    padding: 13px 12px;
    font-size: 18px;
    .el-tag {
      padding: 13px 9px;
    }
    .el-select__tags-text {
      position: relative;
      top: -1px;
      font-size: 18px;
    }
    .el-tag__close {
      margin-left: 10px;
      width: 18px;
      height: 18px;
      font-size: 16px;
    }
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 18px !important;
  }
}
.custom-multiple-select-default.el-select {
  :deep(.el-select__wrapper) {
    padding: 12px 12px;
    font-size: 16px;
    .el-tag {
      padding: 11px 9px;
    }
    .el-select__tags-text {
      position: relative;
      top: -1px;
      font-size: 16px;
    }
    .el-tag__close {
      margin-left: 10px;
      width: 16px;
      height: 16px;
      font-size: 14px;
    }
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 16px !important;
  }
}
.custom-multiple-select-medium.el-select {
  :deep(.el-select__wrapper) {
    padding: 11px 12px;
    font-size: 15px;
    .el-select__tags-text {
      position: relative;
      top: -1px;
      font-size: 15px;
    }
    .el-tag__close {
      width: 15px;
      height: 15px;
      font-size: 12px;
    }
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 15px !important;
  }
}
.custom-multiple-select-small.el-select {
  :deep(.el-select__wrapper) {
    min-height: 32px;
    font-size: 14px;
    .el-select__tags-text {
      position: relative;
      top: -1px;
      font-size: 14px;
    }
    .el-tag__close {
      width: 14px;
      height: 14px;
      font-size: 14px;
    }
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 14px !important;
  }
}
.custom-multiple-select-mini.el-select {
  :deep(.el-select__wrapper) {
    min-height: 28px;
    font-size: 13px;
    .el-tag {
      height: 18px;
    }
    .el-select__tags-text {
      position: relative;
      top: -1px;
      font-size: 13px;
    }
    .el-tag__close {
      width: 13px;
      height: 13px;
      font-size: 10px;
    }
  }
  :deep(.el-select__suffix .el-icon) {
    font-size: 13px !important;
  }
}
</style>

