<template>
  <el-form
    v-if="showComponent"
    ref="formRef"
    inline
    :class="formClass"
    :label-position="labelPosition"
    :model="modelOption"
    @submit.prevent
  >
    <slot :formDisabled="childDisabled" :formReadonly="childReadonly" />
  </el-form>
</template>

<script setup>
import { ref, watch, computed, provide } from "vue";
const props = defineProps({
  modelOption: {
    type: Object,
    default: () => {}
  },
  labelPosition: {
    type: String,
    default: "right"
  },
  formSize: {
    type: String,
    default: "default"
  }
});
const formClass = computed(() => {
  return `form-render-box custom-form-${props.formSize}`;
});
let formRef = ref(null);
let showComponent = ref(true);
let disabledComponent = ref("");
let childDisabled = ref("");
watch(disabledComponent, value => {
  childDisabled.value = value;
});
let readonlyComponent = ref("");
let childReadonly = ref("");
watch(readonlyComponent, value => {
  childReadonly.value = value;
});
function resetFields() {
  formRef.value.resetFields();
}
provide("formRef", formRef);
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent,
  formRef,
  resetFields,
});
</script>