<template>
  <el-switch
    v-if="showComponent"
    :class="customClass"
    :activeText="activeText"
    :inactiveText="inactiveText"
    :disabled="effectDisabled || effectReadonly"
    v-model="modelValue"
    @change="emit('change', $event)"
  />
</template>

<script setup>
import { computed } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  activeText: {
    type: String,
    default: ""
  },
  inactiveText: {
    type: String,
    default: ""
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
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const emit = defineEmits(["change"]);
const customClass = computed(() => {
  return [
    "switch-render-box",
    `custom-switch-${props.compSize}`,
    { "readonly-wrap": !effectDisabled.value && effectReadonly.value }
  ];
});
// 控制组件属性
const {
  showComponent,
  disabledComponent,
  effectDisabled,
  effectReadonly,
  readonlyComponent
} = useFormItemAttr(props);
// 导出配置属性
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>

<style lang="less" scoped>
.switch-render-box {
  vertical-align: top;
}
.switch-render-box.readonly-wrap {
  &.is-disabled {
    opacity: 1 !important;
  }
  &.is-disabled {
    :deep(.el-switch__core) {
      cursor: pointer !important;
    }
  }
  &.is-disabled {
    :deep(.el-switch__label) {
      cursor: pointer !important;
    }
  }
}
.custom-switch-superLarge {
  height: 52px;
  :deep(.el-switch__label *) {
    font-size: 20px;
  }
  :deep(.el-switch__inner .is-text) {
    font-size: 20px;
  }
  :deep(.el-switch__core) {
    min-width: 150px;
    height: 52px;
    border-radius: 26px;
    .el-switch__action {
      width: 46px;
      height: 46px;
    }
  }
  &.is-checked {
    :deep(.el-switch__action) {
      left: calc(100% - 47px) !important;
    }
  }
}
.custom-switch-big {
  height: 48px;
  :deep(.el-switch__label *) {
    font-size: 20px;
  }
  :deep(.el-switch__inner .is-text) {
    font-size: 20px;
  }
  :deep(.el-switch__core) {
    min-width: 130px;
    height: 48px;
    border-radius: 24px;
    .el-switch__action {
      width: 44px;
      height: 44px;
    }
  }
  &.is-checked {
    :deep(.el-switch__action) {
      left: calc(100% - 45px) !important;
    }
  }
}
.custom-switch-large {
  height: 44px;
  :deep(.el-switch__label *) {
    font-size: 18px;
  }
  :deep(.el-switch__inner .is-text) {
    font-size: 18px;
  }
  :deep(.el-switch__core) {
    min-width: 130px;
    height: 44px;
    border-radius: 22px;
    .el-switch__action {
      width: 40px;
      height: 40px;
    }
  }
  &.is-checked {
    :deep(.el-switch__action) {
      left: calc(100% - 41px) !important;
    }
  }
}
.custom-switch-default {
  height: 40px;
  :deep(.el-switch__label *) {
    font-size: 16px;
  }
  :deep(.el-switch__inner .is-text) {
    font-size: 16px;
  }
  :deep(.el-switch__core) {
    min-width: 110px;
    height: 40px;
    border-radius: 20px;
    .el-switch__action {
      width: 36px;
      height: 36px;
    }
  }
  &.is-checked {
    :deep(.el-switch__action) {
      left: calc(100% - 37px) !important;
    }
  }
}
.custom-switch-medium {
  height: 36px;
  :deep(.el-switch__label *) {
    font-size: 15px;
  }
  :deep(.el-switch__inner .is-text) {
    font-size: 15px;
  }
  :deep(.el-switch__core) {
    min-width: 90px;
    height: 36px;
    border-radius: 18px;
    .el-switch__action {
      width: 32px;
      height: 32px;
    }
  }
  &.is-checked {
    :deep(.el-switch__action) {
      left: calc(100% - 33px) !important;
    }
  }
}
.custom-switch-small {
  height: 32px;
  :deep(.el-switch__label *) {
    font-size: 14px;
  }
  :deep(.el-switch__inner .is-text) {
    font-size: 14px;
  }
  :deep(.el-switch__core) {
    min-width: 70px;
    height: 32px;
    border-radius: 16px;
    .el-switch__action {
      width: 28px;
      height: 28px;
    }
  }
  &.is-checked {
    :deep(.el-switch__action) {
      left: calc(100% - 29px) !important;
    }
  }
}
.custom-switch-mini {
  height: 28px;
  :deep(.el-switch__label *) {
    font-size: 13px;
  }
  :deep(.el-switch__inner .is-text) {
    font-size: 13px;
  }
  :deep(.el-switch__core) {
    min-width: 50px;
    height: 28px;
    border-radius: 14px;
    .el-switch__action {
      width: 24px;
      height: 24px;
    }
  }
  &.is-checked {
    :deep(.el-switch__action) {
      left: calc(100% - 25px) !important;
    }
  }
}
</style>

