//根组件 vue app
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
let app = new Vue({
    el: "#appVue",
    router: router,
    components: {
        "input-vue": inputVue,
    },
    data: {
        headTitle: "首页!!!",
        outContext: "",
        activeIndex: "/home",
        isCollapse: true,
        myBackToTopStyle: {
            right: '50px',
            bottom: '75px',
            width: '80px',
            height: '80px',
            borderRadius: '4px',
            lineHeight: '45px', // 请保持与高度一致以垂直居中
            background: '#e7eaf1'// 按钮的背景颜色
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            // this.activeIndex=keyPath
            // console.log(key, keyPath)
            if (key == "/home") {
                this.headTitle = "首页"
                if (this.activeIndex === key) {
                    return
                }
                this.activeIndex = "/home"
            }
            if (key == "/menu") {
                this.headTitle = "目录"
                this.activeIndex = "/menu"
            }
            if (key == "/context") {
                this.headTitle = "详情"
                this.activeIndex = "/context"
            }
            if (key == "/setting") {
                this.headTitle = "設置"
                this.activeIndex = "/setting"
            }
            document.title = this.headTitle
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
});
