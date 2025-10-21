<template>
  <el-form-item
    v-if="showComponent"
    ref="formItemRef"
    :class="formItemClass"
    :label-width="labelWidth"
    :label="label"
    :prop="prop"
    :rules="rules"
    :required="required"
  >
    <template #label v-if="label">
      <slot name="label" />
    </template>
    <slot :formItemDisabled="childDisabled" :formItemReadonly="childReadonly" />
  </el-form-item>
</template>

<script setup>
import { ref, watch, computed, provide } from "vue";
const props = defineProps({
  labelWidth: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  prop: {
    type: String,
    default: ""
  },
  rules: {
    type: Array,
    default: ()=>[]
  },
  required: {
    type: Boolean,
    default: false
  },
  formDisabled: {
    type: [String, Boolean],
    default: ""
  },
  formReadonly: {
    type: [String, Boolean],
    default: ""
  },
  formSize: {
    type: String,
    default: "default"
  }
});
const formItemClass = computed(() => {
  return `form-item-${props.formSize}`;
});
let formItemRef = ref(null);
let showComponent = ref(true);
let disabledComponent = ref("");
let childDisabled = ref("");
watch(() => props.formDisabled, value => {
  childDisabled.value = value;
});
watch(disabledComponent, value => {
  childDisabled.value = value;
});
let readonlyComponent = ref("");
let childReadonly = ref("");
watch(() => props.formReadonly, value => {
  readonlyComponent.value = value;
});
watch(readonlyComponent, value => {
  childReadonly.value = value;
});
provide("formItemRef", formItemRef);
defineExpose({
  showComponent,
  disabledComponent,
  readonlyComponent
});
</script>
