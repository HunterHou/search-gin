const routes = [
    { path: "/home", component: homeVue },
    { path: "/setting", component: setting },
    { path: "/menu/:no", component: menu },
    { path: "/context/:id/:pageNo", component: detail }
];
const router = new VueRouter({
    routes,
});