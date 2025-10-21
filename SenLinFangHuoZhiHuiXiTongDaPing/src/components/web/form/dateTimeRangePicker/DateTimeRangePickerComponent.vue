<template>
  <el-date-picker
    v-if="isFormOrSearch && showComponent"
    type="datetimerange"
    format="YYYY-MM-DD hh:mm:ss"
    valueFormat="YYYY-MM-DD hh:mm:ss"
    :popper-class="popperClass"
    :class="customClass"
    :rangeSeparator="rangeSeparator"
    :startPlaceholder="startPlaceholder"
    :endPlaceholder="endPlaceholder"
    :editable="editable"
    :clearable="clearable"
    :disabled="effectDisabled"
    :readonly="effectReadonly"
    v-model="bindValue"
    @change="handleOnChange"
  />
  <div v-else-if="!isFormOrSearch && showComponent" class="wrap-style">
    <el-date-picker
      type="datetimerange"
      format="YYYY-MM-DD hh:mm:ss"
      valueFormat="YYYY-MM-DD hh:mm:ss"
      :popper-class="popperClass"
      :class="customClass"
      :rangeSeparator="rangeSeparator"
      :startPlaceholder="startPlaceholder"
      :endPlaceholder="endPlaceholder"
      :editable="editable"
      :clearable="clearable"
      :disabled="effectDisabled"
      :readonly="effectReadonly"
      v-model="bindValue"
      @change="handleOnChange"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
import { APPLICATION_TYPE } from "@/config/ip";
const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  compSize: {
    type: String,
    default: "default"
  },
  type: {
    type: String,
    default: "daterange"
  },
  rangeSeparator: {
    type: String,
    default: "至"
  },
  startPlaceholder: {
    type: String,
    default: "开始时间"
  },
  endPlaceholder: {
    type: String,
    default: "结束时间"
  },
  editable: {
    type: Boolean,
    default: false
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
  class: {
    type: String,
    default: ""
  },
  isFormOrSearch: {
    type: Boolean,
    default: true
  }
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
  return `custom-date-time-range-picker-${props.compSize} ${props.class}`;
});
let bindValue = ref([]);
watch(() => props.value, newValue => {
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

<style lang="less">
.custom-date-time-range-picker-superLarge.el-date-editor.el-input__wrapper {
  height: 52px;
  .el-range-input,
  .el-input__icon,
  .el-range-separator {
    font-size: 22px !important;
  }
}
.custom-date-time-range-picker-big.el-date-editor.el-input__wrapper {
  height: 48px;
  .el-range-input,
  .el-input__icon,
  .el-range-separator {
    font-size: 20px !important;
  }
}
.custom-date-time-range-picker-large.el-date-editor.el-input__wrapper {
  height: 44px;
  font-size: 18px !important;
  .el-range-input,
  .el-input__icon,
  .el-range-separator {
    font-size: 18px !important;
  }
}
.custom-date-time-range-picker-default.el-date-editor.el-input__wrapper {
  height: 40px;
  font-size: 16px !important;
  .el-range-input,
  .el-input__icon,
  .el-range-separator {
    font-size: 16px !important;
  }
}
.custom-date-time-range-picker-medium.el-date-editor.el-input__wrapper {
  height: 36px;
  font-size: 15px !important;
  .el-range-input,
  .el-input__icon,
  .el-range-separator {
    font-size: 15px !important;
  }
}
.custom-date-time-range-picker-small.el-date-editor.el-input__wrapper {
  height: 32px;
  font-size: 14px !important;
  .el-range-input,
  .el-input__icon,
  .el-range-separator {
    font-size: 14px !important;
  }
}
.custom-date-time-range-picker-mini.el-date-editor.el-input__wrapper {
  height: 28px;
  font-size: 13px !important;
  .el-range-input,
  .el-input__icon,
  .el-range-separator {
    font-size: 13px !important;
  }
}
</style>
