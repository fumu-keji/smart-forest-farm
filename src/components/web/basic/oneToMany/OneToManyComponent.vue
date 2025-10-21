<template>
  <div class="oneToMany-form-box table-render-box">
    <el-form
      :class="{ 'readonly-wrap': !disabledComputed && readonlyComputed }"
      ref="oneToManyRef"
      label-width="0px"
      :model="formTableData"
    >
      <!-- 表格 -->
      <el-table
        :class="tableClass"
        highlight-current-row
        header-cell-class-name="table_header"
        cell-class-name="table_cell"
        :stripe="stripe"
        :border="border"
        :data="formTableData.tableList"
        @row-click="tableRowClick"
      >
        <el-table-column label="序号" type="index" width="70" align="center" />
        <!-- 表格列 -->
        <el-table-column
          v-for="item in tableColumnData"
          :key="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template v-slot="scope">
            <el-form-item
              :prop="`tableList.${scope.$index}.${item.prop}`"
              :rules="{
                required:
                  item.require && !disabledComputed && !readonlyComputed,
                message: '字段不能为空',
                trigger: ['blur', 'change'],
              }"
            >
              <component
                :is="item.compName"
                :compSize="compSize"
                :key="item.prop + compSize"
                clearable
                v-bind="item.mergeAttr"
                v-model="scope.row[item.prop]"
                v-model:name="scope.row[item.nameField]"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column
          v-if="operateColumnShow"
          label="操作"
          align="center"
          :width="operateColumnWidth"
        >
          <template v-slot="scope">
            <template v-if="necessary && scope.$index == 0">--</template>
            <div v-else class="operate-box">
              <template v-for="item in buttonData">
                <el-button
                  v-if="item.show"
                  :class="setOperateButtonClass(item)"
                  :key="item.operateType"
                  :type="item.type"
                  :icon="item.icon"
                  :plain="item.plain"
                  :round="item.round"
                  :circle="item.circle"
                  @click="handleOnOperate(scope, item.operateType)"
                >
                  {{ item.text }}
                </el-button>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- 添加数据 -->
    <div
      v-if="!disabledComputed && !readonlyComputed && addButtonShow"
      class="add-box"
    >
      <el-button :class="buttonClass" plain icon="Plus" @click="addRow">
        添加一栏
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref, getCurrentInstance } from "vue";
import { isEmpty, cloneObject } from "../../../../utils/functionUtil";
const { proxy } = getCurrentInstance();
/**
 * 基础相关
 */
