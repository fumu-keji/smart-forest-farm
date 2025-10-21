<template>
  <div class="filter-list-item">
    <span class="filter-list-label">{{ label }}：</span>
    <div class="filter-list-box">
      <div
        v-for="item in itemOptions"
        :key="item.value"
        :class="['filter-item', { actived: modelValue === item.value }]"
        @click="handleItemClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  hasAll: {
    type: Boolean,
    default: true
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
});
const itemOptions = computed(() => {
  let itemArr = [];
  itemArr = props.optionItem.map(ele => {
    return { name: ele[props.dataModelFieldLabel], value: ele[props.dataModelFieldValue] };
  });
  if (props.hasAll) {
    itemArr.unshift({ name: "全部", value: "" });
  }
  return itemArr;
});
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const emit = defineEmits(["change"]);
function handleItemClick(item) {
  modelValue.value = item.value;
  emit("change", modelValue.value);
}
</script>
<style lang="less" scoped>
.filter-list-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--filterListItemRowGap);
  &:last-of-type {
    margin-bottom: 0;
  }
  .filter-list-label {
    white-space: nowrap;
    padding-top: 7px;
  }
  .filter-list-box {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px;
    .filter-item {
      padding: 7px 20px;
      border-radius: 19px;
      box-sizing: border-box;
      transition: all 0.2s;
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        background-color: var(--filterListItemHoverBackColor);
        transition: all 0.2s;
      }
      &.actived {
        background-color: var(--filterListItemActivedBackColor);
        transition: all 0.2s;
      }
    }
  }
}
</style>