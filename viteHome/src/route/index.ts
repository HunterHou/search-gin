import {App} from 'vue';
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import ActressVue from '../views/actress/Actress.vue';
import FileListVue from '../views/fileList/FileList.vue';
import HomeVue from "../views/home/Home.vue";
import SettingVue from "../views/settting/Setting.vue";

export const staticRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
        name: 'root',
        meta: {
            title: '首页',
            hidden: true
        }
    },
    {
        path: '/home',
        component: HomeVue,
        name: 'home',
        meta: {
            title: '首页',
            hidden: false
        }
    },
    {
        path: '/filelist',
        component: FileListVue,
        name: 'filelist',
        meta: {
            title: '文件'
        }
    },

    {
        path: '/actress',
        component: ActressVue,
        name: 'actress',
        meta: {
            title: '脸谱'
        }
    }, {
        path: '/setting',
        component: SettingVue,
        name: 'setting',
        meta: {
            title: '设置'
        }
    },
]


export const router = createRouter({
    routes: staticRoutes as RouteRecordRaw[],
    history: createWebHistory(),
    scrollBehavior: () => (
        {left: 0, top: 0}
    )
})


export const RouterSetup = (app : App < Element >) => {
    app.use(router)
}
