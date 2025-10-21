<!-- 全局的大黑屏提示插件 -->
<template>
  <transition name="el-fade-in">
    <div v-if="alertShow" class="wrap plugin-alert-style">
      <div class="alert-box">
        <div class="alert-box-header">
          <div class="alert-box-title">
            <span>提示</span>
          </div>
          <div class="alert-box-close fr" @click="closeAlert">
            <el-icon class="el-icon-close"><Close /></el-icon>
          </div>
        </div>
        <div class="alert-box-content">
          <el-icon
            v-if="alertType === 'success'"
            class="alert-icon"
            color="#3ac23d"
          >
            <SuccessFilled />
          </el-icon>
          <el-icon v-else class="alert-icon" color="#ff3f3f">
            <WarningFilled />
          </el-icon>
          <span style="margin-left: 15px">{{ alertMessage }}</span>
        </div>
        <div class="alert-box-footer">
          <el-button type="primary" @click="closeAlert"> 确 定 </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  alertShow: {
    type: Boolean,
    default: false
  },
  alertMessage: {
    type: String,
    default: ""
  },
  alertType: {
    type: String,
    default: ""
  },
  closeAlert: {
    type: Function,
    default() {}
  }
});
</script>

<style lang="less" scoped>
.wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999999;
}
.wrap::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}
.plugin-alert-style {
  text-align: center;
  .alert-box {
    display: inline-block;
    width: 500px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    .alert-box-header {
      position: relative;
      padding: 15px 15px 10px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .alert-box-title {
        padding-left: 0;
        margin-bottom: 0;
        font-size: 19px;
        line-height: 1;
        color: #303133;
      }
      .alert-box-close {
        cursor: pointer;
      }
      .el-icon-close {
        font-size: 22px;
        position: relative;
        top: -2px;
        color: #cccccc;
      }
    }
    .alert-box-content {
      display: flex;
      align-items: center;
      padding: 30px;
      font-size: 16px;
    }
    .alert-box-footer {
      padding: 5px 15px;
      text-align: right;
    }
  }
  .alert-icon {
    font-size: 24px;
  }
}
</style>