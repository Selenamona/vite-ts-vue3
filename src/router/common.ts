import { RouteRecordRaw } from 'vue-router'

const CommonRoute:Array<RouteRecordRaw> = [{
  path: '/perfectInfo',
  name: 'PerfectInfo',
  component: () => import('../views/perfectInfo/PerfectInfo.vue')
}]

export default CommonRoute
