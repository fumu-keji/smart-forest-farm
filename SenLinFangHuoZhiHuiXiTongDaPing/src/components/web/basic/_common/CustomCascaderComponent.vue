<template>
  <el-cascader
    v-if="!$attrs.compReadonly"
    :popper-class="popperClass"
    :class="customClass"
    placeholder="请选择"
    :separator="$attrs.separator"
    :showAllLevels="$attrs.showAllLevels"
    :filterable="$attrs.filterable"
    :clearable="true"
    :disabled="$attrs.compDisabled || $attrs.compReadonly"
    :options="optionItem"
    :props="{
      label: 'name',
      value: 'value',
      emitPath: false,
    }"
    v-model="modelValue"
    @change="handleChange"
  />
  <span v-else class="readonly-span" :title="selectName">{{ selectName }}</span>
</template>

<script setup>
import { computed, useAttrs } from "vue";
import { treeFindPath } from "../../../../utils/functionUtil";

const modelValue = defineModel("modelValue");
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();
const customClass = computed(() => {
  return [
    "cascader-render-box",
    `custom-cascader-${attrs.compSize}`,
    { "readonly-wrap": !attrs.compDisabled && attrs.compReadonly },
  ];
});
const popperClass = computed(() => {
  let className = `large-popper ${attrs.compSize}-web-popper`;
  if (attrs.checkedApplicationType !== "large") {
    className = `${attrs.compSize}-web-popper`;
  }
  return className;
});
const optionItem = computed(() => {
  return attrs.setting.optionItem;
});
const selectName = ref("");
onMounted(() => {
  initLabelData();
});
function initLabelData() {
  if (modelValue.value) {
    const resultArray = treeFindPath(
      optionItem.value,
      data => data.value === modelValue.value,
      "name"
    );
    selectName.value = resultArray.join("/");
  } else {
    selectName.value = "";
  }
}
function handleChange(val) {
  if (val) {
    const resultArray = treeFindPath(
      optionItem.value,
      data => data.value === val,
      "name"
    );
    selectName.value = resultArray.join("/");
  } else {
    selectName.value = "";
  }
}
</script>

<style lang="less">
.cascader--render-box.readonly-wrap {
  .el-input {
    cursor: pointer !important;
  }
  .el-input__wrapper {
    background-color: #ffffff !important;
    box-shadow: 0 0 0 1px #dcdfe6 inset !important;
  }
  .el-input__inner {
    cursor: pointer !important;
    color: #606266 !important;
    -webkit-text-fill-color: #606266 !important;
  }
  .el-input__icon {
    cursor: pointer !important;
  }
}
.custom-cascader-superLarge {
  height: 52px;
  .el-input {
    height: 100%;
    font-size: 22px;
  }
  .el-input__icon {
    font-size: 22px !important;
  }
}
.custom-cascader-big {
  height: 48px;
  .el-input {
    height: 100%;
    font-size: 20px;
  }
  .el-input__icon {
    font-size: 20px !important;
  }
}
.custom-cascader-large {
  height: 44px;
  .el-input {
    height: 100%;
    font-size: 18px;
  }
  .el-input__icon {
    font-size: 18px !important;
  }
}
.custom-cascader-default {
  height: 40px;
  .el-input {
    height: 100%;
    font-size: 16px;
  }
  .el-input__icon {
    font-size: 16px !important;
  }
}
.custom-cascader-medium {
  height: 36px;
  .el-input {
    height: 100%;
    font-size: 15px;
  }
  .el-input__icon {
    font-size: 15px !important;
  }
}
.custom-cascader-small {
  height: 32px;
  .el-input {
    height: 100%;
    font-size: 14px;
  }
  .el-input__icon {
    font-size: 14px !important;
  }
}
.custom-cascader-mini {
  height: 28px;
  .el-input {
    height: 100%;
    font-size: 13px;
  }
  .el-input__icon {
    font-size: 13px !important;
  }
}
</style>

