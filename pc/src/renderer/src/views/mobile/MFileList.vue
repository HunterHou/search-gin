<template>
  <div v-show="mainBody" ref="pagePress" class="mainBody">
    <NavBar :title="title">
      <template #left>
        <div>
          <span style="color: blue" @click="loadRefreshIndex">总数:{{ view.ResultCnt }}</span>
        </div>
      </template>
      <template #right>
        <div
          @click="
            view.queryParam.Page = 1
            PageNum = 1
            showSearch = true
          "
        >
          <Icon name="search" size="18" />
          <span style="width: 10rem; overflow: hidden">
            {{ view.queryParam.Keyword }}
          </span>
        </div>
        <Icon
          v-if="view.queryParam.Keyword"
          name="revoke"
          @click="
            view.queryParam.Keyword = ''
            onSearch()
          "
        />
      </template>
    </NavBar>
    <ActionSheet
      v-model:show="showSearch"
      title="搜索"
      :close-on-click-overlay="true"
      style="height: 70vh; background-color: white"
    >
      <Search
        v-model="view.queryParam.Keyword"
        placeholder="请输入搜索"
        show-action
        input-align="center"
        @search="onSearch"
        @update:model-value="keywordUpdate"
        @cancel="onCancel"
      >
        <template #action>
          <Button type="primary" plain style="width: 4rem" @click="onCancel">搜索</Button>
        </template>
      </Search>
      <div style="margin-bottom: 0vh">
        <Tag
          v-for="tag in view.settingInfo.Tags"
          :key="tag"
          type="success"
          style="margin: 1px 2px; font-size: 18px"
          size="large"
          @click="
            searchKeyword(tag)
            showSearch = false
          "
        >
          {{ tag }}
        </Tag>
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
              v-for="ta in view.currentFile.Tags"
              :key="ta"
              type="success"
              size="large"
              style="margin: 2px 4px"
              closeable
              @close="removeCurrentFileTag(ta)"
              >{{ ta }}</Tag
            >
          </Col>
        </Row>
      </div>
      <div style="margin: 1rem">
        <Row>
          <Col>可选标签</Col>
        </Row>
        <Row justify="space-around">
          <Col>
            <Tag
              v-for="ta in view.settingInfo.Tags"
              :key="ta"
              type="success"
              size="large"
              style="margin: 2px 4px"
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
              direction="horizontal"
              @change="formMovieTypeChange(view)"
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
            <Field v-model="view.currentFile.Code" label="编码" style="width: 100%"> </Field>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <Field v-model="view.currentFile.Actress" label="图鉴" style="width: 100%"> </Field>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <Field
              v-model="view.currentFile.Name"
              label="名称"
              rows="5"
              style="width: 100%"
              autosize
              type="textarea"
            >
            </Field>
          </Col>
        </Row>
        <Row>
          <Button style="margin: 4px auto" size="large" type="primary" @click="renameFile"
            >提交</Button
          >
        </Row>
      </div>
    </ActionSheet>

    <MobileBar></MobileBar>
    <teleport to="body">
      <div v-show="view.videoVisible" id="videoDiv" class="videoDiv">
        <div class="videoRow">
          <div class="videoDesc">
            <Row :span="22" style="max-height: 3rem; overflow: hidden">
              <Col>{{ view.currentFile.Name }}</Col>
            </Row>
            <vue3VideoPlay
              ref="vue3VideoPlayRef"
              :poster="getJpg(view.currentFile.Id)"
              style="width: 98vw; height: auto; object-fit: fill; padding: 1vh"
              x5-video-player-type="h5"
              open-filex5-video-player-fullscreen="true"
              x5-video-orientation="landscape"
              v-bind="options"
              @volumechange="volumechangeThis"
            />
            <div class="videoDivRowButton">
              <ElButton type="primary" @click="hiddenPlayVideo">隐藏</ElButton>
              <ElButton type="primary" @click="togglePlay">停/播</ElButton>
              <ElButton type="primary" @click="thisDelete(view.currentFile)">删除</ElButton>
              <ElButton type="primary" @click="closePlayVideo">关闭</ElButton>
            </div>

            <Row>
              <Col :span="8">
                <a
                  @click="
                    searchKeyword(view.currentFile.Actress)
                    playListQuery(view.currentFile.Actress)
                  "
                  >{{ view.currentFile.Actress?.substring(0, 4) }}
                </a></Col
              >
              <Col :span="8"> {{ view.currentFile.Code }}</Col>
              <Col :span="8"> {{ view.currentFile.SizeStr }}</Col>
            </Row>
            <Tag
              v-for="tag in view.currentFile.Tags"
              plain
              size="large"
              type="danger"
              @click="playListQuery(tag)"
              >{{ tag }}</Tag
            >
            <Tag plain size="large" type="default" @click="moreTags = !moreTags">更多</Tag>
            <Row v-if="moreTags">
              <Col>
                <Tag
                  v-for="ta in view.settingInfo.Tags"
                  :key="ta"
                  type="success"
                  size="large"
                  style="margin: 2px 4px"
                  @click="playListQuery(ta)"
                  >{{ ta }}</Tag
                >
              </Col>
            </Row>
          </div>
          <div class="videoDivRowRelations">
            <Image
              v-for="relaPlay in view.playlist"
              class="videoDivRowImg"
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
        <div v-for="(item, index) in view.imageList" :key="index" class="viewPicItem">
          <ElImage class="viewPicImg" :src="item"> @click.stop="innerVisibleFalse" </ElImage>
        </div>
      </div>
    </teleport>

    <Sticky v-if="isPlaying" :offset-top="520" style="left: 450px; width: 400px">
      <Button
        size="normal"
        type="success"
        @click="
          () => {
            view.videoVisible = true
          }
        "
      >
        正在播放：
        {{ view.currentFile?.Code || view.currentFile?.Actress || '无' }}
        <Button size="normal" type="success" :loading="true" loading-type="spinner"></Button>
      </Button>
      <Button size="normal" type="danger" @click="closePlayVideo">停止播放</Button>
    </Sticky>

    <BackTop right="15vw" bottom="10vh" />

    <div ref="loadRef" class="container">
      <div v-if="easyMode" class="easyMode">
        <div v-for="item in view.ModelList" class="easyModeItem">
          <div class="easyModeText">{{ item.Code || item.Name }}</div>
          <Image
            :alt="item.Name"
            class="easyModeImg"
            :src="getPng(item.Id)"
            @click="openFile(item)"
          >
          </Image>
        </div>
      </div>
      <div v-for="item in view.ModelList" v-if="!easyMode" :key="item.Id" class="listMode">
        <div class="listModeItem">
          <div class="listModeLeft">
            <Image
              class="listModeImg"
              :src="isWide ? getJpg(item.Id) : getPng(item.Id)"
              :style="{ width: isWide ? '100%' : 'auto' }"
              @click="previewPictures(item)"
            >
              <template #error>加载失败</template>
            </Image>
          </div>

          <div class="imageCover">
            <SwipeCell>
              <div class="imageCoverTool">
                <Tag size="large" type="primary" @click="openFile(item)">播放</Tag>
                <Tag square size="large" type="primary" @click="viewPictures(item)">查看</Tag>
                <Tag square size="large" type="success" @click="tagManage(item)">标签</Tag>

                <Tag square size="large" type="warning" @click="getImageList(item.Id)">刮图</Tag>

                <Tag square size="large" type="primary" @click="showRenameForm(item)"> 重命名</Tag>
                <Tag
                  v-if="item.FileType !== 'mp4'"
                  square
                  size="large"
                  type="primary"
                  @click="TransferToMp4(item.Id)"
                >
                  转MP4</Tag
                >
                <Tag
                  v-if="isWide"
                  square
                  class="mr1"
                  size="large"
                  type="danger"
                  @click="deleteFile(item)"
                  >删除
                </Tag>
                <Tag
                  v-if="isWide"
                  square
                  class="mr1"
                  size="large"
                  type="success"
                  @click="syncFile(item.Id)"
                  >同步
                </Tag>
              </div>

              <template #right>
                <div class="imageCoverToolRight">
                  <Tag square class="mr1" size="large" type="danger" @click="deleteFile(item)"
                    >删除
                  </Tag>
                  <Tag square class="mr1" size="large" type="success" @click="syncFile(item.Id)"
                    >同步
                  </Tag>
                </div>
              </template>
            </SwipeCell>
          </div>
        </div>
        <div class="listModeRight">
          <div style="margin: 1px auto">
            <Row style="display: flex; flex-direction: row; justify-content: space-around">
              <Col>
                <Tag color="#7232dd"> {{ item.MovieType }}</Tag>
              </Col>
              <Col v-if="item.Actress?.length > 0">
                <a @click="searchKeyword(item.Actress)">{{ item.Actress?.substring(0, 4) }} </a>
              </Col>
              <Col v-if="item.Code?.length > 0">
                <span>{{ item.Code }}</span>
              </Col>
            </Row>

            <Row class="listModeRightTag">
              <Tag v-for="tag in item.Tags" plain type="danger" @click="searchKeyword(tag)">{{
                tag
              }}</Tag>
            </Row>
            <Row class="listModeItemContent">
              <span>【{{ item.SizeStr }}】 </span><span> 【{{ item.Name }}】</span>
            </Row>
            <Row justify="space-around"> </Row>
          </div>
        </div>
      </div>
      <LoadMoreVue :more="loadMoreFlag" @loadMore="onLoadMore" />
    </div>
    <Popup
      v-model:show="showPopover"
      round
      position="bottom"
      style="background-color: rgba(255, 255, 255, 0.2); margin-bottom: 20vh"
    >
      <div
        style="
          width: 99vw;
          height: 30vh;
          overflow: visible;
          background-color: rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <Button style="height: 50px" color="blanchedalmond" @click="pageChange(1)"
          ><span style="color: black">首页</span></Button
        >
        <Tabs
          v-model:active="view.queryParam.MovieType"
          type="card"
          size="large"
          class="tabsBtn"
          @click-tab="movieTypeChange"
        >
          <Tab
            v-for="item in MovieTypeOptions"
            :key="item.value"
            :title="item.text"
            :name="item.value"
            :title-style="{ height: '2rem' }"
          ></Tab>
        </Tabs>

        <Tabs
          v-model:active="view.queryParam.SortField"
          type="card"
          size="large"
          class="tabsBtn"
          @click-tab="sortFieldChange"
        >
          <Tab
            v-for="item in SortFieldOptions"
            :key="item.value"
            :title="item.text"
            :name="item.value"
          ></Tab>
        </Tabs>
        <Tabs
          v-model:active="view.queryParam.SortType"
          type="card"
          size="large"
          class="tabsBtn"
          @click-tab="sortTypeChange"
        >
          <Tab
            v-for="item in SortTypeOptions"
            :key="item.value"
            :title="item.text"
            :name="item.value"
          ></Tab>
        </Tabs>
        <div style="display: flex; flex-direction: row; justify-content: space-evenly">
          <ElRadioGroup v-model="easyMode" size="large">
            <ElRadioButton :label="true">简易模式</ElRadioButton>
            <ElRadioButton :label="false">列表模式</ElRadioButton>
          </ElRadioGroup>
          <Icon
            name="search"
            size="33"
            color="blanchedalmond"
            @click="
              showSearch = true
              showPopover = false
            "
          />
        </div>

        <Pagination
          v-model="PageNum"
          class="pageTools"
          :total-items="view.TotalCnt"
          force-ellipses
          :show-page-size="3"
          :items-per-page="view.queryParam.PageSize"
          @change="pageChange"
        >
        </Pagination>
      </div>
    </Popup>
    <Sticky offset-bottom="24vh" position="bottom" style="margin-right: 100px">
      <Button
        plain
        type="primary"
        style="background-color: rgba(0, 0, 0, 0.5); color: whitesmoke"
        @click="showPopover = true"
        >{{ view.queryParam.Page }}</Button
      >
    </Sticky>
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
  TansferFile
} from '@/api/file'
import { GetSettingInfo } from '@/api/setting'
import { ResultList } from '@/config/ResultModel'
import { useSystemProperty } from '@/store/System'
import { getFileStream, getJpg, getPng, getTempImage } from '@/utils/ImageUtils'
import {
  showConfirmDialog,
  ActionSheet,
  Popup,
  Button,
  Col,
  Image,
  showImagePreview,
  NavBar,
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
  Tab,
  Tabs,
  BackTop
} from 'vant'
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import 'vant/lib/index.css'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { MovieModel, MovieQuery } from '../fileList'
import { formMovieTypeChange, volumechange } from '../fileList/fileList'
import { SettingInfo } from '../settting'
import MobileBar from './MobileBar.vue'
import LoadMoreVue from './LoadMore.vue'
import { useWindowSize, useWindowScroll } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus/es'
const { query } = useRoute()

