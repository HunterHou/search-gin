import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './route'
import  elementPlus  from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
app.use(elementPlus,{size:'small',locale: zhCn,})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
