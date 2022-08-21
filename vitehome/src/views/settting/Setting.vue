<template>
  <div align="center" style="margin-top: -30px;">
    <ElForm label-width="160px" ref="form" :model="view.form" label-position="right">
      <h5 align="center">{{ formatted }}</h5>
      <div style="
          margin: 8px 20px;
          width: 90%;
          background: white;
          min-height: 650px;
        ">
        <ElTabs v-model="activeName" type="card" @tab-click="handleClick">
          <ElTabPane label="扫描设置" name="first">
            <ElSwitch v-model="view.form.IsDb" size="large" active-text="数据库" inactive-text="算法" />
            <ElFormItem label="图片类型">
              <ElSelect v-model="view.form.ImageTypes" multiple placeholder="请选择" style="width: 90%">
                <ElOption v-for="item in view.form.Types" :key="item" :label="item" :value="item">
                </ElOption>
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="文档类型">
              <ElSelect v-model="view.form.DocsTypes" multiple placeholder="请选择" style="width: 90%">
                <ElOption v-for="item in view.form.Types" :key="item" :label="item" :value="item">
                </ElOption>
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="视频类型">
              <ElSelect v-model="view.form.VideoTypes" multiple placeholder="请选择" style="width: 90%">
                <ElOption v-for="item in view.form.Types" :key="item" :label="item" :value="item">
                </ElOption>
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="热门标签">
              <div style="width: 90%">
                <!-- <span v-for="iteTag in form.Tags" :key="iteTag"
                >{{ iteTag }} <el-divider direction="vertical"></el-divider
              ></span> -->

                <ElTag v-for="iteTag in view.form.Tags" :key="iteTag" closable style="margin-right: 5px"
                  @close="removeTag(iteTag)">
                  {{ iteTag }}
                </ElTag>

                <ElPopover placement="left" width="400px;" trigger="click">
                  <template #reference>
                    <ElLink type="success" icon="el-icon-edit" round @click="() => {
                      makeTabLibData();
                      view.popTagLibData = view.form.tagLibData;
                    }
                    ">添加
                    </ElLink>
                  </template>
                  <template #default>
                    <ElTransfer :titles="['标签库', '已选']" v-model="view.form.Tags" target-order="push"
                      :data="view.popTagLibData">
                    </ElTransfer>
                  </template>
                </ElPopover>
              </div>
            </ElFormItem>

            <ElFormItem label="已选路徑">
              <ElCheckbox :indeterminate="view.isIndeterminateDir" v-model="checkAll" @change="handleCheckAllChange">全选
              </ElCheckbox>
              <ElCheckboxGroup v-model="view.form.Dirs" @change="handleCheckedCitiesChange">
                <ElCheckbox v-for="dir in view.form.DirsLib" :label="dir" :key="dir">{{ dir }}</ElCheckbox>
              </ElCheckboxGroup>
            </ElFormItem>
            <ElFormItem label="备注">
              <ElInput type="textarea" :rows="4" v-model="view.form.Remark" style="width: 90%; margin-bottom: 20px">
              </ElInput>
            </ElFormItem>
          </ElTabPane>

          <ElTabPane label="基础配置" name="second">
            <ElFormItem label="请求服务器">
              <ElInput v-model="view.form.ControllerHost" style="width: 90%"></ElInput>
            </ElFormItem>
            <ElFormItem label="图片服务器">
              <ElInput v-model="view.form.ImageHost" style="width: 90%"></ElInput>
            </ElFormItem>
            <ElFormItem label="流服务器">
              <ElInput v-model="view.form.StreamHost" style="width: 90%"></ElInput>
            </ElFormItem>
            <ElFormItem label="URL">
              <ElInput v-model="view.form.BaseUrl" style="width: 90%"></ElInput>
            </ElFormItem>
            <ElFormItem label="OM-URL">
              <ElInput v-model="view.form.OMUrl" style="width: 90%"></ElInput>
            </ElFormItem>
            <ElFormItem label="枚举文件类型">
              <ElSelect v-model="view.form.Types" multiple filterable allowCreate defaultFirstOption placeholder="请添加类型"
                style="width: 90%" size="small">
                <ElOption v-for="item in view.form.Types" :key="item" :label="item" :value="item">
                </ElOption>
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="标签库">
              <ElSelect v-model="view.form.TagsLib" multiple filterable allowCreate defaultFirstOption
                placeholder="请添加标签" style="width: 90%" size="small">
                <ElOption v-for="item in view.form.Tags" :key="item" :label="item" :value="item">
                </ElOption>
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="路徑库">
              <ElSelect v-model="view.form.DirsLib" multiple :filterable="true" allowCreate defaultFirstOption
                placeholder="请添加路径" style="width: 90%">
                <ElOption v-for="item in view.form.Dirs" :key="item" :label="item" :value="item">
                </ElOption>
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="备注">
              <ElInput type="textarea" :rows="4" v-model="view.form.Remark" style="width: 90%; margin-bottom: 20px">
              </ElInput>
            </ElFormItem>
          </ElTabPane>

          <ElTabPane label="系统信息" name="third">
            <v-md-editor v-model="view.form.SystemHtml" height="700px"></v-md-editor>
            <!-- <ElInput type="textarea" :rows="8" v-model="view.form.SystemHtml" /> -->
          </ElTabPane>
        </ElTabs>
      </div>

      <div>
        <ElButton class="return" type="warning" align-text="center" @click="goMenu">返回</ElButton>
      </div>
      <div>
        <ElButton class="submit" type="primary" align-text="center" @click="submitForm">提交</ElButton>
      </div>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ElForm,
  ElFormItem,
  ElTabs,
  ElSelect,
  ElOption,
  ElPopover,
  ElTransfer,
  ElCheckbox,
  ElCheckboxGroup,
  ElInput,
  ElButton,
  ElTag,
  ElLink,
  ElTabPane
} from 'element-plus'
import { PostSettingInfo, GetSettingInfo } from '@/api/setting'
import { computed } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'
import { SettingInfo } from "@/views/settting/index";


