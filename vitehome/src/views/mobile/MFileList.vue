<template>
  <div ref="pagePress" class="mainBody" v-show="mainBody">
    <NavBar :title="title">
      <template #left>
        <div>
          <span @click="loadRefreshIndex" style="color: blue"
            >总数:{{ view.ResultCnt }}</span
          >
          <Switch size="18px" v-model="easyMode" @change="easyModeChange" />
        </div>
      </template>
      <template #right>
        <div
          @click="
            view.queryParam.Page = 1;
            PageNum = 1;
            showSearch = true;
          "
        >
          <Icon name="search" size="18" />
          <span> {{ view.queryParam.Keyword }} </span>
        </div>
        <Icon
          v-if="view.queryParam.Keyword"
          name="revoke"
          @click="
            view.queryParam.Keyword = '';
            onSearch();
          "
        />
      </template>
    </NavBar>
    <ActionSheet
      v-model:show="showSearch"
      title="搜索"
      :close-on-click-overlay="true"
      style="max-height: 60vh"
    >
      <Search
        v-model="view.queryParam.Keyword"
        placeholder="请输入搜索"
        @search="onSearch"
        label="关键词"
        show-action
        @update:model-value="keywordUpdate"
        @cancel="onCancel"
        input-align="center"
      >
        <template #action>
          <div @click="onCancel" style="margin: 2px 4px">搜索</div>
        </template>
      </Search>
      <div style="margin-bottom: 0vh">
        <Button
          type="warning"
          v-for="tag in view.settingInfo.Tags"
          :key="tag"
          style="margin: 1px 2px"
          size="normal"
          @click="
            searchKeyword(tag);
            showSearch = false;
          "
        >
          {{ tag }}
        </Button>
      </div>
    </ActionSheet>
    <ActionSheet
      v-model:show="showTag"
      title="标签管理"
      :close-on-click-overlay="true"
      style="height: 60vh"
    >
      <div style="margin: 1rem">
        <Row>
          <Col>当前标签</Col>
          <Col>
            <Tag
              type="success"
              size="large"
              style="margin: 2px 4px"
              v-for="ta in view.currentFile.Tags"
              :key="ta"
              closeable
              @close="removeCurrentFileTag(ta)"
              >{{ ta }}</Tag
            >
          </Col>
        </Row>
      </div>
      <div style="margin: 1rem">
        <Row justify="space-around">
          <Col>可选标签</Col>
        </Row>
        <Row>
          <Col>
            <Tag
              type="success"
              size="large"
              style="margin: 2px 4px"
              v-for="ta in view.settingInfo.Tags"
              :key="ta"
              @click="addCurrentFileTag(ta)"
              >{{ ta }}</Tag
            >
          </Col>
        </Row>
      </div>
    </ActionSheet>
    <ActionSheet
      v-model:show="showRename"
      title="重命名"
      :close-on-click-overlay="true"
      style="height: 60vh"
    >
      <div style="margin-bottom: 0vh">
        <Row>
          <Col :span="6"> 类型 </Col>
          <Col :span="18">
            <RadioGroup
              v-model="view.currentFile.MovieType"
              @change="formMovieTypeChange(view)"
              direction="horizontal"
            >
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
            <Field
              label="编码"
              style="width: 100%"
              v-model="view.currentFile.Code"
            >
            </Field>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <Field
              label="图鉴"
              style="width: 100%"
              v-model="view.currentFile.Actress"
            >
            </Field>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <Field
              label="名称"
              rows="5"
              style="width: 100%"
              autosize
              type="textarea"
              v-model="view.currentFile.Name"
            >
            </Field>
          </Col>
        </Row>
        <Row>
          <Button
            style="margin: 4px auto"
            size="large"
            type="primary"
            @click="renameFile"
            >提交</Button
          >
        </Row>
      </div>
    </ActionSheet>

    <MobileBar></MobileBar>
    <teleport to="body">
      <div v-show="view.videoVisible" class="videoDiv" id="videoDiv">
        <div class="videoRow">
          <div class="videoDesc">
            <vue3VideoPlay
              :poster="getJpg(view.currentFile.Id)"
              ref="vue3VideoPlayRef"
              style="width: 98vw; height: auto; object-fit: fill; padding: 1vh"
              x5-video-player-type="h5"
              openFilex5-video-player-fullscreen="true"
              x5-video-orientation="landscape"
              v-bind="options"
              @volumechange="volumechange"
              @play="onPlay"
            />
            <div class="videoDivRowButton">
              <ElButton type="primary" @click="hiddenPlayVideo">隐藏</ElButton>
              <ElButton type="primary" @click="closePlayVideo">关闭</ElButton>
              <ElButton type="primary" @click="togglePlay">停/播</ElButton>
            </div>
            <Row>
              <Col :span="12">
                <a
                  @click="
                    searchKeyword(view.currentFile.Actress);
                    hiddenPlayVideo();
                  "
                  >{{ view.currentFile.Actress?.substring(0, 4) }}
                </a></Col
              >
              <Col :span="12"> {{ view.currentFile.Code }}</Col>
            </Row>
            <Row style="max-height: 2rem; overflow: hidden">
              {{ view.currentFile.Name }}</Row
            >
          </div>
          <div class="videoDivRowRelations">
            <Image
              class="videoDivRowImg"
              v-for="relaPlay in view.playlist"
              :src="getPng(relaPlay.Id)"
              @click="openFile(relaPlay)"
            />
          </div>
        </div>
      </div>
    </teleport>
    <teleport to="body">
      <div v-show="viewPic" class="viewPic">
        <div class="viewPicButton">
          <Button type="primary" @click="closeViewPicture">关闭</Button>
        </div>
        <div
          v-for="(item, index) in view.imageList"
          :key="index"
          class="viewPicItem"
        >
          <ElImage class="viewPicImg" :src="item">
            @click.stop="innerVisibleFalse"
          </ElImage>
        </div>
      </div>
    </teleport>

    <Sticky v-if="isPlaying" :offsetTop="520" style="left: 450px; width: 400px">
      <Button
        size="normal"
        type="success"
        @click="
          () => {
            view.videoVisible = true;
          }
        "
      >
        正在播放：
        {{ view.currentFile?.Code || view.currentFile?.Actress || "无" }}
        <Button
          size="normal"
          type="success"
          :loading="true"
          loading-type="spinner"
        ></Button>
      </Button>
      <Button size="normal" type="danger" @click="closePlayVideo"
        >停止播放</Button
      >
    </Sticky>
    <DropdownMenu>
      <DropdownItem
        v-model="view.queryParam.MovieType"
        :options="MovieTypeOptions"
        @change="onSearch"
      >
      </DropdownItem>
      <DropdownItem
        v-model="view.queryParam.SortField"
        :options="SortFieldOptions"
        @change="onSearch"
      >
      </DropdownItem>
      <DropdownItem
        v-model="view.queryParam.SortType"
        :options="SortTypeOptions"
        @change="onSearch"
      >
      </DropdownItem>
    </DropdownMenu>

    <div class="container" ref="loadRef">
      <div v-if="easyMode" class="easyMode">
        <div v-for="item in view.ModelList" class="easyModeItem">
          <Image
            :alt="item.Name"
            class="easyModeImg"
            :src="getPng(item.Id)"
            @click="openFile(item)"
          >
            <template v-slot:error>加载失败</template>
            <template v-slot:loading>
              <Loading type="spinner" size="20" />
            </template>
          </Image>
        </div>
      </div>
      <div
        v-if="!easyMode"
        v-for="item in view.ModelList"
        :key="item.Id"
        class="listMode"
      >
        <div class="listModeItem">
          <div class="listModeLeft">
            <Image
              class="listModeImg"
              :src="isWide ? getJpg(item.Id) : getPng(item.Id)"
              @click="previewPictures(item)"
              :style="{ width: isWide ? '100%' : 'auto' }"
            >
            </Image>
          </div>
        </div>
        <SwipeCell>
          <div class="listModeRight">
            <div style="margin: 1px auto">
              <Row
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-around;
                "
              >
                <Col>
                  <Tag color="#7232dd"> {{ item.MovieType }}</Tag>
                </Col>
                <Col v-if="item.Actress?.length > 0">
                  <a @click="searchKeyword(item.Actress)"
                    >{{ item.Actress?.substring(0, 4) }}
                  </a>
                </Col>
                <Col v-if="item.Code?.length > 0">
                  <span>{{ item.Code }}</span>
                </Col>
              </Row>

              <Row class="listModeRightTag">
                <Tag
                  v-for="tag in item.Tags"
                  plain
                  type="danger"
                  @click="searchKeyword(tag)"
                  >{{ tag }}</Tag
                >
              </Row>
              <Row class="listModeItemContent">
                <span>【{{ item.SizeStr }}】 </span
                ><span> 【{{ item.Name }}】</span>
              </Row>
              <Row justify="space-around">
                <Col>
                  <Tag
                    square
                    size="large"
                    type="success"
                    @click="tagManage(item)"
                    >标签</Tag
                  >
                </Col>
                <Col>
                  <Tag
                    square
                    size="large"
                    type="primary"
                    @click="openFile(item)"
                    >播放</Tag
                  >
                </Col>
                <Col>
                  <Tag
                    square
                    size="large"
                    type="primary"
                    @click="viewPictures(item)"
                    >查看</Tag
                  >
                </Col>
                <Col v-if="isWide">
                  <Tag
                    square
                    size="large"
                    type="warning"
                    @click="getImageList(item.Id)"
                    >刮图</Tag
                  >
                </Col>
                <Col v-if="isWide">
                  <Tag
                    square
                    size="large"
                    type="danger"
                    @click="deleteFile(item)"
                    >删除
                  </Tag>
                </Col>
                <Col v-if="isWide">
                  <Tag
                    square
                    size="large"
                    type="primary"
                    @click="showRenameForm(item)"
                  >
                    重命名</Tag
                  >
                </Col>
                <Col v-if="isWide">
                  <Tag
                    square
                    size="large"
                    type="success"
                    @click="syncFile(item.Id)"
                    >同步
                  </Tag>
                </Col>
              </Row>
            </div>
          </div>
          <template #right>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin: 10px 10px;
              "
            >
              <Tag square size="large" type="danger" @click="deleteFile(item)"
                >删除
              </Tag>
              <Tag
                square
                size="large"
                type="primary"
                @click="showRenameForm(item)"
              >
                重命名</Tag
              >
              <Tag square size="large" type="success" @click="syncFile(item.Id)"
                >同步
              </Tag>
              <Tag
                square
                size="large"
                type="warning"
                @click="getImageList(item.Id)"
                >刮图</Tag
              >
            </div>
          </template>
        </SwipeCell>
      </div>
      <Pagination
        class="pageTools"
        v-model="PageNum"
        :total-items="view.TotalCnt"
        mode="simple"
        :items-per-page="view.queryParam.PageSize"
        @change="pageChange"
      >
      </Pagination>
      <LoadMoreVue @loadMore="onLoadMore" :more="loadMoreFlag" />
    </div>
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
  SyncFileInfo,
} from "@/api/file";
import { GetSettingInfo } from "@/api/setting";
import { ResultList } from "@/config/ResultModel";
import { useSystemProperty } from "@/store/System";
import {
  getFileStream,
  getJpg,
  getPng,
  getTempImage,
} from "@/utils/ImageUtils";
import {
  showConfirmDialog,
  ActionSheet,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  Image,
  showImagePreview,
  NavBar,
  Loading,
  Pagination,
  Row,
  Search,
  Sticky,
  SwipeCell,
  Field,
  Tag,
  showSuccessToast,
  showFailToast,
  showLoadingToast,
  RadioGroup,
  Icon,
  Radio,
  Switch,
} from "vant";
import "vant/lib/index.css";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { MovieModel, MovieQuery } from "../fileList";
import { formMovieTypeChange, volumechange } from "../fileList/fileList";
import { SettingInfo } from "../settting";
import MobileBar from "./MobileBar.vue";
import LoadMoreVue from "./LoadMore.vue";
import { useWindowSize, useWindowScroll } from "@vueuse/core";
import { useRoute } from "vue-router";
const { query } = useRoute();

