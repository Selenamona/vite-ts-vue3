import { RouteRecordRaw } from 'vue-router'

const CommonRoute: Array<RouteRecordRaw> = [{
  path: '/perfectInfo',
  name: 'PerfectInfo',
  component: () => import('../views/perfectInfo/PerfectInfo.vue')
}, {
  path: "/ts",
  name: "TsBasic",
  component: () => import("@/views/tsBasic/TsBasic.vue")
}]

export default CommonRoute
