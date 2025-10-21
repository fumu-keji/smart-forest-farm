<template>
  <el-input
    v-if="!$attrs.compReadonly"
    :class="customClass"
    :type="$attrs.type"
    placeholder="请输入"
    :maxlength="$attrs.maxlength"
    :showWordLimit="$attrs.showWordLimit"
    :showPassword="$attrs.showPassword"
    :prefixIcon="$attrs.prefixIcon"
    :suffixIcon="$attrs.suffixIcon"
    :clearable="true"
    :disabled="$attrs.compDisabled"
    :readonly="$attrs.compReadonly"
    v-model="model"
  >
    <template v-if="$attrs.prependContent" #prepend>
      {{ $attrs.prependContent }}
    </template>
    <template v-if="$attrs.appendContent" #append>
      {{ $attrs.appendContent }}
    </template>
  </el-input>
  <span v-else class="readonly-span" :title="model">{{ model }}</span>
</template>

<script setup>
import { computed, useAttrs } from "vue";
const model = defineModel("modelValue");
const attrs = useAttrs();
const customClass = computed(() => {
  return `custom-input-${attrs.compSize}`;
});
</script>

<style lang="less" scoped>
.custom-input-superLarge.el-input {
  height: 52px;
  font-size: 22px;
  :deep(.el-input__icon) {
    font-size: 22px !important;
  }
}
.custom-input-big.el-input {
  height: 48px;
  font-size: 20px;
  :deep(.el-input__icon) {
    font-size: 20px !important;
  }
}
.custom-input-large.el-input {
  height: 44px;
  font-size: 18px;
  :deep(.el-input__icon) {
    font-size: 18px !important;
  }
}
.custom-input-default.el-input {
  height: 40px;
  font-size: 16px;
  :deep(.el-input__icon) {
    font-size: 16px !important;
  }
}
.custom-input-medium.el-input {
  height: 36px;
  font-size: 15px;
  :deep(.el-input__icon) {
    font-size: 15px !important;
  }
}
.custom-input-small.el-input {
  height: 32px;
  font-size: 14px;
  :deep(.el-input__icon) {
    font-size: 14px !important;
  }
}
.custom-input-mini.el-input {
  height: 28px;
  font-size: 13px;
  :deep(.el-input__icon) {
    font-size: 13px !important;
  }
}
</style>