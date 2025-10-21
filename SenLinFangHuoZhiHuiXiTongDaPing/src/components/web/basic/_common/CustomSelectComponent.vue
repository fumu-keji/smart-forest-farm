<template>
  <el-select
    v-if="!$attrs.compReadonly"
    :popper-class="popperClass"
    :class="customClass"
    placeholder="请选择"
    :filterable="$attrs.filterable"
    :allowCreate="$attrs.allowCreate"
    :clearable="true"
    :disabled="$attrs.compDisabled || $attrs.compReadonly"
    v-model="model"
    @change="handleOnChange"
  >
    <el-option
      v-for="(item, index) in optionItem"
      :key="index"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
  <span v-else class="readonly-span" :title="selectName">{{ selectName }}</span>
</template>

<script setup>
import { computed, useAttrs, ref, watch } from "vue";
const model = defineModel("modelValue");
const name = defineModel("name");
const attrs = useAttrs();
const popperClass = computed(() => {
  let className = `large-popper ${attrs.compSize}-web-popper`;
  if (attrs.checkedApplicationType !== "large") {
    className = `${attrs.compSize}-web-popper`;
  }
  return className;
});
const customClass = computed(() => {
  return [
    `custom-select-${attrs.compSize}`,
    { "readonly-wrap": !attrs.compDisabled && attrs.compReadonly },
  ];
});
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
const selectName = ref("");
watch(() => model.value, () => {
  let select = optionItem.value.find(item=>item.value === model.value);
  selectName.value = select ? select.name : "";
}, { immediate: true }
);
function handleOnChange(value) {
  let data = optionItem.value.find(item =>item.value === value);
  name.value = data ? data.value : "";
}
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
    font-size: 14x;
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

