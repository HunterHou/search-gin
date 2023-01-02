<template>
  <div ref="pagePress" class="mainBody">
    <NavBar :title="title">
      <template #left>
        <div>
          <Button link size="small" plain  @click="changeScreen">{{ !isFullscreen?'全屏':'还原' }}</Button>
          <span @click="refreshIndex" style="color:blue">总数:{{ view.ResultCnt }}</span>
        </div>
      </template>
      <template #right>
        <div @click="showSearch = true">
          <Icon name="search" size="18" />
          <span> {{ view.queryParam.Keyword }} </span>
        </div>
        <Icon v-if="view.queryParam.Keyword" name="revoke" @click="view.queryParam.Keyword = ''; onSearch()" />
      </template>
    </NavBar>
    <ActionSheet v-model:show="showSearch" title="搜索" :close-on-click-overlay="true" style="max-height: 60vh;">
      <Search v-model="view.queryParam.Keyword" placeholder="请输入搜索" @search="onSearch" label="关键词" show-action
        @update:model-value="keywordUpdate" @cancel="onCancel" input-align="center">
        <template #action>
          <div @click="onCancel" style="margin: 2px 4px">搜索</div>
        </template>
      </Search>
      <div style="margin-bottom: 0vh;">
        <Button type="warning" v-for="tag in view.settingInfo.Tags" :key="tag" style="margin: 1px 2px;" size="normal"
          @click="
  searchKeyword(tag);
