<template>
  <el-checkbox-group
    v-if="!$attrs.compReadonly"
    :class="customClass"
    :fill="$attrs.fill"
    :textColor="$attrs.textColor"
    :min="parseInt($attrs.min)"
    :max="parseInt($attrs.max)"
    :disabled="$attrs.compDisabled || $attrs.compReadonly"
    v-model="bindValue"
  >
    <template v-if="$attrs.buttonType">
      <el-checkbox-button
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item.value"
      >
        {{ item.name }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="(item, index) in optionItem"
        :key="index"
        :value="item.value"
        :border="$attrs.border"
      >
        {{ item.name }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
  <span v-else class="readonly-span" :title="selectName">{{ selectName }}</span>
</template>

<script setup>
import { computed, useAttrs, watch } from "vue";
import { isEmpty } from "../../../../utils/functionUtil";

const attrs = useAttrs();
const modelValue = defineModel("modelValue");
const emit = defineEmits(["update:modelValue"]);
const customClass = computed(() => {
  return [
    `custom-checkbox-${attrs.compSize}`,
    { "readonly-wrap": !attrs.compDisabled && attrs.compReadonly },
  ];
});
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
const selectName = ref("");
const bindValue = ref([]);
watch(
  () => modelValue.value,
  async newValue => {
    bindValue.value = !isEmpty(newValue) ? newValue.split(",") : [];
    await nextTick();
    let selectArr = optionItem.value.filter(item => {
      return bindValue.value.includes(item.value);
    });
    const nameArr = selectArr.map(item => item.name);
    selectName.value = nameArr.join(",");
  },
  {
    immediate: true,
  }
);
watch(
  () => bindValue.value,
  value => {
    emit("update:modelValue", value.join(","));
  }
);
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
</style>
<style lang="less">
.custom-checkbox-superLarge {
  .el-checkbox__inner {
    width: 28px;
    height: 28px;
  }
  .el-checkbox__inner::after {
    width: 9px;
    height: 15px;
    left: 9px;
    top: 2px;
  }
  .el-checkbox__label {
    font-size: 22px;
  }
  .el-checkbox-button__inner {
    padding: 14px 26px;
    font-size: 22px;
  }
  .el-checkbox.is-bordered {
    padding: 25px 20px;
  }
}
.custom-checkbox-big {
  .el-checkbox__inner {
    width: 26px;
    height: 26px;
  }
  .el-checkbox__inner::after {
    width: 8px;
    height: 13px;
    left: 8px;
    top: 2px;
  }
  .el-checkbox__label {
    font-size: 20px;
  }
  .el-checkbox-button__inner {
    padding: 13px 24px;
    font-size: 20px;
  }
  .el-checkbox.is-bordered {
    padding: 23px 18px;
  }
}
.custom-checkbox-large {
  .el-checkbox__inner {
    width: 24px;
    height: 24px;
  }
  .el-checkbox__inner::after {
    width: 7px;
    height: 12px;
    left: 7px;
    top: 2px;
  }
  .el-checkbox__label {
    position: relative;
    top: -1px;
    font-size: 18px;
  }
  .el-checkbox-button__inner {
    padding: 12px 22px;
    font-size: 18px;
  }
  .el-checkbox.is-bordered {
    padding: 21px 16px;
  }
}
.custom-checkbox-default {
  .el-checkbox__inner {
    width: 22px;
    height: 22px;
  }
  .el-checkbox__inner::after {
    width: 6px;
    height: 11px;
    left: 6px;
    top: 2px;
  }
  .el-checkbox__label {
    position: relative;
    top: -1px;
    font-size: 16px;
  }
  .el-checkbox-button__inner {
    padding: 10px 20px;
    font-size: 16px;
  }
  .el-checkbox.is-bordered {
    padding: 19px 14px;
  }
}
.custom-checkbox-medium {
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }
  .el-checkbox__inner::after {
    width: 5px;
    height: 10px;
    left: 6px;
    top: 2px;
  }
  .el-checkbox__label {
    position: relative;
    top: -1px;
    font-size: 15px;
  }
  .el-checkbox-button__inner {
    padding: 9px 18px;
    font-size: 15px;
  }
  .el-checkbox.is-bordered {
    padding: 17px 12px;
  }
}
.custom-checkbox-small {
  .el-checkbox__inner {
    width: 18px;
    height: 18px;
  }
  .el-checkbox__inner::after {
    width: 4px;
    height: 9px;
    left: 6px;
    top: 2px;
  }
  .el-checkbox__label {
    position: relative;
    top: -1px;
    font-size: 14px;
  }
  .el-checkbox-button__inner {
    padding: 8px 16px;
    font-size: 14px;
  }
  .el-checkbox.is-bordered {
    padding: 15px 10px;
  }
}
.custom-checkbox-mini {
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  .el-checkbox__inner::after {
    width: 3px;
    height: 8px;
    left: 5px;
    top: 1px;
  }
  .el-checkbox__label {
    position: relative;
    top: -2px;
    font-size: 13px;
  }
  .el-checkbox-button__inner {
    padding: 6px 14px;
    font-size: 13px;
  }
  .el-checkbox.is-bordered {
    height: 28px !important;
    padding: 0 8px;
  }
}
</style>

