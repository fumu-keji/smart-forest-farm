<template>
  <el-checkbox-group
    v-if="showComponent"
    :class="customClass"
    :textColor="textColor"
    :disabled="effectDisabled || effectReadonly"
    v-model="bindValue"
    @change="handleOnChange"
  >
    <template v-if="buttonType">
      <el-checkbox-button
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item.value"
      >
        {{ item[dataModelFieldLabel] }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item.value"
        :border="border"
      >
        {{ item[dataModelFieldLabel] }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
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
const emit = defineEmits(["change", "update:value"]);
const customClass = computed(() => {
  return [
    `custom-checkbox-${props.compSize}`,
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
  :deep(.el-checkbox.is-disabled) {
    cursor: pointer !important;
  }
  :deep(.el-checkbox__inner::after) {
    cursor: pointer !important;
  }
  :deep(.el-checkbox.is-bordered.is-disabled) {
    cursor: pointer !important;
    border-color: #dcdfe6 !important;
  }
  :deep(.el-checkbox.is-bordered.is-checked) {
    border-color: var(--el-color-primary) !important;
  }
  :deep(.el-checkbox__input.is-disabled .el-checkbox__inner) {
    cursor: pointer !important;
    background-color: #fff !important;
  }
  :deep(.el-checkbox__input.is-disabled + .el-checkbox__label) {
    color: #606266 !important;
    cursor: pointer !important;
  }
  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    border-color: var(--el-color-primary) !important;
    background-color: var(--el-color-primary) !important;
    cursor: pointer !important;
  }
  :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: var(--el-color-primary) !important;
    cursor: pointer !important;
  }
  :deep(.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after) {
    border-color: #ffffff !important;
  }
  // 按钮模式
  :deep(.el-checkbox-button.is-checked.is-disabled .el-checkbox-button__inner) {
    color: #ffffff !important;
  }
  :deep(.el-checkbox-button.is-disabled .el-checkbox-button__inner) {
    color: #606266 !important;
    cursor: pointer !important;
  }
}
.custom-checkbox-superLarge {
  :deep(.el-checkbox__inner) {
    width: 28px;
    height: 28px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 9px;
    height: 15px;
    left: 9px;
    top: 2px;
  }
  :deep(.el-checkbox__label) {
    font-size: 22px;
  }
  :deep(.el-checkbox-button__inner) {
    padding: 14px 26px;
    font-size: 22px;
  }
  :deep(.el-checkbox.is-bordered) {
    padding: 25px 20px;
  }
}
.custom-checkbox-big {
  :deep(.el-checkbox__inner) {
    width: 26px;
    height: 26px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 8px;
    height: 13px;
    left: 8px;
    top: 2px;
  }
  :deep(.el-checkbox__label) {
    font-size: 20px;
  }
  :deep(.el-checkbox-button__inner) {
    padding: 13px 24px;
    font-size: 20px;
  }
  :deep(.el-checkbox.is-bordered) {
    padding: 23px 18px;
  }
}
.custom-checkbox-large {
  :deep(.el-checkbox__inner) {
    width: 24px;
    height: 24px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 7px;
    height: 12px;
    left: 7px;
    top: 2px;
  }
  :deep(.el-checkbox__label) {
    position: relative;
    top: -1px;
    font-size: 18px;
  }
  :deep(.el-checkbox-button__inner) {
    padding: 12px 22px;
    font-size: 18px;
  }
  :deep(.el-checkbox.is-bordered) {
    padding: 21px 16px;
  }
}
.custom-checkbox-default {
  :deep(.el-checkbox__inner) {
    width: 22px;
    height: 22px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 6px;
    height: 11px;
    left: 6px;
    top: 2px;
  }
  :deep(.el-checkbox__label) {
    position: relative;
    top: -1px;
    font-size: 16px;
  }
  :deep(.el-checkbox-button__inner) {
    padding: 10px 20px;
    font-size: 16px;
  }
  :deep(.el-checkbox.is-bordered) {
    padding: 19px 14px;
  }
}
.custom-checkbox-medium {
  :deep(.el-checkbox__inner) {
    width: 20px;
    height: 20px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 5px;
    height: 10px;
    left: 6px;
    top: 2px;
  }
  :deep(.el-checkbox__label) {
    position: relative;
    top: -1px;
    font-size: 15px;
  }
  :deep(.el-checkbox-button__inner) {
    padding: 9px 18px;
    font-size: 15px;
  }
  :deep(.el-checkbox.is-bordered) {
    padding: 17px 12px;
  }
}
.custom-checkbox-small {
  :deep(.el-checkbox__inner) {
    width: 18px;
    height: 18px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 4px;
    height: 9px;
    left: 6px;
    top: 2px;
  }
  :deep(.el-checkbox__label) {
    font-size: 14px;
  }
  :deep(.el-checkbox-button__inner) {
    padding: 8px 16px;
    font-size: 14px;
  }
  :deep(.el-checkbox.is-bordered) {
    padding: 15px 10px;
  }
}
.custom-checkbox-mini {
  :deep(.el-checkbox__inner) {
    width: 16px;
    height: 16px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 3px;
    height: 8px;
    left: 5px;
    top: 1px;
  }
  :deep(.el-checkbox__label) {
    position: relative;
    top: -1px;
    font-size: 13px;
  }
  :deep(.el-checkbox-button__inner) {
    padding: 6px 14px;
    font-size: 13px;
  }
  :deep(.el-checkbox.is-bordered) {
    height: 28px !important;
    padding: 0 8px;
  }
}
</style>
