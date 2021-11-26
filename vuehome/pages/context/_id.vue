<template>
  <div style="width: 100%; background: white; border: 1px">
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
      <el-page-header
        @back="urlBack()"
        title="返回"
        v-bind:content="file ? file.Name : ''"
      >
      </el-page-header>
    </div>

    <el-tabs
      style="margin-top: 10px"
      type="card"
      tab-position="top"
      @tab-click="tabChange()"
      v-model="tabIndex"
    >
      <el-tab-pane label="基础信息" name="base" style="">
        <div style="margin: 0 auto">
          <el-row :gutter="20" :offset="2">
            <el-image
              :src="file.JpgUrl"
              style="
                display: flex;
                max-width: 1000px;
                width: auto;
                height: auto;
                magin: 0 auto;
              "
            />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="2">
              <el-link
                ><i
                  :underline="false"
                  class="el-icon-video-play icon-style"
                  title="播放"
                  @click="playThis(file.Id)"
                ></i
              ></el-link>
            </el-col>

            <el-col :span="2">
              <el-link>
                <i
                  class="el-icon-folder-opened icon-style"
                  title="文件夹"
                  @click="openThisFolder(file.Id, 2)"
                ></i
              ></el-link>
            </el-col>
            <el-col :span="2">
              <el-link>
                <i
                  :underline="false"
                  class="el-icon-refresh icon-style"
                  title="同步"
                  @click="syncThis(file.Id)"
                ></i
              ></el-link>
            </el-col>
            <el-col :span="2">
              <el-link>
                <i
                  class="el-icon-delete icon-style"
                  title="删除"
                  @click="deleteThis(file.Id, 2)"
                ></i
              ></el-link>
            </el-col>
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
            style="width: auto; min-width: 800px; height: auto; margin: 0 auto"
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
export default {
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
        this.loadImageList()
      }
    },
    loadImageList() {
      this.sourceList = this.imageList;
    },
    urlBack(){
       const self = this;
      self.$router.push("/menu" + this.getParam());
    },
    getParam() {
      const {
        sortType,
        sortField,
        "": movieType,
        pageSize,
        pageNo,
        searchWords,
      } = this.$route.query;
      return (
        "?pageNo=" +
        pageNo +
        "&no=" +
        pageNo +
        "&pageSize=" +
        pageSize +
        "&keywords=" +
        (searchWords ? searchWords : "") +
        "&searchWords=" +
        (searchWords ? searchWords : "") +
        "&sortType=" +
        (sortType ? sortType : "") +
        "&sortField=" +
        (sortField ? sortField : "") +
        "&movieType=" +
        (movieType ? movieType : "")
      );
    },
    openActress(actress) {
      const self = this;
      self.$router.push("/menu" + this.getParam());
    },
    settingBase() {
      axios.get("api/buttoms").then((res) => {
        if (res.status === 200) {
          this.baseUrl = res.data.baseUrl;
        }
      });
    },
    makeIrameUrl(file) {
      setTimeout(() => {
        this.iframeSrc = this.baseUrl + file.Code;
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
    loadDirInfo(id,loading) {
      axios.get("/api/dir/" + id).then((res) => {
        if (res.status === 200) {
          if (res.data && res.data.length > 0) {
            this.imageList = [];
            for (let i = 0; i < res.data.length; i++) {
              this.imageList.push(res.data[i].ImageBase);
            }
            if(loading){
              this.loadImageList()
            }
          }
        }
      });
    },
    goBack() {
      var self = this;
      self.$router.push("/menu");
      // history.back()
    },
    lastPage() {
      const restApi = "/api/infoLast/" + this.id + this.getParam();
      this.iframeSrc = "";
      axios.get(restApi).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.id = this.file.Id;
          this.makeIrameUrl(this.file);
          this.loadDirInfo(this.id,true);
        }
      });
    },
    nextPage() {
      const restApi = "/api/infoNext/" + this.id + this.getParam();
      this.iframeSrc = "";
      axios.get(restApi).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.id = this.file.Id;
          this.makeIrameUrl(this.file);
          this.loadDirInfo(this.id,true);
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
  font-size: 40px;
  color: red;
  margin-left: 10px;
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
