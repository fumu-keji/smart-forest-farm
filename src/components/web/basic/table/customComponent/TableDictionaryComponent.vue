<template>
  <span> {{ formatValue }} </span>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  filterArray: {
    type: Array,
    require: true
  },
  columnValue: {
    type: [String, Number],
    require: true
  }
});
const formatValue = computed(() => {
  const { filterArray, columnValue } = props;
  if (!Array.isArray(filterArray) || !filterArray.length) { return columnValue; }
  let curValue = columnValue.split(","), curName = [];
  curValue.forEach(itemValue => {
    const curItem = filterArray.find(item => item.value === itemValue);
    if (curItem) {
      curName.push(curItem.name);
    }
  });
  return curName.join(",");
});
</script>