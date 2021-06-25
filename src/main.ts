import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import { store, key } from './store/index'
import { loadAllPlugins } from './plugins'
import './style/index.scss'

const app = createApp(App)
loadAllPlugins(app)
app.use(router).use(store, key).mount('#app')

