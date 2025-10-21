<template>
  <span
    :class="[
      'el-avatar',
      'custom-avatar-' + compSize,
      'el-avatar--' + shape,
      'el-avatar--' + type,
    ]"
  >
    <el-icon v-if="type == 'icon'">
      <component
        v-if="proxy.$isElementPlusIcons(avatarValue)"
        :is="avatarValue"
      />
    </el-icon>
    <el-image
      v-else-if="type == 'picture' && avatarValue"
      fit="contain"
      :src="avatarValue"
      :preview-src-list="[avatarValue]"
    >
      <template #error>
        <div class="image-slot">
          <el-icon><Picture /></el-icon>
        </div>
      </template>
    </el-image>
    <span v-else-if="type == 'text'">{{ avatarValue }}</span>
  </span>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted, watch } from "vue";
import { BASE_FILE_PREVIEW_URL } from "@/config/ip";
const { proxy } = getCurrentInstance();
const props = defineProps({
  compSize: {
    type: String,
    default: "default"
  },
  shape: {
    type: String,
    default: "circle"
  },
  fit: {
    type: String,
    default: "contain"
  },
  typeValue: {
    type: String,
    default: "UserFilled"
  },
  type: {
    type: String,
    default: "icon"
  },
  fileIds: {
    type: String,
    default: ""
  }
});
let avatarValue = ref("");
onMounted(() => {
  setAvatarValue();
});
watch(() => props.fileIds, val => {
  setAvatarValue(val);
});
// 设置头像的值
function setAvatarValue(fileId) {
  if (props.type === "picture") {
    if (fileId) {
      avatarValue.value = `${BASE_FILE_PREVIEW_URL}/${fileId}`;
    } else {
      avatarValue.value = proxy.$setAssetType(props.typeValue);
    }
  } else {
    avatarValue.value = props.typeValue;
  }
}
</script>

<style scoped lang="less">
.el-avatar {
  border: 1px solid #c0c4cc;
}
.el-avatar--picture {
  background-color: #fff !important;
}
.el-avatar.custom-avatar-mini {
  width: 28px;
  height: 28px;
  line-height: 28px;
  :deep(.image-slot) {
    font-size: 14px;
  }
}
.el-avatar.custom-avatar-small {
  width: 32px;
  height: 32px;
  line-height: 32px;
  :deep(.image-slot) {
    font-size: 16px;
  }
}
.el-avatar.custom-avatar-medium {
  width: 36px;
  height: 36px;
  line-height: 36px;
  :deep(.image-slot) {
    font-size: 18px;
  }
}
.el-avatar.custom-avatar-default {
  width: 40px;
  height: 40px;
  line-height: 40px;
  :deep(.image-slot) {
    font-size: 20px;
  }
}
.el-avatar.custom-avatar-large {
  width: 44px;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  :deep(.image-slot) {
    font-size: 22px;
  }
}
.el-avatar.custom-avatar-big {
  width: 48px;
  height: 48px;
  line-height: 48px;
  font-size: 22px;
  :deep(.image-slot) {
    font-size: 22px;
  }
}
.el-avatar.custom-avatar-superLarge {
  width: 52px;
  height: 52px;
  line-height: 52px;
  font-size: 24px;
  :deep(.image-slot) {
    font-size: 24px;
  }
}
:deep(.image-slot) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
}
</style>
