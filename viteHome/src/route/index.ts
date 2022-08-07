import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DefaultLayVue from "@/layout/DefaultLay.vue";

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayVue,
    name: "root",
    meta: {
      title: "首页",
      hidden: true,
    },
    children: [
      {
        path: "/home",
        component: () => import("../views/home/Home.vue"),
        name: "home",
        meta: {
          title: "首页",
          hidden: false,
        },
      },
    ],
  },

  {
    path: "/filelist",
    component: DefaultLayVue,
    name: "filelist",
    meta: {
      title: "文件",
    },
    children: [
      {
        path: "/filelist",
        component: () => import("../views/fileList/FileList.vue"),
        name: "filelist",
        meta: {
          title: "文件",
        },
      },
    ],
  },
  {
    path: "/actress",
    component: DefaultLayVue,
    name: "actress",
    meta: {
      title: "脸谱",
    },
    children: [
      {
        path: "/actress",
        component: () => import("../views/actress/Actress.vue"),
        name: "actress",
        meta: {
          title: "脸谱",
        },
      },
    ],
  },

  {
    path: "/setting",
    component: DefaultLayVue,
    name: "setting",
    meta: {
      title: "设置",
    },
    children: [
      {
        path: "/setting",
        component: () => import("@/views/settting/Setting.vue"),
        name: "setting",
        meta: {
          title: "设置",
        },
      },
    ],
  },
  {
    path: "/systeminfo",
    component: DefaultLayVue,
    name: "systeminfo",
    meta: {
      title: "系统信息",
    },
    children: [
      {
        path: "/systeminfo",
        component: () => import("@/views/systeminfo/Systeminfo.vue"),
        name: "systeminfo",
        meta: {
          title: "系统信息",
        },
      },
    ],
  },
  {
    path: "/mfilelist",
    name: "mfilelist",
    meta: {
      title: "M文件",
    },
    children: [
      {
        path: "/mfilelist",
        component: () => import("../views/mobile/MFileList.vue"),
        name: "mfilelist",
        meta: {
          title: "M文件",
        },
      },
    ],
  },
];

export const router = createRouter({
  routes: staticRoutes as RouteRecordRaw[],
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const RouterSetup = (app: App<Element>) => {
  app.use(router);
};
