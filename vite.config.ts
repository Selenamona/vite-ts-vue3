import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/ 
export default defineConfig({
  plugins: [
    vue({
      refTransform: true, // 开启对 ref 语法糖的支持
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('haha-') // 设置自定义元素，不报错
        }
      }
    }),
    // element 按需导入配置
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: "sass",
      })],
    }),
    WindiCSS()
  ],
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

