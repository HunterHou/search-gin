let menuhtml = '<div>'
    +'    <el-button type="primary" icon="el-icon-search" @click="refreshIndex()">更新索引</el-button>'
    + '<el-radio-group v-model="sortField">\n' +
    '      <el-radio-button label="code" >名称</el-radio-button>\n' +
    '      <el-radio-button label="mtime" >时间</el-radio-button>\n' +
    '      <el-radio-button label="size" >大小</el-radio-button>\n' +
    '    </el-radio-group>'
    + '<el-switch v-model="sortType" active-text="倒序"  active-value="desc"  inactive-text="正序"  inactive-value="asc"> </el-switch>'
    + '<el-input placeholder="请输入内容" v-model="searchWords" >' +
    '    <el-button slot="append" type="primary" icon="el-icon-search" @click="queryList()">Go!</el-button>' +
    '  </el-input>'
    +'<div v-loading="loading"\n' +
    '    element-loading-text="拼命加载中"\n' +
    '    element-loading-spinner="el-icon-loading" style="min-height: 800px">'
    + '<span v-if="errorMsg">{{errorMsg}}</span>'
    + '<el-pagination' +
    '  :page-sizes="[30, 60, 90, 200]" :page-size="pageSize"' +
    '  @size-change="handleSizeChange"' +
    '  @current-change="handleCurrentChange"' +
    // '  :pager-count=pagerCount' +
    '  layout="total,prev, pager, next, sizes"' +
    '  :total="totalCnt">' +
    '</el-pagination>'
    + '<ul  class="infinite-list" style="overflow:auto"  >'
    + '<li v-bind:class="listStyle" class="infinite-list-item list-item" v-for="(item,index) in dataList" :key="item.Id">'
    + '<div class="demo-image__preview block">'
    + '    <el-image class="block"'
    + '        '
    // + '    :src="item.PngBase"'
    + '    :src="item.Png"'
    + '   :preview-src-list="imageList">'
    + ' </el-image>'
    + '</div>'
    + '<el-image style="width: 35px; height: 35px" :src="PlayCons" :fit="fit" @click="playThis(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="ChangeCons" :fit="fit" @click="thisActress(item.Actress)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="OpenCons" :fit="fit" @click="openThisFolder(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="ReplayCons" :fit="fit" @click="syncThis(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="CloseCons" :fit="fit" @click="infoThis(item.Id)"></el-image>'
    + '<el-image style="width: 35px; height: 35px" :src="StopCons" :fit="fit"@click="deleteThis(item.Id)"></el-image>'
    + '<el-link @click="open(item.Path)">{{ item.Name }}</el-link> '
    + '</li>'
    + '</ul>'
    + '</div>'
    + '</div>'

let menu = {

    template: menuhtml,
    data: function () {
        return {
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
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
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
                    console.log(this.consMap)

                }

            })
        },
        queryList() {
            this.dataList=[]
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
                            this.imageList.push(item.ImageBase)
                        }))
                    }
                    this.loading = false;
                }

            })
        },
        open(filename) {
            var self = this
            console.log(filename)
            self.$router.push("/context/" + filename)


        },
        handleSizeChange(val) {
            this.pageSize= val
            this.queryList()
        },
        handleCurrentChange(val) {
            this.pageNo=val
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