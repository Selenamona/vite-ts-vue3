import { createRouter, createWebHashHistory } from "vue-router";

// const constantFiles = require.context("./", true, /\.ts$/);
// console.log("🚀 ~ file: index.ts ~ line 3 ~ constantFiles", constantFiles);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/Home.vue")
  },
  {
    path: "/perfectInfo",
    name: "PerfectInfo",
    component: () => import("@/views/perfectInfo/PerfectInfo.vue")
  },
  {
    path: "/ts",
    name: "TsBasic",
    component: () => import("@/views/tsBasic/TsBasic.vue")
  }
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default Router;
