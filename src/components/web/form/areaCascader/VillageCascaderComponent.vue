<template>
  <el-cascader
    v-if="isFormOrSearch && showComponent"
    ref="cascaderRef"
    :popper-class="popperClass"
    :class="customClass"
    :placeholder="placeholder"
    :separator="separator"
    :showAllLevels="showAllLevels"
    :filterable="filterable"
    :clearable="clearable"
    :disabled="effectDisabled || effectReadonly"
    :props="cascaderProps"
    v-model="modelValue"
    @change="handleOnChange"
  />
  <div v-else-if="!isFormOrSearch && showComponent" class="warp-style">
    <el-cascader
      ref="cascaderRef"
      :popper-class="popperClass"
      :class="customClass"
      :placeholder="placeholder"
      :separator="separator"
      :showAllLevels="showAllLevels"
      :filterable="filterable"
      :clearable="clearable"
      :disabled="effectDisabled || effectReadonly"
      :props="cascaderProps"
      v-model="modelValue"
      @change="handleOnChange"
    />
  </div>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from "vue";
import { useFormItemAttr } from "@/hooks/formItemHooks.js";
import { isEmpty } from "@/utils/functionUtil";
import { APPLICATION_TYPE } from "@/config/ip";
const { proxy } = getCurrentInstance();
const props = defineProps({
  areaName: {
    type: String,
    default: ""
  },
  areaCascaderType: {
    type: String,
    default: "area"
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
    default: true
  },
  filterable: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
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
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const emit = defineEmits(["change", "update:areaName"]);
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
const cascaderProps = computed(() => {
  return {
    label: "name",
    value: "code",
    emitPath: false,
    lazy: true,
    lazyLoad: loadOptions
  };
});
let cascaderRef = ref(null);
function loadOptions(node, resolve) {
  let { level } = node;
  let code, list;
  if (level == 0) {
    code = "0";
  } else {
    code = node.data.code;
  }
  proxy.$getDataAxios.getAreaData(code).then(res => {
    if (res.data) {
      list = res.data;
      resolve(list);
    } else {
      resolve([]);
    }
  });
}
function handleOnChange(value) {
  let areaName = "";
  if (!isEmpty(value)) {
    const areaNameArray = cascaderRef.value.getCheckedNodes()[0].pathLabels;
    if (props.showAllLevels) {
      areaName = areaNameArray.join(props.separator);
    } else {
      areaName = areaNameArray[areaNameArray.length - 1];
    }
  }
  emit("update:areaName", areaName);
  emit("change", value);
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

