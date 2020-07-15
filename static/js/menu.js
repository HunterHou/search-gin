let menuhtml = '<div>'
    + '  <el-row>  '
    + '<el-col :span="2"> <el-button type="primary" icon="el-icon-search" @click="refreshIndex()">更新索引</el-button></el-col>'
    + '<el-col :span="6"><el-radio-group v-model="sortField">\n' +
    '      <el-radio-button label="code" >名称</el-radio-button>\n' +
    '      <el-radio-button label="mtime" >时间</el-radio-button>\n' +
    '      <el-radio-button label="size" >大小</el-radio-button>\n' +
    '    </el-radio-group>'
    + '<el-switch v-model="sortType" active-text="倒序"  active-value="desc"  inactive-text="正序"  inactive-value="asc"> </el-switch></el-col>'
    + '<el-col :span="8"><el-input placeholder="请输入内容" v-model="searchWords" >' +
    '    <el-button slot="append" type="primary" icon="el-icon-search" @click="queryList()">Go!</el-button>' +
    '  </el-input></el-col>'
    + '</el-row>'
    + '<div v-loading="loading"\n' +
    '    element-loading-text="拼命加载中"\n' +
    '    element-loading-spinner="el-icon-loading" style="min-height: 800px">'
    + '<span v-if="errorMsg">{{errorMsg}}</span>'
    + '<el-pagination' +
    '  :page-sizes="[30, 60, 90, 200]" :page-size="pageSize"' +
    '  @size-change="handleSizeChange"' +
    '  @current-change="handleCurrentChange"' +
    '  layout="total,prev, pager, next, sizes"' +
    '  :total="totalCnt">' +
    '</el-pagination>'
    + '<ul  class="infinite-list" style="overflow:auto"  >'
    + '<li v-bind:class="listStyle" class="infinite-list-item list-item" v-for="(item,index) in dataList" :key="item.Id">'
    + '<div @click="openWin(item.Id)"  style="width: 100\%; height: 85%" ><el-image style="width: 100\%; height: 100%" :src="item.Png" :fit="fit" lazy></el-image></div>'
    + '<el-image style="width: 35px; height: 35px" :src="PlayCons" :fit="fit" @click="playThis(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="ChangeCons" :fit="fit" @click="thisActress(item.Actress)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="OpenCons" :fit="fit" @click="openThisFolder(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="ReplayCons" :fit="fit" @click="syncThis(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="CloseCons" :fit="fit" @click="infoThis(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="StopCons" :fit="fit"@click="deleteThis(item.Id)"></el-image>'
    + '<br/><span>{{ item.Name }}【{{item.SizeStr }}】</span> '
    + '</li>'
    + '</ul>'
    + '</div>'
    + '<el-dialog  :title="file.Name" :visible.sync="dialogVisible">'
    + '<div style="margin-left: 0px">'
    + ' <el-row :gutter="24"> '
    + '     <img @click="open(file.Id)" :src="file.Jpg" style="width: 100%"/>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="4" >'
    + '         <span>番号:</span>'
    + '     </el-col>'
    + '     <el-col :span="16">'
    + '         <a href="javascript:viod(0);" @click="openLick(file.Code)" ><span>{{ file.Code }}</span></a>'
    + '     </el-col>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="4" >'
    + '         <span>优优:</span>'
    + '     </el-col>'
    + '     <el-col :span="16">'
    + '         <a href="javascript:viod(0);" @click="openSearch(file.Actress)" > <span>{{ file.Actress }}</span></a>'
    + '     </el-col>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="4" >'
    + '         <span>时间:</span>'
    + '     </el-col>'
    + '     <el-col :span="16">'
    + '         <span>{{ file.MTime }}</span>'
    + '     </el-col>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="4" >'
    + '         <span>大小:</span>'
    + '     </el-col>'
    + '     <el-col :span="16">'
    + '         <span>{{ file.SizeStr }}</span>'
    + '     </el-col>'
    + '</el-row>'
    + '</div>'
    + '</el-dialog>'
    + '</div>'

let menu = {

    template: menuhtml,

    data: function () {
        return {
            file: "",
            baseUrl: "",
            dialogVisible: false,
            sortField: "mtime",
            sortType: "desc",
            listStyle: {
                'width': "240px",
                'height': '400px',
                'float': 'left',
                'margin-right': '25px',
            },
            imageList: [],
            dataList: "",
            dataCnt: 0,
            errorMsg: "",
            PlayCons: "",
            ChangeCons: "",
            OpenCons: "",
            ReplayCons: "",
            CloseCons: "",
            StopCons: "",
            fit: "fit",
            searchWords: "",
            pagerCount: 10,
            pageNo: 1,
            pageSize: 30,
            totalCnt: 0,
            loading: false,
        }
    },
    mounted: function () {
        document.title = "目录"
        const no = this.$route.params.no
        this.pageNo = no ? no : 1
        this.queryButtom()
        this.queryList()

    },
    methods: {

        playThis(id) {

            axios.get("/play/" + id).then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                } else {
                    this.alertFail(res.data.Message)
                }

            })

        },
        thisActress(actress) {
            this.searchWords = actress
            this.queryList()
        },
        openThisFolder(id) {
            axios.get("/openFolder/" + id).then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                }

            })
        },
        syncThis(id) {
            axios.get("/sync/" + id).then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                }

            })
        },
        infoThis(id) {
            console.log("info", id)
        },
        deleteThis(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.get("/delete/" + id).then((res) => {
                    if (res.status === 200) {
                        this.alertSuccess(res.data.Message)
                    }

                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        refreshIndex() {
            axios.get("/refreshIndex").then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                    this.queryList()
                }

            })
        },
        queryButtom() {
            axios.get("/buttoms").then((res) => {
                if (res.status === 200) {

                    consMap = res.data
                    this.PlayCons = consMap.Play
                    this.ChangeCons = consMap.Change
                    this.OpenCons = consMap.Open
                    this.ReplayCons = consMap.Replay
                    this.CloseCons = consMap.Close
                    this.StopCons = consMap.Stop
                    this.baseUrl = consMap.baseUrl
                    console.log(this.consMap)

                }

            })
        },
        queryList() {
            this.dataList = []
            let data = new FormData()
            data.append("pageNo", this.pageNo)
            data.append("pageSize", this.pageSize)
            data.append("keywords", this.searchWords)
            data.append("sortType", this.sortType)
            data.append("sortField", this.sortField)
            this.loading = true;
            axios.post("/movieList", data).then((res) => {
                if (res.status === 200) {
                    this.dataList = res.data.Data
                    this.totalCnt = res.data.TotalCnt
                    if (this.dataList && this.dataList.length > 0) {
                        this.dataList.map((item => {
                            let image = []
                            image.push(item.Jpg)
                            item.imageList = image
                        }))
                    }
                    this.loading = false;
                }

            })
        },
        open(filename) {
            var self = this
            console.log(filename)
            self.$router.push("/context/" + filename + "/" + this.pageNo)


        },
        openLick(code) {
            const url = this.baseUrl + code
            window.open(url, '_blank');
        },
        openSearch(actress) {
            const url = this.baseUrl + "search/" + actress
            window.open(url, '_blank');
        },

        openWin(id) {
            axios.get("/info/" + id).then((res) => {
                if (res.status === 200) {
                    this.file = res.data
                    this.dialogVisible = true
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.queryList()
        },
        handleCurrentChange(val) {
            this.pageNo = val
            this.queryList()
        },
        alertSuccess(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
        alertFail(msg) {
            this.$message({
                message: msg,
                type: 'fail'
            });
        },
    }

}