<template>
  <el-button
    :class="buttonClass"
    :type="type"
    :color="color"
    :link="link"
    :plain="plain"
    :round="round"
    :circle="circle"
    :disabled="disabled"
  >
    <template v-if="icon && iconPosition === 'left'">
      <el-icon :style="{ marginRight: buttonText ? '5px' : '' }">
        <component :is="icon" />
      </el-icon>
    </template>
    {{ buttonText }}
    <template v-if="icon && iconPosition === 'right'">
      <el-icon :style="{ marginLeft: buttonText ? '5px' : '' }">
        <component :is="icon" />
      </el-icon>
    </template>
  </el-button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  type: {
    type: String,
    default: "primary"
  },
  color: {
    type: String,
    default: ""
  },
  link: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  iconPosition: {
    type: String,
    default: "left"
  },
  icon: {
    type: String,
    default: ""
  },
});
const buttonClass = computed(() => {
  return `custom-button-${props.compSize}`;
});
const disabled = defineModel("disabled", {
  type: Boolean,
  default: false
});
const buttonText = defineModel("buttonText", {
  type: String,
  default: "按钮"
});
defineExpose({
  disabled,
  buttonText
});
</script>

<style lang="less" scoped>
.el-button.is-link {
  padding: 0 !important;
}
.custom-button-superLarge.el-button {
  height: 50px;
  padding: 16px 32px;
  font-size: 22px;
}
.custom-button-big.el-button {
  height: 46px;
  padding: 14px 28px;
  font-size: 20px;
}
.custom-button-large.el-button {
  height: 42px;
  padding: 12px 24px;
  font-size: 18px;
}
.custom-button-default.el-button {
  height: 38px;
  padding: 10px 20px;
  font-size: 16px;
}
.custom-button-medium.el-button {
  height: 34px;
  padding: 8px 16px;
  font-size: 15px;
}
.custom-button-small.el-button {
  height: 30px;
  padding: 6px 12px;
  font-size: 14px;
}
.custom-button-mini.el-button {
  height: 26px;
  padding: 4px 8px;
  font-size: 12px;
}
.el-button {
  vertical-align: top;
}
</style>