<template>
  <div v-if="flowData.formKeyList" class="form-container">
    <!-- 历史表单 -->
    <el-collapse
      v-if="showHistoryForm"
      class="operate-collapse"
      v-model="activeNames"
    >
      <el-collapse-item
        v-for="(item, index) in flowData.formKeyList"
        :key="item.formKey + index"
        :title="item.taskName"
        :name="item.formKey + index"
      >
        <template v-if="index !== flowData.formKeyList.length - 1">
          <component
            :is="`${item.formKey}Web`"
            :ref="item.formKey + index"
            :disabled="true"
          />
        </template>
        <template v-else>
          <component
            :is="`${item.formKey}Web`"
            :ref="item.formKey + index"
            :disabled="disabledComponent || flowData.finished === '1'"
          />
        </template>
      </el-collapse-item>
    </el-collapse>
    <!-- 不包含历史表单 或者 是发起节点的表单 -->
    <component
      v-if="!showHistory || showCurrentForm"
      :ref="currentFormRefKey"
      :is="`${
        flowData.formKeyList[flowData.formKeyList.length - 1].formKey
      }Web`"
      :disabled="disabledComponent || flowData.finished === '1'"
    />
  </div>
</template>

<script>
export default {
  name: "FormContainerComponent",
  props: {
    flowData: {
      type: Object,
      default: () => {}
    },
    showHistory: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeNames: [],
      disabledComponent: false
    };
  },
  computed: {
    // 是否显示历史表单
    showHistoryForm() {
      return this.showHistory && this.flowData.formKeyList && this.flowData.formKeyList.length > 1;
    },
    // 是否显示当前表单
    showCurrentForm() {
      return this.flowData.formKeyList && this.flowData.formKeyList.length === 1;
    },
    // 当前表单的ref
    currentFormRefKey() {
      if (!this.showHistory || this.showCurrentForm) {
        return this.flowData.formKeyList[this.flowData.formKeyList.length - 1].formKey + String((this.flowData.formKeyList.length - 1));
      }
      return null;
    }
  },
  methods: {
    // 校验表单容器
    validateFormContainer() {
      if (!this.flowData.formKeyList.length) {
        return Promise.resolve();
      }
      // 获取需要校验的表单
      const lastIndex = this.flowData.formKeyList.length - 1;
      const validateFormRefKey = [`${this.flowData.formKeyList[lastIndex].formKey}${lastIndex}`];
      let formComponent = this.showHistoryForm ? this.$refs[validateFormRefKey][0] : this.$refs[validateFormRefKey];      
      return new Promise((resolve, reject) => {
        const validationPromises = Object.keys(formComponent.$refs).map(ref => {
          return new Promise((innerResolve, innerReject) => {
            // 不存在的组件，不校验
            if (!formComponent.$refs[ref]) {
              innerResolve();
              return;
            }
            // 动态表单效验
            if (ref.includes("dynamic_form")) {
              if (formComponent.$refs[ref].formTableData.tableList.length === 0) {
                if (!formComponent.$refs[ref].necessary) {
                  innerResolve();
                } else {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  innerReject();
                }
              } else {
                formComponent.$refs[ref].$refs["dynamicFormRef"].validate(validate => {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  validate ? innerResolve() : innerReject();
                });
              }
            } else if (ref.includes("one_to_many")) {
              if (formComponent.$refs[ref].formTableData.tableList.length === 0) {
                if (!formComponent.$refs[ref].necessary) {
                  innerResolve();
                } else {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  innerReject();
                }
              } else {
                formComponent.$refs[ref].$refs["oneToManyRef"].validate(validate => {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  validate ? innerResolve() : innerReject();
                });
              }
            } else if (ref.includes("form")) {
              formComponent.$refs[ref].$refs.formRef.validate(validate => {
                // eslint-disable-next-line prefer-promise-reject-errors
                validate ? innerResolve() : innerReject();
              });
            } else {
              innerResolve();
            }
          });
        });
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.all(validationPromises).then(() => resolve()).catch(() => reject());
      });
    },
    // 获取表单提交数据
    getFormParam() {
      if (!this.flowData.formKeyList.length) {
        return;
      }
      // 获取当前需要提交的表单
      const lastIndex = this.flowData.formKeyList.length - 1;
      const validateFormRefKey = [`${this.flowData.formKeyList[lastIndex].formKey}${lastIndex}`];
      let formComponent = this.showHistoryForm ? this.$refs[validateFormRefKey][0] : this.$refs[validateFormRefKey];
      // 调用当前表单的提交方法
      return formComponent.formParam;
    },
    // 表单提交完成事件
    completeSubmit() {
      if (!this.flowData.formKeyList.length) {
        return;
      }
      // 获取当前需要提交的表单
      const lastIndex = this.flowData.formKeyList.length - 1;
      const validateFormRefKey = [`${this.flowData.formKeyList[lastIndex].formKey}${lastIndex}`];
      let formComponent = this.showHistoryForm ? this.$refs[validateFormRefKey][0] : this.$refs[validateFormRefKey];
      // 调用当前表单的提交方法
      formComponent.completeSubmit();
    }
  }
};
</script>
<style lang="less" scoped>
.form-container {
  background-color: #ffffff;
}
:deep(.el-collapse-item__content) {
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
