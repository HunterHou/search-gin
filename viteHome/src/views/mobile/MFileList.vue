
<template>
  <div class="mainBody">
    <NavBar title="搜索" left-text="返回" left-arrow @click-left="push('/home');">
      <Icon name="search" slot="right" />
    </NavBar>
    <Sticky v-if="isPlaying" :offsetTop="520" style="left:450px;width: 400px;">
      <Button size="small" type="success" @click="() => { view.videoVisible = true }">
        正在播放：
        {{ view.currentFile?.Code ||
            view.currentFile?.Actress ||
            '无'
        }}
        <Button size="small" type="success" :loading="true" loading-type="spinner"></Button>
      </Button>
      <Button size="small" type="danger" @click="closePlayVideo">停止播放</Button>
    </Sticky>
    <DropdownMenu>
      <DropdownItem v-model="view.MovieType" :options="MovieTypeOptions" @change="onSearch">

      </DropdownItem>
      <DropdownItem v-model="view.SortField" :options="SortFieldOptions" @change="onSearch">

      </DropdownItem>
      <DropdownItem v-model="view.SortType" :options="SortTypeOptions" @change="onSearch">

      </DropdownItem>

    </DropdownMenu>
    <Search v-model="view.Keyword" placeholder="请输入搜索关键词" @search="onSearch" @update:model-value="keywordUpdate"
      @cancel="onCancel" input-align="center">
    </Search>

    <PullRefresh v-model="refreshing" @refresh="() => {
      view.Page = 1
      onSearch()
      finished = false
    }">
      <List class="mlist" v-model:loading="loading" v-model:error="error" :finished="finished" finished-text="没有更多了"
        @load="onLoad">
        <div v-for="item in view.ModelList" :key="item.Id"
          style="width: 23rem;float: left;height: 12rem;margin: 6px 8px;display: flex;box-shadow: 0 0 4px grey;">
          <div style="width: 40%;margin: 8px auto;">
            <Image :src="getPng(item.Id)" style="height: auto;width: 8rem;"></Image>
          </div>
          <div style="width:55%;margin: 8px auto;">
            <div style="margin: 1px auto;">
              <a v-if="item.Actress" @click="searchKeyword(item.Actress)">{{ item.Actress }}
                <Tag color="#7232dd"> {{ item.MovieType }}</Tag>
              </a>
              <br />
              <span v-if="item.Code">{{ item.Code }}</span>
              <span>【{{ item.SizeStr }}】 </span>
            </div>
            <div style="margin: 1px auto;font-size: 12px;color: gray;">
              <span> 【{{ item.Name }}】</span>
            </div>

            <div style="margin: 1px auto;">
              <Tag v-for="tag in item.Tags" plain type="danger" @click="searchKeyword(tag)">{{ tag }}</Tag>
              <Row type="flex" justify="space-around">
                <Col span="8">
                <Button size="small" type="primary" @click="openFile(item)">播放</Button>
                </Col>
                <Col span="8">
                <Button size="small" type="primary" @click="viewPictures(item)">查看</Button>
                </Col>
              </Row>

            </div>
          </div>

        </div>
      </List>
      <Button @click="onLoad" block type="primary">加载</Button>
    </PullRefresh>


    <teleport to="body">
      <div v-show="view.videoVisible"
        style="width: 100%;height:100%;z-index: 9999;top:0; position:fixed;overflow: auto;background-color: rgba(0,0,0,0.7);float: left;"
        id="videoDiv">
        <div style="right:1rem;top:0;height:2rem;position:absolute;z-index: 9999;">
          <ElButton type="primary" @click="hiddenPlayVideo">隐藏</ElButton>
          <ElButton type="primary" @click="closePlayVideo">关闭</ElButton>
        </div>
        <vue3VideoPlay v-bind="options" />
      </div>
    </teleport>
    <teleport to="body">
      <div v-show="viewPic" style="width: 100%;height:100%;z-index: 99;top: 0px;position:fixed;overflow: auto;">
        <div style="right:1rem;top:20px;height:2rem;position:fixed;z-index: 999;">
          <Button type="primary" @click="closeViewPicture">关闭</Button>
        </div>
        <div v-for="(item, index) in view.imageList" :key="index" style="display: flex; margin: 1px auto">
          <ElImage style="width: 100%; margin: 0 auto;opacity: 9;z-index: 99" :src="item">
            @click.stop="innerVisibleFalse"
          </ElImage>
        </div>
      </div>
    </teleport>
  </div>


