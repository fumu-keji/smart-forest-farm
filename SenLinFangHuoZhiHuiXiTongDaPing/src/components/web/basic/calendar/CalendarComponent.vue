<template>
  <div class="calendar-render-box">
    <!-- 年份日期选择框 -->
    <div class="calender-select">
      <el-date-picker
        type="month"
        :popperClass="popperClass"
        :editable="false"
        :clearable="false"
        v-model="currentMonth"
        @change="selectYearMonthChange"
      />
    </div>
    <!-- 日历组件 -->
    <el-calendar v-model="calendarValue" :style="calendarStyle">
      <template #date-cell="{ data }">
        <div class="data-cell-box">
          <!-- 标记组件 -->
          <el-badge v-if="setBadgeNumber(data)" :value="setBadgeNumber(data)" />
          <div class="date-text">
            {{ formatCalendar(data) }}
          </div>
          <!-- 动态渲染组件 -->
          <component
            v-if="setComponentValue(data)"
            :is="setConfigureComponent"
            :filterArray="valueConfigureData.filterData"
            :configObject="valueConfigureData.configData"
            :componentValue="setComponentValue(data)"
          />
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from "vue";
import { APPLICATION_TYPE } from "@/config/ip";
const { proxy } = getCurrentInstance();
/**
 * 基础相关
 */
const props = defineProps({
  dateColor: {
    type: String,
    default: "#5E5E5E"
  },
  dateFontSize: {
    type: String,
    default: "14"
  },
  dateHeight: {
    type: String,
    default: "55"
  },
  valueConfigureData: {
    type: Object,
    default: () => {}
  },
  calendarDateData: {
    type: Array,
    default: () => []
  },
});
const emit = defineEmits(["currentMonthChange", "currentDateChange"]);
const popperClass = computed(() => {
  if (APPLICATION_TYPE === "large") {
    return "large-popper"; 
  }
  return "";
});
const calendarStyle = computed(()=> {
  return {
    "--dateHeight": `${props.dateHeight}px`,
    "--dateColor": props.dateColor,
    "--dateFontSize": `${props.dateFontSize}px`,
  };
});
const setConfigureComponent = computed(() => {
  const valueType = props.valueConfigureData.valueType;
  const componentNameObject = {
    text: "CalendarTextComponent",
    tag: "CalendarTagComponent",
    icon: "CalendarIconComponent",
  };
  return componentNameObject[valueType] || "";
});
/**
 * 数据加载绑定相关
 */
let calendarValue = ref(new Date());
let currentMonth = ref(new Date());
let lastMonth = ref("");
// 监听选中日期的改变加载当前月份的数据
watch(calendarValue, newVal => {
  currentMonth.value = newVal;
  if (proxy.$moment(newVal).format("YYYY-MM") !== lastMonth.value) {
    emit("currentMonthChange", proxy.$moment(newVal).format("YYYY-MM"));
  }
  emit("currentDateChange", proxy.$moment(newVal).format("YYYY-MM-DD"));
}, { immediate: true });
/**
 * 设置值的展示
 */
// 监听年份月份的改变
function selectYearMonthChange(val) {
  calendarValue.value = val;
}
// 设置标记的数量
function setBadgeNumber(data) {
  if (!props.valueConfigureData.showBadge) {
    return false;
  }
  let dayProp = props.valueConfigureData.modelDayProp || props.valueConfigureData.dayProp;
  let badgeProp = props.valueConfigureData.modelBadgeProp || props.valueConfigureData.badgeProp;
  const currentItem = props.calendarDateData.find(item => item[dayProp].split(" ")[0] === data.day) || {};
  return currentItem[badgeProp] ? parseInt(currentItem[badgeProp]) : false;
}
// 设置扩展组件的值
function setComponentValue(data) {
  if (!props.valueConfigureData.showValue) {
    return false;
  }
  let dayProp = props.valueConfigureData.modelDayProp || props.valueConfigureData.dayProp;
  let valueProp = props.valueConfigureData.modelValueProp || props.valueConfigureData.valueProp;
  const currentItem = props.calendarDateData.find(item => item[dayProp].split(" ")[0] === data.day) || {};
  return currentItem[valueProp] ? currentItem[valueProp] : false;
}
// 过滤日期的值
function formatCalendar(date) {
  return date.day.split("-").slice(2).join("");
}
/**
 * 导出
 */
defineExpose({
  lastMonth
});
</script>

<style lang="less">
.calendar-render-box {
  position: relative;
  padding: 1px;
  overflow: auto;
  box-sizing: border-box;
  .calender-select {
    position: absolute;
    top: 12px;
    left: 20px;
    .el-date-editor .el-input__inner {
      font-size: 15px !important;
    }
  }
  .el-calendar {
    width: 100%;
  }
  .el-calendar__header {
    .el-calendar__title {
      visibility: hidden;
    }
    .el-calendar__button-group {
      .el-button {
        font-size: 14px !important;
        padding: 15px !important;
      }
    }
  }
  .el-calendar-table tr td {
    border: none !important;
    padding: 5px;
    text-align: center;
  }
  .el-calendar-day {
    border: 1px solid #ebeef5;
    height: var(--dateHeight) !important;
    padding: 0px !important;
    .data-cell-box {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 10px;
      box-sizing: border-box;
      .el-badge {
        position: absolute;
        right: -10px;
        top: -10px;
      }
      .date-text {
        width: 100%;
      }
    }
  }
  .current.is-selected {
    background-color: transparent !important;
    .el-calendar-day {
      background-color: var(--el-color-primary) !important;
      .date-text {
        color: #ffffff !important;
      }
    }
  }
  .current {
    .date-text {
      color: var(--dateColor);
      font-size: var(--dateFontSize);
    }
  }
  .prev,
  .next {
    .date-text {
      font-size: var(--dateFontSize);
    }
  }
  .is-today {
    .date-text {
      color: var(--el-color-primary);
    }
  }
}
</style>
