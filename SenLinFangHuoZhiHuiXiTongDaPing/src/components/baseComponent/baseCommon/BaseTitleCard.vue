<template>
  <el-card :shadow="shadow">
    <template #header>
      <div class="card-header">
        <span class="title-tips" />
        <span v-if="customTitle" class="text">
          <slot name="headerText" />
        </span>
        <span v-else class="text">{{ title }}</span>
        <span class="operate-box"><slot name="headerButton" /></span>
      </div>
    </template>
    <slot />
  </el-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "标题"
  },
  shadow: {
    type: String,
    default: "never"
  },
  customTitle: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="less" scoped>
.el-card {
  border: none;
  border-radius: 0;
  :deep(.el-card__header) {
    position: relative;
    width: 100%;
    height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .card-header {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .title-tips {
    display: inline-block;
    position: relative;
    width: 4px;
    height: 17px;
    background-color: #1778ff;
  }
  .text {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 16px;
    color: #1d252f;
    font-weight: bolder;
  }
  .operate-box {
    display: inline-block;
    position: absolute;
    right: 20px;
  }
}
</style>