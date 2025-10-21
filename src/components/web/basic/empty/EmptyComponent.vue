<template>
  <el-empty
    :class="'custom-empty-' + compSize"
    :image="imageUrl"
    :image-size="imageSize"
    :description="description"
  />
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  image: {
    type: String,
    default: ""
  },
  compSize: {
    type: String,
    default: "default"
  },
  description: {
    type: String,
    default: ""
  }
});
const imageSize = computed(()=> {
  let size =  {
    superLarge: 120,
    big: 110,
    large: 100,
    default: 90,
    medium: 80,
    small: 70,
    mini: 60,
  };
  return size[props.compSize];
});
const imageUrl = computed(() => {
  return proxy.$setAssetType(props.image);
});
</script>
<style lang="less" scoped>
.custom-empty-superLarge {
  :deep(.el-empty__description) {
    p {
      font-size: 22px !important;
    }
  }
}
.custom-empty-big {
  :deep(.el-empty__description) {
    p {
      font-size: 20px !important;
    }
  }
}
.custom-empty-large {
  :deep(.el-empty__description) {
    p {
      font-size: 18px !important;
    }
  }
}
.custom-empty-default {
  :deep(.el-empty__description) {
    p {
      font-size: 16px !important;
    }
  }
}
.custom-empty-medium {
  :deep(.el-empty__description) {
    p {
      font-size: 15px !important;
    }
  }
}
.custom-empty-small {
  :deep(.el-empty__description) {
    p {
      font-size: 14px !important;
    }
  }
}
.custom-empty-mini {
  :deep(.el-empty__description) {
    p {
      font-size: 13px !important;
    }
  }
}
</style>
