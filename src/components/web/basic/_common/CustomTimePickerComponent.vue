<template>
  <el-time-picker
    v-if="!$attrs.compReadonly"
    format="HH:mm:ss"
    valueFormat="HH:mm:ss"
    :popper-class="popperClass"
    :class="customClass"
    placeholder="请选择日期"
    :editable="$attrs.editable"
    :clearable="true"
    :disabled="$attrs.compDisabled"
    :readonly="$attrs.compReadonly"
    v-model="model"
  />
  <span v-else class="readonly-span" :title="model">{{ model }}</span>
</template>

<script setup>
import { computed, useAttrs } from "vue";
const attrs = useAttrs();
const model = defineModel("modelValue");
const customClass = computed(() => {
  return `custom-time-picker-${attrs.compSize}`;
});
const popperClass = computed(() => {
  let className = `large-popper ${attrs.compSize}-web-popper`;
  if (attrs.checkedApplicationType !== "large") {
    className = `${attrs.compSize}-web-popper`;
  }
  return className;
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