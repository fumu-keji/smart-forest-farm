<template>
  <div class="flow-chart-container">
    <!-- 流程图信息 -->
    <div v-show="flowChartData.xml" class="canvas-box">
      <div ref="canvasRef" class="canvas" />
    </div>
    <!-- 图例 -->
    <div v-if="flowChartData.xml" class="legend-box">
      <div class="processed process-box">
        <div class="processed-icon" />
        <div>已流转节点</div>
      </div>
      <div class="processing process-box">
        <div class="processing-icon" />
        <div>处理中节点</div>
      </div>
      <div class="unprocessed process-box">
        <div class="unprocessed-icon" />
        <div>未流转节点</div>
      </div>
    </div>
    <!--无数据 -->
    <base-empty v-if="!flowChartData.xml" :imgSize="150" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive, watch, nextTick, createApp, h } from "vue";
import { ElDescriptions, ElDescriptionsItem } from "element-plus";
import BpmnModeler from "bpmn-js/lib/Modeler";
const { proxy } = getCurrentInstance();
/**
 * 基础相关
 */
const props = defineProps({
  flowChartData: {
    type: Object,
    default: () => {}
  }
});
onMounted(() => {
  initBpmn();
});
watch(() => props.flowChartData, () => {
  createNewDiagram(props.flowChartData.xml);
}, { deep: true });
/**
 * 流程图相关
 */
const canvasRef = ref(null);
let bpmnModeler = ref(null);
// 初始化流程图
function initBpmn() {
  // 建模
  bpmnModeler.value = new BpmnModeler({
    container: canvasRef.value
  });
  // 渲染节点
  createNewDiagram();
}
// 加载xml数据
function createNewDiagram() {
  if (!props.flowChartData.xml) {
    return;
  }
  bpmnModeler.value.importXML(props.flowChartData.xml).then(() => {
    createSuccess();
  }).catch(err => {
    proxy.$message.error("加载数据失败");
  });
}
// 加载成功
function createSuccess() {
  initLayout();
  initEventBus();
  initNodeStyle();
}
// 居中画布
function initLayout() {
  const canvas = bpmnModeler.value.get("canvas");
  canvas.zoom("fit-viewport", "auto");
  canvas.scroll({
    dx: -80,
    dy: -100
  });
}
// 创建事件监听
function initEventBus() {
  // 禁用拖拽
  const dragAndDrop = bpmnModeler.value.get("dragging");
  dragAndDrop.setOptions({ manual: true });
  const eventBus = bpmnModeler.value.get("eventBus");
  eventBus.on("element.click", async event => {
    const { element } = event;
    let overlay = bpmnModeler.value.get("overlays");
    const nodeFliterArray = ["bpmn:UserTask", "bpmn:ServiceTask", "bpmn:ScriptTask"];
    if (!nodeFliterArray.includes(element.type)) {
      overlay.clear(); // 点击非节点时移除overlay
      return;
    }
    // 获取节点数据
    await getNodeInfo(element.id);
    // 渲染挂载的overlay的html
    const overlayComp = createApp({
      render() {
        return h("div", { class: "dispatch-info" }, [
          h("div", { class: "info-box" }, [
            h(ElDescriptions, { column: 1 }, { default: () => [
              h(ElDescriptionsItem, { label: "审批人：" }, { default: () => flowNodeInfo.approver || "--" }),
              h(ElDescriptionsItem, { label: "审批意见：" }, { default: () => flowNodeInfo.approverContent || "无" }),
              h(ElDescriptionsItem, { label: "审批时间：" }, { default: () => flowNodeInfo.approverTime || "--" }),
            ] })
          ]),
        ]);
      },
    });
    const mountNode = document.createElement("div");
    overlayComp.mount(mountNode);
    overlay.clear(); // 先清除之前的overlay
    overlay.add(element.id, "note", {
      position: {
        top: 20,
        left: -150,
        bottom: 0,
      },
      html: mountNode,
    });
    // 添加全局点击事件，点击其他地方移除overlay
    const handleDocumentClick = e => {
      // 如果点击的是overlay内容则不移除
      if (!mountNode.contains(e.target)) {
        overlay.clear();
        document.removeEventListener("mousedown", handleDocumentClick);
      }
    };
    // 先移除，防止重复绑定
    document.removeEventListener("mousedown", handleDocumentClick);
    document.addEventListener("mousedown", handleDocumentClick);
  });
}
// 找到节点的匹配数据
function initNodeStyle() {
  // 获取所有的节点和连线
  const elementRegistry = bpmnModeler.value.get("elementRegistry");
  const elements = elementRegistry.getAll();
  const nodes = elements.filter(element => {
    const nodeFliterArray = [
      "bpmn:StartEvent", "bpmn:EndEvent", "bpmn:UserTask", "bpmn:ServiceTask",
      "bpmn:ScriptTask", "bpmn:ExclusiveGateway", "bpmn:ParallelGateway", "bpmn:InclusiveGateway"
    ];
    return nodeFliterArray.includes(element.type);
  });
  const flows = elements.filter(element => element.type === "bpmn:SequenceFlow");
  // 设置节点样式
  nodes.forEach(node => {
    props.flowChartData.nodeList.forEach(nodeInfo => {
      if (node.id === nodeInfo.taskKey) {
        setNodeColor(node, nodeInfo.end);
      }
    });
  });
  flows.forEach(node => {
    props.flowChartData.nodeList.forEach(nodeInfo => {
      if (node.id === nodeInfo.taskKey) {
        setFlowColor(node, nodeInfo.end);
      }
    });
  });
}
// 设置节点的颜色
function setNodeColor(node, type) {
  // type = 0 没走过  type = 1 已经走过  type = 2 正在走的
  const modeling = bpmnModeler.value.get("modeling");
  const setColorObject = {
    0: "#73767a",
    1: "#64b0e5",
    2: "#fd7386"
  };
  modeling.setColor(node, {
    stroke: setColorObject[type]
  });
}
// 设置节点的颜色
function setFlowColor(node, type) {
  // type = 0 没走过  type = 1 已经走过  type = 2 正在走的
  const modeling = bpmnModeler.value.get("modeling");
  const setColorObject = {
    0: "#73767a",
    1: "#64b0e5",
    2: "#fd7386"
  };
  modeling.setColor(node, {
    stroke: setColorObject[type],
    fill: setColorObject[type]
  });
}
/**
 * 流程节点信息
 */
