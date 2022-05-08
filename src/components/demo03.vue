<template>
  <div>
    <div class="title">14种内置节点和3种内置边</div>

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
      shape: "rect",
      x: 100,
      y: 200,
      width: 80,
      height: 40,
      label: "矩形",
    },
    {
      id: "node2",
      shape: "circle",
      x: 300,
      y: 200,
      width: 80,
      height: 40,
      label: "圆形",
    },
    {
      id: "node3",
      shape: "ellipse",
      x: 500,
      y: 200,
      width: 80,
      height: 40,
      label: "椭圆形",
    },
    {
      id: "node4",
      shape: "polygon",
      x: 700,
      y: 200,
      width: 80,
      height: 40,
      label: "多边形",
      attrs: {
        body: {
          fill: "#efdbdd",
          stroke: "#9254de",
          // 多边形每个点的坐标（x,y）（相对坐标，相对与该节点的起始坐标（700,200）,最后按照给的宽和高（80、40）做一个缩放）
          refPoints: "0,10 10,0 20,10 10,20",
        },
      },
    },
    {
      id: "node5",
      shape: "polyline",
      x: 900,
      y: 200,
      width: 80,
      height: 40,
      label: "折线",
      attrs: {
        body: {
          fill: "#efdbdd",
          stroke: "#9254de",
          // 类似多边形，区别在于不封口
          refPoints: "0,10 10,0 20,10 10,20",
        },
      },
    },
    {
      id: "node6",
      shape: "path",
      x: 1100,
      y: 200,
      width: 80,
      height: 40,
      label: "路径",
      // svg 代码
      path: "M 0 5 10 0 C 20 0 20 20 10 20 L 0 15 Z",
      attrs: {
        body: {
          fill: "#efdbdd",
          stroke: "#9254de",
        },
      },
    },
    {
      id: "node7",
      shape: "image",
      x: 1100,
      y: 400,
      width: 80,
      height: 40,
      imageUrl:
        "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
    },
    {
      id: "node8",
      shape: "image-bordered",
      x: 900,
      y: 400,
      width: 80,
      height: 40,
      imageUrl:
        "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
    },
    {
      id: "node9",
      shape: "image-embedded",
      x: 700,
      y: 400,
      width: 80,
      height: 40,
      imageUrl:
        "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
    },
    {
      id: "node10",
      shape: "image-inscribed",
      x: 500,
      y: 400,
      width: 80,
      height: 40,
      imageUrl:
        "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
    },
    {
      id: "node11",
      shape: "text-block",
      x: 300,
      y: 370,
      width: 100,
      height: 100,
      text: "文本节点,这是一个很长的文本节点",
      attrs: {
        body: {
          fill: "#efdbff",
          stroke: "#9254de",
          rx: 10,
          ry: 10,
        },
      },
    },
    {
      id: "node12",
      shape: "cylinder",
      x: 100,
      y: 360,
      width: 80,
      height: 120,
      label: "圆柱",
      attrs: {
        top: {
          fill: "#efdbff",
          stroke: "#9254de",
          rx: 10,
          ry: 10,
          fillOpacity: 0.5,
        },
        body: {
          fill: "#efdbff",
          stroke: "#9254de",
          rx: 10,
          ry: 10,
          fillOpacity: 0.5,
        },
      },
    },
    {
      id: "node13",
      shape: "html",
      x: 100,
      y: 600,
      width: 80,
      height: 40,
      html() {
        const wrap = document.createElement("div");
        wrap.style.width = "100%";
        wrap.style.height = "100%";
        wrap.style.display = "flex";
        wrap.style.alignItems = "center";
        wrap.style.justifyContent = "center";
        wrap.style.border = "2px solid #9254de";
        wrap.style.background = "#efdbff";
        wrap.style.borderRadius = "4px";
        wrap.innerText = "我是HTML";
        return wrap;
      },
    },
    {
      id: "node14",
      shape: "html",
      x: 300,
      y: 600,
      width: 80,
      height: 40,
      html() {
        const wrap = document.createElement("div");
        wrap.innerHTML = `
          <a href="#" class="my-btn">我是一个a标签</a>
        `
        return wrap;
      },
    },
  ],
  edges: [
    {
      shape: "edge", // 普通边
      source: "node1",
      target: "node2",
    },
    {
      shape: "double-edge", // 双边
      source: "node2",
      target: "node3",
    },
    {
      shape: "shadow-edge", // 阴影边
      source: "node3",
      target: "node4",
    },
    {
      source: "node4",
      target: "node5",
    },
    {
      source: "node5",
      target: "node6",
    },
    {
      source: "node6",
      target: "node7",
    },
    {
      source: "node7",
      target: "node8",
    },
    {
      source: "node8",
      target: "node9",
    },
    {
      source: "node9",
      target: "node10",
    },
    {
      source: "node10",
      target: "node11",
    },
    {
      source: "node11",
      target: "node12",
    },
    {
      source: "node12",
      target: "node13",
    },
    {
      source: "node13",
      target: "node14",
    }
  ],
};

export default {
  data() {
    return {
      graph: null,
    };
  },
  mounted() {
    this.graph = new Graph({
      container: document.getElementById("container"),
      width: 1200,
      height: 750,
      background: {
        color: "#fffbed",
      },
      grid: {
        size: 10,
        visible: true,
      },
    });
    this.graph.fromJSON(data);
  },
  methods: {},
};
</script>

<style scoped>
</style>