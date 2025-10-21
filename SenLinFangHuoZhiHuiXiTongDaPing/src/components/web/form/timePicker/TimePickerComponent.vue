<template>
  <el-time-picker
    v-if="isFormOrSearch && showComponent"
    format="hh:mm:ss"
    valueFormat="hh:mm:ss"
    :popper-class="popperClass"
    :class="customClass"
    :placeholder="placeholder"
    :editable="editable"
    :clearable="clearable"
    :disabled="effectDisabled"
    :readonly="effectReadonly"
    v-model="modelValue"
    @change="emit('change', $event)"
  />
  <div v-else-if="!isFormOrSearch && showComponent" class="warp-style">
    <el-time-picker
      format="hh:mm:ss"
      valueFormat="hh:mm:ss"
      :popper-class="popperClass"
      :class="customClass"
      :placeholder="placeholder"
      :editable="editable"
      :clearable="clearable"
      :disabled="effectDisabled"
      :readonly="effectReadonly"
      v-model="modelValue"
      @change="emit('change', $event)"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { APPLICATION_TYPE } from "@/config/ip";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  placeholder: {
    type: String,
    default: "请选择时间"
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
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const emit = defineEmits(["change"]);
const popperClass = computed(() => {
  let className = `large-popper ${props.compSize}-web-popper`;
  if (APPLICATION_TYPE !== "large") {
    className = `${props.compSize}-web-popper`;
  }
  return className;
});
const customClass = computed(() => {
  return `custom-time-picker-${props.compSize} ${props.class}`;
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

<style lang="less">
.custom-time-picker-superLarge.el-date-editor.el-input {
  height: 52px !important;
  font-size: 22px;
  .el-input__icon {
    font-size: 22px !important;
  }
}
.custom-time-picker-big.el-date-editor.el-input {
  height: 48px !important;
  font-size: 20px;
  .el-input__icon {
    font-size: 20px !important;
  }
}
.custom-time-picker-large.el-date-editor.el-input {
  height: 44px !important;
  font-size: 18px;
  .el-input__icon {
    font-size: 18px !important;
  }
}
.custom-time-picker-default.el-date-editor.el-input {
  height: 40px !important;
  font-size: 16px;
  .el-input__icon {
    font-size: 16px !important;
  }
}
.custom-time-picker-medium.el-date-editor.el-input {
  height: 36px !important;
  font-size: 15px;
  .el-input__icon {
    font-size: 15px !important;
  }
}
.custom-time-picker-small.el-date-editor.el-input {
  height: 32px !important;
  font-size: 14px;
  .el-input__icon {
    font-size: 14px !important;
  }
}
.custom-time-picker-mini.el-date-editor.el-input {
  height: 28px !important;
  font-size: 13px;
  .el-input__icon {
    font-size: 13px !important;
  }
}
</style>