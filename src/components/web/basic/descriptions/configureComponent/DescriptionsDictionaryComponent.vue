<template>
  <span> {{ formatValue }} </span>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
const { proxy } = getCurrentInstance();
// 基础信息
const props = defineProps({
  configObject: {
    type: Object,
    require: true
  },
  contentValue: {
    type: [String, Number],
    require: true
  }
});
const filterArray = ref([]);
onMounted(() => {
  if (props.configObject.dictionaryCode) {
    proxy.$getDataAxios.getDictionaryItemByCode({ code: props.configObject.dictionaryCode }).then(res => {
      filterArray.value = res.data;
    }).catch(err => {
      proxy.$getDataAxios.notifyError(err);
    });
  }
});
const formatValue = computed(()=> {
  if (!Array.isArray(filterArray.value) || !filterArray.value.length) { 
    return props.contentValue; 
  }
  let curValue = props.contentValue.split(","), curName = [];
  curValue.forEach(itemValue => {
    const curItem = filterArray.value.find(item => item.value === itemValue);
    if (curItem) {
      curName.push(curItem.name);
    }
  });
  return curName.join(",");
});
</script>