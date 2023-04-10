import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:10081/',
          changeOrigin: true
        }
      },
      host: 'localhost',
      hmr: true
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:10081/',
          changeOrigin: true
        }
      },
      host: '0.0.0.0',
      hmr: true
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})