const systemProperty = useSystemProperty()
const title = ref('总数')
const { width } = useWindowSize()
const isWide = computed(() => {
  return width.value > 600
})
const moreTags = ref(false)
const showPopover = ref(false)
const mainBody = ref(true)
const easyMode = ref(false)
const finished = ref(false)
const isPlaying = ref(false)
const refreshing = ref(false)
const showRename = ref(false)
const pagePress = ref(null)
const loadMoreFlag = ref(false)
const vue3VideoPlayRef = ref(null)

const loadRef = ref()
const { y } = useWindowScroll()

const PageNum = ref(1)
const view = reactive({
  settingInfo: new SettingInfo(),
  playlist: [],
  queryParam: {
    Page: 1,
    PageSize: 10,
    SortField: 'MTime',
    SortType: 'desc',
    MovieType: '',
    Keyword: ''
  } as unknown as MovieQuery,
  loadCnt: 0,
  ModelList: [],
  TotalCnt: 0,
  ResultCnt: 0,
  videoVisible: false,
  videoPlay: false,
  currentFile: new MovieModel(),
  newTag: '',
  imageList: []
})

const options = reactive({
  width: '100%', //播放器高度
  height: 'auto', //播放器高度
  color: '#409eff', //主题色
  title: '123', //视频名称
  src: null, //视频源
  muted: systemProperty.videoOptions.muted, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: true, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: systemProperty.videoOptions.volume, //默认音量大小
  control: true, //是否显示控制
  currentTime: 30, //是否显示控制
  controlBtns: systemProperty.videoOptions.controlBtns //显示所有按钮,
})