showSearch = false;
          ">
          {{ tag }}
        </Button>
      </div>
    </ActionSheet>
    <ActionSheet v-model:show="showTag" title="标签管理" :close-on-click-overlay="true" style="height: 60vh;">
      <div style="margin-bottom: 0vh;">
        <Row>
          <Col>
          <Tag type="success" @click="onSearch">总数:{{ view.ResultCnt }}</Tag>
          </Col>
          <Col>当前标签</Col>
          <Col>
          <Tag type="success" size="large" style="margin: 2px 4px;" v-for="ta in view.currentFile.Tags" :key="ta"
            closeable @close="removeCurrentFileTag(ta)">{{ ta
            }}</Tag>
          </Col>
        </Row>
      </div>
      <div style="margin-bottom: 0vh;">
        <Row>
          <Col>可选标签</Col>
        </Row>
        <Row>
          <Col>
          <Tag type="success" size="large" style="margin: 2px 4px;" v-for="ta in view.settingInfo.Tags" :key="ta"
            @click="addCurrentFileTag(ta)">{{ ta }}</Tag>
          </Col>
        </Row>
      </div>
    </ActionSheet>
    <ActionSheet v-model:show="showRename" title="重命名" :close-on-click-overlay="true" style="height: 60vh;">
      <div style="margin-bottom: 0vh;">
        <Row>
          <Col :span="6">
          类型
          </Col>
          <Col :span="18">
          <RadioGroup v-model="view.currentFile.MovieType" @change="formMovieTypeChange(view)" direction="horizontal">
            <Radio name="">全部</Radio>
            <Radio name="骑兵">骑兵</Radio>
            <Radio name="步兵">步兵</Radio>
            <Radio name="斯巴达">斯巴达</Radio>
            <Radio name="国产">国产</Radio>
          </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
          <Field label="编码" style="width:100%" v-model="view.currentFile.Code">
          </Field>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
          <Field label="图鉴" style="width:100%" v-model="view.currentFile.Actress">
          </Field>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
          <Field label="名称" rows="5" style="width:100%" autosize type="textarea" v-model="view.currentFile.Name">
          </Field>
          </Col>
        </Row>
        <Row>
          <Button style="margin:4px auto" size="large" type="primary" @click="renameFile">提交</Button>
        </Row>
      </div>
    </ActionSheet>

    <MobileBar></MobileBar>
    <teleport to="body">
      <div v-show="view.videoVisible" id="videoDiv" style="
          width: 100%;
          height: 100%;
          z-index: 9999;
          position: fixed;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.7);
        ">
        <div style="right: 10vw; height: 10vh; position: relative;top:40px;right: 20px; z-index: 9999">
          <ElButton type="primary" @click="hiddenPlayVideo">隐藏</ElButton>
          <ElButton type="primary" @click="closePlayVideo">关闭</ElButton>
        </div>
        <vue3VideoPlay v-if="view.videoPlay" v-bind="options" @volumechange="volumechange" />
        <SwipeCell>
          <Image v-for="item in view.playlist" :key="item.Id" :src="getPng(item.Id)" style=" height: auto;
              width: 180px;margin: auto;" @click="openFile(item)">
          </Image>
        </SwipeCell>

      </div>
    </teleport>
    <teleport to="body">
      <div v-show="viewPic" style="
          width: 100%;
          height: 100%;
          z-index: 9999;
          top: 0px;
          button: 00px;
          position: fixed;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.9);
          min-height: 1200px;
        ">
        <div style="
            right: 1rem;
            top: 20px;
            height: 2rem;
            position: fixed;
            z-index: 999;
          ">
          <Button type="primary" @click="closeViewPicture">关闭</Button>
        </div>
        <div v-for="(item, index) in view.imageList" :key="index" style="display: flex; margin: 1px auto">
          <ElImage style="width: 100%; margin: 0 auto; opacity: 9; z-index: 99" :src="item">
            @click.stop="innerVisibleFalse"
          </ElImage>
        </div>
      </div>
    </teleport>

    <Sticky v-if="isPlaying" :offsetTop="520" style="left: 450px; width: 400px">
      <Button size="normal" type="success" @click="
        () => {
          view.videoVisible = true;
        }
      ">
        正在播放：
        {{ view.currentFile?.Code || view.currentFile?.Actress || "无" }}
        <Button size="normal" type="success" :loading="true" loading-type="spinner"></Button>
      </Button>
      <Button size="normal" type="danger" @click="closePlayVideo">停止播放</Button>
    </Sticky>
    <DropdownMenu>
      <DropdownItem v-model="view.queryParam.MovieType" :options="MovieTypeOptions" @change="onSearch">
      </DropdownItem>
      <DropdownItem v-model="view.queryParam.SortField" :options="SortFieldOptions" @change="onSearch">
      </DropdownItem>
      <DropdownItem v-model="view.queryParam.SortType" :options="SortTypeOptions" @change="onSearch">
      </DropdownItem>
    </DropdownMenu>

    <PullRefresh v-model="refreshing" @refresh="
      () => {
        view.queryParam.Page = 1;
        onSearch();
        refreshing = false;
      }
    ">
      <SwipeCell>
        <div v-for="item in view.ModelList" :key="item.Id" style="
          width: 96vw;
          float: left;
          height: 12rem;
          margin: 6px 8px;
          display: flex;
          box-shadow: 0 0 4px grey;
        ">
          <div style="width: 40vw; margin: 8px auto">
            <Image :src="isWide ? getJpg(item.Id) : getPng(item.Id)" @click="previewPictures(item)" :style="{
              height: '100%',
              width: isWide ? '100%' : 'auto',
              'max-width': '350px',
              'min-width': '122px',
              margin: '2px auto',
            }">
            </Image>
          </div>

          <div style="width: 55vw; margin: 8px auto; float: right">
            <div style="margin: 1px auto">
              <Row>
                <Col>
                <Tag color="#7232dd"> {{ item.MovieType }}</Tag>
                </Col>
                <Col span="12">
                <a v-if="item.Actress" @click="searchKeyword(item.Actress)">{{ item.Actress }}
                </a>
                </Col>
                <Col>
                <span v-if="item.Code">{{ item.Code }}</span>
                </Col>
              </Row>

              <Row style="max-height:32px;overflow:hidden">
                <Tag v-for="tag in item.Tags" plain type="danger" @click="searchKeyword(tag)">{{ tag }}</Tag>
              </Row>
              <Row>
                <div style="
                  margin: 1px auto;
                  font-size: 12px;
                  color: gray;
                  max-height: 5rem;
                " class="van-multi-ellipsis--l4">
                  <span>【{{ item.SizeStr }}】 </span><span> 【{{ item.Name }}】</span>
                </div>
              </Row>
              <SwipeCell>

                <template #left>
                  <Col>
                  <Tag square size="large" type="warning" @click="getImageList(item.Id)">刮图</Tag>
                  </Col>
                </template>
                <template #right>
                  <SwipeCell style="align-content:space-between;">
                    <Tag square size="large" type="danger" @click="deleteFile(item)">删除
                    </Tag>
                    <Tag square size="large" type="primary" @click="showRenameForm(item)">
                      重命名</Tag>
                    <Tag square size="large" type="success" @click="syncFile(item.Id)">同步
                    </Tag>
                  </SwipeCell>
                </template>
                <Row justify="space-around" style="button: 10px;width: 100%;">
                  <Col>
                  <Tag square size="large" type="success" @click="tagManage(item)">标签</Tag>
                  </Col>
                  <Col>
                  <Tag square size="large" type="primary" @click="openFile(item)">播放</Tag>
                  </Col>
                  <Col>
                  <Tag square size="large" type="primary" @click="viewPictures(item)">查看</Tag>
                  </Col>

                  <Col v-if="isWide">
                  <Tag square size="large" type="warning" @click="getImageList(item.Id)">刮图</Tag>
                  </Col>
                  <Col v-if="isWide">
                  <Tag square size="large" type="danger" @click="deleteFile(item)">删除
                  </Tag>
                  </Col>
                  <Col v-if="isWide">
                  <Tag square size="large" type="primary" @click="showRenameForm(item)">
                    重命名</Tag>
                  </Col>
                  <Col v-if="isWide">
                  <Tag square size="large" type="success" @click="syncFile(item.Id)">同步
                  </Tag>
                  </Col>
                </Row>
              </SwipeCell>
            </div>
          </div>
        </div>
      </SwipeCell>
    </PullRefresh>
    <LoadMoreVue @loadMore="onLoadMore" :more="true" />
  </div>

