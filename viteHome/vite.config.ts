const path =require('path')
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
    plugins: [vue()],
    resolve:{
        alias:{
            '@':path.resolve(__dirname,'./src')
        },
    },
    server: {
        port: 7001,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8081/',
                changeOrigin: true,
            }
        },
        host: '0.0.0.0',
        hmr: true,
    }
})