watch(finished, () => {
  // console.log("finished", finished.value);
})

const showSearch = ref(false)
const showTag = ref(false)

const tagManage = (item: MovieModel) => {
  showTag.value = true
  view.currentFile = item
}

const loadRefreshIndex = async () => {
  showRename.value = false
  await RefreshIndex()
  const url = window.location.href
  const newUrl = url.substring(0, url.indexOf('?'))
  window.location.href = newUrl + `?y=${y.value}`
}

const easyModeChange = (e) => {
  if (e) {
    view.queryParam.PageSize = 30
    queryList()
  } else {
    view.queryParam.PageSize = 10
  }
}

const pageChange = async (idx) => {
  showPopover.value = false
  view.queryParam.Page = idx
  document.body.scrollTop = document.documentElement.scrollTop = 0
  view.ModelList = []
  queryList()
}

const renameFile = async () => {
  const item = view.currentFile
  const { Code, Actress, Name } = item
  item.Name = '[' + Actress + '][' + Code + ']' + Name
  const res = await FileRename(item)
  if (res.Code == 200) {
    showSuccessToast('操作成功')
    showRename.value = false
    await loadRefreshIndex()
  } else {
    showFailToast(res.Message)
  }
}
const syncFile = async (id: string) => {
  const res = await SyncFileInfo(id)
  if (res.Code == 200) {
    showSuccessToast('操作成功')
    await queryList()
    showTag.value = false
  } else {
    showFailToast(res.Message)
  }
}

