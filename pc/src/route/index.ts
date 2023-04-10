import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DefaultLayVue from "@/layout/DefaultLay.vue";
import MobileLayVue from "@/layout/MobileLay.vue";

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayVue,
    redirect:'/home',
    name: "root",
    meta: {
      title: "首页",
      hidden: false,
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
      hidden:false,
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
      title: "图鉴",
      hidden:false,
    },
    children: [
      {
        path: "/actress",
        component: () => import("../views/actress/Actress.vue"),
        name: "actress",
        meta: {
          title: "图鉴",
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
      hidden:false,
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
    path: "/systemview",
    component: DefaultLayVue,
    name: "SystemView",
    meta: {
      title: "系统信息",
      hidden:false,
    },
    children: [
      {
        path: "/systemview",
        component: () => import("@/views/systemInfo/SystemView.vue"),
        name: "SystemView",
        meta: {
          title: "系统信息",
        },
      },
    ],
  },
  // {
  //   path: "/mobilebar",
  //   name: "mobilebar",
  //   meta: {
  //     title: "M文件",
  //     hidden: true,
  //   },
  //   children: [
  //     {
  //       path: "/mobilebar",
  //       component: () => import("../views/mobile/MobileBar.vue"),
  //       name: "MobileBar",
  //       meta: {
  //         title: "M文件",
  //         hidden: true,
  //       },
  //     },
  //   ],
  // },
  {
    path: "/mhome",
    name: "mhome",
    component: MobileLayVue,
    redirect:"/mhome",
    meta: {
      title: "搜索",
      hidden: true,
    },
    children: [
      {
        path: "/mhome",
        component: () => import("../views/mobile/MHome.vue"),
        name: "mhome",
        meta: {
          title: "首页",
          hidden: true,
        },
      },{
        path: "/mfilelist",
        component: () => import("../views/mobile/MFileList.vue"),
        name: "mfilelist",
        meta: {
          title: "搜索",
          hidden: true,
        },
      },
      {
        path: "/mactress",
        component: () => import("../views/mobile/MActress.vue"),
        name: "mactress",
        meta: {
          title: "图鉴",
          hidden: true,
        },
      },
      {
        path: "/msetting",
        component: () => import("../views/mobile/MSetting.vue"),
        name: "msetting",
        meta: {
          title: "设置",
          hidden: true,
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
