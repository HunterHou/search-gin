<template>
  <div style="width: 100%; background: white; border: 1px" align="center">
    <el-page-header
      @back="urlBack()"
      title="返回"
      v-bind:content="file ? file.Name : ''"
    >
    </el-page-header>
    <div
      style="
        position: flex;
        z-index: 100;
        left: 0;
        right: 0;
        background: white;
        border: 1px;
      "
    >
      <el-button
        style="float: left; left: 0px"
        @click="lastPage"
        class="floatButton"
        icon="el-icon-back"
      ></el-button>
      <el-button
        style="float: right; right: 0px"
        @click="nextPage"
        class="floatButton"
        icon="el-icon-right"
      ></el-button>
      <el-backtop :bottom="100" style="width: 50px; height: 50px">
        <div class="up">UP</div>
      </el-backtop>
    </div>

    <el-row :gutter="20" style="margin-top: 10px; margin-buttom: 10px">
      <el-col :span="1">
        <el-link
          ><i
            :underline="false"
            class="el-icon-video-play icon-style"
            title="播放"
            @click="playThis(file.Id)"
          ></i
        ></el-link>
      </el-col>

      <el-col :span="1">
        <el-link>
          <i
            class="el-icon-folder-opened icon-style"
            title="文件夹"
            @click="openThisFolder(file.Id, 2)"
          ></i
        ></el-link>
      </el-col>
      <el-col :span="1">
        <el-link>
          <i
            class="el-icon-delete icon-style"
            title="删除"
            @click="deleteThis(file.Id, 2)"
          ></i
        ></el-link>
      </el-col>
      <el-col :span="1">
        <el-link>
          <i
            class="el-icon-download icon-style"
            title="刮图"
            @click="getImageList(file.Id, 2)"
          ></i
        ></el-link>
      </el-col>
      <!-- <el-col :span="2">
        <el-link>
          <i class="icon-style" title="刷新" @click="$router.go(0)"
            >F5</i
          ></el-link
        >
      </el-col> -->
    </el-row>

    <el-tabs
      style="margin-top: 10px"
      type="card"
      tab-position="top-center"
      @tab-click="tabChange()"
      v-model="tabIndex"
    >
      <el-tab-pane label="基础信息" name="base" style="">
        <div style="margin: 0 auto">
          <el-row :gutter="20" :offset="2">
            <el-image
              :src="'api/jpg/' + file.Id"
              style="
                display: flex;
                max-width: 900px;
                width: auto;
                height: auto;
                magin: 0 auto;
              "
            />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <span>番号 :</span>
            </el-col>
            <el-col :span="16">
              <span v-if="file">{{ file.Code }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <span>优优 :</span>
            </el-col>
            <el-col :span="16">
              <el-link v-if="file" @click="openActress(file.Actress)">
                <span>{{ file.Actress }}</span></el-link
              >
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <span>时间 :</span>
            </el-col>
            <el-col :span="16">
              <span v-if="file">{{ file.MTime }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <span>大小 :</span>
            </el-col>
            <el-col :span="16">
              <span v-if="file">{{ file.SizeStr }}</span>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="文件夹" name="dir">
        <div
          v-for="(item, index) in sourceList"
          :key="index"
          style="display: flex; margin: 10px auto"
        >
          <el-image
            style="width: auto; min-width: 1000px; height: auto; margin: 0 auto"
            :src="item"
            :preview-src-list="sourceList"
            lazy
          >
          </el-image>
        </div>
      </el-tab-pane>
      <el-tab-pane label="数据源" name="web">
        <iframe
          v-if="iframeSrc"
          frameborder="0"
          :src="iframeSrc"
          width="100%"
          height="900px"
        ></iframe>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from "axios";
import setStorePath from "@/mixin/setStorePath";
export default {
  mixins: [setStorePath],
  data: function () {
    return {
      tabIndex: "base",
      id: "",
      code: "",
      lastPageNo: 1,
      file: "",
      iframeSrc: "",
      baseUrl: "",
      imageList: [],
      sourceList: [],
    };
  },
  mounted: function () {
    const self = this;
    const id = self.$route.params.id;
    const { pageNo } = self.$route.query;
    this.lastPageNo = pageNo;
    this.settingBase();
    this.loadInfo(id);
    document.onkeydown = () => {
      let key = window.event.keyCode;
      if (key === 37) {
        //left
        this.nextPage(this.id);
      } else if (key === 39) {
        //right
        this.nextPage(this.id);
      }
    };
  },
  methods: {
    tabChange() {
      if (this.tabIndex == "web") {
        this.makeIrameUrl(this.file);
      } else if (this.tabIndex == "dir") {
        this.loadImageList();
      }
    },
    loadImageList() {
      this.sourceList = this.imageList;
    },
    urlBack() {
      const query = this.$route.query;
      this.$router.push({
        path: "/fileList",
        query: { ...query },
      });
    },
    openActress(actress) {
      this.keywords = actress;
      this.$router.push({
        path: "/fileList",
        query: { ...this.$router.query },
      });
    },
    settingBase() {
      axios.get("api/buttoms").then((res) => {
        if (res.status === 200) {
          this.BaseUrl = res.data.BaseUrl;
        }
      });
    },
    makeIrameUrl(file) {
      setTimeout(() => {
        this.iframeSrc = this.BaseUrl + file.Code;
      }, 1);
    },
    loadInfo(id) {
      axios.get("/api/info/" + id).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.id = this.file.Id;
          this.imageList = [];
          this.loadDirInfo(this.id);
        }
      });
    },
    loadDirInfo(id, loading) {
      axios.get("/api/dir/" + id).then((res) => {
        if (res.status === 200) {
          if (res.data && res.data.length > 0) {
            this.imageList = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].FileType == "jpg") {
                this.imageList.push(res.data[i].ImageBase);
              }
            }
            if (loading) {
              this.loadImageList();
            }
          }
        }
      });
    },

    getRouterParam() {
      const { query } = this.$route;
      var queryParam =
        "&page=" +
        query.no +
        "&pageSize=" +
        query.pageSize +
        "&sortField=" +
        query.sortField +
        "&sortType=" +
        query.sortType +
        "&movieType=" +
        query.movieType;
      if (query.keywords) {
        queryParam += "&keywords" + query.keywords;
      }
      return queryParam;
    },

    lastPage() {
      const restApi = "/api/infoLast/" + this.id + this.getRouterParam();
      this.iframeSrc = "";
      const queryParam = this.$route.query;
      axios.get(restApi).then((res) => {
        if (res.status === 200) {
          const lastId = res.data.Id;
          this.file = res.data;
          this.id = lastId;
          this.$router.push({
            path: `/context/${lastId}`,
            query: { ...queryParam },
          });
        }
      });
    },
    nextPage() {
      const queryParam = this.$route.query;
      const restApi = "/api/infoNext/" + this.id + this.getRouterParam();
      this.iframeSrc = "";
      axios.get(restApi).then((res) => {
        if (res.status === 200) {
          const nextId = res.data.Id;
          this.file = res.data;
          this.id = nextId;
          this.$router.push({
            path: `/context/${nextId}`,
            query: { ...queryParam },
          });
        }
      });
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
    openThisFolder(id) {
      axios.get("api/openFolder/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        }
      });
    },
    getImageList(id) {
      axios.get("api/imageList/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
          this.loadDirInfo(this.id, true);
        }
      });
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
.icon-style {
  font-size: 30px;
  color: red;
}
.floatButton {
  float: right;
  position: fixed;
  width: 60;
  top: 300px;
  overflow: auto;
  z-index: 999;
}
</style>
