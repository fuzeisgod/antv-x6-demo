import Vue from 'vue'
import VueRouter from 'vue-router'

// TODO: 修改默认展示的tab
const activeTabName = 'demo05';

Vue.use(VueRouter)

const files = require.context('@/components', true, /\.vue$/)
let pages = {};
files.keys().forEach(key => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default;
})

let generator = [];
Object.keys(pages).forEach(item => {
  generator.push({
    path: `/${item}`,
    name: item,
    component: pages[item]
  })
})

const routes = [
  {
    path: '/',
    redirect: `/${activeTabName}`
  },
  ...generator
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export {
  generator,
  router
}