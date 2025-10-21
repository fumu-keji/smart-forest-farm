<template>
  <div :class="`flow-record--${size}`" :style="computedStyle">
    <!-- 记录面板 -->
    <el-timeline>
      <el-timeline-item
        v-for="(flowRecord, flowIndex) in flowRecordData"
        placement="top"
        :timestamp="flowRecord.createTime"
        :key="flowRecord.id"
        :icon="setTimeLineItemAttr(flowRecord).icon"
        :type="setTimeLineItemAttr(flowRecord).type"
      >
        <el-card class="flow-record-card">
          <template #header>
            <div class="card-header">
              <div class="text">{{ flowRecord.taskName }}</div>
              <span class="operate-box">
                <el-button
                  type="primary"
                  :size="size"
                  @click="catInfo(flowRecord)"
                >
                  详 情
                </el-button>
              </span>
            </div>
          </template>
          <!-- 发起节点的记录 -->
          <template v-if="flowIndex === 0">
            <div class="record-item">
              <div class="record-item-title">发起人：</div>
              <div class="record-item-content">
                {{ flowRecord.approver || "--" }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">发起时间：</div>
              <div class="record-item-content">
                {{ flowRecord.createTime || "--" }}
              </div>
            </div>
          </template>
          <!-- 其它节点的记录 -->
          <template v-else>
            <div class="record-item">
              <div class="record-item-title">审批人：</div>
              <div class="record-item-content">
                {{ flowRecord.approver || "--" }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">审批结果：</div>
              <div class="record-item-content">
                {{ formatStatus(flowRecord.approverStatus) }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">审批意见：</div>
              <div class="record-item-content">
                <base-text-ellipsis :line="3">
                  {{ flowRecord.approverContent || "--" }}
                </base-text-ellipsis>
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">开始时间：</div>
              <div class="record-item-content">
                {{ flowRecord.createTime || "--" }}
              </div>
            </div>
            <div class="record-item">
              <div class="record-item-title">完成时间：</div>
              <div class="record-item-content">
                {{ flowRecord.approverTime || "--" }}
              </div>
            </div>
          </template>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <!-- 详情弹窗 -->
    <base-page-dialog
      width="1100px"
      className="flow-record-dialog"
      :title="recordInfoData.title"
      dialogType="info"
      cancelText="关闭"
      v-model:dialogVisible="recordInfoData.dialogShow"
      @cancel="recordInfoData.dialogShow = false"
    >
      <component
        v-if="formKey"
        :is="`${formKey}Web`"
        :ref="setDynamicRef"
        :disabled="true"
      />
    </base-page-dialog>
  </div>
</template>

<script setup>
import { computed, ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  size: {
    type: String,
    default: "default",
  },
  flowRecordData: {
    type: Array,
    require: true,
  },
  nodeColor: {
    type: String,
    default: "#909399",
  },
});
const recordInfoData = reactive({
  dialogShow: false,
  title: "",
});
const formKey = ref("");
const computedStyle = computed(() => {
  return { "--nodeColor": props.nodeColor };
});
// 设置当前节点的属性
function setTimeLineItemAttr(item) {
  let itemAttr = {
    icon: "",
    type: "",
  };
  if (item.approverTime) {
    itemAttr.icon = "Check";
    itemAttr.type = "success";
  } else {
    itemAttr.icon = "More";
    itemAttr.type = "primary";
  }
  return itemAttr;
}
const dynamicRefs = reactive({});
function setDynamicRef(el) {
  dynamicRefs[formKey.value] = el;
}
// 查看详情
function catInfo(flowRecord) {
  recordInfoData.title = flowRecord.taskName;
  recordInfoData.dialogShow = true;
  formKey.value = flowRecord.formKey;
  let params = { currentTaskId: flowRecord.id };
  proxy.$getDataAxios.getFlowInstance(params).then(res => {
    let formData = null;
    if (res.data.formKeyList && res.data.formKeyList.length) {
      let data = res.data.formKeyList.find(
        item => item.formKey === flowRecord.formKey
      );
      if (data) {
        formData = data.formData;
        proxy.$formContainerUtils.assignHistoryFormObject(
          dynamicRefs[formKey.value].formParam,
          formData
        );
      }
    }
  }).catch(err => {
    proxy.$getDataAxios.notifyError(err);
  });
}
function formatStatus(value) {
  const filterObject = {
    0: "拒绝",
    1: "同意",
    2: "驳回",
  };
  return filterObject[value] || "--";
}
</script>

<style lang="less" scoped>
.el-timeline {
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
:deep(.el-timeline-item) {
  padding-bottom: 10px;
}
:deep(.el-timeline-item__node) {
  top: -1px;
}
:deep(.el-timeline-item__timestamp) {
  color: var(--nodeColor) !important;
  font-weight: bolder;
}
:deep(.el-timeline-item__wrapper) {
  padding-right: 0px;
  padding-left: 20px;
}
.flow-record-card {
  :deep(.el-card__header) {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
  :deep(.el-card__body) {
    padding: 15px 15px 10px 15px;
  }
  .text {
    border-left: 4px solid #1778ff;
    padding-left: 10px;
    font-weight: bolder;
  }
  .record-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .record-item-title {
      margin-right: 5px;
      text-align-last: justify;
      color: #112f4171;
    }
  }
  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.custom-button-superLarge.el-button {
  height: 50px;
  padding: 16px 32px;
  font-size: 22px;
}
.custom-button-big.el-button {
  height: 46px;
  padding: 14px 28px;
  font-size: 20px;
}
.custom-button-large.el-button {
  height: 42px;
  padding: 12px 24px;
  font-size: 18px;
}
.custom-button-default.el-button {
  height: 38px;
  padding: 10px 20px;
  font-size: 16px;
}
.custom-button-medium.el-button {
  height: 34px;
  padding: 8px 16px;
  font-size: 15px;
}
.custom-button-small.el-button {
  height: 30px;
  padding: 6px 12px;
  font-size: 14px;
}
.custom-button-mini.el-button {
  height: 26px;
  padding: 4px 8px;
  font-size: 13px;
}
.flow-record--superLarge {
  :deep(.el-card__header) {
    font-size: 24px;
    height: 70px;
  }
  .text {
    border-left-width: 8px;
    height: 40px;
    line-height: 40px;
  }
  :deep(.el-timeline-item__node) {
    width: 24px;
    height: 24px;
    left: -8px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 22px;
  }
  :deep(.el-timeline-item__timestamp) {
    font-size: 22px;
  }
  :deep(.el-card__body) {
    .record-item {
      font-size: 22px;
      .record-item-title {
        width: calc(22px * 5.5);
      }
      .record-item-content {
        width: calc(100% - 22px * 5.5);
      }
    }
  }
}
.flow-record--big {
  :deep(.el-card__header) {
    font-size: 22px;
    height: 65px;
  }
  .text {
    border-left-width: 7px;
    height: 40px;
    line-height: 40px;
  }
  :deep(.el-timeline-item__node) {
    width: 22px;
    height: 22px;
    left: -7px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 20px;
  }
  :deep(.el-timeline-item__timestamp) {
    font-size: 20px;
  }
  :deep(.el-card__body) {
    .record-item {
      font-size: 20px;
      .record-item-title {
        width: calc(20px * 5.5);
      }
      .record-item-content {
        width: calc(100% - 20px * 5.5);
      }
    }
  }
}
.flow-record--large {
  :deep(.el-card__header) {
    font-size: 20px;
    height: 60px;
  }
  .text {
    border-left-width: 6px;
    height: 35px;
    line-height: 35px;
  }
  :deep(.el-timeline-item__node) {
    width: 20px;
    height: 20px;
    left: -5px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 18px;
  }
  :deep(.el-timeline-item__timestamp) {
    font-size: 18px;
  }
  :deep(.el-card__body) {
    .record-item {
      font-size: 18px;
      .record-item-title {
        width: calc(18px * 5.5);
      }
      .record-item-content {
        width: calc(100% - 18px * 5.5);
      }
    }
  }
}
.flow-record--default {
  :deep(.el-card__header) {
    font-size: 18px;
    height: 55px;
  }
  .text {
    border-left-width: 5px;
    height: 30px;
    line-height: 30px;
  }
  :deep(.el-timeline-item__node) {
    width: 18px;
    height: 18px;
    left: -4px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 16px;
  }
  :deep(.el-timeline-item__timestamp) {
    font-size: 16px;
  }
  :deep(.el-card__body) {
    .record-item {
      font-size: 16px;
      .record-item-title {
        width: calc(16px * 5.5);
      }
      .record-item-content {
        width: calc(100% - 16px * 5.5);
      }
    }
  }
}
.flow-record--medium {
  :deep(.el-card__header) {
    font-size: 16px;
    height: 50px;
  }
  .text {
    border-left-width: 4px;
    height: 25px;
    line-height: 25px;
  }
  :deep(.el-timeline-item__node) {
    width: 16px;
    height: 16px;
    left: -3px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 16px;
  }
  :deep(.el-timeline-item__timestamp) {
    font-size: 16px;
  }
  :deep(.el-card__body) {
    .record-item {
      font-size: 16px;
      .record-item-title {
        width: calc(16px * 5.5);
      }
      .record-item-content {
        width: calc(100% - 16px * 5.5);
      }
    }
  }
}
.flow-record--small {
  :deep(.el-card__header) {
    font-size: 16px;
    height: 45px;
  }
  .text {
    border-left-width: 4px;
    height: 25px;
    line-height: 25px;
  }
  :deep(.el-timeline-item__node) {
    width: 16px;
    height: 16px;
    left: -3px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 16px;
  }
  :deep(.el-timeline-item__timestamp) {
    font-size: 16px;
  }
  .record-item {
    font-size: 16px;
    .record-item-title {
      width: calc(16px * 5.5);
    }
    .record-item-content {
      width: calc(100% - 16px * 5.5);
    }
  }
}
.flow-record--mini {
  :deep(.el-card__header) {
    font-size: 14px;
    height: 40px;
  }
  .text {
    border-left-width: 4px;
    height: 20px;
    line-height: 20px;
  }
  :deep(.el-timeline-item__node) {
    width: 14px;
    height: 14px;
    left: -3px;
  }
  :deep(.el-timeline-item__icon) {
    font-size: 13px;
  }
  :deep(.el-timeline-item__timestamp) {
    font-size: 14px;
  }
  :deep(.el-card__body) {
    .record-item {
      font-size: 14px;
      .record-item-title {
        width: calc(14px * 5.5);
      }
      .record-item-content {
        width: calc(100% - 14px * 5.5);
      }
    }
  }
}
</style>
<style lang="less">
.flow-record-dialog {
  .el-dialog__body {
    min-height: 300px;
    max-height: 450px;
    overflow-y: auto;
  }
}
</style>