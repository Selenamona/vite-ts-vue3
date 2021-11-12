import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('haha-') // 设置自定义元素，不报错
      }
    }
  }),
  Components({
    resolvers: [ElementPlusResolver({
      importStyle: "sass",
    })],
  }),],
  resolve: {
    // alias: {
    //   '@': resolve(__dirname, 'src')
    // }
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/@/style/element-variables.scss" as *;`,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.pingping6.com/tools/baidutop/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})

