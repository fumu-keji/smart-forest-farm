<template>
  <a
    :href="linkHref"
    :style="linkStyle"
    :class="`custom-link-${compSize}`"
    :target="target"
  >
    <span class="link-box" :class="{ 'underline-link': underline }">
      <el-icon v-if="icon">
        <component :is="icon" />
      </el-icon>
      <span>{{ text }}</span>
    </span>
  </a>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  text: {
    type: String,
    default: "超链接"
  },
  target: {
    type: String,
    default: "_self"
  },
  color: {
    type: String,
    default: "#000"
  },
  underline: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: ""
  },
  hrefType: {
    type: String,
    default: "select"
  },
  inputHref: {
    type: String,
    default: ""
  },
  pageHref: {
    type: String,
    default: ""
  },
});
const linkStyle = computed(() => {
  return {
    color: props.color,
  };
});
const linkHref = computed(() => {
  if (props.disabled) {
    return "javascript:void(0)";
  }
  if (props.hrefType === "input") {
    return props.inputHref;
  } else {
    return props.pageHref;
  }
});
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.underline-link {
  border-bottom: 1px solid var(--el-color-primary);
}
.link-box {
  display: flex;
  align-items: center;
  :deep(.el-icon) {
    margin-right: 5px;
  }
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
.custom-link-superLarge {
  font-size: 22px;
  :deep(.el-icon) {
    font-size: 22px;
  }
}
.custom-link-big {
  font-size: 20px;
  :deep(.el-icon) {
    font-size: 20px;
  }
}
.custom-link-large {
  font-size: 18px;
  :deep(.el-icon) {
    font-size: 18px;
  }
}
.custom-link-default {
  font-size: 16px;
  :deep(.el-icon) {
    font-size: 16px;
  }
}
.custom-link-medium {
  font-size: 15px;
  :deep(.el-icon) {
    font-size: 15px;
  }
}
.custom-link-small {
  font-size: 14px;
  :deep(.el-icon) {
    font-size: 14px;
  }
}
.custom-link-mini {
  font-size: 13px;
  :deep(.el-icon) {
    font-size: 13px;
  }
}
</style>