const showRenameForm = (item: MovieModel) => {
  view.currentFile = item
  showRename.value = true
}

const TransferToMp4 = async (id: string) => {
  const res = await TansferFile(id)
  if (res.Code === 200) {
    ElMessage.success(res.Message)
  } else {
    ElMessage.error(res.Message)
  }
}

const deleteFile = async (item: MovieModel) => {
  showConfirmDialog({
    title: '确认删除？',
    message: item.Name
  })
    .then(async () => {
      options.src = null
      const res = await DeleteFile(item.Id)
      if (res.Code == 200) {
        showSuccessToast('操作成功')
        loadRefreshIndex()
      } else {
        showFailToast(res.Message)
      }
    })
    .catch(() => {
      showFailToast('取消删除')
    })
}

const removeCurrentFileTag = async (tag: string) => {
  const res = await CloseTag(view.currentFile.Id, tag)
  if (res.Code == 200) {
    showSuccessToast('操作成功')
    showTag.value = false
    await loadRefreshIndex()
  } else {
    showFailToast(res.Message)
  }
}

const thisDelete = async (file) => {
  closePlayVideo()
  await deleteFile(file)
}

const addCurrentFileTag = async (tag: string) => {
  const res = await AddTag(view.currentFile.Id, tag)
  if (res.Code == 200) {
    showSuccessToast('操作成功')
    showTag.value = false
    await loadRefreshIndex()
  } else {
    showFailToast(res.Message)
  }
}

