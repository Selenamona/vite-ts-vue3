
import { createApp } from 'vue'
/**
 * 加载所有 Plugins
 * @param app 整个应用的实例
 */
export function loadAllPlugins(app: ReturnType<typeof createApp>) {
  const files = import.meta.globEager(('./*.ts'))
  console.log(files, Object.keys(files));
  Object.keys(files).forEach(k => {
    console.log(k);
    files[k].default(app)
  })
}
