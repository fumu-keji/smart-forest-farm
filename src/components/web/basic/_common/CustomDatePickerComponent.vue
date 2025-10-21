<template>
  <el-date-picker
    v-if="!$attrs.compReadonly"
    :popper-class="popperClass"
    :class="customClass"
    type="date"
    format="YYYY-MM-DD"
    valueFormat="YYYY-MM-DD"
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
  return `custom-date-picker-${attrs.compSize}`;
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
.custom-date-picker-superLarge.el-date-editor.el-input {
  height: 52px;
  font-size: 22px;
  .el-input__icon {
    font-size: 22px !important;
  }
}
.custom-date-picker-big.el-date-editor.el-input {
  height: 48px;
  font-size: 20px;
  .el-input__icon {
    font-size: 20px !important;
  }
}
.custom-date-picker-large.el-date-editor.el-input {
  height: 44px;
  font-size: 18px;
  .el-input__icon {
    font-size: 18px !important;
  }
}
.custom-date-picker-default.el-date-editor.el-input {
  height: 40px;
  font-size: 16px;
  .el-input__icon {
    font-size: 16px !important;
  }
}
.custom-date-picker-medium.el-date-editor.el-input {
  height: 36px;
  font-size: 15px;
  .el-input__icon {
    font-size: 15px !important;
  }
}
.custom-date-picker-small.el-date-editor.el-input {
  height: 32px;
  font-size: 14px;
  .el-input__icon {
    font-size: 14px !important;
  }
}
.custom-date-picker-mini.el-date-editor.el-input {
  height: 28px;
  font-size: 13px;
  .el-input__icon {
    font-size: 13px !important;
  }
}
</style>