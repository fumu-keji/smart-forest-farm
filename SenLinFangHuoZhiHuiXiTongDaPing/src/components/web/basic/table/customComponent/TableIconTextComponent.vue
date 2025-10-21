<template>
  <span class="icon-text-style">
    <el-icon
      v-if="iconInsertType === 'before' && showIconFlag"
      :style="iconStyle"
      :class="{ 'before-icon': formatValue !== '' }"
    >
      <component :is="formatIconValue" />
    </el-icon>
    <span :style="textStyle">{{ formatValue }}</span>
    <el-icon
      v-if="iconInsertType === 'after' && showIconFlag"
      :style="iconStyle"
      :class="{ 'after-icon': formatValue !== '' }"
    >
      <component :is="formatIconValue" />
    </el-icon>
  </span>
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
  columnValue: {
    type: [String, Number],
    require: true
  }
});
// 配置信息
const filterItemData = computed(() => {
  return props.filterArray.find(filterData => {
    return filterData.value === props.columnValue;
  });
});
const showIconFlag = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.icon !== "";
  } else {
    return props.configObject.icon !== "";
  }
});
const iconInsertType = computed(() => {
  return filterItemData.value ? filterItemData.value.insertType : props.configObject.insertType;
});
const iconStyle = computed(() => {
  let resultStyle = {};
  if (filterItemData.value) {
    if (filterItemData.value.iconColor) {
      resultStyle.color = filterItemData.value.iconColor;
    }
    if (filterItemData.value.iconFontSize) {
      resultStyle.fontSize =  `${filterItemData.value.iconFontSize}px`;
    }
  } else {
    if (props.configObject.iconColor) {
      resultStyle.color = props.configObject.iconColor;
    }
    if (props.configObject.iconFontSize) {
      resultStyle.fontSize =  `${props.configObject.iconFontSize}px`;
    }
  }
  return resultStyle;
});
const textStyle = computed(() => {
  let resultStyle = {};
  if (filterItemData.value) {
    if (filterItemData.value.textColor) {
      resultStyle.color = filterItemData.value.textColor;
    }
    if (filterItemData.value.textFontSize) {
      resultStyle.fontSize =  `${filterItemData.value.textFontSize}px`;
    }
  }
  return resultStyle;
});
const formatValue = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.text;
  } else {
    return props.configObject.showDefaultValue ? props.columnValue : "";
  }
});
const formatIconValue = computed(() => {
  return filterItemData.value ? filterItemData.value.icon : props.configObject.icon;
});
</script>

<style lang="less" scoped>
.icon-text-style {
  display: flex;
  align-items: center;
  .before-icon {
    margin-right: 5px;
  }
  .after-icon {
    margin-left: 5px;
  }
}
</style>