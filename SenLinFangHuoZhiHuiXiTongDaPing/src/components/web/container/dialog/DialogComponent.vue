<template>
  <!-- 弹窗 -->
  <el-dialog
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
    <div class="dialog-content" :style="{ height: height }">
      <slot />
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
    default: "标题"
  },
  top: {
    type: String,
    default: "15"
  },
  width: {
    type: String,
    default: "650px"
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
  }
});
const emit = defineEmits(["confirm", "cancel"]);
const customClass = computed(() => {
  let className = `dialog-render-box custom-dialog-${props.compSize}`;
  if (APPLICATION_TYPE === "large") {
    className += " large-skeleton-container";
  }
  return className;
});
let dialogVisible = defineModel("dialogVisible");
function handleOnConfirm() {
  emit("confirm");
}
function handleOnCancel() {
  emit("cancel");
}
</script>
