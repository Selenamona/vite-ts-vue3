
import { RouteRecordRaw } from 'vue-router'

const SetUpRouts: Array<RouteRecordRaw> = [{
  path: "/father",
  name: "setUpFather",
  component: () => import("@/setUp/father.vue")
}, {
  path: "/el",
  name: "setUpEl",
  component: () => import("@/setUp/elementU.vue")
}]

export default SetUpRouts
