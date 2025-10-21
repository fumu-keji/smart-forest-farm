<template>
  <el-tag
    :class="tagClass"
    :type="type"
    :effect="effect"
    :closable="closable"
    :color="color"
  >
    {{ tagText }}
  </el-tag>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps( {
  compSize: {
    type: String,
    default: "default"
  },
  type: {
    type: String,
    default: "primary"
  },
  effect: {
    type: String,
    default: "light"
  },
  closable: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ""
  }
});
let tagText = defineModel("tagText", {
  type: String,
  default: "标签"
});
const tagClass = computed(() => {
  return `custom-tag-${props.compSize}`;
});
defineExpose({
  tagText
});
</script>

<style lang="less" scoped>
.el-tag {
  justify-content: center;
  align-items: center;
}
.custom-tag-superLarge.el-tag {
  height: 40px;
  line-height: 38px;
  padding: 0 16px;
  font-size: 22px;
}
.custom-tag-big.el-tag {
  height: 38px;
  line-height: 36px;
  padding: 0 14px;
  font-size: 20px;
}
.custom-tag-large.el-tag {
  height: 35px;
  line-height: 33px;
  padding: 0 12px;
  font-size: 18px;
}
.custom-tag-default.el-tag {
  height: 32px;
  line-height: 30px;
  padding: 0 10px;
  font-size: 16px;
}
.custom-tag-medium.el-tag {
  height: 28px;
  line-height: 26px;
  padding: 0 10px;
  font-size: 15px;
}
.custom-tag-small.el-tag {
  height: 24px;
  line-height: 22px;
  padding: 0 8px;
  font-size: 14px;
}
.custom-tag-mini.el-tag {
  height: 20px;
  line-height: 19px;
  padding: 0 5px;
  font-size: 13px;
}
</style>