const loadSettingInfo = async () => {
  const res = await GetSettingInfo()
  if (res) {
    view.settingInfo = { ...res }
  }
}

const onLoadMore = async () => {
  view.queryParam.Page += 1
  PageNum.value = view.queryParam.Page
  await queryList(true)
}

const searchKeyword = (words: string) => {
  view.queryParam.Keyword = words
  view.queryParam.Page = 1
  PageNum.value = view.queryParam.Page
  document.body.scrollTop = document.documentElement.scrollTop = 0
  onSearch()
}
const viewPic = ref(false)

const getImageList = async (Id: string) => {
  const res = await DownImageList(Id)
  if (res.Code === 200) {
    showSuccessToast(res.Message)
  } else {
    showFailToast(res.Message)
  }
}

const previewPictures = async (item) => {
  const toast = showLoadingToast({
    duration: 0, // 持续展示 toast
    forbidClick: false, // 禁用背景点击
    loadingType: 'spinner',
    message: '加载中...'
  })
  setTimeout(() => {
    toast.close()
  }, 3000)
  await loadDirInfo(item.Id)
  toast.close()

  if (view.imageList && view.imageList.length > 0) {
    const pre = showImagePreview({ images: view.imageList, closeable: true })
    pre.show()
  } else {
    showFailToast('无图')
  }
}
const viewPictures = async (item) => {
  await loadDirInfo(item.Id)
  if (view.imageList && view.imageList.length > 0) {
    viewPic.value = true
  } else {
    showFailToast('无图')
  }
}

const closeViewPicture = () => {
  viewPic.value = false
}

const volumechangeThis = (e) => {
  const {
    target: { volume, muted }
  } = e
  options.volume = volume
  options.muted = muted
  volumechange(e)
}

const loadDirInfo = async (id: string) => {
  const res = await QueryDirImageBase64(id)
  if (res && res.length > 0) {
    view.imageList = []
    for (let i = 0; i < res.length; i++) {
      if (res[i].FileType == 'jpg' || res[i].FileType == 'png') {
        view.imageList.push(getTempImage(res[i].Id))
      }
    }
  }
}

const hiddenPlayVideo = () => {
  view.videoVisible = false
  mainBody.value = true
}

const togglePlay = (last: number) => {
  options.volume = options.volume - 10
  vue3VideoPlayRef.value.togglePlay()
}

const closePlayVideo = () => {
  view.videoVisible = false
  view.videoPlay = false
  options.src = null
  isPlaying.value = false
  mainBody.value = true
}

const playSource = async (item) => {
  const stream = getFileStream(item.Id)
  options.title = item.Actress
  options.src = stream
  options.muted = systemProperty.videoOptions.muted
  vue3VideoPlayRef.value.play()
  playListQuery(item.Actress)
}

const playListQuery = async (Actress: string) => {
  view.playlist = []
  const palyParam = {
    ...view.queryParam,
    PageSize: 1000,
    Page: 1,
    Keyword: Actress
  }
  const res = await QueryFileList(palyParam)
  const model = res as unknown as ResultList
  view.playlist = [...model.Data]
}

const openFile = (item: any) => {
  view.videoVisible = false
  view.videoPlay = true
  view.currentFile = item
  isPlaying.value = true
  view.videoVisible = true
  mainBody.value = false
  console.log(options)
  playSource(item)
}

