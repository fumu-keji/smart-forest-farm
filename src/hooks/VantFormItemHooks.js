import { ref, computed, toRefs } from "vue";

export function useFormItemAttr(props) {
  const { formDisabled, compDisabled, formReadonly, compReadonly } = toRefs(props);
  // 组件属性相关
  let showComponent = ref(true);
  // 启用禁用相关
  let disabledComponent = ref("");
  let effectDisabled = computed(() => {
    // 当表单项不为空的时候，取表单项的禁用
    if (formDisabled.value !== "") {
      return formDisabled.value;
    } else {
      // 操作组件属性操作优先于属性配置
      return disabledComponent.value !== "" ? disabledComponent.value : compDisabled.value;
    }
  });
  let readonlyComponent = ref("");
  let effectReadonly = computed(() => {
    if (formReadonly.value !== "") {
      return formReadonly.value;
    } else {
      return readonlyComponent.value !== "" ? readonlyComponent.value : compReadonly.value;
    }
  });
  const customClass = computed(() => {
    return [
      { "readonly-wrap": !effectDisabled.value && effectReadonly.value }
    ];
  });
  return {
    customClass,
    showComponent,
    disabledComponent,
    effectDisabled,
    effectReadonly,
    readonlyComponent
  };
}

export function useItemAttr(props) {
  const { compDisabled, compReadonly } = toRefs(props);
  // 组件属性相关
  let showComponent = ref(true);
  // 启用禁用相关
  let disabledComponent = ref("");
  let effectDisabled = computed(() => {
    // 操作组件属性操作优先于属性配置
    return disabledComponent.value !== "" ? disabledComponent.value : compDisabled.value;
  });
  let readonlyComponent = ref("");
  let effectReadonly = computed(() => {
    return readonlyComponent.value !== "" ? readonlyComponent.value : compReadonly.value;
  });
  const customClass = computed(() => {
    return [
      { "readonly-wrap": !effectDisabled.value && effectReadonly.value }
    ];
  });
  return {
    customClass,
    showComponent,
    disabledComponent,
    effectDisabled,
    effectReadonly,
    readonlyComponent
  };
}