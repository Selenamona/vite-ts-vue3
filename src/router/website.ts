import { RouteRecordRaw } from "vue-router";

const websiteRoute: Array<RouteRecordRaw> = [{
  path: "/",
  name: "Home",
  component: () => import("@/views/home/Home.vue")
}, {
  path: "/list",
  name: "List",
  component: () => import("@/views/list/List.vue")
}]

export default websiteRoute
