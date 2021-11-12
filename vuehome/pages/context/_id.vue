<template>
  <div style="width: 100%">
    <el-backtop :bottom="100" style="width: 50px; height: 50px">
      <div class="up">UP</div>
    </el-backtop>
    <el-page-header
      @back="goBack"
      title="返回"
      v-bind:content="file ? file.Name : ''"
    ></el-page-header>
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
    <div style="margin-left: 120px">
      <el-row :gutter="24">
        <el-image :src="file.JpgUrl" style="width: 85%; height: auto" />
      </el-row>
      <el-row>
        <el-link
          ><i
            :underline="false"
            class="el-icon-video-play icon-style"
            title="播放"
            @click="playThis(file.Id)"
          ></i
        ></el-link>
        <el-link>
          <i
            class="el-icon-folder-opened icon-style"
            title="文件夹"
            @click="openThisFolder(file.Id, 2)"
          ></i
        ></el-link>
        <el-link>
          <i
            :underline="false"
            class="el-icon-refresh icon-style"
            title="同步"
            @click="syncThis(file.Id)"
          ></i
        ></el-link>
        <el-link>
          <i
            class="el-icon-delete icon-style"
            title="删除"
            @click="deleteThis(file.Id, 2)"
          ></i
        ></el-link>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <span>番号:</span>
        </el-col>
        <el-col :span="4">
          <span v-if="file">{{ file.Code }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <span>优优:</span>
        </el-col>
        <el-col :span="4">
          <el-link v-if="file" @click="openActress(file.Actress)">
            <span>{{ file.Actress }}</span></el-link
          >
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <span>时间:</span>
        </el-col>
        <el-col :span="4">
          <span v-if="file">{{ file.MTime }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <span>大小:</span>
        </el-col>
        <el-col :span="4">
          <span v-if="file">{{ file.SizeStr }}</span>
        </el-col>
      </el-row>
    </div>
    <br />
    <br />
    <hr />
    <br /><br />
    <iframe
      v-if="iframeSrc"
      frameborder="0"
      :src="iframeSrc"
      width="100%"
      height="900px"
    ></iframe>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      id: "",
      code: "",
      lastPageNo: 1,
      file: "",
      iframeSrc: "",
      baseUrl: "",
    };
  },
  mounted: function () {
    const self = this;
    const id = self.$route.params.id;
    const { pageNo } = self.$route.query;
    this.lastPageNo = pageNo;
    this.settingBase();
    this.load(id);
  },
  methods: {
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
      }, 4000);
    },
    load(id) {
      axios.get("/api/info/" + id).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.id = this.file.Id;
          this.makeIrameUrl(this.file);
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
