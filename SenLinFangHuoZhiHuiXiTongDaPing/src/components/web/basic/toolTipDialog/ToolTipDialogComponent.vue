<template>
  <!-- 弹窗 -->
  <el-dialog
    :style="computedStyle"
    :class="customClass"
    :overflow="false"
    :close-on-click-modal="false"
    :modal="true"
    :destroy-on-close="true"
    :append-to-body="true"
    :top="`${top}vh`"
    :width="width"
    :title="title"
    :draggable="draggable"
    v-model="dialogVisible"
    @close="dialogVisible = false"
  >
    <div class="tool-tip-dialog-content" :style="{ height: height }">
      <el-icon :color="iconColor" class="tips-icon">
        <WarningFilled />
      </el-icon>
      <span class="tips-text">{{ dialogText }}</span>
    </div>
    <template #footer v-if="cancelButtonVisible || confirmButtonVisible">
      <button-component
        v-if="cancelButtonVisible"
        :compSize="compSize"
        :type="cancelButtonType"
        :buttonText="cancelButtonText"
        @click="handleOnCancel"
      />
      <button-component
        v-if="confirmButtonVisible"
        :compSize="compSize"
        :type="confirmButtonType"
        :buttonText="confirmButtonText"
        @click="handleOnConfirm"
      />
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from "vue";
import { APPLICATION_TYPE } from "@/config/ip";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  draggable: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "提示"
  },
  dialogText: {
    type: String,
    default: "提示文案"
  },
  dialogType: {
    type: String,
    default: "wanring"
  },
  top: {
    type: String,
    default: "35"
  },
  width: {
    type: String,
    default: "450px"
  },
  height: {
    type: String,
    default: "default"
  },
  cancelButtonVisible: {
    type: Boolean,
    default: true
  },
  confirmButtonVisible: {
    type: Boolean,
    default: true
  },
  confirmButtonType: {
    type: String,
    default: "primary"
  },
  cancelButtonType: {
    type: String,
    default: ""
  },
  confirmButtonText: {
    type: String,
    default: "确定"
  },
  cancelButtonText: {
    type: String,
    default: "取消"
  },
  titleColor: {
    type: String,
    default: "#303133"
  },
  dialogTextColor: {
    type: String,
    default: "#606266"
  }
});
const emit = defineEmits(["confirm", "cancel"]);
const computedStyle = computed(() => {
  return {
    "--titleColor": props.titleColor,
    "--dialogTextColor": props.dialogTextColor,
  };
});
const customClass = computed(() => {
  let className = `web-tool-tip-dialog custom-dialog-${props.compSize}`;
  if (APPLICATION_TYPE === "large") {
    className += " large-skeleton-container";
  }
  return className;
});
let dialogVisible = defineModel("dialogVisible");
const iconColor = computed(() => {
  const iconType = {
    info: "#909399",
    success: "#67c23A",
    wanring: "#e6a23c",
    danger: "#f56c6c",
  };
  return iconType[props.dialogType];
});
function handleOnConfirm() {
  emit("confirm");
}
function handleOnCancel() {
  emit("cancel");
}
</script>
