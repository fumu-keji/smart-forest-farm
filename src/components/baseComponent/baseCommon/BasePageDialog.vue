<template>
  <el-dialog
    :class="[
      'base-page-dialog-style',
      { 'disable-click': confirmLoading },
      className,
    ]"
    draggable
    :width="width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :append-to-body="appendToBody"
    :top="dialogTop"
    :fullscreen="fullScreenFlag"
    v-model="currentDialogVisible"
    @close="closeDialog"
  >
    <template #header>
      <slot v-if="customHeader" name="header" />
      <div v-else class="base-header-box">
        <div class="title">{{ title }}</div>
        <div class="operate-box">
          <el-icon
            v-if="showFullscreen"
            @click="fullScreenFlag = !fullScreenFlag"
          >
            <FullScreen />
          </el-icon>
          <el-icon @click="currentDialogVisible = !currentDialogVisible">
            <Close />
          </el-icon>
        </div>
      </div>
    </template>
    <!-- 弹窗中心区域 -->
    <slot />
    <!-- 弹窗底部按钮 -->
    <template v-if="!hiddenFooter" #footer>
      <div v-if="!customFooter" class="dialog-footer">
        <template v-if="dialogType === 'confirm'">
          <el-button class="dialog-footer-btn" @click="cancel">
            {{ cancelText }}
          </el-button>
          <el-button
            class="dialog-footer-btn"
            :loading="confirmLoading"
            type="primary"
            @click="confirm"
          >
            {{ confirmText }}
          </el-button>
        </template>
        <template v-else>
          <el-button class="dialog-footer-btn" type="primary" @click="cancel">
            {{ cancelText }}
          </el-button>
        </template>
      </div>
      <div v-else class="dialog-footer">
        <slot name="footer" />
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
// 外部组件传入的props
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  confirmLoading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "提示"
  },
  width: {
    type: String,
    default: "600px"
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  dialogTop: {
    type: String,
    default: "15vh"
  },
  dialogType: {
    type: String,
    default: "confirm"
  },
  showFullscreen: {
    type: Boolean,
    default: false
  },
  customHeader: {
    type: Boolean,
    default: false
  },
  hiddenFooter: {
    type: Boolean,
    default: false
  },
  customFooter: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: "确定"
  },
  cancelText: {
    type: String,
    default: "取消"
  },
  className: {
    type: String,
    default: ""
  } 
});
// emit函数
const emit = defineEmits(["update:dialogVisible", "confirm", "cancel", "close"]);
// 弹窗内部功能
let currentDialogVisible = ref(false);
let fullScreenFlag = ref(false);
// 监听内部弹窗的打开关闭
watch(() => props.dialogVisible, propVisible => {
  currentDialogVisible.value = propVisible;
}, { immediate: true });
watch( currentDialogVisible, currentVisible => {
  emit("update:dialogVisible", currentVisible);
});
// 相关方法
function confirm() {
  emit("confirm");
}
function cancel() {
  if (props.dialogType === "confirm") {
    currentDialogVisible.value = false;
  }
  emit("cancel");
}
function closeDialog() {
  emit("close");
}
</script>

<style lang="less">
.el-popup-parent--hidden {
  width: 100% !important;
}
.base-page-dialog-style.el-dialog {
  padding: 0;
  margin-bottom: 0;
  &.disable-click {
    pointer-events: none;
  }
  .el-dialog__header {
    padding: 10px 20px;
    border-bottom: 1px solid #e7e8eb;
    border-radius: 8px 8px 0 0;
    .el-dialog__headerbtn {
      display: none;
    }
  }
  .base-header-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 17px;
      font-weight: bolder;
      color: #303133;
    }
    .operate-box {
      .el-icon {
        position: relative;
        top: 3px;
        margin-left: 10px;
        font-size: 20px;
        color: #000000;
        &:hover {
          color: #1989fa !important;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .el-dialog__body {
    padding: 20px 25px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
  .el-dialog__footer {
    padding: 15px 20px;
    text-align: right;
    border-top: 1px solid #e7e8eb;
  }
  .dialog-footer {
    .dialog-footer-btn {
      font-size: 14px;
      padding: 8px 30px;
      border-radius: 2px;
    }
  }
}
</style>
