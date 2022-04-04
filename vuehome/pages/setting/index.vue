<template>
  <div align="center" width="80%" style="margin-right: 20%">
    <h1 align="center">设置</h1>
    <br />
    <el-form label-width="20%" ref="form" :model="form">
      <el-form-item label="URL">
        <el-input v-model="form.BaseUrl" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="OM-URL">
        <el-input v-model="form.OMUrl" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="图片类型">
        <el-select
          v-model="form.ImageTypes"
          multiple
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in form.Types"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文档类型">
        <el-select
          v-model="form.DocsTypes"
          multiple
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in form.Types"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频类型">
        <el-select
          v-model="form.VideoTypes"
          multiple
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in form.Types"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="枚举文件类型">
        <el-select
          v-model="form.Types"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请添加类型"
          style="width: 80%"
        >
          <el-option
            v-for="item in form.Types"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="热门标签">
        <el-transfer
          :titles="tagTitles"
          v-model="form.Tags"
          target-order="push"
          :data="form.tagLibData"
        ></el-transfer>
      </el-form-item>
      <el-form-item label="标签库">
        <el-select
          v-model="form.TagsLib"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请添加标签"
          style="width: 80%"
        >
          <el-option
            v-for="item in form.Tags"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文件路徑">
        <el-select
          v-model="form.Dirs"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请添加路径"
          style="width: 80%"
        >
          <el-option
            v-for="item in form.Dirs"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.Remark"
          style="width: 80%"
        ></el-input>
      </el-form-item>
      <el-form-item label="系統信息">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.SystemInfo"
          style="width: 80%"
        ></el-input>
      </el-form-item>

      <div>
        <el-button
          class="return"
          type="warning"
          align-text="center"
          @click="goMenu()"
          >返回</el-button
        >
      </div>
      <div>
        <el-button
          class="submit"
          type="primary"
          align-text="center"
          @click="submitForm('form')"
          >提交</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import setStorePath from "@/mixin/setStorePath";

export default {
  mixins: [setStorePath],
  data: function () {
    return {
      inputVisible: false,
      inputValue: "",

      inputVisibleFile: false,
      inputValueFile: "",
      tagTitles: ["标签库", "已选"],

      form: {
        BaseUrl: "",
        OMUrl: "",
        Remark: "",
        SystemInfo: "",
        ImageTypes: [],
        DocsTypes: [],
        VideoTypes: [],
        Types: [],
        Dirs: [],
        Tags: [],
        TagsLib: [],
        tagLibData: [],
      },
    };
  },
  mounted: function () {
    document.title="設置"
    this.loadData();
  },
  watch: {
    form: (a) => {
      // console.log(this.form)
      // this.makeTabLibData();
    },
  },
  methods: {
    goMenu() {
      this.$router.push("/fileList");
    },
    submitForm() {
      const postForm = { ...this.form, BaseDir: this.form.Dirs };
      this.loading = true;
      console.log(postForm);
      axios.post("api/setting", postForm).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: res.data.Message,
            type: "success",
          });
          this.loadData();
          this.loading = false;
        }
      });
    },
    handleClose(tag) {
      this.form.Types.splice(this.form.Types.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.Types.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleCloseFile(tag) {
      this.form.BaseDir.splice(this.form.BaseDir.indexOf(tag), 1);
    },

    showInputFile() {
      this.inputVisibleFile = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInputFile.$refs.input.focus();
      });
    },
    handleInputConfirmFile() {
      let inputValueFile = this.inputValueFile;
      if (inputValueFile) {
        this.form.BaseDir.push(inputValueFile);
      }
      this.inputVisibleFile = false;
      this.inputValueFile = "";
    },
    makeTabLibData() {
      const dataLib = [];
      const { TagsLib } = this.form;
      for (var i = 0; i < TagsLib.length; i++) {
        dataLib.push({ key: TagsLib[i], label: TagsLib[i] });
      }
      this.form.tagLibData = dataLib;
    },
    loadData() {
      axios.get("api/settingInfo").then((res) => {
        if (res.status == 200) {
          this.form = res.data;
          this.makeTabLibData();
        }
      });
    },
  },
};
</script>
<style scoped>
.return {
  width: 9%;
  position: fixed;
  bottom: 10px;
  overflow: auto;
  z-index: 999;
  left: 40%;
}
.submit {
  width: 9%;
  position: fixed;
  bottom: 10px;
  overflow: auto;
  z-index: 999;
  right: 40%;
}
.el-transfer {
  margin-left: 120px;
  text-align: left;
}
</style>