</template>

<script setup lang="ts">
import {
  AddTag,
  CloseTag,
  DeleteFile,
  DownImageList,
  FileRename,
  QueryDirImageBase64,
  QueryFileList,
  RefreshIndex,
  SyncFileInfo
} from "@/api/file";
import { GetSettingInfo } from "@/api/setting";
import { ResultList } from "@/config/ResultModel";
import { useSystemProperty } from "@/store/System";
import { getFileStream, getJpg, getPng, getTempImage } from "@/utils/ImageUtils";
import { useWindowSize ,useFullscreen} from "@vueuse/core";


import {
  Dialog,
  ActionSheet,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  Icon,
  Image,
  ImagePreview,
  NavBar,
  PullRefresh,
  Row,
  Search,
  Sticky,
  SwipeCell,
  Field,
  Tag,
  Toast,
  RadioGroup,
  Radio,
} from "vant";
import "vant/lib/index.css";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { MovieModel, MovieQuery } from "../fileList";
import { formMovieTypeChange, volumechange } from "../fileList/fileList";
import { SettingInfo } from "../settting";
import MobileBar from './MobileBar.vue'
import LoadMoreVue from "./LoadMore.vue";


const systemProperty = useSystemProperty()
const title = ref("总数")
const { width } = useWindowSize();
const isWide = computed(() => {
  return width.value > 600;
});
const loadingList = ref(false);
const finished = ref(false);
const isPlaying = ref(false);
const refreshing = ref(false);
const showRename = ref(false);
const pagePress = ref(null);

const element = document.documentElement
const isFullscreen = computed(() => { return systemProperty.isFullscreen })
const changeScreen = () => {
  if (isFullscreen.value) {
    if (element.requestFullscreen && element.requestFullscreen) {
      document.exitFullscreen()
    }
  } else {
    element.requestFullscreen()
  }
  systemProperty.isFullscreen = !systemProperty.isFullscreen
}


const view = reactive({
  settingInfo: new SettingInfo(),
  playlist: [],
  queryParam: {
    Page: 1,
    PageSize: 30,
    SortField: "MTime",
    SortType: "desc",
    MovieType: "",
    Keyword: "",
  } as unknown as MovieQuery,
  loadCnt: 0,
  ModelList: [],
  TotalCnt: 0,
  ResultCnt: 0,
  videoVisible: false,
  videoPlay: false,
  currentFile: new MovieModel(),
  newTag: '',
  imageList: [],
});

const options = reactive({
  width: "100%", //播放器高度
  height: 'auto', //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "http://192.168.3.38:8083/api/file/F~emby~emby-rename~井川ゆい柳田やよい~YeLLOW~[川い田よ]EO29人中しンィスッン 川い柳やい~[川い田よ][L-8]妻出パテートキグ井ゆ 田よ{骑}誘丝mv[川い田よ][L-8]妻出パテートキグ井ゆ 田よ{骑}誘丝mv", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: systemProperty.videoOptions.autoPlay, //自动播放
  loop: true, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: systemProperty.videoOptions.volume, //默认音量大小
  control: true, //是否显示控制
  controlBtns: systemProperty.videoOptions.controlBtns, //显示所有按钮,
});