let flowNodeInfo = reactive({
  approver: "",
  approverContent: "",
  approverTime: ""
});
function getNodeInfo(id) {
  let params = {
    processId: props.flowChartData.processId,
    taskDefId: id
  };
  return proxy.$getDataAxios.getProcessNodeDetail(params).then(res => {
    flowNodeInfo = res.data;
  }).catch(() => {
    proxy.$getDataAxios.noitifyError(error);
  });
}
</script>

<style lang="less" scoped>
.flow-chart-container {
  position: relative;
}
:deep(.bjs-powered-by) {
  display: none;
}
:deep(.empty-box) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.canvas-box {
  width: 100%;
  height: 100%;
  .canvas {
    width: 100%;
    height: 100%;
  }
}
.legend-box {
  position: absolute;
  bottom: 20px;
  right: 20px;
  .process-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
    margin-top: 10px;
  }
  .processed {
    font-weight: bolder;
    color: #64b0e5;
    .processed-icon {
      width: 40px;
      height: 20px;
      border-radius: 5px;
      border: 2px solid #64b0e5;
    }
  }
  .processing {
    font-weight: bolder;
    color: #fd7386;
    .processing-icon {
      width: 40px;
      height: 20px;
      border-radius: 5px;
      border: 2px solid #fd7386;
    }
  }
  .unprocessed {
    font-weight: bolder;
    color: #73767a;
    .unprocessed-icon {
      width: 40px;
      height: 20px;
      border-radius: 5px;
      border: 2px solid #73767a;
    }
  }
}
</style>
<style lang="less">
.dispatch-info {
  width: 400px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #e7e7eb;
  box-shadow: 0px 0px 5px 0px rgba(41, 49, 94, 0.1);
  .el-descriptions__label {
    font-size: 15px;
    font-weight: bolder;
  }
}
.djs-bendpoints {
  display: none !important;
}
.djs-label-editing {
  display: none !important;
}
.djs-direct-editing-parent {
  opacity: 0 !important;
  pointer-events: none !important;
}
</style>