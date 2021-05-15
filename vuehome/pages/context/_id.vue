<template>
  <div>
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
          <span v-if="file">{{ file.Actress }}</span>
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
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      id: "",
      lastPageNo: 1,
      file: "",
    };
  },
  mounted: function () {
    const self = this;
    const id = self.$route.params.id;
    const {pageNo} = self.$route.query;
    this.lastPageNo = pageNo;
    this.load(id);
  },
  methods: {
    load(id) {
      axios.get("/api/info/" + id).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.id = this.file.Id;
        }
      });
    },
    goBack() {
      var self = this;
      self.$router.push("/menu");
      // history.back()
    },
    lastPage() {
      console.log(this.id);
      axios.get("/api/infoLast/" + this.id).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.id = this.file.Id;
        }
      });
    },
    nextPage() {
      axios.get("/api/infoNext/" + this.id).then((res) => {
        if (res.status === 200) {
          this.file = res.data;
          this.id = this.file.Id;
          console.log(res.data);
        }
      });
    },
  },
};
</script>
<style>
.floatButton {
            float: right;
            position: fixed;
            width: 60;
            top: 300px;
            overflow: auto;
            z-index: 999;
        }
</style>
