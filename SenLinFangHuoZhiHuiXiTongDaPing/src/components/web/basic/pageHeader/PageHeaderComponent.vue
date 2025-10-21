<template>
  <el-page-header
    :class="[
      'page-header-render-box',
      `custom-page-header-${compSize}`,
      content === '' ? 'no-content' : '',
    ]"
    :style="computedStyle"
    :title="title"
    :content="content"
    @back="goBack"
  />
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  title: {
    type: String,
    default: "返回"
  },
  content: {
    type: String,
    default: "详情"
  },
  contentColor: {
    type: String,
    default: "#303133"
  }
});
const emit = defineEmits(["back"]);
const computedStyle = computed(() => {
  return {
    "--contentColor": props.contentColor,
  };
});
function goBack() {
  emit("back");
}
</script>

<style lang="less" scoped>
.no-content {
  :deep(.el-divider) {
    border: none;
  }
}
:deep(.el-page-header__left) {
  .el-icon {
    color: var(--el-color-primary) !important;
  }
}
:deep(.el-page-header__title) {
  color: var(--el-color-primary) !important;
}
:deep(.el-page-header__content) {
  color: var(--contentColor) !important;
}
.page-header-render-box {
  align-items: center;
  &.custom-page-header-superLarge {
    :deep(.el-page-header__header) {
      height: 65px;
      .el-page-header__left {
        .el-divider {
          height: 22px;
        }
        .el-icon {
          font-size: 20px;
        }
      }
      .el-page-header__title {
        font-size: 20px;
      }
      .el-page-header__content {
        font-size: 22px;
      }
    }
  }
  &.custom-page-header-big {
    :deep(.el-page-header__header) {
      height: 60px;
      .el-page-header__left {
        .el-divider {
          height: 20px;
        }
        .el-icon {
          font-size: 18px;
        }
      }
      .el-page-header__title {
        font-size: 18px;
      }
      .el-page-header__content {
        font-size: 20px;
      }
    }
  }
  &.custom-page-header-large {
    :deep(.el-page-header__header) {
      height: 55px;
      .el-page-header__left {
        .el-divider {
          height: 18px;
        }
        .el-icon {
          font-size: 16px;
        }
      }
      .el-page-header__title {
        font-size: 16px;
      }
      .el-page-header__content {
        font-size: 18px;
      }
    }
  }
  &.custom-page-header-default {
    :deep(.el-page-header__header) {
      height: 50px;
      .el-page-header__left {
        .el-divider {
          height: 16px;
        }
        .el-icon {
          font-size: 14px;
        }
      }
      .el-page-header__title {
        font-size: 14px;
      }
      .el-page-header__content {
        font-size: 16px;
      }
    }
  }
  &.custom-page-header-medium {
    :deep(.el-page-header__header) {
      height: 45px;
      .el-page-header__left {
        .el-divider {
          height: 15px;
        }
        .el-icon {
          font-size: 14px;
        }
      }
      .el-page-header__title {
        font-size: 14px;
      }
      .el-page-header__content {
        font-size: 15px;
      }
    }
  }
  &.custom-page-header-small {
    :deep(.el-page-header__header) {
      height: 40px;
      .el-page-header__left {
        .el-divider {
          height: 14px;
        }
        .el-icon {
          font-size: 12px;
        }
      }
      .el-page-header__title {
        font-size: 12px;
      }
      .el-page-header__content {
        font-size: 14px;
      }
    }
  }
  &.custom-page-header-mini {
    :deep(.el-page-header__header) {
      height: 35px;
      .el-page-header__left {
        .el-divider {
          height: 13px;
        }
        .el-icon {
          font-size: 12px;
        }
      }
      .el-page-header__title {
        font-size: 12px;
      }
      .el-page-header__content {
        font-size: 13px;
      }
    }
  }
}
</style>