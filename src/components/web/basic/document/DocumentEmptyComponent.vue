<template>
  <el-empty description=" ">
    <el-tag type="warning">
      {{ !$attrs.documentUrl ? "请上传文件" : "不支持该文件类型的预览" }}
    </el-tag>
  </el-empty>
</template>
<script setup>
</script>