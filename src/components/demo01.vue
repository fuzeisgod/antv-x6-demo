<template>
  <div>
    <div class="title">hello world</div>
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
  mounted() {
    // 3.渲染画布
    const graph = new Graph({
      container: document.getElementById('container'),
      width: 800,
      height: 600,
      grid: true
    })

    // 4.在画布上渲染节点和边的JSON数据
    graph.fromJSON(data);
  }
};
</script>

<style scoped>
</style>