const systemProperty = useSystemProperty();
const title = ref("总数");
const { width } = useWindowSize();
const isWide = computed(() => {
  return width.value > 600;
});
const mainBody = ref(true);
const easyMode = ref(false);
const finished = ref(false);
const isPlaying = ref(false);
const refreshing = ref(false);
const showRename = ref(false);
const pagePress = ref(null);
const loadMoreFlag = ref(false);
const vue3VideoPlayRef = ref(null);

const loadRef = ref();
const { y } = useWindowScroll();

const PageNum = ref(1);
const view = reactive({
  settingInfo: new SettingInfo(),
  playlist: [],
  queryParam: {
    Page: 1,
    PageSize: 10,
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
  newTag: "",
  imageList: [],
});

const options = reactive({
  width: "100%", //播放器高度
  height: "auto", //播放器高度
  color: "#409eff", //主题色
  title: "123", //视频名称
  src: null, //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: true, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: systemProperty.videoOptions.volume, //默认音量大小
  control: true, //是否显示控制
  currentTime: 30, //是否显示控制
  controlBtns: systemProperty.videoOptions.controlBtns, //显示所有按钮,
});

watch(finished, () => {
  // console.log("finished", finished.value);
});

const showSearch = ref(false);
const showTag = ref(false);

const tagManage = (item: MovieModel) => {
  showTag.value = true;
  view.currentFile = item;
};

const loadRefreshIndex = async () => {
  showRename.value = false;
  await RefreshIndex();
  const url = window.location.href;
  const newUrl = url.substring(0, url.indexOf("?"));
  window.location.href = newUrl + `?y=${y.value}`;
};

const easyModeChange = (e) => {
  if (e) {
    view.queryParam.PageSize = 30;
    queryList();
  } else {
    view.queryParam.PageSize = 10;
  }
};

const pageChange = async (idx) => {
  view.queryParam.Page = idx;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  view.ModelList = [];
  queryList();
};

const renameFile = async () => {
  const item = view.currentFile;
  const { Code, Actress, Name } = item;
  item.Name = "[" + Actress + "][" + Code + "]" + Name;
  const res = await FileRename(item);
  if (res.Code == 200) {
    showSuccessToast("操作成功");
    showRename.value = false;
    await loadRefreshIndex();
  } else {
    showFailToast(res.Message);
  }
};
const syncFile = async (id: string) => {
  const res = await SyncFileInfo(id);
  if (res.Code == 200) {
    showSuccessToast("操作成功");
    await queryList();
    showTag.value = false;
  } else {
    showFailToast(res.Message);
  }
};

const showRenameForm = (item: MovieModel) => {
  view.currentFile = item;
  showRename.value = true;
};

const deleteFile = async (item: MovieModel) => {
  showConfirmDialog({
    title: "确认删除？",
    message: item.Name,
  })
    .then(async () => {
      const res = await DeleteFile(item.Id);
      if (res.Code == 200) {
        showSuccessToast("操作成功");
        await queryList();
        showTag.value = false;
      } else {
        showFailToast(res.Message);
      }
    })
    .catch(() => {
      showFailToast("取消删除");
    });
};

const removeCurrentFileTag = async (tag: string) => {
  const res = await CloseTag(view.currentFile.Id, tag);
  if (res.Code == 200) {
    showSuccessToast("操作成功");
    showTag.value = false;
    await loadRefreshIndex();
  } else {
    showFailToast(res.Message);
  }
};

const addCurrentFileTag = async (tag: string) => {
  const res = await AddTag(view.currentFile.Id, tag);
  if (res.Code == 200) {
    showSuccessToast("操作成功");
    showTag.value = false;
    await loadRefreshIndex();
  } else {
    showFailToast(res.Message);
  }
};

const loadSettingInfo = async () => {
  const res = await GetSettingInfo();
  if (res) {
    view.settingInfo = { ...res };
  }
};

const onLoadMore = async () => {
  view.queryParam.Page += 1;
  PageNum.value = view.queryParam.Page;
  await queryList(true);
};

const searchKeyword = (words: string) => {
  view.queryParam.Keyword = words;
  view.queryParam.Page = 1;
  PageNum.value = view.queryParam.Page;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  onSearch();
};
const viewPic = ref(false);

const getImageList = async (Id: string) => {
  const res = await DownImageList(Id);
  if (res.Code === 200) {
    showSuccessToast(res.Message);
  } else {
    showFailToast(res.Message);
  }
};

const previewPictures = async (item) => {
  const toast = showLoadingToast({
    duration: 0, // 持续展示 toast
    forbidClick: false, // 禁用背景点击
    loadingType: "spinner",
    message: "加载中...",
  });
  setTimeout(() => {
    toast.close();
  }, 3000);
  await loadDirInfo(item.Id);
  toast.close();

  if (view.imageList && view.imageList.length > 0) {
    const pre = showImagePreview({ images: view.imageList, closeable: true });
    pre.show();
  } else {
    showFailToast("无图");
  }
};
const viewPictures = async (item) => {
  await loadDirInfo(item.Id);
  if (view.imageList && view.imageList.length > 0) {
    viewPic.value = true;
  } else {
    showFailToast("无图");
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
        view.imageList.push(getTempImage(res[i].Id));
      }
    }
  }
};

