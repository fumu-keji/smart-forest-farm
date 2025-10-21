<template>
  <div class="editor-render">
    <Editor
      class="editor-container"
      :style="editorContainerStyle"
      :defaultConfig="editorConfig"
      mode="simple"
      v-model="modelValue"
      @onCreated="onCreated"
    />
  </div>
</template>
<script setup>
import {  reactive, computed, shallowRef, onBeforeUnmount } from "vue";
import "@wangeditor-next/editor/dist/css/style.css";
import { Editor } from "@wangeditor-next/editor-for-vue";

const props = defineProps({
  height: {
    type: String,
    default: "500"
  },
  heightUnit: {
    type: String,
    default: "px"
  }
});
const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue"
});
const editorContainerStyle = computed(() => {
  if (props.height) {
    return {
      height: `${props.height}${props.heightUnit} !important`,
    };
  } else {
    return "";
  }
});
const editorConfig = reactive({ placeholder: "欢迎使用浮木云" });

// 编辑器创建
const editorRef = shallowRef();
function onCreated(editor) {
  editorRef.value = Object.seal(editor);
  editorRef.value.disable();
}
// 销毁组件
onBeforeUnmount(() => {
  editorRef.value && editorRef.value.destroy();
});
</script>

<style lang="less">
.editor-render-view {
  border: transparent !important;
  .editor-container {
    height: 100% !important;
  }
  .w-e-text-container {
    border: transparent !important;
  }
}
</style>