<template>
  <div>
    <div class="title">基类cell</div>
    <el-button @click="add">通过构造函数添加节点和边</el-button>
    <el-button @click="addCutom">自定义节点</el-button>
    <el-button @click="addCutomRect">重构rect构造函数(markup)</el-button>
    <el-button @click="addGroup">组选择器</el-button>
    <el-button @click="addNodeMetaData">MetaData</el-button>
    <el-button @click="addNodeCss">css定制样式</el-button>
    <el-button @click="addNodeTextEdit">文本节点可编辑</el-button>
    <el-button @click="addControl">通过控制面板修改属性</el-button>
    <el-button @click="toJSON">toJSON</el-button>
    <div id="container"></div>
    <div class="form-content">
      <el-form :model="formState" label-position="left">
        <el-form-item label="标题" v-show="formState.labelText !== null">
          <el-input
            v-model="formState.labelText"
            @change="onNameChange"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户" v-show="formState.userId !== null">
          <el-select v-model="formState.userId" @change="onUserIdChange">
            <el-option :value="1">张三</el-option>
            <el-option :value="2">李四</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" v-show="formState.roleId !== null">
          <el-select v-model="formState.roleId" @change="onRoleIdChange">
            <el-option :value="1">管理员</el-option>
            <el-option :value="2">普通用户</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Graph, Shape, Node } from "@antv/x6";
