<template>
  <el-input
    v-if="showComponent"
    type="textarea"
    :class="customClass"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :showWordLimit="showWordLimit"
    :rows="parseInt(rows)"
    :disabled="effectDisabled"
    :readonly="effectReadonly"
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
  placeholder: {
    type: String,
    default: "请输入"
  },
  rows: {
    type: [String, Number],
    default: "3"
  },
  maxlength: {
    type: [String, Number],
    default: "200"
  },
  showWordLimit: {
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
  return `custom-textarea-${props.compSize}`;
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
.custom-textarea-superLarge.el-textarea {
  :deep(.el-textarea__inner) {
    font-size: 22px;
  }
  :deep(.el-input__count) {
    font-size: 22px !important;
  }
}
.custom-textarea-big.el-textarea {
  :deep(.el-textarea__inner) {
    font-size: 20px;
  }
  :deep(.el-input__count) {
    font-size: 20px !important;
  }
}
.custom-textarea-large.el-textarea {
  :deep(.el-textarea__inner) {
    font-size: 18px;
  }
  :deep(.el-input__count) {
    font-size: 18px !important;
  }
}
.custom-textarea-default.el-textarea {
  :deep(.el-textarea__inner) {
    font-size: 16px;
  }
  :deep(.el-input__count) {
    font-size: 16px !important;
  }
}
.custom-textarea-medium.el-textarea {
  :deep(.el-textarea__inner) {
    font-size: 15px;
  }
  :deep(.el-input__count) {
    font-size: 15px !important;
  }
}
.custom-textarea-small.el-textarea {
  :deep(.el-textarea__inner) {
    font-size: 14px;
  }
  :deep(.el-input__count) {
    font-size: 14px !important;
  }
}
.custom-textarea-mini.el-textarea {
  :deep(.el-textarea__inner) {
    font-size: 13px;
  }
  :deep(.el-input__count) {
    font-size: 13px !important;
  }
}
</style>