<template>
  <el-rate
    v-if="showComponent"
    :class="customClass"
    :max="max"
    :lowThreshold="lowThreshold"
    :highThreshold="highThreshold"
    :showScore="showScore"
    :allowHalf="allowHalf"
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
  max: {
    type: Number,
    default: 5
  },
  lowThreshold: {
    type: Number,
    default: 2
  },
  highThreshold: {
    type: Number,
    default: 4
  },
  showScore: {
    type: Boolean,
    default: true
  },
  allowHalf: {
    type: Boolean,
    default: false
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
    "rate-render-box",
    `custom-rate-${props.compSize}`,
    { "disabled-wrap": effectDisabled.value },
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
.rate-render-box {
  vertical-align: top;
}
.rate-render-box.disabled-wrap {
  cursor: not-allowed !important;
  :deep(.el-rate__item) {
    cursor: not-allowed !important;
  }
}
.el-rate.readonly-wrap {
  cursor: pointer !important;
  :deep(.el-rate__item) {
    cursor: pointer !important;
  }
}
.custom-rate-superLarge.el-rate {
  :deep(.el-rate__icon) {
    font-size: 24px;
  }
  :deep(.el-rate__text) {
    font-size: 22px;
  }
}
.custom-rate-big.el-rate {
  :deep(.el-rate__icon) {
    font-size: 22px;
  }
  :deep(.el-rate__text) {
    font-size: 20px;
  }
}
.custom-rate-large.el-rate {
  :deep(.el-rate__icon) {
    font-size: 20px;
  }
  :deep(.el-rate__text) {
    font-size: 18px;
  }
}
.custom-rate-default.el-rate {
  :deep(.el-rate__icon) {
    font-size: 18px;
  }
  :deep(.el-rate__text) {
    font-size: 16px;
  }
}
.custom-rate-medium.el-rate {
  :deep(.el-rate__icon) {
    font-size: 16px;
  }
  :deep(.el-rate__text) {
    font-size: 15px;
  }
}
.custom-rate-small.el-rate {
  :deep(.el-rate__icon) {
    font-size: 15px;
  }
  :deep(.el-rate__text) {
    font-size: 14px;
  }
}
.custom-rate-mini.el-rate {
  :deep(.el-rate__icon) {
    font-size: 14px;
  }
  :deep(.el-rate__text) {
    font-size: 13px;
  }
}
</style>

