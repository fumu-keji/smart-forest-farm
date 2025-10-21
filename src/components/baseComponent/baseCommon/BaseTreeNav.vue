<template>
  <div class="nav-tree operate-tree">
    <!-- 搜索框 -->
    <el-input
      class="filter-tree-input"
      size="large"
      clearable
      placeholder="输入关键字进行过滤"
      prefix-icon="Search"
      v-model.trim="treeFilterText"
    />
    <!-- 树组件 -->
    <el-scrollbar>
      <el-tree
        ref="treeRef"
        v-loading="treeLoading"
        :expand-on-click-node="false"
        :node-key="nodeKey"
        :data="treeData"
        :props="defaultProps"
        :highlight-current="true"
        :default-expand-all="false"
        :default-expanded-keys="defaultShowNodes"
        :filter-node-method="filterNode"
        :show-checkbox="checkboxProps.show"
        :check-strictly="checkboxProps.linkage"
        @node-click="treeNodeClick"
        @check-change="treeChecked"
      >
        <template v-slot="{ node, data }">
          <span class="custom-tree-node">
            <span class="component-name" :title="node.label">
              <i class="component-icon" :class="data.icon" />
              {{ node.label }}
            </span>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelData: {
    type: Array,
    default() {
      return [];
    }
  },
  treeLoading: {
    type: Boolean,
    default: false
  },
  nodeKey: {
    type: String,
    default: "id"
  },
  placeholderText: {
    type: String,
    default: "请输入"
  },
  defaultProps: {
    type: Object,
    default() {
      return {
        children: "children",
        label: "name"
      };
    }
  },
  checkboxProps: {
    type: Object,
    default() {
      return {};
    }
  },
  defaultShowNodes: {
    type: Array,
    default() {
      return [];
    }
  },
  parentIdFlag: {
    type: String,
    default: "parentId"
  },
  notExpandIcon: {
    type: String,
    default: "fmy-tree-file"
  },
  isExpandIcon: {
    type: String,
    default: "fmy-tree-folder"
  },
  treeDataType: {
    type: String,
    default: "organization"
  }
});
const emit = defineEmits(["update:modelData", "nodeClick", "nodeChecked"]);
let treeRef = ref(null);
let treeFilterText = ref("");
let treeData = ref([]);
watch(treeFilterText, val => {
  treeRef.value.filter(val);
});
watch(treeData, val => {
  emit("update:modelData", val);
});
watch(() => props.modelData, val => {
  if (props.treeDataType == "organization") {
    treeData.value = setTreeIcon(val);
  } else {
    treeData.value = setMenuTreeIcon(val);
  }
});
// 过滤树节点
function filterNode(value, data) {
  const filterName = props.defaultProps.label;
  if (!value) { return true; }
  return data[filterName].includes(value);
}
// 点击子节点触发外部列表筛选
function treeNodeClick(nodeData) {
  emit("nodeClick", nodeData);
}
// 点击节点checkbox触发外部
function treeChecked(data, checked) {
  emit("nodeChecked", data, checked);
}
// 遍历tree设置树的icon
function setTreeIcon(data) {
  data?.forEach(v => {
    if (v[props.parentIdFlag] == 0) {
      if (v[props.defaultProps.children] && v[props.defaultProps.children].length !== 0) {
        setTreeIcon(v[props.defaultProps.children]);
        v.icon = props.isExpandIcon;
      } else {
        v.icon = props.notExpandIcon;
      }
    } else {
      if (v[props.defaultProps.children] && v[props.defaultProps.children].length !== 0) {
        setTreeIcon(v[props.defaultProps.children]);
        v.icon = props.isExpandIcon;
      } else {
        v.icon = props.notExpandIcon;
      }
    }
  });
  return data;
}
// 遍历tree设置树的icon
function setMenuTreeIcon(data) {
  data?.forEach(v => {
    if (v.type === "1") {
      v.icon = "fmy-application";
    } else {
      v.icon = "fmy-button";
    }
    if (v?.children?.length) {
      setMenuTreeIcon(v.children);
    }
  });
  return data;
}
// 暴露树的ref
defineExpose({
  treeRef
});
</script>

<style lang="less" scoped>
.nav-tree {
  height: calc(100% - 45px);
  :deep(.filter-tree-input) {
    margin-bottom: 10px;
    .el-input__wrapper {
      padding-left: 15px !important;
      border: none;
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid #e3e8ef;
    }
    .el-input__prefix {
      font-size: 18px;
      color: #606266;
    }
  }
  :deep(.el-scrollbar) {
    height: calc(100% - 51px);
    overflow: auto;
    .el-scrollbar__view {
      height: auto;
    }
  }
  .el-tree {
    padding: 0 10px 10px;
    :deep(.el-tree-node__content) {
      height: 35px;
      font-size: 14px;
      .el-tree-node__expand-icon {
        color: var(--el-color-primary);
      }
    }
    .component-icon {
      margin-right: 2px;
    }
    .fmy-application {
      color: #f2c64e;
    }
    .fmy-button {
      color: #1778ff;
    }
    .fmy-tree-folder {
      color: #f2c64e;
    }
    .fmy-tree-file {
      color: #f2c64e;
    }
  }
}
</style>