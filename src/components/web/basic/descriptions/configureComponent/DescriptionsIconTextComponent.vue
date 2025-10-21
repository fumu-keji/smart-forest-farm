<template>
  <span class="icon-text-style">
    <el-icon
      v-if="
        iconInsertType === 'before' &&
        showIconFlag &&
        proxy.$isElementPlusIcons(formatIconValue)
      "
      :style="iconStyle"
      :class="[{ 'before-icon': formatValue !== '' }]"
    >
      <component :is="formatIconValue" />
    </el-icon>
    <span :style="textStyle">{{ formatValue }}</span>
    <el-icon
      v-if="
        iconInsertType === 'after' &&
        showIconFlag &&
        proxy.$isElementPlusIcons(formatIconValue)
      "
      :style="iconStyle"
      :class="[{ 'after-icon': formatValue !== '' }]"
    >
      <component :is="formatIconValue" />
    </el-icon>
  </span>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
// 基础信息
const props = defineProps({
  filterArray: {
    type: Array,
    require: true,
  },
  configObject: {
    type: Object,
    require: true,
  },
  contentValue: {
    type: [String, Number],
    require: true,
  },
});
// 过滤值的数据
const filterItemData = computed(() => {
  return props.filterArray.find(filterData => {
    return filterData.value === props.contentValue;
  });
});
// 展示icon
const showIconFlag = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.icon !== "";
  } else {
    return props.configObject.icon !== "";
  }
});
// 图标设置的icon样式
const iconStyle = computed(() => {
  let resultStyle = {};
  if (filterItemData.value) {
    if (filterItemData.value.iconColor) {
      resultStyle.color = filterItemData.value.iconColor;
    }
    if (filterItemData.value.iconFontSize) {
      resultStyle.fontSize = `${filterItemData.value.iconFontSize}px`;
    }
  } else {
    if (props.configObject.iconColor) {
      resultStyle.color = props.configObject.iconColor;
    }
    if (props.configObject.iconFontSize) {
      resultStyle.fontSize = `${props.configObject.iconFontSize}px`;
    }
  }
  return resultStyle;
});
// 文字的样式
const textStyle = computed(() => {
  let resultStyle = {};
  if (filterItemData.value) {
    if (filterItemData.value.textColor) {
      resultStyle.color = filterItemData.value.textColor;
    }
    if (filterItemData.value.textFontSize) {
      resultStyle.fontSize = `${filterItemData.value.textFontSize}px`;
    }
  }
  return resultStyle;
});
// 静态配置和过滤配置混合的文案的值
const formatValue = computed(() => {
  if (filterItemData.value) {
    return filterItemData.value.text;
  } else {
    return props.configObject.showDefaultValue ? props.contentValue : "";
  }
});
// 静态配置和过滤配置混合的图标的值
const formatIconValue = computed(() => {
  return filterItemData.value
    ? filterItemData.value.icon
    : props.configObject.icon;
});
// 静态配置和过滤配置混合的插入位置
const iconInsertType = computed(() => {
  return filterItemData.value
    ? filterItemData.value.insertType
    : props.configObject.insertType;
});
</script>

<style lang="less" scoped>
.icon-text-style {
  display: inline-flex;
  align-items: center;
  i {
    display: inline-block;
  }
  .before-icon {
    margin-right: 3px;
  }
  .after-icon {
    margin-left: 3px;
  }
}
</style>