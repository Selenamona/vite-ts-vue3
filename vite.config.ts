import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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