const queryList = async (concat?: boolean, pageStart?: number) => {
  const queryParam = { ...view.queryParam }
  if (pageStart > 0) {
    queryParam.Page = pageStart
    queryParam.PageSize = 1
    PageNum.value = view.queryParam.Page
  }
  const { Keyword } = queryParam
  if (Keyword) {
    title.value = '搜索中...'
  } else {
    title.value = '文件'
  }
  systemProperty.syncSearchParam(queryParam)
  const res = await QueryFileList(queryParam)
  const model = res as unknown as ResultList
  if (!model.Data || model.Data.length == 0) {
    finished.value = false
    return
  }
  model.Data.map((item) => {
    if (item.Code == item.Actress) {
      item.Code = ''
      item.Actress = ''
    }
    if (item.Code.lastIndexOf('-') == item.Code.length - 1) {
      item.Code = item.Code.substring(0, item.Code.length - 1)
    }
    item.originName = item.Name.trim()
    item.Name = item.Name.replace('[' + item.Code + ']', '')
    item.Name = item.Name.replace('[' + item.Actress + ']', '')
  })

  if (!concat) {
    view.ModelList = []
  }
  const newList = [...view.ModelList, ...model.Data]
  view.ModelList = newList

  view.TotalCnt = model.TotalCnt
  view.ResultCnt = model.ResultCnt
  if (model.Data.length === view.queryParam.PageSize) {
    loadMoreFlag.value = true
  } else {
    loadMoreFlag.value = false
  }

  view.loadCnt = view.loadCnt + model.Data.length
  refreshing.value = false
}

const onSearch = async (clear?: any) => {
  console.log(clear)
  view.ModelList = []
  view.loadCnt = 0
  showSearch.value = false
  await queryList(false)
}

const movieTypeChange = (e) => {
  const { name } = e
  view.queryParam.MovieType = name
  onSearch()
}
const sortFieldChange = (e) => {
  const { name } = e
  view.queryParam.SortField = name
  onSearch()
}
const sortTypeChange = (e) => {
  const { name } = e
  view.queryParam.SortType = name
  onSearch()
}

const onCancel = async () => {
  await onSearch(false)
}

const keywordUpdate = () => {
  if (view.queryParam.Keyword.length >= 2 || view.queryParam.Keyword.length == 0) {
    view.queryParam.Page = 1
    PageNum.value = view.queryParam.Page
    onSearch()
  }
}

const initQuery = () => {
  const systemProperty = useSystemProperty()
  if (systemProperty.getSearchParam) {
    view.queryParam = systemProperty.getSearchParam
    setTimeout(() => {
      PageNum.value = systemProperty.getSearchParam.Page
    }, 100)
  }
}

onMounted(() => {
  options.src = null
  const { y } = query
  initQuery()
  onSearch().then(() => {
    if (y) {
      setTimeout(() => {
        document.documentElement.scrollTop = Number(y)
      }, 100)
    }
  })

  loadSettingInfo()
})

const MovieTypeOptions = [
  { value: '', text: '全部' },
  { value: '骑兵', text: '骑兵' },
  { value: '步兵', text: '步兵' },
  { value: '斯巴达', text: '斯巴达' },
  { value: '国产', text: '国产' }
]
const SortFieldOptions = [
  { value: 'MTime', text: '时间倒排' },
  { value: 'Name', text: '名称倒排' },
  { value: 'Size', text: '大小倒排' }
]
const SortTypeOptions = [
  { value: 'desc', text: '倒排' },
  { value: 'asc', text: '正排' }
]
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
  background-color: rgba(0, 0, 0, 0.8);
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
  justify-content: space-evenly;
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
  float: left;
  width: fit-content;
  height: 12rem;
  margin: 6px 8px;
  display: flex;
  box-shadow: 0 0 4px grey;
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
  padding: 1px auto;
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
  height: fit-content;
  flex-direction: column;
}

.easyModeImg {
  min-width: 4rem;
  z-index: 4;
}
.easyModeText {
  color: red;
  position: absolute;
  margin-bottom: -100px;
  height: fit-content;
  width: 12rem;
  max-width: 46%;
  overflow: hidden;
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
  margin: 4px auto;
}

.viewPicImg {
  width: 100%;
  margin: 0 auto;
  opacity: 9;
  // z-index: 3;
}

.imageCover {
  position: absolute;
  margin-top: -2rem;
  background-color: rgba(250, 250, 250, 0.1);
  height: 2rem;
  width: 98%;
  // z-index: 4;
}
.imageCoverTool {
  height: 2rem;
  width: 98%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap-reverse;
  align-items: center;
}
.mr1 {
  margin-right: 1rem;
  align-items: center;
}
</style>
