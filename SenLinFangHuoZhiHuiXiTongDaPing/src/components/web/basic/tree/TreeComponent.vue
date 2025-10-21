<template>
  <el-tree
    :class="[
      backgroundTransparent ? 'background-transparent' : '',
      'custom-tree-' + compSize,
    ]"
    :style="computedStyle"
    :data="optionItem"
    :defaultExpandAll="defaultExpandAll"
    :highlight-current="true"
    :expand-on-click-node="false"
    :show-checkbox="showCheckbox"
    nodeKey="id"
  >
    <template #default="{ data }">
      <span class="custom-tree-node">
        <span :title="`${data.name}`">{{ data.name }}</span>
      </span>
    </template>
  </el-tree>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  lazyFlag: {
    type: Boolean,
    default: false
  },
  backgroundTransparent: {
    type: Boolean,
    default: false
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: "#000"
  },
  hoverBackgroundColor: {
    type: String,
    default: "#e7f1ff"
  },
  hoverColor: {
    type: String,
    default: ""
  },
  fontWeight: {
    type: String,
    default: "400"
  },
  compSize: {
    type: String,
    default: "default"
  },
  optionItem: {
    type: Array,
    default: () => [
      {
        id: 1,
        name: "一级 1",
        children: [
          {
            id: 3,
            name: "二级 1-1",
            children: [
              {
                id: 6,
                name: "三级 1-1-1",
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "一级 2",
        children: [
          {
            id: 4,
            name: "二级 2-1",
            children: [
              {
                id: 7,
                name: "三级 2-1-1",
                children: []
              }
            ]
          },
          {
            id: 5,
            name: "二级 2-2",
            children: [
              {
                id: 8,
                name: "三级 2-2-1",
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
});
const computedStyle = computed(()=> {
  return {
    color: props.color,
    "--color": props.color,
    "--hoverBackgroundColor": props.hoverBackgroundColor,
    "--hoverColor": props.hoverColor,
    "font-weight": props.fontWeight
  };
});
</script>

<style lang="less" scoped>
.el-tree {
  overflow: auto;
  &.background-transparent {
    background: transparent;
  }
  :deep(.el-tree-node) {
    min-width: max-content;
  }
  :deep(.el-tree-node.is-current > .el-tree-node__content) {
    background-color: var(--hoverBackgroundColor);
    .custom-tree-node {
      color: var(--hoverColor);
    }
    .el-tree-node__expand-icon {
      color: var(--hoverColor);
    }
  }
  :deep(.el-tree-node:focus > .el-tree-node__content) {
    background-color: var(--hoverBackgroundColor);
    .custom-tree-node {
      color: var(--hoverColor);
    }
    .el-tree-node__expand-icon {
      color: var(--hoverColor);
    }
  }
  :deep(.el-tree-node__content:hover) {
    background-color: var(--hoverBackgroundColor);
    .custom-tree-node {
      color: var(--hoverColor);
    }
    .el-tree-node__expand-icon {
      color: var(--hoverColor);
    }
  }
}
.el-tree.custom-tree-mini {
  :deep(.el-tree-node__expand-icon) {
    font-size: 13px;
    color: var(--color);
  }
  :deep(.is-leaf) {
    color: transparent !important;
    cursor: default;
  }
  :deep(.el-checkbox__inner) {
    width: 13px;
    height: 13px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 2px;
    height: 4px;
    top: 2.4px;
    left: 4px;
  }
  .custom-tree-node {
    font-size: 13px;
    color: var(--color);
  }
  .el-tree-node__content {
    height: 26px;
  }
}
.el-tree.custom-tree-small {
  :deep(.el-tree-node__expand-icon) {
    font-size: 14px;
    color: var(--color);
  }
  :deep(.is-leaf) {
    color: transparent !important;
    cursor: default;
  }
  :deep(.el-checkbox__inner) {
    width: 14px;
    height: 14px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 2px;
    height: 4px;
    top: 2.4px;
    left: 4px;
  }
  .custom-tree-node {
    font-size: 14px;
    color: var(--color);
  }
  :deep(.el-tree-node__content) {
    height: 28px;
  }
}
.el-tree.custom-tree-medium {
  :deep(.el-tree-node__expand-icon) {
    font-size: 15px;
    color: var(--color);
  }
  :deep(.is-leaf) {
    color: transparent !important;
    cursor: default;
  }
  :deep(.el-checkbox__inner) {
    width: 15px;
    height: 15px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 2.3px;
    height: 4.6px;
    top: 2.8px;
    left: 4.6px;
  }
  .custom-tree-node {
    font-size: 15px;
    color: var(--color);
  }
  :deep(.el-tree-node__content) {
    height: 30px;
  }
}
.el-tree.custom-tree-default {
  :deep(.el-tree-node__expand-icon) {
    font-size: 16px;
    color: var(--color);
  }
  :deep(.is-leaf) {
    color: transparent !important;
    cursor: default;
  }
  :deep(.el-checkbox__inner) {
    width: 16px;
    height: 16px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 2.5px;
    height: 5px;
    top: 3px;
    left: 5px;
  }
  .custom-tree-node {
    font-size: 16px;
    color: var(--color);
  }
  :deep(.el-tree-node__content) {
    height: 32px;
  }
}
.el-tree.custom-tree-large {
  :deep(.el-tree-node__expand-icon) {
    font-size: 18px;
    color: var(--color);
  }
  :deep(.is-leaf) {
    color: transparent !important;
    cursor: default;
  }
  :deep(.el-checkbox__inner) {
    width: 18x;
    height: 18px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 2.8px;
    height: 5.3px;
    top: 3.2px;
    left: 5.3px;
  }
  .custom-tree-node {
    font-size: 18px;
    color: var(--color);
  }
  :deep(.el-tree-node__content) {
    height: 34px;
  }
}
.el-tree.custom-tree-big {
  :deep(.el-tree-node__expand-icon) {
    font-size: 20px;
    color: var(--color);
  }
  :deep(.is-leaf) {
    color: transparent !important;
    cursor: default;
  }
  :deep(.el-checkbox__inner) {
    width: 20px;
    height: 20px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 3px;
    height: 6px;
    top: 3.6px;
    left: 6px;
  }
  .custom-tree-node {
    font-size: 20px;
    color: var(--color);
  }
  :deep(.el-tree-node__content) {
    height: 36px;
  }
}
.el-tree.custom-tree-superLarge {
  :deep(.el-tree-node__expand-icon) {
    font-size: 22px;
    color: var(--color);
  }
  :deep(.is-leaf) {
    color: transparent !important;
    cursor: default;
  }
  :deep(.el-checkbox__inner) {
    width: 22px;
    height: 22px;
  }
  :deep(.el-checkbox__inner::after) {
    width: 3.3px;
    height: 6.6px;
    top: 4px;
    left: 6.6px;
  }
  .custom-tree-node {
    font-size: 22px;
    color: var(--color);
  }
  :deep(.el-tree-node__content) {
    height: 38px;
  }
}
</style>