const props = defineProps({
  oneToManyColumnData: {
    type: Array,
    require: true
  },
  tableData: {
    type: [String, Array],
    require: true
  },
  buttonData: {
    type: Array,
    require: true
  },
  compSize: {
    type: String,
    default: "default"
  },
  stripe: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  necessary: {
    type: Boolean,
    default: false
  },
  operateColumnWidth: {
    type: String,
    default: "150"
  },
  addButtonShow: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(["rowClick"]);
/**
 * 配置相关
 */
const tableClass = computed(() => {
  return `custom-table-${props.compSize}`;
});
const buttonClass = computed(() => {
  return `custom-button-${props.compSize}`;
});
// 是否显示操作按钮
const operateColumnShow = computed(() => {
  if (disabledComputed.value || readonlyComputed.value) {
    return false;
  } else {
    return props.buttonData.some(item => item.show);
  }
});
// 设置操作按钮样式
function setOperateButtonClass(data) {
  let className = `custom-button-${data.size}`;
  if (!data.text) {
    className += " no-text";
  }
  return className;
}
/**
 * 禁用和只读相关
 */
let disabledComponent = ref("");
let readonlyComponent = ref("");
const disabledComputed = computed(() => {
  return disabledComponent.value !== "" ? disabledComponent.value : props.disabled;
});
const readonlyComputed = computed(() => {
  return readonlyComponent.value !== "" ? readonlyComponent.value : props.readonly;
});
watch(disabledComputed, () => {
  tableColumnData.value.forEach(item => {
    item.mergeAttr = {
      compDisabled: disabledComputed.value,
      compReadonly: readonlyComputed.value || item.readonly,
      setting: item.setting,
    };
  });
});
watch(readonlyComputed, () => {
  tableColumnData.value.forEach(item => {
    item.mergeAttr = {
      compDisabled: disabledComputed.value,
      compReadonly: readonlyComputed.value || item.readonly,
      setting: item.setting,
    };
  });
});
/**
 * 表单数据相关
 */
let formTableData = reactive({
  tableList: [],
});
let tableColumnData = ref(null);
watch(() => props.tableData, val => {
  if (!isEmpty(val)) {
    if (JSON.stringify(formTableData.tableList) === JSON.stringify(val)) {
      return;
    }
    formTableData.tableList = cloneObject(val);
  } else {
    formTableData.tableList = [];
  }
}, { immediate: true, deep: true });
watch(() => props.oneToManyColumnData, val => {
  if (val) {
    initTableColumnData();
  }
}, { immediate: true, deep: true });
// 初始化数据
async function initTableColumnData() {
  tableColumnData.value = JSON.parse(JSON.stringify(props.oneToManyColumnData));
  let componentName = {
    "el-input": "CustomInputComponet",
    "el-radio-group": "CustomRadioComponent",
    "el-checkbox-group": "CustomCheckboxComponent",
    "el-select": "CustomSelectComponent",
    "el-cascader": "CustomCascaderComponent",
    "el-date-picker": "CustomDatePickerComponent",
    "el-time-picker": "CustomTimePickerComponent",
  };
  tableColumnData.value.forEach(async item => {
    item.compName = componentName[item.compType];
    item.mergeAttr = {
      compDisabled: disabledComputed.value,
      compReadonly: readonlyComputed.value || item.readonly,
      setting: item.setting,
    };
    const compType = item.compType;
    if (compType === "el-cascader") {
      await proxy.$getOptionItem(item.setting, item.mergeAttr.setting.optionItem, "tree");
    }
    if (compType === "el-radio-group" || compType === "el-checkbox-group" || compType === "el-select" ) {
      await proxy.$getOptionItem(item.setting, item.mergeAttr.setting.optionItem);
    }
  });
}
// 新增一栏
function addRow() {
  let object = {};
  tableColumnData.value.forEach(item => {
    object[item.prop] = "";
  });
  formTableData.tableList.push(object);
}
// 按钮点击
function handleOnOperate(scope, type) {
  if (type === "copy") {
    copyRow(scope.row);
  } else {
    deleteRow(scope.$index);
  }
}
// 复制一栏
function copyRow(row) {
  let object = {};
  tableColumnData.value.forEach(item => {
    object[item.prop] = row[item.prop];
  });
  formTableData.tableList.push(object);
}
// 删除一栏
function deleteRow(index) {
  formTableData.tableList.splice(index, 1);
}
// 表格行点击
function tableRowClick(row, cloumn, event) {
  if (event.target._prevClass && event.target._prevClass.indexOf("cell") > -1) {
    emit("rowClick", row);
  }
}
const oneToManyRef = ref(null);
defineExpose({
  oneToManyRef, 
  formTableData,
  necessary: props.necessary,
  disabledComponent,
  readonlyComponent
});
</script>

<style lang="less" scoped>
.oneToMany-form-box {
  overflow: auto;
  background-color: #fff;
  :deep(.readonly-span) {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  :deep(.custom-table-superLarge) {
    .el-table__row {
      height: 110px;
    }
    .el-form-item__error {
      font-size: 20px;
    }
  }
  :deep(.custom-table-big) {
    .el-table__row {
      height: 100px;
    }
    .el-form-item__error {
      font-size: 18px;
    }
  }
  :deep(.custom-table-large) {
    .el-table__row {
      height: 90px;
    }
    .el-form-item__error {
      font-size: 16px;
    }
  }
  :deep(.custom-table-default) {
    .el-table__row {
      height: 80px;
    }
    .el-form-item__error {
      font-size: 14px;
    }
  }
  :deep(.custom-table-medium) {
    .el-table__row {
      height: 75px;
    }
    .el-form-item__error {
      font-size: 13px;
    }
  }
  :deep(.custom-table-small) {
    .el-table__row {
      height: 70px;
    }
    .el-form-item__error {
      font-size: 13px;
    }
  }
  :deep(.custom-table-mini) {
    .el-table__row {
      height: 60px;
      .el-table__cell {
        padding: 0;
      }
    }
    .el-form-item__error {
      font-size: 13px;
    }
  }
}
.add-box {
  width: 100%;
  :deep(.el-button) {
    width: 100%;
  }
}
:deep(.table_header) {
  color: #333333;
}
:deep(.el-table) {
  .el-table__row {
    height: 68px;
    .cell {
      display: block;
      overflow: unset;
      white-space: nowrap;
      text-overflow: ellipsis;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          justify-content: center;
        }
      }
    }
  }
  .el-date-editor.el-input {
    width: 100%;
    .el-input__inner {
      width: 100%;
    }
  }
  .no-text [class*="el-icon"] + span {
    margin-left: 0 !important;
  }
}
.readonly-wrap {
  :deep(.el-input__inner) {
    cursor: pointer !important;
    background-color: #fff !important;
    border-color: #dcdfe6 !important;
    color: #606266 !important;
  }
  :deep(.el-select__caret) {
    cursor: pointer !important;
  }
  :deep(.el-input.is-disabled .el-input__icon) {
    cursor: pointer !important;
  }
}
.custom-button-superLarge.el-button {
  height: 50px;
  padding: 16px 20px;
  font-size: 22px;
}
.custom-button-big.el-button {
  height: 46px;
  padding: 14px 18px;
  font-size: 20px;
}
.custom-button-large.el-button {
  height: 42px;
  padding: 12px 16px;
  font-size: 18px;
}
.custom-button-default.el-button {
  height: 38px;
  padding: 10px 14px;
  font-size: 16px;
}
.custom-button-medium.el-button {
  height: 34px;
  padding: 8px 12px;
  font-size: 15px;
}
.custom-button-small.el-button {
  height: 30px;
  padding: 6px 10px;
  font-size: 14px;
}
.custom-button-mini.el-button {
  height: 26px;
  padding: 4px 8px;
  font-size: 13px;
}
</style>