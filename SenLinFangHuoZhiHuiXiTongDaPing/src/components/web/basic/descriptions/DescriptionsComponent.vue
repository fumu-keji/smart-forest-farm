<template>
  <el-descriptions
    :style="computedStyle"
    :class="compClass"
    :title="title"
    :direction="direction"
    :border="border"
    :column="columnNumber"
  >
    <template v-if="descriptionsItem && descriptionsItem.length">
      <el-descriptions-item
        v-for="(item, index) in descriptionsItem"
        :key="index"
        :label="item.label"
        :width="item.width"
        :span="item.span"
      >
        <span v-if="setConfigureComponent(item) === ''">
          {{ descriptionsData[item.prop] }}
        </span>
        <component
          v-else
          :is="setConfigureComponent(item)"
          :filterArray="item.filterData"
          :configObject="item.configData"
          :contentValue="descriptionsData[item.prop]"
        />
      </el-descriptions-item>
    </template>
  </el-descriptions>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  column: {
    type: [String, Number],
    default: "3"
  },
  title: {
    type: String,
    default: "用户信息"
  },
  compSize: {
    type: String,
    default: "default"
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  border: {
    type: Boolean,
    default: true,
  },
  descriptionsItem: {
    type: Array,
    default: () => []
  },
  descriptionsData: {
    type: Object,
    default: () => {}
  },
  titleFontSize: {
    type: String,
    default: "16"
  },
  titleColor: {
    type: String,
    default: "#303133"
  },
  labelColor: {
    type: String,
    default: "#909399"
  },
  contentColor: {
    type: String,
    default: "#606266"
  },
});
// 基础相关
const columnNumber = computed(() => {
  if (props.column) {
    return parseInt(props.column);
  } else {
    return 0;
  }
});
const computedStyle = computed(() => {
  const descriptionsStyle = {
    "--titleFontSize": `${props.titleFontSize}px`,
    "--titleColor": props.titleColor,
    "--labelColor": props.labelColor,
    "--contentColor": props.contentColor,
  };
  return descriptionsStyle;
});
const compClass = computed(() => {
  return `custom-descriptions-${props.compSize}`;
});
// 描述列表自定义配置的动态组件
function setConfigureComponent(column) {
  const componentNameObject = {
    text: "DescriptionsTextComponent",
    iconText: "DescriptionsIconTextComponent",
    tagText: "DescriptionsTagTextComponent",
    dynamicImage: "DescriptionsDynamicImageComponent",
    dictionary: "DescriptionsDictionaryComponent"
  };
  return componentNameObject[column.valueType] || "";
}
</script>

<style lang="less" scoped>
:deep(.el-descriptions__title) {
  font-size: var(--titleFontSize);
  color: var(--titleColor);
}
.el-descriptions {
  :deep(.el-descriptions__label) {
    width: var(--labelWidth);
    color: var(--labelColor) !important;
  }
  :deep(.el-descriptions__content) {
    width: var(--contenWidth);
    color: var(--contentColor) !important;
  }
}
.custom-descriptions-superLarge {
  :deep(.el-descriptions__cell) {
    font-size: 22px !important;
    padding: 18px 10px !important;
  }
}
.custom-descriptions-big {
  :deep(.el-descriptions__cell) {
    font-size: 20px !important;
    padding: 16px 10px !important;
  }
}
.custom-descriptions-large {
  :deep(.el-descriptions__cell) {
    font-size: 18px !important;
    padding: 14px 10px !important;
  }
}
.custom-descriptions-default {
  :deep(.el-descriptions__cell) {
    font-size: 16px !important;
    padding: 12px 10px !important;
  }
}
.custom-descriptions-medium {
  :deep(.el-descriptions__cell) {
    font-size: 15px !important;
    padding: 10px !important;
  }
}
.custom-descriptions-small {
  :deep(.el-descriptions__cell) {
    font-size: 14px !important;
    padding: 8px 10px !important;
  }
}
.custom-descriptions-mini {
  :deep(.el-descriptions__cell) {
    font-size: 13px !important;
    padding: 6px 10px !important;
  }
}
</style>
