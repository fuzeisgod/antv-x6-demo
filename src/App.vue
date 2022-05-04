<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="route.name" :name="route.name" v-for="route in generator" :key="route.name"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { generator } from '@/router'
export default {
  name: "App",
  data() {
    return {
      activeName: this.$router.history.current.name,
      generator
    }
  },
  methods: {
    handleClick(tab) {
      this.$router.push(`/${tab.name}`)
    }
  }
};
</script>

<style>
html,
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.title {
  padding: 16px 0;
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
  color: blue;
}
.title::before {
  content: "Topic: ";
}
</style>
