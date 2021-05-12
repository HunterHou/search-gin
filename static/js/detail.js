let detailHtml = '<div>'
    + '<el-page-header @back="goBack"  title="返回" v-bind:content="file.Name"></el-page-header>'
    + '<el-button style="float: left; left:0px;" @click="lastPage" class="floatButton" icon="el-icon-back"></el-button>'
    + '<el-button style="float: right; right:0px;" @click="nextPage" class="floatButton" icon="el-icon-right"></el-button>'
    +'<div style="margin-left: 120px">'

    + ' <el-row :gutter="24"> '
    + '     <el-image :src="file.JpgUrl" style="width: 85%;height: auto"/>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="2" >'
    + '         <span>番号:</span>'
    + '     </el-col>'
    + '     <el-col :span="4">'
    + '         <span>{{ file.Code }}</span>'
    + '     </el-col>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="2" >'
    + '         <span>优优:</span>'
    + '     </el-col>'
    + '     <el-col :span="4">'
    + '         <span>{{ file.Actress }}</span>'
    + '     </el-col>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="2" >'
    + '         <span>时间:</span>'
    + '     </el-col>'
    + '     <el-col :span="4">'
    + '         <span>{{ file.MTime }}</span>'
    + '     </el-col>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="2" >'
    + '         <span>大小:</span>'
    + '     </el-col>'
    + '     <el-col :span="4">'
    + '         <span>{{ file.SizeStr }}</span>'
    + '     </el-col>'
    + '</el-row>'
    +'</div>'
    + '</div>'


let detail = {
    template: detailHtml,
    data: function () {
        return {
            id: "",
            lastPageNo: 1,
            file: "",
        }
    },
    mounted: function () {
        const self = this
        const id = self.$route.params.id
        this.id = id
        const pageNo = self.$route.params.pageNo
        this.lastPageNo = pageNo
        this.load(id)

    },
    methods: {
        load(id) {
            axios.get("/info/" + id).then((res) => {
                if (res.status === 200) {
                    this.file = res.data
                    this.id = this.file.Id
                }
            })
        },
        goBack() {
            var self = this
            self.$router.push("/menu/" + this.lastPageNo)
            // history.back()
        },
        lastPage() {
            console.log(this.id)
            axios.get("/infoLast/" + this.id).then((res) => {
                if (res.status === 200) {
                    this.file = res.data
                    this.id = this.file.Id
                }
            })
        },
        nextPage() {

            axios.get("/infoNext/" + this.id).then((res) => {
                if (res.status === 200) {
                    this.file = res.data
                    this.id = this.file.Id
                    console.log(res.data)
                }
            })

        }
    }
}