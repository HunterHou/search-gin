<template>
  <div align="center" width="80%" style="margin-right:20%">
    <h1 align="center">设置</h1>
      <el-form label-width="20%" ref="form" :model="form">
     <el-form-item label="URL">
        <el-input v-model="form.BaseUrl" style="width: 80%"></el-input>
      </el-form-item>
     <el-form-item label="图片类型">
        <el-select v-model="form.Images" multiple placeholder="请选择" style="width: 80%">
        <el-option
          v-for="item in form.Types"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      </el-form-item>
     <el-form-item label="文档类型">
        <el-select v-model="form.Docs" multiple placeholder="请选择" style="width: 80%">
        <el-option
          v-for="item in form.Types"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      </el-form-item>
     <el-form-item label="视频类型">
        <el-select v-model="form.VideoTypes" multiple placeholder="请选择" style="width: 80%">
        <el-option
          v-for="item in form.Types"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      </el-form-item>
    <el-form-item label="文件类型">
    <el-tag
      :key="tag"
      v-for="tag,index in form.Types"
      closable  effect="dark"
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{index+1}} : {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-form-item>

    <el-form-item label="文件路徑">
    <el-tag
      :key="tag"
      v-for="tag,index in form.BaseDir"
      closable effect="light"
      :disable-transitions="false"
      @close="handleCloseFile(tag)">
      {{index+1}} : {{tag}}
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
    <el-button v-else class="button-new-tag" size="small" @click="showInputFile">+ New Tag</el-button>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" align-text="center" @click="submitForm('form')">提交</el-button>
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
            inputValue: '',

            inputVisibleFile: false,
            inputValueFile: '',

            form: {
                BaseUrl: "",
                Images: [],
                Docs: [],
                VideoTypes: [],
                Types: [],
                BaseDir: [],
            }
        }
    },
    mounted: function () {
        this.loadData();
    },
    methods: {
        submitForm() {
            let data = new FormData()
            data.append("BaseUrl", this.form.BaseUrl)
            data.append("Images", this.form.Images)
            data.append("Docs", this.form.Docs)
            data.append("VideoTypes", this.form.VideoTypes)
            data.append("Types", this.form.Types)
            data.append("BaseDir", this.form.BaseDir)
            this.loading = true;
            axios.post("api/setting", data).then((res) => {
                if (res.status === 200) {
                    this.$message({
                        message: res.data.Message,
                        type: 'success'
                    });
                    this.loadData();
                    this.loading = false;
                }

            })
        },
        handleClose(tag) {
            this.form.Types.splice(this.form.Types.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.form.Types.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        handleCloseFile(tag) {
            this.form.BaseDir.splice(this.form.BaseDir.indexOf(tag), 1);
        },

        showInputFile() {
            this.inputVisibleFile = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInputFile.$refs.input.focus();
            });
        },
        handleInputConfirmFile() {
            let inputValueFile = this.inputValueFile;
            if (inputValueFile) {
                this.form.BaseDir.push(inputValueFile);
            }
            this.inputVisibleFile = false;
            this.inputValueFile = '';
        },
        loadData() {
            axios.get("api/settingInfo").then((res) => {
                if (res.status == 200) {
                    this.form.BaseUrl = res.data.BaseUrl
                    this.form.Images = res.data.ImageTypes.filter(item=>{
                      return item !==""
                    })
                    this.form.Docs = res.data.DocTypes.filter(item=>{
                      return item !==""
                    })
                    this.form.VideoTypes = res.data.VideoTypes.filter(item=>{
                      return item !==""
                    })
                    this.form.Types = res.data.Types.filter(item=>{
                      return item !==""
                    })
                    this.form.BaseDir = res.data.Dirs.filter(item=>{
                      return item !==""
                    })
                }
            })
        }
    }
}
</script>
