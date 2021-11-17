import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import { store, key } from './store/index'
import { loadAllPlugins } from './plugins'
import './style/index.scss'
import "/@/utils/rem";
import { PullRefresh } from "vant";
import "vant/lib/index.css"; // 全局引入样式
import 'virtual:windi.css'
// import './style/element-variables.scss'
const app = createApp(App)
loadAllPlugins(app)
app.use(router).use(store, key).use(PullRefresh).mount('#app')


/**
 * 应用配置：参考 https://v3.cn.vuejs.org/api/application-config.html#optionmergestrategies
 * errorHandler
 * warnHandler
 * globalProperties
 * isCustomElement
 * optionMergeStrategies
 * performance
 */

// 全局 property，可以在任何组件实例中访问。相当于 vue2.x 的 Vue.prototype.$foo
app.config.globalProperties.$foo = 'bar'


// 任何以“haha-”开头的元素都将被识别为自定义元素
// 注意：这个配置项只有在使用运行时编译器 (runtime compiler) 版本时才会被独享。
// 如果是仅运行时 (runtime-only) 版本，那么 isCustomElement 就必须通过构建设置，具体设置参考vite.config.js
// app.config.isCustomElement = tag => tag.startsWith('haha-')


// // 处理组件渲染方法和侦听器执行期间抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和应用实例
// app.config.errorHandler = (err, vm, info) => {
//   console.log("🚀 errorHandler", err, vm, info);
//   // 处理错误
//   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
// }

// // 为 Vue 的运行时警告指定一个自定义处理函数。注意这只会在开发环境下生效，在生产环境下它会被忽略
// app.config.warnHandler = function (msg, vm, trace) {
//   console.log("🚀 warnHandler", msg, vm, trace)
//   // `trace` 是组件的继承关系追踪
// }

// 设置为 true 以在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪。
// 只适用于开发模式和支持 performance.mark API 的浏览器。
app.config.performance = true
