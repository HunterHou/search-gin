import { createApp} from 'vue'
import './style.css'
import Main from './App.vue'

import {StoreSetup} from './store/pinia'
import {RouterSetup} from './route'
import {ElementSetup} from './plugin/element'

import Vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css

const AppInit = (app:any) => {
    RouterSetup(app)
    StoreSetup(app)
    ElementSetup(app)
}

const app = createApp(Main)
AppInit(app)
app.use(Vue3videoPlay)
app.mount('#app')
