<template>
  <div class="container-body">
    <!-- <el-button
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
    > -->
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
                :src="item.JpgUrl"
                fit="cover"
                lazy
                @click="openWin(item.Id)"
              >
              </el-image
            ></el-badge>
          </div>
          <div class="context-text">
            <el-tooltip placement="bottom" style="width: 60px" effect="dark">
              <div slot="content">{{ item.Name }}</div>
              <span>【{{ item.SizeStr }}】 {{ item.Name }}</span>
            </el-tooltip>
          </div>
        </li>
      </ul>
    </div>
    <!-- <el-pagination
      class="pageTool"
      :page-sizes="[5, 7, 10, 12, 14, 30, 60, 90, 200]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total,prev, pager, next, sizes"
      :current-page="pageNo"
      :total="totalCnt"
    ></el-pagination> -->
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
      listStyle: {
        width: "240px",
        height: "380px",
        float: "left",
        "margin-right": "25px",
        overflow: "auto",
      },
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
      const no = this.$route.params.no;
      this.pageNo = no ? parseInt(no) : 1;
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
      this.loading = true;
      axios.get("api/actressList", data).then((res) => {
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
.context-text {
  margin-top: 22px;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
}
/*.list-item {*/
/*  width: 200px;*/
/*  height: 300px;*/
/*  float: left;*/
/*  list-style: none;*/
/*  margin-top: 10px;*/
/*}*/

/*.img-list-item {*/
/*  width: 180px;*/
/*  height: 400px;*/
/*}*/
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
 