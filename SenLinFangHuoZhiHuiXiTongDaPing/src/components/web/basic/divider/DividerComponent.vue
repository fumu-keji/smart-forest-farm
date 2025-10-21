<template>
  <el-divider
    :style="{ '--contentColor': dividerColor }"
    :direction="direction"
    :contentPosition="contentPosition"
  >
    <span
      v-if="dividerType === 'text'"
      :class="['divider-content', 'divider-content--' + compSize]"
    >
      {{ dividerValue }}
    </span>
    <el-icon
      v-else
      :class="['divider-content', 'divider-content--' + compSize]"
    >
      <component
        v-if="proxy.$isElementPlusIcons(dividerValue)"
        :is="dividerValue"
      />
    </el-icon>
  </el-divider>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const   props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  dividerType: {
    type: String,
    default: "text"
  },
  dividerValue: {
    type: String,
    default: ""
  },
  contentPosition: {
    type: String,
    default: "left"
  },
  dividerColor: {
    type: String,
    default: "#969799"
  }
});
</script>

<style lang="less" scoped>
.divider-content {
  color: var(--contentColor);
}
.divider-content--superLarge {
  font-size: 22px;
}
.divider-content--big {
  font-size: 20px;
}
.divider-content--large {
  font-size: 18px;
}
.divider-content--default {
  font-size: 16px;
}
.divider-content--medium {
  font-size: 15px;
}
.divider-content--small {
  font-size: 14px;
}
.divider-content--mini {
  font-size: 13px;
}
.el-divider {
  margin: 0;
}
</style>
