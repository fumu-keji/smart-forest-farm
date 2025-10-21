<template>
  <el-steps
    :class="stepsClass"
    :active="active"
    :align-center="alignCenter"
    :simple="simple"
  >
    <el-step
      v-for="(item, index) in stepsItem"
      :key="item.id"
      :title="item.name"
      :icon="item.icon"
      @click="stepsClick(item, index)"
    />
  </el-steps>
</template>

<script setup>
import { ref, computed } from "vue";
import { capitalizeFirstLetter } from "@/utils/functionUtil";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  alignCenter: {
    type: Boolean,
    default: false
  },
  simple: {
    type: Boolean,
    default: false
  },
  stepsItem: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(["stepsClick"]);
const active = ref(0);
function stepsClick(item, index) {
  active.value = index;
  const clickId = capitalizeFirstLetter(item.id);
  emit("stepsClick", clickId);
}
const stepsClass = computed(() => {
  return `custom-steps-${props.compSize}`;
});
</script>

<style lang="less" scoped>
.el-step.is-simple {
  :deep(.el-step__arrow::before) {
    transform: rotate(-45deg) translateY(-4px) !important;
    transform-origin: 0 0 !important;
  }
  :deep(.el-step__head) {
    line-height: normal;
  }
}
.custom-steps-superLarge {
  :deep(.el-step__icon) {
    font-size: 15px !important;
    width: 25px !important;
    height: 25px !important;
  }
  :deep(.el-step__title) {
    font-size: 17px !important;
    line-height: 40px !important;
  }
}
.custom-steps-big {
  :deep(.el-step__icon) {
    font-size: 14px !important;
    width: 24px !important;
    height: 24px !important;
  }
  :deep(.el-step__title) {
    font-size: 16px !important;
    line-height: 38px !important;
  }
}
.custom-steps-large {
  :deep(.el-step__icon) {
    font-size: 13px !important;
    width: 23px !important;
    height: 23px !important;
  }
  :deep(.el-step__title) {
    font-size: 15px !important;
    line-height: 36px !important;
  }
}
.custom-steps-default {
  :deep(.el-step__icon) {
    font-size: 12px !important;
    width: 22px !important;
    height: 22px !important;
  }
  :deep(.el-step__title) {
    font-size: 14px !important;
    line-height: 34px !important;
  }
}
.custom-steps-medium {
  :deep(.el-step__icon) {
    font-size: 12px !important;
    width: 20px !important;
    height: 20px !important;
  }
  :deep(.el-step__title) {
    font-size: 14px !important;
    line-height: 32px !important;
  }
}
.custom-steps-small {
  :deep(.el-step__icon) {
    font-size: 10px !important;
    width: 20px !important;
    height: 20px !important;
  }
  :deep(.el-step__title) {
    font-size: 12px !important;
    line-height: 30px !important;
  }
}
.custom-steps-mini {
  :deep(.el-step__icon) {
    font-size: 10px !important;
    width: 18px !important;
    height: 18px !important;
  }
  :deep(.el-step__title) {
    font-size: 12px !important;
    line-height: 28px !important;
  }
}
</style>
