let settingHtml = '<div>'
    + '<h1 align="center">设置</h1>'
    + ' <el-form label-width="100px" ref="form" :model="form">'
    + ' <el-form-item label="URL">'
    + '    <el-input v-model="form.BaseUrl"></el-input>'
    + '  </el-form-item>'
    + ' <el-form-item label="图片类型">'
    + '    <el-select v-model="form.Images" multiple placeholder="请选择" style="width: 100%">'
    + '    <el-option\n'
    + '      v-for="item in form.Types"'
    + '      :key="item"'
    + '      :label="item"'
    + '      :value="item">'
    + '    </el-option>'
    + '  </el-select>'
    + '  </el-form-item>'
    + ' <el-form-item label="文档类型">'
    + '    <el-select v-model="form.Docs" multiple placeholder="请选择" style="width: 100%">'
    + '    <el-option\n'
    + '      v-for="item in form.Types"'
    + '      :key="item"'
    + '      :label="item"'
    + '      :value="item">'
    + '    </el-option>'
    + '  </el-select>'
    + '  </el-form-item>'
    + ' <el-form-item label="视频类型">'
    + '    <el-select v-model="form.VideoTypes" multiple placeholder="请选择" style="width: 100%">'
    + '    <el-option\n'
    + '      v-for="item in form.Types"'
    + '      :key="item"'
    + '      :label="item"'
    + '      :value="item">'
    + '    </el-option>'
    + '  </el-select>'
    + '  </el-form-item>'
    + '<el-form-item label="文件类型">'
    + '<el-tag'
    + '  :key="tag"'
    + '  v-for="tag in form.Types"'
    + '  closable'
    + '  :disable-transitions="false"'
    + '  @close="handleClose(tag)">'
    + '  {{tag}}'
    + '</el-tag>'
    + '<el-input'
    + '  class="input-new-tag"'
    + '  v-if="inputVisible"'
    + '  v-model="inputValue"'
    + '  ref="saveTagInput"'
    + '  size="small"'
    + '  @keyup.enter.native="handleInputConfirm"'
    + '  @blur="handleInputConfirm"'
    + '>'
    + '</el-input>'
    +'<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>'
    + '</el-form-item>'
    + '<el-form-item>'
    + '    <el-button type="primary" align-text="center" @click="submitForm(\'form\')">提交</el-button>'
    + '  </el-form-item>'
    + '</el-form>'
    + '</div>'

let setting = {
    template: settingHtml,
    components: {
        "input-vue": inputVue,
    },
    mounted: function () {
        this.loadData();
    },
    data: function () {
        return {
            inputVisible: false,
            inputValue: '',
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
    methods: {
        submitForm() {
            console.log(this.form.Types)
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
        loadData() {
            axios.get("/settingInfo").then((res) => {
                if (res.status == 200) {
                    this.form.BaseUrl = res.data.BaseUrl
                    this.form.Images = res.data.Images
                    this.form.Docs = res.data.Docs
                    this.form.VideoTypes = res.data.VideoTypes
                    this.form.Types = res.data.Types
                    this.form.BaseDir = res.data.BaseDir
                }
            })
        }
    }
}


