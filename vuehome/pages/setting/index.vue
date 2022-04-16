<template>
  <div align="center">
    <el-form
      label-width="160px"
      ref="form"
      :model="form"
      label-position="right"
    >
      <h5 align="center">{{ loadingDate }}</h5>
      <div
        style="
          margin: 8px 20px;
          width: 90%;
          background: white;
          min-height: 650px;
        "
      >
        <el-tabs
          v-model="activeName"
          tab-position="top"
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane label="扫描设置" name="first">
            <el-form-item label="图片类型">
              <el-select
                v-model="form.ImageTypes"
                multiple
                placeholder="请选择"
                style="width: 90%"
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
                style="width: 90%"
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
                style="width: 90%"
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
              <div style="width: 90%">
                <!-- <span v-for="iteTag in form.Tags" :key="iteTag"
                >{{ iteTag }} <el-divider direction="vertical"></el-divider
              ></span> -->

                <el-tag
                  v-for="iteTag in form.Tags"
                  :key="iteTag"
                  closable
                  style="margin-right: 5px"
                  @close="removeTag(iteTag)"
                >
                  {{ iteTag }}
                </el-tag>

                <el-popover placement="left" width="400px;" trigger="click">
                  <el-transfer
                    :titles="tagTitles"
                    v-model="form.Tags"
                    target-order="push"
                    :data="popTagLibData"
                  ></el-transfer>
                  <el-link
                    slot="reference"
                    type="success"
                    icon="el-icon-edit"
                    round
                    @click="
                      () => {
                        makeTabLibData();
                        this.popTagLibData = this.form.tagLibData;
                      }
                    "
                    >添加</el-link
                  >
                </el-popover>
              </div>
            </el-form-item>

            <el-form-item label="已选路徑">
              <el-checkbox
                :indeterminate="isIndeterminateDir"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="form.Dirs"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="dir in form.DirsLib"
                  :label="dir"
                  :key="dir"
                  >{{ dir }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.Remark"
                style="width: 90%; margin-bottom: 20px"
              ></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="基础配置" name="second">
            <el-form-item label="URL">
              <el-input v-model="form.BaseUrl" style="width: 90%"></el-input>
            </el-form-item>
            <el-form-item label="OM-URL">
              <el-input v-model="form.OMUrl" style="width: 90%"></el-input>
            </el-form-item>

            <el-form-item label="枚举文件类型">
              <el-select
                v-model="form.Types"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请添加类型"
                style="width: 90%"
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
            <el-form-item label="标签库">
              <el-select
                v-model="form.TagsLib"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请添加标签"
                style="width: 90%"
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
            <el-form-item label="路徑库">
              <el-select
                v-model="form.DirsLib"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请添加路径"
                style="width: 90%"
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
                style="width: 90%; margin-bottom: 20px"
              ></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="系统信息" name="third">
            <el-form-item label="系統信息">
              <!-- <el-input
                type="textarea"
                :rows="20"
                v-model="form.SystemInfo"
                style="width: 90%"
              ></el-input> -->
              <el-tiptap v-model="form.SystemInfo" :extensions="extensions" />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </div>

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
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
} from "element-tiptap";

export default {
  mixins: [setStorePath],
  data: function () {
    return {
      loadingDate:new Date() ,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
      inputVisible: false,
      inputValue: "",
      activeName: "first",
      inputVisibleFile: false,
      inputValueFile: "",
      tagTitles: ["标签库", "已选"],
      checkAll: false,
      isIndeterminateDir: true,
      popTagLibData: [],
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
        DirsLib: [],
        Tags: [],
        TagsLib: [],
        tagLibData: [],
      },
    };
  },
  mounted: function () {
    document.title = "設置";
    this.loadData();
  },
  watch: {
    form: (a) => {
      // console.log(this.form)
      // this.makeTabLibData();
    },
  },
  methods: {
    removeTag(val) {
      const idx = this.form.Tags.indexOf(val);
      this.form.Tags.splice(idx, 1);
    },
    handleClick() {},
    handleCheckAllChange(val) {
      this.form.Dirs = val ? this.form.DirsLib : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.form.Dirs.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.form.Dirs.length;
    },
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
          this.$router.go(0);
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
