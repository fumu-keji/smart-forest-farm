<template>
  <span @click.stop="textClick"> {{ columnValue }} </span>
</template>

<script setup>
import { toRaw } from "vue";
const props = defineProps({
  columnValue: {
    type: [String, Number],
    require: true
  },
  rowData: {
    type: Object,
    require: true
  }
});
const emit = defineEmits(["textClick"]);
function textClick() {
  emit("textClick", toRaw(props.rowData.row));
}
</script>