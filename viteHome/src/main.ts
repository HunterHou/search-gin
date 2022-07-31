import { createApp} from 'vue'
import './style.css'
import Main from './App.vue'

import {StoreSetup} from './store/pinia'
import {RouterSetup} from './route'
import {ElementSetup} from './plugin/element'

const AppInit = (app:any) => {
    RouterSetup(app)
    StoreSetup(app)
    ElementSetup(app)
}

const app = createApp(Main)
AppInit(app)
app.mount('#app')
