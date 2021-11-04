import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';


// import.meta.globEager 函数从文件系统导入多个模块
const constantFiles = import.meta.globEager("./*.ts");
let routes: Array<RouteRecordRaw> = []
Object.keys(constantFiles).forEach(k => {
  routes = routes.concat(constantFiles[k].default)
})
console.log("全部路由", routes);

const Router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default Router;
