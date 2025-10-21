<template>
  <div class="search-input-tyle">
    <span v-if="showSearchText" class="search-text">{{ searchText }}：</span>
    <el-input
      clearable
      class="search-input"
      :placeholder="placeholderText"
      v-model="inputValue"
      @keyup.enter="emitSearch"
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
  }
});
const emit = defineEmits(["update:modelData", "search"]);
let inputValue = ref("");
watch(() => props.modelData, value => {
  inputValue.value = value;
}, { immediate: true });
watch(inputValue, value => {
  emit("update:modelData", value);
});
function emitSearch() {
  emit("search");
}
</script>

<style lang="less" scoped>
.search-input-tyle {
  display: inline-flex;
  margin-right: 15px;
  align-items: center;
  .search-text {
    position: relative;
    top: -1px;
    display: inline-block;
    font-size: 15px;
    color: #333333;
  }
  :deep(.search-input) {
    width: 240px;
    .el-input__inner {
      font-size: 14px;
      color: #333333;
    }
  }
}
</style>