</template>

<script setup lang="ts">
import { QueryDirImageBase64, QueryFileList } from '@/api/file';
import { ResultList } from '@/config/ResultModel';
import { getFileStream, getPng } from "@/utils/ImageUtils";
import {
  Button, Row, Col, Icon, DropdownItem, DropdownMenu, List, PullRefresh, Search, Sticky,
  Tag, Toast, NavBar, Image
} from 'vant';
import 'vant/lib/index.css';
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { MovieModel } from '../fileList';
import { useRouter } from 'vue-router'

const { push } = useRouter()
const loading = ref(false)
const finished = ref(false)
const isPlaying = ref(false)
const refreshing = ref(false)
const error = ref(false)
const view = reactive(
  {
    Page: 0,
    PageSize: 10,
    SortField: 'MTime',
    SortType: 'desc',
    MovieType: '',
    Keyword: '',
    ModelList: [],
    TotalCnt: 0,
    ResultCnt: 0,
    videoVisible: false,
    currentFile: new MovieModel(),
    imageList: []
  }
)

const options = reactive({
  width: "100%", //播放器高度
  height: "auto", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "http://192.168.3.38:8083/api/file/F~emby~emby-rename~井川ゆい柳田やよい~YeLLOW~[川い田よ]EO29人中しンィスッン 川い柳やい~[川い田よ][L-8]妻出パテートキグ井ゆ 田よ{骑}誘丝mv[川い田よ][L-8]妻出パテートキグ井ゆ 田よ{骑}誘丝mv", //视频源
  muted: false, //静音
  webFullScreen: false,
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


const onLoad = async () => {
  view.Page += 1
  console.log('onLoad', view.Page)
  await onSearch(false)
}

const searchKeyword = (words: string) => {
  view.Keyword = words
  view.Page = 1
  onSearch()
}
const viewPic = ref(false)

const viewPictures = async (item) => {
  const toast = Toast.loading({
    duration: 0,       // 持续展示 toast
    forbidClick: false, // 禁用背景点击
    loadingType: 'spinner',
    message: '加载中...'
  });
  setTimeout(() => {
    toast.clear()
  }, 3000);
  await loadDirInfo(item.Id)
  toast.clear()
  if (view.imageList && view.imageList.length > 0) {
    viewPic.value = true
  } else {
    Toast.fail('无图')
  }

}
const closeViewPicture = () => {
  viewPic.value = false
}


const loadDirInfo = async (id: string) => {
  const res = await QueryDirImageBase64(id);
  if (res && res.length > 0) {
    view.imageList = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].FileType == "jpg" || res[i].FileType == "png") {
        view.imageList.push(res[i].ImageBase);
      }
    }
  }
};

const hiddenPlayVideo = () => {
  view.videoVisible = false
}

const closePlayVideo = () => {
  view.videoVisible = false
  options.src = null
  isPlaying.value = false
}

const openFile = (item: any) => {
  view.currentFile = item
  isPlaying.value = true
  view.videoVisible = true
  const stream = getFileStream(item.Id)
  console.log(stream)
  options.title = item.Name
  options.src = stream
}

const onSearch = async (clear?) => {
  const res = await QueryFileList(view);
  if (clear !== false) {
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
  const newList = [...view.ModelList, ...model.Data]
  view.ModelList = newList
  view.TotalCnt = model.TotalCnt;
  view.ResultCnt = model.ResultCnt;
  refreshing.value = false
  error.value = true
  finished.value = false
}
const onCancel = () => {
  onSearch()
}
const keywordUpdate = () => {
  if (view.Keyword.length >= 2) {
    view.Page = 1
    onSearch()
  }
}
onMounted(() => {
  // onSearch()
  options.src = null
  // view.videoVisible = true

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
  position: absolute;
  display: block;
}

.mlist {
  float: none;
  width: 100%;
}
</style>