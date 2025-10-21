<template>
  <el-breadcrumb
    :style="breadcrumbStyle"
    :class="breadcrumbClass"
    :separator="separator"
    :separatorIcon="icon"
  >
    <el-breadcrumb-item v-for="item in breadcrumbItem" :key="item.id">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  separator: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: "Eleme"
  },
  breadcrumbItem: {
    type: Array,
    default: () => []
  },
  color: {
    type: String,
    default: "#000"
  }
});
const breadcrumbStyle = computed(() => {
  return {
    "--breadcrumbItemColor": props.color,
  };
});
const breadcrumbClass = computed(() => {
  return `custom-breadcrumb-${props.compSize}`;
});
</script>

<style lang="less" scoped>
:deep(.el-breadcrumb__inner) {
  color: var(--breadcrumbItemColor) !important;
}
:deep(.el-breadcrumb__separator) {
  color: var(--breadcrumbItemColor) !important;
}
.custom-breadcrumb-superLarge {
  height: 50px !important;
  line-height: 50px !important;
  font-size: 22px !important;
}
.custom-breadcrumb-big {
  height: 45px !important;
  line-height: 45px !important;
  font-size: 20px !important;
}
.custom-breadcrumb-large {
  height: 42px !important;
  line-height: 42px !important;
  font-size: 18px !important;
}
.custom-breadcrumb-default {
  height: 40px !important;
  line-height: 40px !important;
  font-size: 16px !important;
}
.custom-breadcrumb-medium {
  height: 35px !important;
  line-height: 35px !important;
  font-size: 15px !important;
}
.custom-breadcrumb-small {
  height: 32px !important;
  line-height: 32px !important;
  font-size: 14px !important;
}
.custom-breadcrumb-mini {
  height: 30px !important;
  line-height: 30px !important;
  font-size: 13px !important;
}
</style>
