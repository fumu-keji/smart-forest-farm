<template>
  <span v-if="showIconFlag" :style="iconStyle" class="calendar-icon">
    <el-icon>
      <component
        v-if="proxy.$isElementPlusIcons(formatIconValue)"
        :is="formatIconValue"
      />
    </el-icon>
  </span>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

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
const showIconFlag = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.icon !== "";
  } else {
    return props.configObject.icon !== "";
  }
});
const formatIconValue = computed(() => {
  return filterItemData.value ? filterItemData.value.icon : props.configObject.icon;
});
const iconStyle = computed(() => {
  let resultStyle = {};
  if (props.configObject.iconColor) {
    resultStyle.color = props.configObject.iconColor;
  }
  if (props.configObject.iconFontSize) {
    resultStyle.fontSize =  `${props.configObject.iconFontSize}px`;
  }
  if (!filterItemData.value) {
    return resultStyle;
  }
  if (filterItemData.value.iconColor) {
    resultStyle.color = filterItemData.value.iconColor;
  }
  if (filterItemData.value.iconFontSize) {
    resultStyle.fontSize =  `${filterItemData.value.iconFontSize}px`;
  }
  return resultStyle;
});
</script>

<style lang="less" scoped>
.current.is-selected {
  .calendar-icon {
    color: #ffffff !important;
  }
}
.calendar-icon {
  color: var(--dateColor);
  font-size: var(--dateFontSize);
}
</style>