<template>
  <el-cascader
    v-if="isFormOrSearch && showComponent"
    :popper-class="popperClass"
    :class="customClass"
    :placeholder="placeholder"
    :separator="separator"
    :showAllLevels="showAllLevels"
    :filterable="filterable"
    :clearable="clearable"
    :disabled="effectDisabled || effectReadonly"
    :props="{
      label: dataModelFieldLabel,
      value: dataModelFieldValue,
      checkStrictly: checkStrictly,
    }"
    :options="resultOptionItem"
    v-model="bindValue"
    @change="handleOnChange"
  />
  <div v-else-if="!isFormOrSearch && showComponent" class="warp-style">
    <el-cascader
      :popper-class="popperClass"
      :class="customClass"
      :placeholder="placeholder"
      :separator="separator"
      :showAllLevels="showAllLevels"
      :filterable="filterable"
      :clearable="clearable"
      :disabled="effectDisabled || effectReadonly"
      :props="{
        label: dataModelFieldLabel,
        value: dataModelFieldValue,
        checkStrictly: checkStrictly,
      }"
      :options="resultOptionItem"
      v-model="bindValue"
      @change="handleOnChange"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
import { APPLICATION_TYPE } from "@/config/ip";
/**
 * 基础相关
 */
const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  compSize: {
    type: String,
    default: "default"
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  separator: {
    type: String,
    default: "/"
  },
  showAllLevels: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  checkStrictly: {
    type: Boolean,
    default: false
  },
  optionItem: {
    type: Array,
    default: () => []
  },
  dataModelFieldValue: {
    type: String,
    default: "value"
  },
  dataModelFieldLabel: {
    type: String,
    default: "name"
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
const emit = defineEmits(["change", "update:value"]);
const popperClass = computed(() => {
  let className = `large-popper ${props.compSize}-web-popper`;
  if (APPLICATION_TYPE !== "large") {
    className = `${props.compSize}-web-popper`;
  }
  return className;
});
const customClass = computed(() => {
  return [
    "cascader-render-box",
    `custom-cascader-${props.compSize}`,
    { "readonly-wrap": !effectDisabled.value && effectReadonly.value },
    props.class
  ];
});
/**
 * 值绑定相关
 */
let bindValue = ref([]);
let resultOptionItem = computed(() => {
  return transformTreeData(props.optionItem);
});
// 过滤级联相关节点数据
function transformTreeData(data) {
  if (isEmpty(data)) {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length === 0) {
      delete data[i].children;
    } else {
      transformTreeData(data[i].children);
    }
  }
  return data;
}
watch(() => props.value, newValue => {
  bindValue.value = !isEmpty(newValue) ? newValue.split(",") : [];
}, { immediate: true });
function handleOnChange(value) {
  const updateValue = !isEmpty(value) ? value.join(",") : "";
  emit("update:value", updateValue);
  emit("change", updateValue);
}
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