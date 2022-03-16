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
      <el-form-item label="标签">
        <el-select
          v-model="form.Tags"
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
        <!-- <el-tag
          :key="tag"
          v-for="(tag, index) in form.Dirs"
          closable
          effect="light"
          :disable-transitions="false"
          @close="handleCloseFile(tag)"
        >
          {{ index + 1 }} : {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisibleFile"
          v-model="inputValueFile"
          ref="saveTagInputFile"
          size="small"
          @keyup.enter.native="handleInputConfirmFile"
          @blur="handleInputConfirmFile"
        >
        </el-input>
        <br />
        <el-button class="button-new-tag" size="small" @click="showInputFile"
          >+ 新路径</el-button
        > -->

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

      <el-form-item>
        <el-row>
          <el-col :span="8" :offset="2"
            ><div class="grid-content bg-purple-dark">
            <el-button
              type="warning"
              align-text="center"
              style="width:120px;"
              @click="goMenu()"
              >返回</el-button
            ></div
          ></el-col>
          <el-col :span="8" :offset="-6"
            ><div class="grid-content bg-purple-dark"><el-button
              type="primary"
              align-text="center"
               style="width:120px;"
              @click="submitForm('form')"
              >提交</el-button
            ></div
          ></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      inputVisible: false,
      inputValue: "",

      inputVisibleFile: false,
      inputValueFile: "",

      form: {
        BaseUrl: "",
        OMUrl: "",
        ImageTypes: [],
        DocsTypes: [],
        VideoTypes: [],
        Types: [],
        Dirs: [],
        Tags: [],
      },
    };
  },
  mounted: function(){
    this.loadData();
  },
  methods: {
    goMenu(){
      this.$router.push("/menu")
    },
    submitForm() {
      const postForm = { ...this.form, BaseDir: this.form.Dirs };
      this.loading = true;
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
    loadData() {
      axios.get("api/settingInfo").then((res) => {
        if (res.status == 200) {
          this.form.BaseUrl = res.data.BaseUrl;
          this.form.OMUrl = res.data.OMUrl;
          this.form.ImageTypes = res.data.ImageTypes;
          this.form.DocsTypes = res.data.DocsTypes;
          this.form.VideoTypes = res.data.VideoTypes;
          this.form.Types = res.data.Types;
          this.form.Dirs = res.data.Dirs;
          this.form.Tags = res.data.Tags;
          console.log(this.form);
          console.log(res.data);
        }
      });
    },
  },
};
</script>
