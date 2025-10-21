<template>
  <div class="search-select-style">
    <span v-if="showSearchText" class="search-text">{{ searchText }}：</span>
    <el-select
      class="search-select"
      :placeholder="placeholderText"
      :loading="getDataLoading"
      :filterable="filterableFlag"
      clearable
      v-model="selectValue"
      @visible-change="changHideShow"
    >
      <el-option
        v-for="item in items"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
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
  items: {
    type: Array,
    default() {
      return [];
    }
  },
  getDataLoading: {
    type: Boolean,
    default: false
  },
  filterableFlag: {
    type: Boolean,
    default: false
  },
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
function changHideShow(show) {
  if (show) {
    emit("optionShow");
  }
}
</script>
<style lang="less" scoped>
.search-select-style {
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
  :deep(.search-select) {
    width: 240px;
    .el-input__inner {
      font-size: 14px;
      color: #333333;
    }
  }
}
</style>