export default {
  data() {
    return {
      graph: null,
      formState: {
        labelText: null,
        userId: null,
        roleId: null,
      },
      curCel: null, // 当前点击选中的节点
    };
  },
  mounted() {
    this.graph = new Graph({
      container: document.getElementById("container"),
      height: 600,
      grid: true,
    });
    this.$nextTick(() => {
      this.graph.on("cell:click", ({ cell }) => {
        console.log(cell);
        this.curCel?.attr("body/stroke", null); // 清除上一个选中的节点的选中样式
        this.curCel = cell;
        this.curCel?.attr("body/stroke", "red"); // 为当前选中节点增加选中样式

        let labelText = null;
        if (cell.getAttrs()?.text?.text) labelText = cell.getAttrs()?.text.text;
        if (cell.getAttrs()?.label?.text)
          labelText = cell.getAttrs()?.label.text;

        this.formState.labelText = labelText;
        this.formState.userId = cell.getData()?.userId;
        this.formState.roleId = cell.getData()?.roleId;
      });
    });
  },
  methods: {
    add() {
      const rect = new Shape.Rect({
        id: "node1",
        x: 40,
        y: 40,
        width: 100,
        height: 40,
        label: "rect",
        zIndex: 2,
        attrs: {
          body: {
            stroke: "blue",
            fill: "#fff",
          },
          label: {
            text: "rect",
            fill: "#333",
          },
        },
      });

      const circle = new Shape.Circle({
        id: "node2",
        x: 280,
        y: 200,
        width: 60,
        height: 60,
        label: "circle",
        zIndex: 2,
      });

      const edge = new Shape.Edge({
        id: "edge1",
        source: rect,
        target: circle,
        zIndex: 1,
      });

      this.graph.addNode(rect);
      this.graph.addNode(circle);
      this.graph.addEdge(edge);
    },
    addCutom() {
      const customNode = new Node({
        x: 400,
        y: 350,
        width: 200,
        height: 60,
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          {
            tagName: "text",
            selector: "label", // 选择器的优先级高于标签
          },
        ],
        attrs: {
          body: {
            stroke: "#000",
            fill: "#fff",
            ref: "label",
            rx: 3,
            ry: 3,
            refWidth: 100,
            refHeight: 100,
            refX: -50,
            refY: -50,
          },
          label: {
            text: "hello",
          },
        },
      });
      this.graph.addNode(customNode);
    },
    addCutomRect() {
      const rect = new Shape.Rect({
        x: 10,
        y: 100,
        width: 100,
        height: 40,
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          // {
          //   tagName: 'text',
          //   selector: 'label'
          // }
        ],
        attrs: {
          body: {
            stroke: "#000",
            fill: "#fff",
          },
          label: {
            text: "rect",
            fill: "blue",
          },
        },
      });
      this.graph.addNode(rect);
    },
    addGroup() {
      const rect = new Shape.Rect({
        x: 10,
        y: 100,
        width: 100,
        height: 60,
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          {
            tagName: "text",
            selector: "label",
            groupSelector: "textGroup",
          },
          {
            tagName: "text",
            selector: "content",
            groupSelector: "textGroup", // 优先级 selector > groupSelector > tagName
          },
        ],
        attrs: {
          body: {
            stroke: "#5f95ff",
            fill: "rgba(95,149,255,0.05)",
          },
          label: {
            text: "Title",
            refX: 40,
            refY: 14,
            fontSize: 12,
          },
          content: {
            text: "Content",
            refX: 40,
            refY: 38,
            fontSize: 12,
            fill: "red",
          },
          textGroup: {
            fill: "rgba(0,0,0,0.6)",
          },
        },
      });
      this.graph.addNode(rect);
    },
    addNodeMetaData() {
      const metaData = {
        x: 10,
        y: 300,
        width: 220,
        height: 60,
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          {
            tagName: "image",
            selector: "image",
          },
          {
            tagName: "text",
            selector: "label",
          },
          {
            tagName: "text",
            selector: "text",
          },
        ],
        attrs: {
          body: {
            stroke: "#5f95ff",
            strokeWidth: 1,
            fill: "rgba(95, 149, 255, 0.05)",
          },
          image: {
            "xlink: href":
              "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
            width: 80,
            height: 40,
            x: 12,
            y: 12,
          },
          label: {
            text: "Node",
            refX: 100,
            refY: 14,
            fill: "rgba(0,0,0,0.85)",
            fontSize: 12,
            "text-anchor": "start",
          },
          text: {
            text: "this is content text",
            refX: 100,
            refY: 40,
            fill: "rgba(0,0,0,0.85)",
            "text-anchor": "start",
          },
        },
      };
      this.graph.addNode(metaData);
    },
    addNodeCss() {
      const metaData = {
        x: 10,
        y: 300,
        width: 220,
        height: 60,
        markup: [
          {
            tagName: "rect",
            selector: "body",
          },
          {
            tagName: "image",
            selector: "image",
          },
          {
            tagName: "text",
            selector: "label",
          },
          {
            tagName: "text",
            selector: "text",
          },
        ],
        attrs: {
          body: {
            class: "customRectClass", // 自定义css样式
            stroke: "#5f95ff",
            strokeWidth: 1,
            // fill: "rgba(95, 149, 255, 0.05)",
          },
          image: {
            "xlink: href":
              "https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg",
            width: 80,
            height: 40,
            x: 12,
            y: 12,
          },
          label: {
            text: "Node",
            refX: 100,
            refY: 14,
            fill: "rgba(0,0,0,0.85)",
            fontSize: 12,
            "text-anchor": "start",
            pointerEvents: "auto",
          },
          text: {
            text: "this is content text",
            refX: 100,
            refY: 40,
            fill: "rgba(0,0,0,0.85)",
            "text-anchor": "start",
          },
        },
      };
      this.graph.addNode(metaData);
    },
    addNodeTextEdit() {
      const metaData = new Shape.TextBlock({
        x: 10,
        y: 200,
        width: 200,
        height: 80,
        attrs: {
          label: {
            text: "hello",
            contenteditable: true,
          },
        },
      });
      this.graph.addNode(metaData);
    },
    addControl() {
      const metaData = {
        x: 10,
        y: 200,
        width: 200,
        height: 80,
        attrs: {
          label: {
            text: "hello",
            fill: "blue",
          },
        },
        data: {
          userId: 1,
          roleId: 1,
        },
      };
      this.graph.addNode(metaData);
    },
    toJSON() {
      console.log(this.graph.toJSON());
    },
    onNameChange() {
      this.curCel?.attr("label/text", this.formState.labelText);
    },
    onUserIdChange() {
      this.curCel?.setData({
        userId: this.formState.userId
      })
    },
    onRoleIdChange() {
      this.curCel?.setData({
        roleId: this.formState.roleId
      })
    }
  },
};
</script>

<style scoped>
#container >>> .customRectClass {
  fill: #2ecc71;
}
.form-content {
  padding: 0 16px;
  width: 250px;
  border: 1px solid #eee;
}
</style>