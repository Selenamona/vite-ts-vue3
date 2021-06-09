import { createRouter, createWebHashHistory } from "vue-router";

const constantFiles = require.context("./", true, /\.ts$/);
console.log("🚀 ~ file: index.ts ~ line 3 ~ constantFiles", constantFiles);

const routes = [
  {
    path: "/",
    name: "PerfectInfo",
    component: () => import("@/views/perfectInfo/PerfectInfo.vue")
  }
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default Router;
