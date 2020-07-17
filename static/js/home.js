
let homeHtml = '<div>'
    +'<h1>歡迎登錄</h1>'
    // + ' <el-form label-width="100px">'
    // + ' <input-vue></input-vue>'
    // + '</el-form>'
    + '</div>'

let homeVue = {
    template: homeHtml,
    components: {
        "input-vue": inputVue,
    },
    data: function () {
        return {}
    },
    methods:{
    }
}


