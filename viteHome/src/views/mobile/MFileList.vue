
<template>
  <div class="mainBody">
    <DropdownMenu>
      <DropdownItem v-model="view.MovieType" :options="MovieTypeOptions" @change="onSearch">

      </DropdownItem>
      <DropdownItem v-model="view.SortField" :options="SortFieldOptions" @change="onSearch">

      </DropdownItem>
      <DropdownItem v-model="view.SortType" :options="SortTypeOptions" @change="onSearch">

      </DropdownItem>

    </DropdownMenu>
    <Search v-model="view.Keyword" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" input-align="center">
    </Search>
    <PullRefresh v-model="refreshing" @refresh="() => {
      view.Page = 1
      onSearch()
    }">
      <List class="mlist" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <Card v-for="item in view.ModelList" :desc="item.Actress" :title="item.Code" :thumb="getPng(item.Id)">
          <template #tags>
            <Tag v-for="tag in item.Tags" plain type="danger">{{ tag }}</Tag>
          </template>
          <template #footer>
            <Button size="mini" @click="openFile(item)">播放</Button>
            <Button size="mini">播放</Button>
          </template>
        </Card>
      </List>
    </PullRefresh>

    <teleport to="body">
      <div v-show="view.videoVisible"
        style="width: 100%;height:100%;z-index: 9999;top:0; position:fixed;overflow: auto;background-color: rgba(0,0,0,0.7);float: left;"
        id="videoDiv">
        <video id="video" :src="options.src" controls style="width: 100%;height:auto;right: 0;top: 0;position:absolute">
          您的浏览器不支持 video 标签。
        </video>
        <vue3VideoPlay v-bind="options" />

      </div>
    </teleport>
  </div>

</template>

<script setup lang="ts">
import { QueryFileList } from '@/api/file';
import { ResultList } from '@/config/ResultModel';
import { getFileStream, getJpg, getPng } from "@/utils/ImageUtils";
import {
  Row,
  Col,
  Tag,
  Button,
  PullRefresh,
  List,
  Card,
  Toast,
  Search,
  DropdownMenu,
  DropdownItem
} from 'vant';
import 'vant/lib/index.css';
import { reactive, onMounted, ref } from 'vue';

const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const view = reactive(
  {
    Page: 1,
    PageSize: 15,
    SortField: 'MTime',
    SortType: 'desc',
    MovieType: '',
    Keyword: '',
    ModelList: [],
    TotalCnt: 0,
    ResultCnt: 0,
    videoVisible: false,
    currentFile: {}
  }
)

const options = reactive({
  width: "100%", //播放器高度
  height: "auto", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "http://192.168.3.38:8083/api/file/F~emby~emby-rename~井川ゆい柳田やよい~YeLLOW~[川い田よ]EO29人中しンィスッン 川い柳やい~[川い田よ][L-8]妻出パテートキグ井ゆ 田よ{骑}誘丝mv[川い田よ][L-8]妻出パテートキグ井ゆ 田よ{骑}誘丝mv", //视频源
  muted: false, //静音
  webFullScreen: true,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: true, //自动播放
  loop: true, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});

const onLoad = () => {
  console.log('onLoad')
  view.Page += 1
  onSearch()
}

const openFile = (item: any) => {
  view.currentFile = item
  view.videoVisible = true
  const stream = getFileStream(item.Id)
  console.log(stream)
  options.title = item.Name
  options.src = stream
}

const onSearch = async (clear: boolean = true) => {
  const res = await QueryFileList(view);
  if (clear) {
    view.ModelList = []
  }
  const model = res as unknown as ResultList;
  model.Data.map((item) => {
    if (item.Code == item.Actress) {
      item.Code = "";
      item.Actress = "";
    }
    if (item.Code.lastIndexOf("-") == item.Code.length - 1) {
      item.Code = item.Code.substring(0, item.Code.length - 1);
    }
    item.name = item.Name.trim();
    item.Name = item.Name.replace("[" + item.Code + "]", "");
    item.Name = item.Name.replace("[" + item.Actress + "]", "");
  });
  view.ModelList = model.Data;
  view.TotalCnt = model.TotalCnt;
  view.ResultCnt = model.ResultCnt;
  refreshing.value = false
}
const onCancel = () => {
  Toast('取消')
}

onMounted(() => {
  // onSearch()
  //  options.src=null
  view.videoVisible = true

})


const MovieTypeOptions = [
  { value: '', text: '全部' },
  { value: '骑兵', text: '骑兵' },
  { value: '步兵', text: '步兵' },
  { value: '斯巴达', text: '斯巴达' },
  { value: '国产', text: '国产' }]
const SortFieldOptions = [
  { value: 'MTime', text: '时间倒排' },
  { value: 'Name', text: '名称倒排' },
  { value: 'Size', text: '大小倒排' }]
const SortTypeOptions = [
  { value: 'desc', text: '倒排' },
  { value: 'asc', text: '正排' }]


</script>
<style>
.mainBody {
  width: 100%;
  position: fixed;
}

.mlist {}
</style>