<template>
  <div v-if="showComputed">
    <slot />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  visibility: {
    type: Boolean,
    default: true
  }
});
let showComponent = ref("");
const showComputed = computed(() => {
  return showComponent.value !== "" ? showComponent.value : props.visibility;
});
defineExpose({
  showComponent
});
</script>