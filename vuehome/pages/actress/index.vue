<template>
  <div class="container-body">
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

      <el-col :span="3">
        <el-radio-group v-model="sortType" @change="queryList()" size="small">
          <el-radio-button label="desc">倒</el-radio-button>
          <el-radio-button label="asc">正</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="6"
        ><el-input placeholder="请输入内容" v-model="keywords" clearable>
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
          class="infinite-list-item list-item"
          v-for="item in dataList"
          :key="item.Id"
        >
          <div v-if="item" class="img-list-item">
            <el-link @click="open(item.Name)">
              <span
                >{{ item.Name ? item.Name : "" }} 【{{ item.SizeStr }}】</span
              >
              <br />
              <el-badge :value="item.Cnt">
                <el-image :src="item.JpgUrl" :fit="fit" lazy round> </el-image
              ></el-badge>
            </el-link>
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
  </div>
</template>
<script>
import axios from "axios";
import setStorePath from "@/mixin/setStorePath";
export default {
  mixins: [setStorePath],
  data() {
    return {
      baseUrl: "www.baidu.com",
      dialogVisible: false,
      sortType: "desc",
      movieType: "",
      dataList: "",
      dataCnt: 0,
      pageSize: 30,
      errorMsg: "",
      fit: "fit",
      keywords: "",
      pageNo: 1,
      totalCnt: 0,
      totalPage: 0,
      loading: false,
      totalSize: 0,
      resultSize: 0,
      curSize: 0,
    };
  },
  mounted() {
    document.title = "图鉴";
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.fetch();
      document.title = "图鉴";
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
        if (res.status == 200) {
          this.BaseUrl = res.data.baseUrl;
        }
      });
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
      // let data = new FormData();
      // data.append("pageNo", this.pageNo);
      // data.append("pageSize", this.pageSize);
      // data.append("keywords", this.keywords);
      // data.append("sortType", this.sortType);
      let data={
        Page:this.pageNo,
        PageSize:this.pageSize,
        Keyword:this.keywords,
        SortType:this.sortType,
      }
      this.loading = true;
      axios.post("api/actressList", data).then((res) => {
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
          this.loading = false;
        }
      });
    },

    open(filename) {
      const self = this;
      self.$router.push("/fileList?keywords=" + filename);
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

.list-item {
  margin-top: 5px;
  width: 200px;
  height: 290px;
  float: left;
  list-style: none;
}

.img-list-item {
  width: 180px;
  height: 200px;
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
</style>
 