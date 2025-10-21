<template>
  <tag-component v-if="showTagFlag" v-bind="tagAttr" />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  filterArray: {
    type: Array,
    require: true
  },
  configObject: {
    type: Object,
    require: true
  },
  componentValue: {
    type: [String, Number],
    require: true
  }
});
const filterItemData = computed(() => {
  return props.filterArray.find(filterData => {
    return filterData.value === props.componentValue;
  });
});
const showTagFlag = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.tagName !== "";
  } else {
    return props.configObject.tagName !== "";
  }
});
const formatTagValue = computed(() => {
  return filterItemData.value ? filterItemData.value.tagName : props.configObject.tagName;
});
const tagAttr = computed(() => {
  return {
    compSize: filterItemData.value ? filterItemData.value.tagSize : props.configObject.tagSize,
    type: filterItemData.value ? filterItemData.value.tagType : props.configObject.tagType,
    tagText: formatTagValue.value
  };
});
</script>