watch(loadingList, () => {
  // console.log("loadingListWatch", loadingList.value);
});
watch(finished, () => {
  // console.log("finished", finished.value);
});

const showSearch = ref(false);
const showTag = ref(false);

const isTransform = ref(false);

const tagManage = (item: MovieModel) => {
  showTag.value = true
  view.currentFile = item

}

const refreshIndex = async () => {
  await RefreshIndex()
  await onSearch()
  showRename.value = false
}

const renameFile = async () => {
  const item = view.currentFile
  const { Code, Actress, Name } = item
  item.Name = "[" + Actress + "][" + Code + "]" + Name;
  const res = await FileRename(item)
  if (res.Code == 200) {
    Toast.success('操作成功')
    await onSearch()
    showRename.value = false
  } else {
    Toast.fail(res.Message)
  }
}
const syncFile = async (id: string) => {
  const res = await SyncFileInfo(id)
  if (res.Code == 200) {
    Toast.success('操作成功')
    await onSearch()
    showTag.value = false
  } else {
    Toast.fail(res.Message)
  }
}

const showRenameForm = (item: MovieModel) => {
  view.currentFile = item
  showRename.value = true;

}

const deleteFile = async (item: MovieModel) => {
  Dialog.confirm({
    title: "确认删除？",
    message: item.Name
  }).then(async () => {
    const res = await DeleteFile(item.Id)
    if (res.Code == 200) {
      Toast.success('操作成功')
      await onSearch()
      showTag.value = false
    } else {
      Toast.fail(res.Message)
    }
  }).catch(() => {
    Toast.fail("取消删除")
  })

}


const removeCurrentFileTag = async (tag: string) => {
  const res = await CloseTag(view.currentFile.Id, tag)
  if (res.Code == 200) {
    Toast.success('操作成功')
    await queryList();
    showTag.value = false
  } else {
    Toast.fail(res.Message)
  }
}


const addCurrentFileTag = async (tag: string) => {
  const res = await AddTag(view.currentFile.Id, tag)
  if (res.Code == 200) {
    Toast.success('操作成功')
    // await RefreshIndex()
    await queryList();
    showTag.value = false
  } else {
    Toast.fail(res.Message)
  }
}

// const transformThis = () => {
//   const videoDiv = document.getElementById("videoDiv");
//   videoDiv.style.position = "fixed";
//   videoDiv.style.width = "100vw";
//   videoDiv.style.height = "100vh";
//   if (isTransform.value) {
//     videoDiv.style.transform = "rotate(90deg)";
//   } else {
//     videoDiv.style.transform = "rotate(0deg)";
//   }
//   isTransform.value = !isTransform.value;
// };

const loadSettingInfo = async () => {
  const res = await GetSettingInfo();
  if (res) {
    view.settingInfo = { ...res };
  }
};

const onLoadMore = async () => {
  view.queryParam.Page += 1;
  await queryList(true);
};

const searchKeyword = (words: string) => {
  view.queryParam.Keyword = words;
  view.queryParam.Page = 1;
  onSearch();
};
const viewPic = ref(false);


const getImageList = async (Id: string) => {
  const res = await DownImageList(Id);
  if (res.Code === 200) {
    Toast.success(res.Message);
  } else {
    Toast.fail(res.Message);
  }
};

const previewPictures = async (item) => {
  const toast = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: false, // 禁用背景点击
    loadingType: "spinner",
    message: "加载中...",
  });
  setTimeout(() => {
    toast.clear();
  }, 3000);
  await loadDirInfo(item.Id);
  toast.clear();

  if (view.imageList && view.imageList.length > 0) {
    ImagePreview({ images: view.imageList, closeable: true });
  } else {
    Toast.fail("无图");
  }
};
const viewPictures = async (item) => {
  const toast = Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: false, // 禁用背景点击
    loadingType: "spinner",
    message: "加载中...",
  });
  setTimeout(() => {
    toast.clear();
  }, 3000);
  await loadDirInfo(item.Id);
  toast.clear();
  if (view.imageList && view.imageList.length > 0) {
    viewPic.value = true;
  } else {
    Toast.fail("无图");
  }
};
const closeViewPicture = () => {
  viewPic.value = false;
};

