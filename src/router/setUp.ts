
import { RouteRecordRaw } from 'vue-router'

const SetUpRouts:Array<RouteRecordRaw> =[ {
  path: "/father",
  name: "setUpFather",
  component: () => import("@/setUp/father.vue")
}]

export default SetUpRouts