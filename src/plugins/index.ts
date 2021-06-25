
import { createApp } from 'vue'
/**
 * 加载所有 Plugins
 * @param app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = import.meta.globEager(('./*.ts'))
  Object.keys(files).forEach(k => {
    files[k].default(app)
  })
}
