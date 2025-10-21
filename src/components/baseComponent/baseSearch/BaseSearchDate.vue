<template>
  <div class="search-dates-style">
    <span v-if="showSearchText" class="search-text">{{ searchText }}：</span>
    <el-date-picker
      class="search-date"
      unlink-panels
      clearable
      :editable="false"
      :start-placeholder="placeholderTextParam.startText"
      :end-placeholder="placeholderTextParam.endText"
      type="daterange"
      range-separator="至"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      v-model="dateValue"
      @change="emitSearch"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelData: {
    type: Array,
    default() {
      return [];
    }
  },
  showSearchText: {
    type: Boolean,
    default: true
  },
  searchText: {
    type: String,
    default: "关键字"
  },
  placeholderTextParam: {
    type: Object,
    default() {
      return {
        startText: "开始日期",
        endText: "结束日期"
      };
    }
  },
});
const emit = defineEmits(["update:modelData", "search"]);
let dateValue = ref("");
watch(() => props.modelData, value => {
  dateValue.value = value;
}, { immediate: true });
watch(dateValue, value => {
  const resultValue = value ? value : [];
  emit("update:modelData", resultValue);
});
function emitSearch() {
  const resultValue = dateValue.value ? dateValue.value : [];
  emit("update:modelData", resultValue);
  emit("search");
}
</script>

<style lang="less" scoped>
.search-dates-style {
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
  :deep(.el-date-editor) {
    width: 280px;
    .el-range-input {
      font-size: 14px;
      color: #333333;
    }
  }
}
</style>