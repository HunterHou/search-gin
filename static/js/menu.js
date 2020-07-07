var menuhtml = '<div><h1>目录</h1>'
    + '<div>'
    + '<span v-if="errorMsg">{{errorMsg}}</span>'
    + '<ul  class="infinite-list" style="overflow:auto">'
    + '<li v-bind:class="listStyle" class="infinite-list-item list-item" v-for="(item,index) in dataList" :key="item.Id">'
    + '<el-link @click="open(item.Path)">{{ item.Name }}</el-link> '
    + '<div class="demo-image__preview">'
    + '    <el-image'
    + '        style="width: 100px; height: 100px"'
    + '    :src="item.PngBase"'
    + '   :preview-src-list="imageList">'
    + ' </el-image>'
    + '</div>'
    + ''
    + '</li>'
    + '</ul>'
    + '</div>'
    + '</div>'

var menu = {

    template: menuhtml,
    data: function () {
        return {
            listStyle:{
                'width': "240px",
                'height': '400px',
                'float': 'left',
                'margin-right': '25px',
            },
            imageList:[],
            dataList: "",
            dataCnt: 0,
            errorMsg: ""
        }
    },
    mounted: function () {
        document.title = "目录"
        this.queryList()
    },
    methods: {
        queryList() {
            axios.get("/movieList").then((res) => {
                if (res.status === 200) {
                    this.dataList = res.data.Data
                    if (this.dataList && this.dataList.length>0){
                        this.dataList.map((item=>{
                            this.imageList.push(item.PngBase)
                        }))
                    }
                    console.log(this.dataList)
                }

            })
        },
        open(filename) {
            var self = this
            console.log(filename)
            self.$router.push("/context/" + filename)


        }
    }

}