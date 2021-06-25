import { RouteRecordRaw } from "vue-router";

const websiteRoute: Array<RouteRecordRaw> = [{
  path: "/",
  name: "Home",
  component: () => import("@/views/home/Home.vue")
}]

export default websiteRoute
