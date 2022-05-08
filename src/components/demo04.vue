<template>
  <div>
    <div class="title">画布</div>
    <el-button @click="isPan">画布是否可以平移</el-button>
    <el-button @click="enablePan">启用画布平移</el-button>
    <el-button @click="disablePan">禁用画布平移</el-button>
    <el-button @click="togglePan">切换画布平移状态</el-button>
    <el-button>缩放等级:{{zoomLevel}}</el-button>
    <el-button @click="reduce">缩小</el-button>
    <el-button @click="zoom">放大</el-button>
    <el-button @click="getZoom">获取缩放等级</el-button>
    <el-button @click="center">居中</el-button>
    <el-button @click="destory">销毁画布</el-button>
    <!-- 1.创建容器 -->
    <div id="container"></div>
  </div>
</template>

<script>
import { Graph } from "@antv/x6";

// 2.准备数据
const data = {
  // 节点
  nodes: [
    {
      id: "node1",
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: "hello",
    },
    {
      id: "node2",
      x: 160,
      y: 180,
      width: 80,
      height: 40,
      label: "world",
    },
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
    },
  ],
};

export default {
  data() {
    return {
      graph: null,
      zoomLevel: 1
    }
  },
  mounted() {
    // 3.渲染画布
    this.graph = new Graph({
      container: document.getElementById('container'),
      height: 600,
      grid: true,
      panning: { // 画布平移
        enabled: true,
        modifiers: 'shift', // shift, ctrl, alt
        eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
      } 
    })

    // 4.在画布上渲染节点和边的JSON数据
    this.graph.fromJSON(data);
  },
  methods: {
    isPan() {
      alert(this.graph.isPannable())
    },
    enablePan() {
      this.graph.enablePanning()
    },
    disablePan() {
      this.graph.disablePanning()
    },
    togglePan() {
      this.graph.togglePanning()
    },
    reduce() {
      this.graph.zoom(-0.2) // 在原来缩放级别上增加 0.2
      this.zoomLevel = this.getZoom();
    },
    zoom() {
      this.graph.zoom(0.2) // 在原来缩放级别上减少 0.2
      this.zoomLevel = this.getZoom();
    },
    getZoom() {
      return this.graph.zoom()
    },
    center() {
      this.graph.centerContent()
    },
    destory() {
      this.graph.dispose()
    }
  }
};
</script>

<style scoped>
</style>