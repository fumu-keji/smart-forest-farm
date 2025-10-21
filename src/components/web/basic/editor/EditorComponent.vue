<template>
  <div class="editor-render">
    <Toolbar
      class="editor-toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      class="editor-container"
      :style="editorContainerStyle"
      :defaultConfig="editorConfig"
      mode="default"
      v-model="modelValue"
      @onCreated="onCreated"
    />
  </div>
</template>
<script setup>
import "@wangeditor-next/editor/dist/css/style.css";
import { reactive, computed, shallowRef, onBeforeUnmount, getCurrentInstance } from "vue";
import { BASE_FILE_UPLOAD_URL, BASE_FILE_PREVIEW_URL } from "@/config/ip";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
const { proxy } = getCurrentInstance();
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
const toolbarConfig = reactive({});
const editorConfig = {
  placeholder: "欢迎使用浮木云",
  MENU_CONF: {
    uploadImage: {
      fieldName: "file",
      server: BASE_FILE_UPLOAD_URL,
      headers: {
        Authentication: proxy.$getUserInfoItem("Authentication")
      },
      // 自定义插入图片
      customInsert(res, insertFn) {
        if (res.code === "200") {
          insertFn(BASE_FILE_PREVIEW_URL + "/" + res.data.id);
        } else {
          proxy.$getDataAxios.notifyError(res.message);
        }
      }
    },
    uploadVideo: {
      fieldName: "file",
      server: BASE_FILE_UPLOAD_URL,
      headers: {
        Authentication: proxy.$getUserInfoItem("Authentication") || ""
      },
      customInsert(res, insertFn) {
        if (res.code === "200") {
          insertFn(BASE_FILE_PREVIEW_URL + `/${res.data.id}`);
        } else {
          proxy.$getDataAxios.notifyError(res);
        }
      }
    }
  }
};

// 编辑器创建
const editorRef = shallowRef();
function onCreated(editor) {
  editorRef.value = Object.seal(editor);
}
// 销毁组件
onBeforeUnmount(() => {
  editorRef.value && editorRef.value.destroy();
});
</script>

<style lang="less" scoped>
.editor-render {
  height: max-content !important;
  cursor: text;
  &.w-e-full-screen-container {
    z-index: 99;
    height: 100% !important;
  }
  .editor-toolbar {
    border-bottom: 1px solid #ccc;
  }
}
</style>
