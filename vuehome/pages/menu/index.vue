<template>
  <div class="container-body">
    <!-- <el-backtop :bottom="100" style="width: 50px; height: 50px">
      <div class="up">UP</div>
    </el-backtop> -->
    <el-button
      style="
        position: fixed;
        top: 600px;
        overflow: auto;
        z-index: 999;
        left: 20px;
      "
      round
      @click="pageLoading(-1)"
      >上一页</el-button
    >
    <el-button
      style="
        position: fixed;
        top: 600px;
        overflow: auto;
        z-index: 999;
        right: 80px;
      "
      round
      @click="pageLoading(1)"
      >下一页</el-button
    >
    <el-row>
      <el-col :span="2" :offset="1">
        <el-button
          type="success"
          size="small"
          icon="el-icon-location"
          @click="refreshIndex()"
          >索引</el-button
        ></el-col
      >
      <el-col :span="4">
        <el-radio-group v-model="sortField" @change="queryList()" size="small">
          <el-radio-button label="code">名称</el-radio-button>
          <el-radio-button label="mtime">时间</el-radio-button>
          <el-radio-button label="size">大小</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="3">
        <el-radio-group v-model="sortType" @change="queryList()" size="small">
          <el-radio-button label="desc">倒</el-radio-button>
          <el-radio-button label="asc">正</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4">
        <el-radio-group v-model="movieType" @change="queryList()" size="small">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="步兵">步</el-radio-button>
          <el-radio-button label="骑兵">騎</el-radio-button>
        </el-radio-group>
        <el-checkbox v-model="onlyRepeat" @change="onlyRepeatQuery()"
          >查重</el-checkbox
        >
      </el-col>

      <el-col :span="6"
        ><el-input placeholder="请输入内容" v-model="searchWords" clearable>
          <el-button
            slot="append"
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="queryList()"
            >Go!</el-button
          >
        </el-input>
      </el-col>
    </el-row>

    <el-row
      ><el-col :span="24" :offset="1"
        ><span>
          扫描库：{{ totalSize }} 搜索：{{ resultSize }} 当前：{{
            curSize
          }}</span
        ></el-col
      ></el-row
    >
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      style="margin-top: 10px"
    >
      <ul class="infinite-list" style="overflow: auto">
        <li
          v-bind:class="listStyle"
          class="infinite-list-item list-item"
          v-for="item in dataList"
          :key="item.Id"
        >
          <div v-if="item" class="img-list-item">
            <el-badge :value="item.MovieType" class="badge-item">
              <el-image
                style="width: 100%; height: 100%"
                :src="item.PngUrl"
                fit="cover"
                lazy
                @click="openWin(item.Id)"
              >
              </el-image
            ></el-badge>
            <div class="image-tool">
              <i
                :underline="false"
                class="el-icon-video-play icon-style"
                title="播放"
                @click="playThis(item.Id)"
              ></i>
              <i
                :underline="false"
                class="el-icon-user icon-style"
                title="搜"
                @click="thisActress(item.Actress)"
              ></i>
              <i
                :underline="false"
                class="el-icon-refresh icon-style"
                title="同步"
                @click="syncThis(item.Id)"
              ></i>
              <i
                v-if="notBuBing(item.MovieType)"
                class="el-icon-star-off icon-style"
                title="步兵"
                @click="setMovieType(item.Id, 1)"
              ></i>

              <i
                v-if="notQiBing(item.MovieType)"
                class="el-icon-star-on icon-style"
                title="骑兵"
                @click="setMovieType(item.Id, 2)"
              ></i>
              <el-dropdown>
                <i class="el-icon-more-outline icon-style"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <i
                      class="el-icon-refresh-right icon-style"
                      title="信息"
                      @click="infoThis(item.Id, 2)"
                    ></i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i
                      class="el-icon-delete icon-style"
                      title="删除"
                      @click="deleteThis(item.Id, 2)"
                    ></i>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i
                      class="el-icon-folder-opened icon-style"
                      title="文件夹"
                      @click="openThisFolder(item.Id, 2)"
                    ></i>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="context-text">
            <el-tooltip placement="bottom"  effect="dark">
              <div slot="content">{{ item.Name }}</div>
              <span>【{{ item.SizeStr }}】 {{ item.Name }}</span>
            </el-tooltip>
          </div>
        </li>
      </ul>
    </div>

    <el-pagination
      class="pageTool"
      :page-sizes="[5, 7, 10, 12, 14, 30, 60, 90, 200]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total,prev, pager, next, sizes"
      :current-page="pageNo"
      :total="totalCnt"
    ></el-pagination>
    <!-- 彈窗 -->
    <el-dialog :title="file.Name" :visible.sync="dialogVisible">
      <div v-if="file" style="margin-left: 0px">
        <el-row :gutter="24">
          <el-image
            @click="open(file.Id)"
            :src="file.JpgUrl"
            style="width: 100%"
          />
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>番号:</span>
          </el-col>
          <el-col :span="16">
            <a href="javascript:void(0);" @click="openLick(file.Code)"
              ><span>{{ file.Code }}</span></a
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>优优:</span>
          </el-col>
          <el-col :span="16">
            <a href="javascript:void(0);" @click="openSearch(file.Actress)">
              <span>{{ file.Actress }}</span></a
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"> <span>时间:</span> </el-col>'
          <el-col :span="16">
            <span>{{ file.MTime }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>大小:</span>
          </el-col>
          <el-col :span="16">
            <span>{{ file.SizeStr }}</span>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      file: "",
      baseUrl: "www.baidu.com",
      onlyRepeat: false,
      dialogVisible: false,
      sortField: "mtime",
      sortType: "desc",
      movieType: "",
      dataList: "",
      dataCnt: 0,
      errorMsg: "",
      fit: "fit",
      searchWords: "",
      pagerCount: 10,
      pageNo: 1,
      pageSize: 14,
      totalCnt: 0,
      totalPage: 0,
      loading: false,
      totalSize: 0,
      resultSize: 0,
      curSize: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.fetch();
      document.title = "目录";
      const {searchWords,no} = this.$route.query
      this.searchWords=searchWords
      this.pageNo = no ? parseInt(no) : 1;
      console.log(this.searchWords)
      this.queryButtom();
      this.queryList();
      this.$nuxt.$loading.finish();
    });
  },
  methods: {
    fetch() {
      axios.get("api/buttoms").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.BaseUrl = res.data.baseUrl;
        }

        // store.commit('setStars', res.data)
      });
    },
    notQiBing(movieType) {
      if (movieType != "骑兵") {
        return true;
      }
      return false;
    },
    notBuBing(movieType) {
      if (movieType != "步兵") {
        return true;
      }
      return false;
    },
    onlyRepeatQuery() {
      if (this.onlyRepeat) {
        this.queryList();
      }
    },
    pageLoading(i) {
      this.pageNo = parseInt(this.pageNo) + parseInt(i);
      if (this.pageNo < 1) {
        this.pageNo = 1;
      }
      if (this.pageNo > this.totalPage) {
        this.pageNo = this.totalPage;
      }
      this.queryList(true);
    },
    playThis(id) {
      axios.get("api/play/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        } else {
          this.alertFail(res.data.Message);
        }
      });
    },
    thisActress(actress) {
      this.searchWords = actress;
      this.queryList();
    },
    openThisFolder(id) {
      axios.get("api/openFolder/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        }
      });
    },
    syncThis(id) {
      axios.get("api/sync/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        }
      });
    },
    setMovieType(id, movieType) {
      movieType = movieType == "1" ? "步兵" : "骑兵";
      axios.get("api/setMovieType/" + id + "/" + movieType).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        }
      });
    },
    infoThis(id) {
      console.log("info", id);
    },
    deleteThis(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.get("api/delete/" + id).then((res) => {
            if (res.status === 200) {
              this.alertSuccess(res.data.Message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    refreshIndex() {
      axios.get("api/refreshIndex").then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
          this.queryList();
        }
      });
    },
    queryButtom() {
      axios.get("api/buttoms").then((res) => {
        if (res.status === 200) {
          this.baseUrl = res.data.baseUrl;
        }
      });
    },
    queryList(concat) {
      this.dataList = [];
      let data = new FormData();
      data.append("pageNo", this.pageNo);
      data.append("pageSize", this.pageSize);
      data.append("keywords", this.searchWords?this.searchWords:"");
      data.append("sortType", this.sortType);
      data.append("sortField", this.sortField);
      data.append("movieType", this.movieType);
      data.append("onlyRepeat", this.onlyRepeat);

      this.loading = true;
      axios.post("api/movieList", data).then((res) => {
        if (res.status === 200) {
          const resData = res.data.Data;
          this.totalCnt = res.data.TotalCnt;
          this.totalPage = res.data.TotalPage;
          this.totalSize = res.data.TotalSize;
          this.resultSize = res.data.ResultSize;
          this.curSize = res.data.CurSize;
          if (resData && resData.length > 0) {
            if (!concat) {
              this.dataList = resData;
            } else {
              resData.map((item) => {
                this.dataList.push(item);
              });
            }
          }
          this.onlyRepeat = false;
          this.loading = false;
        }
      });
    },

    open(filename) {
      const self = this;
      console.log(filename);
      self.$router.push("context/" + filename + "?pageNo=" + this.pageNo);
    },
    openLick(code) {
      const url = this.baseUrl + code;
      window.open(url, "_blank");
    },
    openSearch(actress) {
      const url = this.baseUrl + "search/" + actress;
      window.open(url, "_blank");
    },

    openWin(id) {
      axios.get("api/info/" + id).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.dialogVisible = true;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryList();
    },
    alertSuccess(msg) {
      this.$message({
        message: msg,
        type: "success",
      });
    },
    alertFail(msg) {
      this.$message({
        message: msg,
        type: "fail",
      });
    },
  },
};
</script>
<style>
.container-body {
  margin-top: 5px;
  min-width: 600px;
  min-height: 600px;
  height: 100%;
}
.floatButton {
  float: right;
  position: fixed;
  width: 60;
  top: 300px;
  overflow: auto;
  z-index: 999;
}
.image-tool {
  margin-top: 1px;
  margin-bottom: 1px;
}
.icon-style {
  font-size: 24px;
  color: red;
  margin-left: 4px;
}
.context-text {
  margin-top: 85px;
  font-size: 12px;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
}
.list-item {
  width: 200px;
  height: 350px;
  float: left;
  list-style: none;
  margin-top: 10px;
}

.img-list-item {
  width: 180px;
  height: 200px;
}

.pageTool {
  position: fixed;
  bottom: 1px;
  overflow: auto;
  z-index: 999;
}
.pagination {
  align-content: center;
  position: fixed;
  bottom: 0px;
  overflow: auto;
  z-index: 999;
}
.up {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
.badge-item {
  margin-top: 0px;
  margin-right: 0px;
}
</style>