const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

const { go } = useRouter()
const view = reactive({
  form: new SettingInfo(),
  inputVisible: false,
  isIndeterminateDir: false,
  inputVisibleFile: false,
  inputValueFile: '',
  inputValue: '',
  popTagLibData: [],
  isIndeterminate: false,
  loading: false,
})
const activeName = ref('second')

let checkAll = computed(() => {
  return (view.form?.Dirs?.length === view.form?.DirsLib?.length)
})
const removeTag = (val) => {
  const idx = view.form.Tags.indexOf(val);
  view.form.Tags.splice(idx, 1);
}
const goMenu = () => {
  go(-1)
}

const handleClick = () => {
  console.log('val')
}
const handleCheckAllChange = (val) => {
  view.form.Dirs = val ? view.form.DirsLib : [];
  view.isIndeterminate = false;
}
const handleCheckedCitiesChange = (value) => {
  console.log(value);

  // let checkedCount = value.length
  // checkAll = checkedCount === view.form.Dirs.length;
  // view.isIndeterminate =
  //   checkedCount > 0 && checkedCount < view.form.Dirs.length;
}
const submitForm = async () => {
  const postForm = { ...view.form, BaseDir: view.form.Dirs };
  view.loading = true;
  console.log(postForm);
  const res = await PostSettingInfo(postForm)
  if (res) {
    go(0)
  }
}
const handleClose = (tag) => {
  view.form.Types.splice(view.form.Types.indexOf(tag), 1);
}

const showInput = () => {
  view.inputVisible = true;
  // view.$nextTick((_) => {
  //   view.$refs.saveTagInput.$refs.input.focus();
  // });
}
const handleInputConfirm = () => {
  let inputValue = view.inputValue;
  if (inputValue) {
    view.form.Types.push(inputValue);
  }
  view.inputVisible = false;
  view.inputValue = "";
}
const showInputFile = () => {
  view.inputVisibleFile = true;
  // view.$nextTick((_) => {
  //   view.$refs.saveTagInputFile.$refs.input.focus();
  // });
}
const handleCloseFile = (tag) => {
  view.form.BaseDir.splice(view.form.BaseDir.indexOf(tag), 1);
}


const handleInputConfirmFile = () => {
  let inputValueFile = view.inputValueFile;
  if (inputValueFile) {
    view.form.BaseDir.push(inputValueFile);
  }
  view.inputVisibleFile = false;
  view.inputValueFile = "";
}
const makeTabLibData = () => {
  const dataLib = [];
  const { TagsLib } = view.form;
  for (var i = 0; i < TagsLib.length; i++) {
    dataLib.push({ key: TagsLib[i], label: TagsLib[i] });
  }
  view.form.tagLibData = dataLib;
}
const loadData = async () => {
  const res = await GetSettingInfo()
  view.form = res;
  makeTabLibData()
}


onMounted(() => {
  document.title = "設置"
  loadData()
})

</script>

<style scoped>
.return {
  width: 9%;
  position: fixed;
  bottom: 30px;
  overflow: auto;
  z-index: 999;
  left: 40%;
}

.submit {
  width: 9%;
  position: fixed;
  bottom: 30px;
  overflow: auto;
  z-index: 999;
  right: 40%;
}

.el-transfer {
  margin-left: 120px;
  text-align: left;
}
</style>
