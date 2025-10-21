<template>
  <el-radio-group
    v-if="!$attrs.compReadonly"
    :class="customClass"
    :fill="$attrs.fill"
    :textColor="$attrs.textColor"
    :disabled="$attrs.compDisabled || $attrs.compReadonly"
    v-model="model"
  >
    <template v-if="$attrs.buttonType">
      <el-radio-button
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item.value"
      >
        {{ item.name }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item.value"
        :border="$attrs.border"
      >
        {{ item.name }}
      </el-radio>
    </template>
  </el-radio-group>
  <span v-else class="readonly-span" :title="selectName">{{ selectName }}</span>
</template>

<script setup>
import { computed, useAttrs, watch } from "vue";
const attrs = useAttrs();
const model = defineModel("modelValue");
const customClass = computed(() => {
  return [
    `custom-radio-${attrs.compSize}`,
    { "readonly-wrap": !attrs.compDisabled && attrs.compReadonly },
  ];
});
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
const selectName = ref("");
watch(
  () => model.value,
  value => {
    let select = optionItem.value.find(item => item.value === model.value);
    selectName.value = select ? select.name : "";
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.readonly-wrap {
  // 非按钮模式无边框
  :deep(.el-radio.is-disabled) {
    cursor: pointer !important;
  }
  :deep(.el-radio__inner::after) {
    cursor: pointer !important;
    background-color: #ffffff !important;
  }
  :deep(.el-radio__input.is-checked.is-disabled .el-radio__inner) {
    border-color: var(--el-color-primary) !important;
    background-color: var(--el-color-primary) !important;
    cursor: pointer !important;
  }
  :deep(.el-radio__input.is-disabled .el-radio__inner) {
    cursor: pointer !important;
    background-color: #fff !important;
  }
  :deep(.el-radio__input.is-checked.is-disabled + .el-radio__label) {
    color: var(--el-color-primary) !important;
    cursor: pointer !important;
  }
  :deep(.el-radio__input.is-disabled + .el-radio__label) {
    color: #606266 !important;
    cursor: pointer !important;
  }
  // 按钮模式
  :deep(.el-radio-button.is-active.is-disabled .el-radio-button__inner) {
    color: #ffffff !important;
  }
  :deep(.el-radio-button.is-disabled .el-radio-button__inner) {
    color: #606266 !important;
    cursor: pointer !important;
  }
}
</style>
<style lang="less">
.custom-radio-superLarge {
  .el-radio__inner {
    width: 28px;
    height: 28px;
  }
  .el-radio__inner::after {
    width: 10px;
    height: 10px;
  }
  .el-radio__label {
    position: relative;
    top: -2px;
    font-size: 22px;
  }
  .el-radio-button__inner {
    padding: 14px 26px;
    font-size: 22px;
  }
  .el-radio.is-bordered {
    padding: 25px 20px;
  }
}
.custom-radio-big {
  .el-radio__inner {
    width: 26px;
    height: 26px;
  }
  .el-radio__inner::after {
    width: 8px;
    height: 8px;
  }
  .el-radio__label {
    font-size: 20px;
  }
  .el-radio-button__inner {
    padding: 13px 24px;
    font-size: 20px;
  }
  .el-radio.is-bordered {
    padding: 23px 18px;
  }
}
.custom-radio-large {
  .el-radio__inner {
    width: 24px;
    height: 24px;
  }
  .el-radio__inner::after {
    width: 7px;
    height: 7px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 18px;
  }
  .el-radio-button__inner {
    padding: 12px 22px;
    font-size: 18px;
  }
  .el-radio.is-bordered {
    padding: 21px 16px;
  }
}
.custom-radio-default {
  .el-radio__inner {
    width: 22px;
    height: 22px;
  }
  .el-radio__inner::after {
    width: 6px;
    height: 6px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 16px;
  }
  .el-radio-button__inner {
    padding: 10px 20px;
    font-size: 16px;
  }
  .el-radio.is-bordered {
    padding: 19px 14px;
  }
}
.custom-radio-medium {
  .el-radio__inner {
    width: 20px;
    height: 20px;
  }
  .el-radio__inner::after {
    width: 5px;
    height: 5px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 15px;
  }
  .el-radio-button__inner {
    padding: 9px 18px;
    font-size: 15px;
  }
  .el-radio.is-bordered {
    padding: 17px 12px;
  }
}
.custom-radio-small {
  .el-radio__inner {
    width: 18px;
    height: 18px;
  }
  .el-radio__inner::after {
    width: 4px;
    height: 4px;
  }
  .el-radio__label {
    position: relative;
    top: -1px;
    font-size: 14px;
  }
  .el-radio-button__inner {
    padding: 8px 16px;
    font-size: 14px;
  }
  .el-radio.is-bordered {
    padding: 15px 10px;
  }
}
.custom-radio-mini {
  .el-radio__inner {
    width: 16px;
    height: 16px;
  }
  .el-radio__inner::after {
    width: 4px;
    height: 4px;
  }
  .el-radio__label {
    position: relative;
    top: -2px;
    font-size: 13px;
  }
  .el-radio-button__inner {
    padding: 6px 14px;
    font-size: 13px;
  }
  .el-radio.is-bordered {
    height: 28px !important;
    padding: 0 8px;
  }
}
</style>

