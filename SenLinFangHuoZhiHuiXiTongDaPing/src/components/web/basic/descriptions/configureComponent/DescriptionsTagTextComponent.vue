<template>
  <span class="tag-text-style">
    <tag-component
      v-if="tagInsertType === 'before' && showTagFlag"
      :class="{ 'before-tag': formatValue !== '' }"
      v-bind="tagAttr"
    />
    <span :style="textStyle">{{ formatValue }}</span>
    <tag-component
      v-if="tagInsertType === 'after' && showTagFlag"
      :class="{ 'after-tag': formatValue !== '' }"
      v-bind="tagAttr"
    />
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
  contentValue: {
    type: [String, Number],
    require: true
  }
});
  // 过滤值的数据
const filterItemData = computed(() => {
  return props.filterArray.find(filterData => {
    return filterData.value === props.contentValue;
  });
});
// 展示标签
const showTagFlag = computed(()=> {
  if (filterItemData.value) {
    return filterItemData.value.tagName !== "";
  } else {
    return props.configObject.tagName !== "";
  }
});
// 标签设置的属性
const tagAttr = computed(()=> {
  return {
    compSize: filterItemData.value ? filterItemData.value.tagSize : props.configObject.tagSize,
    type: filterItemData.value ? filterItemData.value.tagType : props.configObject.tagType,
    tagText: formatTagValue.value
  };
});
    
// 文字的样式
const textStyle = computed(()=> {
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
// 静态配置和过滤配置混合的文案的值
const formatValue = computed(()=> {
  if (filterItemData.value) {
    return filterItemData.value.text;
  } else {
    return props.configObject.showDefaultValue ? props.contentValue : "";
  }
});
// 静态配置和过滤配置混合的标签名称
const formatTagValue = computed(()=> {
  return filterItemData.value ? filterItemData.value.tagName : props.configObject.tagName;
});
// 静态配置和过滤配置混合的插入位置
const tagInsertType = computed(()=> {
  return filterItemData.value ? filterItemData.value.insertType : props.configObject.insertType;
});
</script>

<style lang="less" scoped>
.tag-text-style {
  display: inline-flex;
  align-items: center;
  i {
    display: inline-block;
  }
  .before-tag {
    margin-right: 3px;
  }
  .after-tag {
    margin-left: 3px;
  }
}
</style>