const loadDirInfo = async (id: string) => {
  const res = await QueryDirImageBase64(id);
  if (res && res.length > 0) {
    view.imageList = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].FileType == "jpg" || res[i].FileType == "png") {
        // view.imageList.push(res[i].ImageBase);
        view.imageList.push(getTempImage(res[i].Id));
      }
    }
  }
};



const hiddenPlayVideo = () => {
  view.videoVisible = false;
};

const closePlayVideo = () => {
  view.videoVisible = false;
  view.videoPlay = false;
  options.src = null;
  isPlaying.value = false;
};

const playSource = async (item) => {
  const stream = getFileStream(item.Id);
  options.title = item.Name;
  options.src = stream;

  const palyParam = {
    ...view.queryParam,
    PageSize: 1000,
    Page: 1,
    Keyword: item.Actress
  }
  const res = await QueryFileList(palyParam)
  const model = res as unknown as ResultList;
  view.playlist = []
  view.playlist = [...view.playlist, ...model.Data]
}

const openFile = (item: any) => {
  view.videoVisible = false;
  view.videoPlay = true;
  view.currentFile = item;
  isPlaying.value = true;
  view.videoVisible = true;
  playSource(item)
};
const queryList = async (concat?: boolean, pageStart?: number) => {
  let queryParam = { ...view.queryParam };
  if (pageStart > 0) {
    queryParam.Page = pageStart;
    queryParam.PageSize = 1;
  }
  const { Keyword } = queryParam
  if (Keyword) {
    title.value = "搜索中..."
  } else {
    title.value = "文件"
  }
  systemProperty.syncSearchParam(queryParam);
  const res = await QueryFileList(queryParam);
  const model = res as unknown as ResultList;
  if (!model.Data || model.Data.length == 0) {
    finished.value = false;
    return;
  }
  model.Data.map((item) => {
    if (item.Code == item.Actress) {
      item.Code = "";
      item.Actress = "";
    }
    if (item.Code.lastIndexOf("-") == item.Code.length - 1) {
      item.Code = item.Code.substring(0, item.Code.length - 1);
    }
    item.originName = item.Name.trim();
    item.Name = item.Name.replace("[" + item.Code + "]", "");
    item.Name = item.Name.replace("[" + item.Actress + "]", "");
  });

  if (concat) {
    const newList = [...view.ModelList, ...model.Data];
    view.ModelList = newList;
  } else {
    view.ModelList = model.Data;
  }

  view.TotalCnt = model.TotalCnt;
  view.ResultCnt = model.ResultCnt;
  view.loadCnt = view.loadCnt + model.Data.length;
  refreshing.value = false;
  loadingList.value = false;
};

const onSearch = async (clear?: Boolean) => {
  view.queryParam.Page = 1;
  view.ModelList = [];
  view.loadCnt = 0;
  await queryList(false);
};
const onCancel = async () => {
  await onSearch(false);
};
const keywordUpdate = () => {
  if (view.queryParam.Keyword.length >= 2 || view.queryParam.Keyword.length == 0) {
    view.queryParam.Page = 1;
    onSearch();
  }
};
const initQuery = () => {
  const systemProperty = useSystemProperty()
  if (systemProperty.getSearchParam.Keyword) {
    view.queryParam.Keyword = systemProperty.getSearchParam.Keyword
    view.queryParam.MovieType = systemProperty.getSearchParam.MovieType
    view.queryParam.Page = 1
  }


}
onMounted(() => {
  initQuery()
  onSearch();
  options.src = null;
  // transformThis();
  loadSettingInfo();
});

const MovieTypeOptions = [
  { value: "", text: "全部" },
  { value: "骑兵", text: "骑兵" },
  { value: "步兵", text: "步兵" },
  { value: "斯巴达", text: "斯巴达" },
  { value: "国产", text: "国产" },
];
const SortFieldOptions = [
  { value: "MTime", text: "时间倒排" },
  { value: "Name", text: "名称倒排" },
  { value: "Size", text: "大小倒排" },
];
const SortTypeOptions = [
  { value: "desc", text: "倒排" },
  { value: "asc", text: "正排" },
];
</script>
<style>
.mainBody {
  width: 100%;
  position: absolute;
  display: block;
  overflow: auto;
}

.mlist {
  float: none;
  z-index: 99;
  width: 100%;
}

.van-field__value {
  border: dotted;
  border-radius: 2px;
}
</style>
