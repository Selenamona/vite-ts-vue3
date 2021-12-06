import { RouteRecordRaw } from "vue-router";


const MobileRoute: Array<RouteRecordRaw> = [
  {
    path: "/homePage",
    name: "HomePage",
    component: () => import("@/mobile/homePage/home.vue")
  },
  {
    path: "/demo/verify",
    name: "Verify",
    component: () => import("@/mobile/demo/verify.vue")
  },
  {
    path: "/fans",
    name: "Fans",
    component: () => import("@/mobile/fans/fans.vue")
  },
  // {
  //   path: "/personal",
  //   component: () => import("/@/mobile/personal/personal.vue")
  // },
  {
    path: "/tableRow",
    component: () => import("/@/mobile/tableRow/Index.vue")
  }
]

export default MobileRoute
