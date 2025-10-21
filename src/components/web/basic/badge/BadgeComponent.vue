<template>
  <el-badge
    :class="badgeClass"
    :value="badgeValue"
    :type="badgeType"
    :is-dot="badgeIsDot"
    :max="Number(badgeMax)"
    :hidden="badgeHidden"
  />
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  badgeValue: {
    type: [String, Number],
    default: 0
  },
  badgeType: {
    type: String,
    default: "danger"
  },
  badgeIsDot: {
    type: Boolean,
    default: false
  },
  badgeMax: {
    type: String,
    default: "99"
  },
  badgeHidden: {
    type: Boolean,
    default: false
  }
});
const badgeClass = computed(() => {
  return `custom-badeg-${props.compSize}`;
});
</script>

<style scoped lang="less">
.el-badge.custom-badeg-mini {
  :deep(.el-badge__content) {
    min-width: 2px;
    height: 14px;
    line-height: 14px;
    border-radius: 8px;
  }
  :deep(.el-badge__content.is-dot) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    padding: 0;
  }
}
.el-badge.custom-badeg-small {
  :deep(.el-badge__content) {
    min-width: 4px;
    height: 16px;
    line-height: 16px;
    border-radius: 9px;
  }
  :deep(.el-badge__content.is-dot) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 0;
  }
}
.el-badge.custom-badeg-medium {
  :deep(.el-badge__content) {
    min-width: 6px;
    height: 18px;
    line-height: 18px;
    border-radius: 10px;
  }
  :deep(.el-badge__content.is-dot) {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    padding: 0;
  }
}
.el-badge.custom-badeg-default {
  :deep(.el-badge__content) {
    min-width: 8px;
    height: 20px;
    line-height: 20px;
    border-radius: 11px;
  }
  :deep(.el-badge__content.is-dot) {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    padding: 0;
  }
}
.el-badge.custom-badeg-large {
  :deep(.el-badge__content) {
    min-width: 10px;
    height: 22px;
    line-height: 22px;
    border-radius: 12px;
  }
  :deep(.el-badge__content.is-dot) {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    padding: 0;
  }
}
.el-badge.custom-badeg-big {
  :deep(.el-badge__content) {
    min-width: 12px;
    height: 24px;
    line-height: 24px;
    border-radius: 13px;
  }
  :deep(.el-badge__content.is-dot) {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    padding: 0;
  }
}
.el-badge.custom-badeg-superLarge {
  :deep(.el-badge__content) {
    min-width: 14px;
    height: 26px;
    line-height: 26px;
    border-radius: 14px;
  }
  :deep(.el-badge__content.is-dot) {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 0;
  }
}
</style>