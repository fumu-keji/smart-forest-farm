<template>
  <div class="search-cascader-style">
    <span v-if="showSearchText" class="search-text">{{ searchText }}：</span>
    <el-cascader
      class="search-cascader"
      clearable
      :props="{
        ...cascaderProps,
        emitPath: false,
        checkStrictly: true,
      }"
      :options="options"
      :show-all-levels="false"
      :placeholder="placeholderText"
      v-model="selectValue"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelData: {
    type: [String, Number],
    default: ""
  },
  showSearchText: {
    type: Boolean,
    default: true
  },
  searchText: {
    type: String,
    default: "关键字"
  },
  placeholderText: {
    type: String,
    default: "请输入"
  },
  options: {
    type: Array,
    default() {
      return [];
    }
  },
  cascaderProps: {
    type: Object,
    default() {
      return {
        value: "value",
        label: "label"
      };
    }
  }
});
const emit = defineEmits(["update:modelData", "search", "optionShow"]);
let selectValue = ref("");
watch(() => props.modelData, value => {
  selectValue.value = value;
}, { immediate: true });
watch(selectValue, value => {
  emit("update:modelData", value);
  emit("search");
});
</script>

<style lang="less" scoped>
.search-cascader-style {
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  .search-text {
    position: relative;
    top: -1px;
    display: inline-block;
    font-size: 15px;
    color: #333333;
  }
  :deep(.search-cascader) {
    width: 240px;
    .el-input__inner {
      font-size: 14px;
      color: #333333;
    }
  }
}
</style>