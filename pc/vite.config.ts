import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
	// +++
	server: {
    port: 17001,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:10081/",
        changeOrigin: true,
      },
    },
    host: "0.0.0.0",
    hmr: true,
  },
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
