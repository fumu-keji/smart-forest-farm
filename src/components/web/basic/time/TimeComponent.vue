<template>
  <div :style="mergeStyle">
    {{ showWeek ? time : time.slice(0, time.length - 3) }}
  </div>
</template>
<script setup>
import { computed, getCurrentInstance, onBeforeMount, onBeforeUnmount, ref } from "vue";
const { proxy } = getCurrentInstance();
// 基础信息
const props = defineProps({
  showWeek: {
    type: Boolean,
    default: true
  },
  textIndent: {
    type: String,
    default: "0"
  },
  letterSpacing: {
    type: String,
    default: "0"
  },
  rowAlign: {
    type: String,
    default: "flex-start"
  },
  columnAlign: {
    type: String,
    default: "center"
  }
});
const mergeStyle = computed(() => {
  const defaultStyle = {
    display: "flex",
    alignItems: props.columnAlign,
    justifyContent: props.rowAlign,
    textIndent: `${props.textIndent}px`,
    letterSpacing: `${props.letterSpacing}px`,
  };
  return Object.assign({}, props.textStyle, defaultStyle);
});
const time = ref("");
let timer = null;
onBeforeMount(() => {
  getTimes();
  timer = setInterval(() => {
    getTimes();
  }, 1000);
});
onBeforeUnmount(() => {
  timer && clearInterval(timer);
});
function getTimes() {
  let date = proxy.$moment().format("YYYY-MM-DD HH:mm:ss");
  let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  time.value = date + " " + weekArr[proxy.$moment().format("e")];
}
</script>
