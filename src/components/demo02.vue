<template>
  <div>
    <div class="title">平移和缩放</div>

    <el-button @click="translate">平移</el-button>
    <el-button @click="reduce">缩小0.5</el-button>
    <el-button @click="zoom">放大0.5</el-button>

    <div id="container"></div>
  </div>
</template>

<script>
import { Graph } from "@antv/x6";

const data = {
  // 节点
  nodes: [
    {
      id: "node1",
      x: 0,
      y: 0,
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
      graph: null
    }
  },
  mounted() {
    this.graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      background: {
        color: '#fffbed'
      },
      grid: {
        size: 10,
        visible: true
      }
    })

    this.graph.fromJSON(data);
  },
  methods: {
    // graph 的平移，放大缩小操作方法
    translate() {
      this.graph.translate(80, 40)
    },
    reduce() {
      this.graph.zoom(-0.5)
    },
    zoom() {
      this.graph.zoom(0.5)
    }
  }
};
</script>

<style scoped>
</style>