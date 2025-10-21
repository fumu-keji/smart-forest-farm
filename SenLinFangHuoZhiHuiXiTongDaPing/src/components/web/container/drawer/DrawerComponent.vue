<template>
  <el-drawer
    :class="customClass"
    :with-header="false"
    :destroy-on-close="true"
    :close-on-press-escape="false"
    :modal="true"
    :append-to-body="true"
    :close-on-click-modal="wrapperClosable"
    :size="sizeData + sizeUnit"
    :direction="direction"
    v-model="drawVisible"
    @close="drawVisible = false"
  >
    <div v-if="drawVisible" class="drawer-content">
      <div class="drawer-title">
        <div class="text">{{ title }}</div>
        <div class="title-btn">
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
        </div>
      </div>
      <div class="drawer-container">
        <slot />
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { computed } from "vue";
import { APPLICATION_TYPE } from "@/config/ip";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  wrapperClosable: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: "rtl"
  },
  title: {
    type: String,
    default: "标题"
  },
  sizeData: {
    type: String,
    default: "380",
  },
  sizeUnit: {
    type: String,
    default: "px",
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
  let className = `drawer-render-box custom-drawer-${props.compSize}`;
  if (APPLICATION_TYPE === "large") {
    className += " large-skeleton-container";
  }
  return className;
});
let drawVisible = defineModel("drawVisible");
function handleOnConfirm() {
  emit("confirm");
}
function handleOnCancel() {
  emit("cancel");
}
</script>
<style lang="less">
.drawer-render-box {
  .el-drawer__body {
    padding: 0 !important;
  }
  .drawer-content {
    height: 100%;
    .drawer-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e7e7eb;
      box-sizing: border-box;
      width: 100%;
      padding: 0 10px;
      .text {
        border-left: 1px solid #1778ff;
        font-weight: bolder;
        padding-left: 15px;
      }
    }
    .drawer-container {
      padding: 10px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
.custom-drawer-superLarge.el-drawer {
  .drawer-title {
    font-size: 24px;
    height: 80px;
  }
  .text {
    border-left-width: 8px !important;
    height: 40px;
    line-height: 40px;
  }
  .drawer-container {
    height: calc(100% - 80px);
  }
}
.custom-drawer-big.el-drawer {
  .drawer-title {
    font-size: 22px;
    height: 75px;
  }
  .text {
    border-left-width: 7px !important;
    height: 35px;
    line-height: 35px;
  }
  .drawer-container {
    height: calc(100% - 75px);
  }
}
.custom-drawer-large.el-drawer {
  .drawer-title {
    font-size: 20px;
    height: 70px;
  }
  .text {
    border-left-width: 6px !important;
    height: 30px;
    line-height: 30px;
  }
  .drawer-container {
    height: calc(100% - 70px);
  }
}
.custom-drawer-default.el-drawer {
  .drawer-title {
    font-size: 18px;
    height: 60px;
  }
  .text {
    border-left-width: 5px !important;
    height: 30px;
    line-height: 30px;
  }
  .drawer-container {
    height: calc(100% - 60px);
  }
}
.custom-drawer-medium.el-drawer {
  .drawer-title {
    font-size: 17px;
    height: 55px;
  }
  .text {
    border-left-width: 4px !important;
    height: 25px;
    line-height: 25px;
  }
  .drawer-container {
    height: calc(100% - 55px);
  }
}
.custom-drawer-small.el-drawer {
  .drawer-title {
    font-size: 16px;
    height: 50px;
  }
  .text {
    border-left-width: 4px !important;
    height: 25px;
    line-height: 25px;
  }
  .drawer-container {
    height: calc(100% - 50px);
  }
}
.custom-drawer-mini.el-drawer {
  .drawer-title {
    font-size: 16px;
    height: 45px;
  }
  .text {
    border-left-width: 4px !important;
    height: 25px;
    line-height: 25px;
  }
  .drawer-container {
    height: calc(100% - 45px);
  }
}
</style>