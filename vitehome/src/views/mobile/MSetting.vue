<template>
  <div class="mainBody">
    <NavBar title="设置" left-text="返回" left-arrow @click-left="push('/home')">
      <template #right>
        <div>
          <Button type="primary" @click="submitForm">保存</Button>
        </div>
      </template>
    </NavBar>
    <ActionSheet v-model:show="videoSelect" cancel-text="关闭">
      <div style="text-align: ;center;margin:30px 30px;display: inline-block;">
        <CheckboxGroup v-model="view.form.VideoTypes" direction="horizontal">
          <Checkbox v-for="item in view.form.Types" :name="item" style="margin:4px 8px;width:20vw;">
            {{ item }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </ActionSheet>
    <ActionSheet v-model:show="dirSelect" cancel-text="关闭">
      <div style="text-align: ;center;margin:30px 30px;display: inline-block;">
        <CheckboxGroup v-model="view.form.Dirs" direction="horizontal">
          <Checkbox v-for="item in view.form.DirsLib" :name="item" style="margin:4px 8px;max-width:80vw;">
            {{ item }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </ActionSheet>

    <ActionSheet v-model:show="tagSelect" cancel-text="关闭">
      <div style="text-align: ;center;margin:30px 30px;display: inline-block;">
        <CheckboxGroup v-model="view.form.Tags" direction="horizontal">
          <Checkbox v-for="item in view.form.TagsLib" :name="item" style="margin:4px 8px;max-width:80vw;">
            {{ item }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </ActionSheet>

    <ActionSheet v-model:show="typeSelect" cancel-text="关闭">
      <Search label="添加" v-model="newType" placeholder="请输入添加的类型" @search="addType">
        <template #action>
          <div @click="addType">添加</div>
        </template>
      </Search>
      <div style="text-align: ;center;margin:30px 30px;display: inline-block;">
        <CheckboxGroup v-model="view.form.Types" direction="horizontal">
          <Checkbox v-for="item in view.form.Types" :name="item" style="margin:4px 8px;max-width:80vw;">
            {{ item }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </ActionSheet>
    <ActionSheet v-model:show="tagLibSelect" cancel-text="关闭">
      <Search label="添加" v-model="newTagLib" placeholder="请输入添加的标签" @search="addTagLib">
        <template #action>
          <div @click="addTagLib">添加</div>
        </template>
      </Search>
      <div style="text-align: ;center;margin:30px 30px;display: inline-block;">
        <CheckboxGroup v-model="view.form.TagsLib" direction="horizontal">
          <Checkbox v-for="item in view.form.TagsLib" :name="item" style="margin:4px 8px;max-width:80vw;">
            {{ item }}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </ActionSheet>


    <MobileBar></MobileBar>
    <Form v-on:submit="submitForm">
      <Tabs v-model:active="tabActive" type="card" swipeable>
        <Tab name="base" title="基础设置">
          <Field v-model="view.form.ControllerHost" name="ControllerHost" label="请求服务器" placeholder="请求服务器" />
          <Field v-model="view.form.ImageHost" name="ImageHost" label="图片服务器" placeholder="图片服务器" />
          <Field v-model="view.form.StreamHost" name="StreamHost" label="流服务器" placeholder="流服务器" />
          <Field v-model="view.form.BaseUrl" name="BaseUrl" label="URL" placeholder="URL" />
          <Field v-model="view.form.OMUrl" name="OMUrl" label="OM-URL" placeholder="OM-URL" />

          <Row>
            <Col :span="6">
            热门标签
            </Col>
            <Col :span="18">
            <Col :span="18" @click="tagSelect = true">
            <Tag v-for="item in view.form.Tags" :key="item" style="background: green;margin:2px 4px;">{{ item }}</Tag>
            </Col>
            </Col>
          </Row>
        </Tab>
        <Tab name="search" title="搜索设置">
          <Row>
            <Col :span="6">
            视频类型
            </Col>
            <Col :span="18" @click="chooseVideoTypes">
            <Tag v-for="item in view.form.VideoTypes" :key="item" style="background: green;margin:2px 4px;">{{ item }}
            </Tag>
            </Col>
          </Row>
          <Row>
            <Col :span="6">
            已选路徑
            </Col>
            <Col :span="18" @click="dirSelect = true">
            <Tag v-for="item in view.form.Dirs" :key="item" style="background: green;margin:2px 4px;">{{ item }}</Tag>
            </Col>
          </Row>
        </Tab>
        <Tab name="dict" title="字典设置">
          <Row>
            <Col :span="6">
            枚举标签
            </Col>
            <Col :span="18" @click="tagLibSelect = true">
            <Tag v-for="item in view.form.TagsLib" :key="item" style="background: green;margin:2px 4px;">{{ item }}
            </Tag>
            </Col>
          </Row>
          <Row>
            <Col :span="6">
            枚举文件类型
            </Col>
            <Col :span="18" @click="typeSelect = true">
            <Tag v-for="item in view.form.Types" :key="item" style="background: green;margin:2px 4px;">{{ item }}</Tag>
            </Col>
          </Row>
        </Tab>
        <Tab name="remark" title="备注">
          <Field v-model="view.form.Remark" autosize type="textarea" rows="4" name="Remark" label="备注"
            placeholder="备注" />
        </Tab>

      </Tabs>
      <!-- <div style="margin: 16px;">
        <Button round block type="primary" native-type="submit">
          提交
        </Button>
      </div> -->
    </Form>





  </div>
</template>

<script setup lang="ts">
import { GetSettingInfo, PostSettingInfo } from "@/api/setting";
import {
  Button,
  Col,
  CheckboxGroup,
  Checkbox,
  Tag,
  Row,
  ActionSheet,
  NavBar,
  Field,
  Form,
  Tabs,
  Tab,
  Search,
} from "vant";
import "vant/lib/index.css";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { SettingInfo } from "../settting";
import MobileBar from './MobileBar.vue'

const { push, go } = useRouter();

const videoSelect = ref(false)
const dirSelect = ref(false)
const tagSelect = ref(false)
const typeSelect = ref(false)
const tagLibSelect = ref(false)
const tabActive = ref("base")
const newType = ref("")
const newTagLib = ref("")

const view = reactive({
  form: new SettingInfo(),
})


const addType = () => {
  if (newType.value && newType.value.length > 0) {
    view.form.Types.push(newType.value)
    newType.value = ''
  }
}

const addTagLib = () => {
  if (newTagLib.value && newTagLib.value.length > 0) {
    view.form.TagsLib.push(newTagLib.value)
    newTagLib.value = ''
  }
}
const chooseVideoTypes = () => {
  console.log('chooseVideoTypes')
  videoSelect.value = true
}

const submitForm = async () => {
  const postForm = { ...view.form, BaseDir: view.form.Dirs };
  console.log(postForm);
  const res = await PostSettingInfo(postForm)
  if (res) {
    go(0)
  }
}

const loadData = async () => {
  const res = await GetSettingInfo()
  view.form = res
}

onMounted(() => {
  loadData()
});

</script>
<style>
.mainBody {
  width: 100%;
  position: absolute;
  display: block;
}

.mlist {
  float: none;
  z-index: 99;
  width: 100%;
}
</style>