const hiddenPlayVideo = () => {
  view.videoVisible = false;
  mainBody.value = true;
};

const togglePlay = (last: number) => {
  options.volume = options.volume - 10;
  vue3VideoPlayRef.value.togglePlay();
};

const closePlayVideo = () => {
  view.videoVisible = false;
  view.videoPlay = false;
  options.src = null;
  isPlaying.value = false;
  mainBody.value = true;
};

const onPlay = () => {
  options.muted = false;
};

const playSource = async (item) => {
  const stream = getFileStream(item.Id);
  options.title = item.Actress;
  options.src = stream;
  vue3VideoPlayRef.value.play();
  view.playlist = [];
  const palyParam = {
    ...view.queryParam,
    PageSize: 1000,
    Page: 1,
    Keyword: item.Actress,
  };
  const res = await QueryFileList(palyParam);
  const model = res as unknown as ResultList;
  view.playlist = [...model.Data];
};

const openFile = (item: any) => {
  view.videoVisible = false;
  view.videoPlay = true;
  view.currentFile = item;
  isPlaying.value = true;
  view.videoVisible = true;
  mainBody.value = false;
  playSource(item);
};

const queryList = async (concat?: boolean, pageStart?: number) => {
  let queryParam = { ...view.queryParam };
  if (pageStart > 0) {
    queryParam.Page = pageStart;
    queryParam.PageSize = 1;
    PageNum.value = view.queryParam.Page;
  }
  const { Keyword } = queryParam;
  if (Keyword) {
    title.value = "搜索中...";
  } else {
    title.value = "文件";
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

  if (!concat) {
    view.ModelList = [];
  }
  const newList = [...view.ModelList, ...model.Data];
  view.ModelList = newList;

  view.TotalCnt = model.TotalCnt;
  view.ResultCnt = model.ResultCnt;
  if (model.Data.length === view.queryParam.PageSize) {
    loadMoreFlag.value = true;
  } else {
    loadMoreFlag.value = false;
  }

  view.loadCnt = view.loadCnt + model.Data.length;
  refreshing.value = false;
};

const onSearch = async (clear?: Boolean) => {
  view.ModelList = [];
  view.loadCnt = 0;
  showSearch.value = false;
  await queryList(false);
};

const onCancel = async () => {
  await onSearch(false);
};

const keywordUpdate = () => {
  if (
    view.queryParam.Keyword.length >= 2 ||
    view.queryParam.Keyword.length == 0
  ) {
    view.queryParam.Page = 1;
    PageNum.value = view.queryParam.Page;
    onSearch();
  }
};

const initQuery = () => {
  const systemProperty = useSystemProperty();
  if (systemProperty.getSearchParam) {
    view.queryParam = systemProperty.getSearchParam;
    setTimeout(() => {
      PageNum.value = systemProperty.getSearchParam.Page;
    }, 100);
  }
};

onMounted(() => {
  options.src = null;
  const { y } = query;
  initQuery();
  onSearch().then(() => {
    if (y) {
      setTimeout(() => {
        document.documentElement.scrollTop = Number(y);
      }, 100);
    }
  });

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
<style lang="less">
.mainBody {
  width: 100%;
  position: absolute;
}

.container {
  display: flex;
  flex-direction: column;
  height: auto;
}

.pageTools {
  position: relative;
  width: 100%;
  background-color: blanchedalmond;
}

.van-field__value {
  border: dotted;
  border-radius: 2px;
}

.videoDiv {
  height: 100vh;
  width: 100vw;
}

.videoRow {
  height: 100%;
  width: 100%;
  z-index: 999;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.9);
}

.videoDesc {
  z-index: 99;
  background-color: aliceblue;
  justify-content: space-evenly;
  overflow: hidden;
  border-radius: 1%;
}

.videoColumn {
  height: 100vw;
  width: 100vh;
  z-index: 999;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.9);
  transform: rotate(90deg) translateY(50%);
}

.videoDivRowButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.videoDivRowRelations {
  columns: 2;
  display: flex;
  height: 60vh;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
}

.videoDivRowImg {
  height: auto;
  width: 10rem;
  margin: auto;
  border-radius: 5%;
  overflow: hidden;
  padding: 0px;
  margin: 4px;
  border: rgb(228, 177, 110) 2px dotted;
}

.listMode {
  width: 96vw;
  float: left;
  height: 12rem;
  margin: 6px 8px;
  display: flex;
  box-shadow: 0 0 4px grey;
  padding: 4px;
}

.listModeItem {
  border-radius: 8%;
  width: 40vw;
  max-width: 610px;
}

.listModeLeft {
  max-width: 350px;
  min-width: 122px;
  height: 100%;
  width: auto;
  overflow: hidden;
}

.listModeImg {
  padding: 2px;
  height: 100%;
  min-height: 3rem;
  width: auto;
  border: 1px dotted rgb(251, 228, 232);
}

.listModeRight {
  width: 55vw;
  margin: 8px auto;
  float: right;
}

.listModeRightTag {
  max-height: 32px;
  overflow: hidden;
}

.listModeItemContent {
  overflow: hidden;
  margin: 1px auto;
  font-size: 12px;
  color: gray;
  max-height: 7rem;
}

.easyMode {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.easyModeItem {
  display: flex;
  margin: 4px;
  border: dotted rgb(244, 146, 146) 2px;
  border-radius: 4px;
  width: 12rem;
  max-width: 46%;
  overflow: hidden;
  height: auto;
}

.easyModeImg {
  min-width: 4rem;
}

.viewPic {
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0px;
  bottom: 0px;
  position: fixed;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  min-height: 1200px;
}

.viewPicButton {
  right: 1rem;
  top: 20px;
  height: 2rem;
  position: fixed;
  z-index: 999;
}

.viewPicItem {
  display: flex;
  margin: 1px auto;
}

.viewPicImg {
  width: 100%;
  margin: 0 auto;
  opacity: 9;
  z-index: 99;
}
</style>
