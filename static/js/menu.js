
let menuhtml = '<div>'
    + '<el-button style="position: fixed;top: 600px;overflow: auto; z-index: 999;left: 20px;" round @click="pageLoading(-1)">上一页</el-button>'
    + '<el-button style="position: fixed;top: 600px;overflow: auto; z-index: 999;right: 80px;"  round @click="pageLoading(1)">下一页</el-button> '
    + '  <el-row> '
    + '<el-col :span="1"> <el-button type="primary" size="small" icon="el-icon-location" @click="refreshIndex()">索引</el-button></el-col>'
    + '<el-col :span="3"><el-radio-group v-model="sortField" @change="queryList()" size="small">' +
    '      <el-radio-button label="code" >名称</el-radio-button>' +
    '      <el-radio-button label="mtime" >时间</el-radio-button>' +
    '      <el-radio-button label="size" >大小</el-radio-button>' +
    '    </el-radio-group></el-col>'


    + '<el-col :span="2"><el-radio-group v-model="sortType" @change="queryList()"   size="small">' +
    '      <el-radio-button label="desc" >倒</el-radio-button>' +
    '      <el-radio-button label="asc" >正</el-radio-button>' +
    '    </el-radio-group></el-col>'

    + '<el-col :span="2"><el-radio-group v-model="movieType" @change="queryList()" size="small">' +
    '      <el-radio-button label="" >全部</el-radio-button>' +
    '      <el-radio-button label="步兵" >步</el-radio-button>' +
    '      <el-radio-button label="骑兵" >騎</el-radio-button>' +
    '    </el-radio-group></el-col>'
    + '<el-col :span="1"><el-checkbox v-model="onlyRepeat" @change="onlyRepeatQuery()">查重</el-checkbox></el-col>'
    + '<el-col :span="6"><el-input placeholder="请输入内容" v-model="keywords" clearable >' +
    '    <el-button slot="append" type="primary" size="small" icon="el-icon-search" @click="queryList()">Go!</el-button>' +
    '  </el-input> </el-col>'
    + '</el-row>'
    + '<el-row><el-col :span="24" :offset="1"><span>  扫描库：{{totalSize}}   搜索：{{resultSize}}   当前：{{curSize}}</span></el-col></el-row>'
    + '<div v-loading="loading"' +
    '    element-loading-text="拼命加载中"' +
    '    element-loading-spinner="el-icon-loading" style="min-height: 800px">'
    + '<span v-if="errorMsg">{{errorMsg}}</span>'
    + '<el-pagination class="pageTool" ' +
    '  :page-sizes="[5,7,10,12,14,30, 60, 90, 200]" :page-size="pageSize"' +
    '  @size-change="handleSizeChange"' +
    ' :current-page="pageNo"' +
    '  @current-change="handleCurrentChange"' +
    '  layout="total,prev, pager, next, sizes"' +
    '  :total="totalCnt">' +
    '</el-pagination>'
    + '<ul  class="infinite-list" style="overflow:auto"  >'
    + '<li v-bind:class="listStyle" class="infinite-list-item list-item" v-for="(item,index) in dataList" :key="item.Id">'
    + '<div v-if="item" @click="openWin(item.Id)" class="img-list-item"  >'
    + '<el-image style="width: 100%; height: 100%" :src="item.PngUrl" :fit="fit" lazy>'
    + '</el-image>'
    + '</div>'

    + '<el-link icon="el-icon-video-play" :underline="false" title="播放" style="font-size:30px" @click="playThis(item.Id)"></el-link>'
    + '<el-link icon="el-icon-user" :underline="false" title="搜" style="font-size:30px"  @click="thisActress(item.Actress)"></el-link>'
    + '<el-link icon="el-icon-folder-opened" :underline="false" title="文件夹" style="font-size:30px"  @click="openThisFolder(item.Id)"></el-link>'
    + '<el-link icon="el-icon-refresh" :underline="false" title="同步" style="font-size:30px"  @click="syncThis(item.Id)"></el-link>'
    + '<el-link v-if="notBuBing(item.MovieType)" icon="el-icon-star-off"  :underline="false" title="步兵" style="font-size:30px"  @click="setMovieType(item.Id,1)"></el-link>'
    + '<el-link v-if="notQiBing(item.MovieType)" icon="el-icon-star-on"  :underline="false" title="骑兵" style="font-size:30px"  @click="setMovieType(item.Id,2)"></el-link>'
    + '<el-link icon="el-icon-refresh-right" :underline="false" title="信息" style="font-size:30px"  @click="infoThis(item.Id)"></el-link>'
    + '<el-link icon="el-icon-delete" :underline="false" title="删除" style="font-size:30px"  @click="deleteThis(item.Id)"></el-link>'
    //   + '<br/>'

    + '<el-tooltip  placement="bottom" style="width: 60px;" effect="dark">'
    + ' <div slot="content">{{ item.Name }}</div>'
    + '<span>【{{item.SizeStr }}】 {{ item.Name }}</span>'
    + ' </el-tooltip>'

    //   +'<span>【{{item.SizeStr }}】 {{ item.Name }}</span> '
    + '</li>'
    + '</ul>'
    + '</div>'
    + '<el-dialog  :title="file.Name" :visible.sync="dialogVisible">'
    + '<div v-if="file" style="margin-left: 0px">'
    + ' <el-row :gutter="24"> '
    + '     <el-image @click="open(file.Id)" :src="file.JpgUrl" style="width: 100%"/>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="4" >'
    + '         <span>番号:</span>'
    + '     </el-col>'
    + '     <el-col :span="16">'
    + '         <a href="javascript:void(0);" @click="openLick(file.Code)" ><span>{{ file.Code }}</span></a>'
    + '     </el-col>'
    + '</el-row>'
    + ' <el-row :gutter="20"> '
    + '     <el-col :span="4" >'
    + '         <span>优优:</span>'
    + '     </el-col>'
    + '     <el-col :span="16">'
    + '         <a href="javascript:void(0);" @click="openSearch(file.Actress)" > <span>{{ file.Actress }}</span></a>'
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
            onlyRepeat: false,
            dialogVisible: false,
            sortField: "mtime",
            sortType: "desc",
            movieType: "",
            listStyle: {
                'width': "240px",
                'height': '380px',
                'float': 'left',
                'margin-right': '25px',
                'overflow': 'auto'
            },
            dataList: "",
            dataCnt: 0,
            errorMsg: "",
            fit: "fit",
            keywords: "",
            pagerCount: 10,
            pageNo: 1,
            pageSize: 30,
            totalCnt: 0,
            totalPage: 0,
            loading: false,
            totalSize: 0,
            resultSize: 0,
            curSize: 0,
        }
    },
    mounted: function () {
        document.title = "目录"
        const no = this.$route.params.no
        this.pageNo = no ? parseInt(no) : 1
        this.queryButtom()
        this.queryList()

    },
    methods: {
        notQiBing(movieType) {
            if (movieType != "骑兵") {
                return true
            }
            return false;
        },
        notBuBing(movieType) {
            if (movieType != "步兵") {
                return true
            }
            return false;
        },
        onlyRepeatQuery() {
            if (this.onlyRepeat) {
                this.queryList()
            }
        },
        pageLoading(i) {
            this.pageNo = parseInt(this.pageNo) + parseInt(i)
            if (this.pageNo < 1) {
                this.pageNo = 1
            }
            if (this.pageNo > this.totalPage) {
                this.pageNo = this.totalPage
            }
            this.queryList(true)
        },
        playThis(id) {

            axios.get("api/play/" + id).then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                } else {
                    this.alertFail(res.data.Message)
                }

            })

        },
        thisActress(actress) {
            this.keywords = actress
            this.queryList()
        },
        openThisFolder(id) {
            axios.get("api/openFolder/" + id).then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                }

            })
        },
        syncThis(id) {
            axios.get("api/sync/" + id).then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                }

            })
        },
        setMovieType(id, movieType) {
            movieType = movieType == '1' ? "步兵" : "骑兵"
            axios.get("api/setMovieType/" + id + "/" + movieType).then((res) => {
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
            axios.get("api/refreshIndex").then((res) => {
                if (res.status === 200) {
                    this.alertSuccess(res.data.Message)
                    this.queryList()
                }

            })
        },
        queryButtom() {
            axios.get("api/buttoms").then((res) => {
                if (res.status === 200) {

                    consMap = res.data
                    this.baseUrl = consMap.baseUrl
                    console.log(this.consMap)

                }

            })
        },
        queryList(concat) {
            this.dataList = []
            let data = new FormData()
            data.append("pageNo", this.pageNo)
            data.append("pageSize", this.pageSize)
            data.append("keywords", this.keywords)
            data.append("sortType", this.sortType)
            data.append("sortField", this.sortField)
            data.append("movieType", this.movieType)
            data.append("onlyRepeat", this.onlyRepeat)

            this.loading = true;
            axios.post("api/movieList", data).then((res) => {
                if (res.status === 200) {
                    const resData = res.data.Data
                    this.totalCnt = res.data.TotalCnt
                    this.totalPage = res.data.TotalPage
                    this.totalSize = res.data.TotalSize
                    this.resultSize = res.data.ResultSize
                    this.curSize = res.data.CurSize
                    if (resData && resData.length > 0) {
                        if (!concat) {
                            this.dataList = resData
                        } else {
                            resData.map(item => {
                                this.dataList.push(item)
                            })
                        }
                    }
                    this.onlyRepeat = false
                    this.loading = false;
                }

            })
        },

        open(filename) {
            const self = this
            console.log(filename)
            self.$router.push("api/context/" + filename + "/" + this.pageNo)


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
            axios.get("api/info/" + id).then((res) => {
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