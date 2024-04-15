<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 94vh"
    class="shadow-2 rounded-borders"
  >
    <q-header :style="themeStyle">
      <q-toolbar class="q-gutter-sm">
        <q-btn
          :loading="view.renameCount > 0"
          v-if="view.renameCount > 0"
          class="q-mt-sm"
          color="orange"
          size="md"
          label="13333 "
        >
          <template v-slot:loading>
            <q-spinner-facebook size="xs"></q-spinner-facebook>
            {{ `r:${view.renameCount}` }}
          </template>
        </q-btn>
        <q-btn
          :loading="refreshIndexLoading"
          color="green"
          @click="refreshIndex"
          title="刷新索引"
          icon="ti-reload"
          size="md"
          dense
        >
          <template v-slot:loading>
            <q-spinner-facebook size="xs"></q-spinner-facebook
          ></template>
        </q-btn>
        <q-toggle
          v-model="view.queryParam.OnlyRepeat"
          v-if="!isMobile"
          flat
          @update:model-value="fetchSearch"
          label="重"
        />
        <q-btn-toggle
          v-if="!isMobile"
          size="md"
          v-model="view.queryParam.SortField"
          @update:model-value="fetchSearch()"
          :options="FieldEnum"
        />
        <q-btn-toggle
          v-if="!isMobile"
          v-model="view.queryParam.SortType"
          @update:model-value="fetchSearch()"
          :options="DescEnum"
        />
        <q-btn-toggle
          v-if="!isMobile"
          v-model="view.queryParam.MovieType"
          @update:model-value="fetchSearch()"
          :options="MovieTypeSelects"
        />
        <q-btn-dropdown
          v-if="isMobile"
          outline
          color="primary"
          :label="getLabelByValue(view.queryParam.SortField, FieldEnum)"
        >
          <q-list>
            <q-item
              v-for="item in FieldEnum"
              :key="item.label"
              clickable
              v-close-popup
              @click="
                view.queryParam.SortField = item.value;
                fetchSearch();
              "
            >
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown
          v-if="isMobile"
          outline
          color="primary"
          :label="getLabelByValue(view.queryParam.SortType, DescEnum)"
        >
          <q-list>
            <q-item
              v-for="item in DescEnum"
              :key="item.label"
              clickable
              v-close-popup
              @click="
                view.queryParam.SortType = item.value;
                fetchSearch();
              "
            >
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown
          v-if="isMobile"
          outline
          color="primary"
          :label="getLabelByValue(view.queryParam.MovieType, MovieTypeSelects)"
        >
          <q-list>
            <q-item
              v-for="item in MovieTypeSelects"
              :key="item.label"
              clickable
              v-close-popup
              @click="
                view.queryParam.MovieType = item.value;
                fetchSearch();
              "
            >
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-input
          id="searchBtn"
          label="..."
          v-model="view.queryParam.Keyword"
          :dense="true"
          filled
          clearable
          @update:model-value="fetchSearch()"
        >
          <template v-slot:prepend>
            <q-icon name="ti-list" class="cursor-pointer">
              <q-popup-proxy>
                <div style="width: 200px; max-height: 50vh">
                  <q-list>
                    <q-item
                      clickable
                      v-ripple
                      v-for="word in suggestions"
                      :key="word"
                      @click="
                        view.queryParam.Keyword = word;
                        fetchSearch();
                      "
                    >
                      <q-item-section>
                        <q-item-label>{{ word }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              name="ti-search"
              title="搜"
              class="cursor-pointer"
              @click="fetchSearch"
            >
            </q-icon>
          </template>
        </q-input>
        <q-btn
          class="q-mr-sm"
          flat
          size="sm"
          color="primary"
          icon="ti-settings"
          @click="openListEditRef"
        />
      </q-toolbar>
    </q-header>
    <q-footer elevated :style="themeStyle">
      <div class="q-pa-sm flex flex-center">
        <q-pagination
          v-model="view.queryParam.Page"
          @update:model-value="currentPageChange"
          color="deep-orange"
          :ellipses="true"
          :max="view.resultData.TotalPage || 0"
          :max-pages="isMobile ? 5 : 10"
          boundary-numbers
          direction-links
        ></q-pagination>
        <div class="row q-gutter-sm flex flex-right">
          <q-input
            v-model="view.queryParam.Page"
            :dense="true"
            type="search"
            style="width: 40px; text-align: center"
            bgColor="orange"
            @focus="focusEvent($event)"
            @update:model-value="currentPageChange"
          />
          <q-select
            color="lime-11 q-mr-md"
            dense
            @update:model-value="currentPageSizeChange"
            filled
            bgColor="orange"
            v-model="view.queryParam.PageSize"
            :options="[10, 12, 20, 30, 50, 200]"
          >
          </q-select>
        </div>
      </div>
    </q-footer>
    <q-page-container>
      <q-page padding>
        <div class="row justify-start q-mt-sm mainlist">
          <q-card
            class="q-ma-sm"
            v-bind:class="{
              'example-item': !isMobile,
              'mobile-item': isMobile,
            }"
            v-for="item in view.resultData.Data"
            :key="item.Id"
          >
            <div class="float-head absolute-top">
              <div>
                <q-chip square text-color="white" class="root-chip">
                  <q-popup-proxy context-menu>
                    <TagPop :item="item" @done-next="refreshIndex" />
                  </q-popup-proxy>
                  <span>种草</span>
                </q-chip>
                <q-chip
                  square
                  text-color="white"
                  v-for="tag in item.Tags"
                  :key="tag"
                  class="chip-tag"
                >
                  <span @click="searchKeyword(tag)">{{
                    tag?.substring(0, 4)
                  }}</span>
                </q-chip>
              </div>
              <q-btn-dropdown
                class="movie-type-dropdown"
                :label="item.MovieType"
              >
                <q-list style="background-color: rgba(0, 0, 0, 0.7)">
                  <q-item
                    v-for="mt in MovieTypeOptions"
                    :key="mt.value"
                    v-close-popup
                    class="movieTypeSelectItem"
                  >
                    <q-item-section>
                      <q-item-label @click="setMovieType(item.Id, mt.value)"
                        >{{ mt.label }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <q-img
              fit="fill"
              easier
              draggable
              :class="{ 'img-self': !isMobile, 'img-self-moblie': isMobile }"
              :src="getPng(item.Id)"
              @click="openFileInfoRef(item)"
            >
              <template v-slot:loading>
                <div class="text-subtitle1 text-white">Loading...</div>
              </template>
            </q-img>
            <div
              class="absolute-bottom float-btn"
              :style="{ height: isMobile ? '8rem' : '8rem' }"
            >
              <div style="background-color: rgba(0, 0, 0, 0.4)">
                <div style="display: flex; flex-direction: row">
                  <q-btn
                    round
                    class="q-mr-sm"
                    :size="isMobile ? 'sm' : 'sm'"
                    ripple
                    color="primary"
                    icon="ti-control-eject"
                    @click="playBySystem(item)"
                    title="播放"
                    v-if="showButton('播放') && !isMobile"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    :size="isMobile ? 'sm' : 'sm'"
                    ripple
                    color="red"
                    icon="ti-fullscreen"
                    title="单页播放"
                    @click="openPlay(item)"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    :size="isMobile ? 'sm' : 'sm'"
                    ripple
                    color="orange"
                    icon="ti-arrow-right"
                    @click="openRightDrawer(item)"
                    title="小播放"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    :size="isMobile ? 'sm' : 'sm'"
                    ripple
                    color="orange"
                    icon="ti-blackboard"
                    @click="fileInfoRef.open({ item, playing: true })"
                    title="小播放"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    :size="isMobile ? 'sm' : 'sm'"
                    ripple
                    color="green-5"
                    icon="ti-layers-alt"
                    @click="picInPic(item)"
                    title="画中画"
                  />
                </div>
                <div style="display: flex; flex-direction: row">
                  <q-btn
                    round
                    class="q-mr-sm"
                    size="10px"
                    color="red"
                    icon="ti-slice"
                    @click="fileEditRef.open(item, refreshIndex)"
                    v-if="showButton('编辑')"
                    title="编辑"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    size="10px"
                    color="primary"
                    icon="open_in_new"
                    @click="openFolder(item)"
                    v-if="showButton('文件夹') && !isMobile"
                    title="文件夹"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    size="10px"
                    color="brown-5"
                    icon="ti-search"
                    title="网搜"
                    @click="searchCode(item)"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    size="sm"
                    color="secondary"
                    icon="ti-import"
                    @click="commonExec(DownImageList(item.Id))"
                    v-if="showButton('刮图')"
                    title="刮图"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    size="sm"
                    color="amber"
                    glossy
                    text-color="black"
                    icon="ti-trash"
                    @click="confirmDelete(item)"
                    v-if="showButton('删除')"
                    title="删除"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    size="sm"
                    color="black"
                    @click="moveThis(item)"
                    icon="ti-location-arrow"
                    v-if="showButton('移动')"
                    title="移动"
                  />
                  <q-btn
                    round
                    class="q-mr-sm"
                    size="sm"
                    color="black"
                    @click="SyncFileInfo(item)"
                    icon="ti-exchange-vertical"
                    v-if="showButton('刮图')"
                    title="移动"
                  />
                </div>
              </div>

              <div :style="{ height: '4rem', overflow: 'hidden' }">
                <a
                  style="color: #9e089e; background-color: rgba(0, 0, 0, 0.1)"
                  class="mr10 cursor-pointer"
                  target="_blank"
                  @click="goActress(item.Actress)"
                  >{{ item.Actress?.substring(0, 6) }}</a
                >
                <a
                  style="
                    color: rgb(239, 30, 30);
                    background-color: rgba(0, 0, 0, 0.1);
                  "
                  class="mr10 cursor-pointer"
                  @click="copyText(item.Code)"
                  >{{ formatCode(item.Code) }}</a
                >
                <a
                  style="
                    color: rgb(22, 26, 227);
                    background-color: rgba(0, 0, 0, 0.1);
                  "
                  class="mr10 cursor-pointer"
                  @click="copyText(item.Title)"
                  >{{ item.SizeStr }}</a
                >
                <span>{{ formatTitle(item.Title) }}</span>
              </div>
            </div>
          </q-card>
        </div>
        <q-page-scroller
          position="bottom-right"
          :scroll-offset="150"
          :offset="[18, 100]"
        >
          <q-btn fab icon="keyboard_arrow_up" color="accent" />
        </q-page-scroller>

        <div class="q-mg-md top" style="margin-bottom: 40px">
          <q-page-sticky
            style="z-index: 9"
            position="bottom-left"
            :offset="[6, isMobile ? 180 : 160]"
          >
            <q-btn
              round
              class="page-sticky"
              color="amber"
              text-color="black"
              icon="keyboard_arrow_left"
              v-if="view.queryParam.Page > 1"
              @click="nextPage(-1)"
            ></q-btn>
          </q-page-sticky>

          <q-page-sticky
            style="z-index: 9"
            position="bottom-right"
            :offset="[10, isMobile ? 180 : 160]"
          >
            <q-btn
              round
              class="page-sticky"
              color="secondary"
              text-color="black"
              icon="keyboard_arrow_right"
              @click="nextPage(1)"
            ></q-btn>
          </q-page-sticky>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

  <q-page-sticky
    v-if="view.videoUrl"
    style="z-index: 9; max-width: 100vw"
    position="bottom-right"
    :offset="videoOffset"
  >
    <q-bar
      class="row justify-between bg-black"
      :style="{ width: videoWidth + 'px', maxWidth: '100vw' }"
    >
      <q-btn
        dense
        flat
        icon="ti-arrow-top-left"
        color="white"
        v-touch-pan.prevent.mouse="zoomFab"
      >
        <q-tooltip class="bg-white text-primary">缩放</q-tooltip>
      </q-btn>
      <q-space />
      <span
        style="color: aliceblue; width: 80%; height: 1.5rem; overflow-y: hidden"
        v-touch-pan.prevent.mouse="moveFab"
        :disable="draggingFab"
        ><q-btn flat icon="ti-move" color="white">
          <q-tooltip class="bg-white text-primary">拖动</q-tooltip> </q-btn
        >{{ view.currentData.Name }}</span
      >
      <q-space />
      <q-btn
        dense
        flat
        icon="close"
        color="white"
        @click="
          () => {
            view.videoUrl = null;
          }
        "
      >
        <q-tooltip class="bg-white text-primary">关闭</q-tooltip>
      </q-btn>
    </q-bar>
    <video
      autoplay
      controls
      playsinline
      id="vue3VideoPlayRef"
      :src="view.videoUrl"
      width="200"
      style="position: fixed; height: auto; z-index: 9"
      :style="{ width: videoWidth + 'px', maxWidth: '100%' }"
    ></video>
  </q-page-sticky>

  <FileEdit
    ref="fileEditRef"
    @plus-one="view.renameCount = view.renameCount + 1"
    @sub-one="view.renameCount = view.renameCount - 1"
  />
  <FileInfo ref="fileInfoRef" />
  <ListEdit ref="listEditRef" />
</template>

<script setup>
import { useQuasar } from 'quasar';

import { isMobile } from 'boot/platform';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  DeleteFile,
  DownImageList,
  FileRename,
  OpenFileFolder,
  PlayMovie,
  RefreshAPI,
  ResetMovieType,
  SyncFileInfo,
  SearchAPI,
} from '../../components/api/searchAPI';
import { GetSettingInfo } from '../../components/api/settingAPI';
import {
  formatCode,
  formatTitle,
  MovieTypeOptions,
  MovieTypeSelects,
  FieldEnum,
  DescEnum,
  getLabelByValue,
} from '../../components/utils';
import { getPng, getFileStream } from '../../components/utils/images';
import { useSystemProperty } from '../../stores/System';
import FileEdit from './components/FileEdit.vue';
import FileInfo from './components/FileInfo.vue';
import ListEdit from './components/ListEdit.vue';
import TagPop from './components/TagPop.vue';

import { onKeyStroke, useClipboard } from '@vueuse/core';

const $q = useQuasar();
const fileEditRef = ref(null);
const fileInfoRef = ref(null);
const listEditRef = ref(null);

const view = reactive({
  renameCount: 0,
  currentData: {},
  settingInfo: {},
  queryParam: {
    Keyword: '',
    MovieType: '',
    OnlyRepeat: false,
    fullscreen: false,
    Page: 1,
    PageSize: 20,
    SortField: 'MTime',
    SortType: 'desc',
  },
  resultData: {},
  fullscreen: false,
});

const source = ref('Hello');
const { copy } = useClipboard({ source });

const systemProperty = useSystemProperty();
const suggestions = computed(() => {
  return systemProperty.getSuggestions;
});

const listButtons = computed(() => {
  return view.settingInfo.Buttons;
});

const themeStyle = computed(() => {
  return {
    color: systemProperty.isDark ? 'white' : 'black',
    backgroundColor: systemProperty.isDark
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(255, 255, 255, 0.9)',
  };
});
const videoOffset = computed(() => {
  return systemProperty.pictureInPictureVideoOffset;
});
const videoWidth = computed(() => {
  return systemProperty.pictureInPictureVideoWidth;
});
const draggingFab = ref(false);
const moveFab = (ev) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;
  systemProperty.pictureInPictureVideoOffset = [
    systemProperty.pictureInPictureVideoOffset[0] - ev.delta.x,
    systemProperty.pictureInPictureVideoOffset[1] - ev.delta.y,
  ];
};

const zoomFab = (ev) => {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;
  systemProperty.pictureInPictureVideoWidth =
    systemProperty.pictureInPictureVideoWidth - ev.delta.x;
  systemProperty.pictureInPictureVideoOffset = [
    systemProperty.pictureInPictureVideoOffset[0],
    systemProperty.pictureInPictureVideoOffset[1] - ev.delta.y,
  ];
};

const playBySystem = (item) => {
  if ($q.platform.is.electron) {
    const { Path } = item;
    window.electron.openBySystem({ Path });
  } else {
    commonExec(PlayMovie(item.Id));
  }
};

const listEditCallback = (data) => {
  const { settingInfo } = data;
  if (settingInfo) {
    view.settingInfo = settingInfo;
  }
};

const showButton = (name) => {
  if (!listButtons.value || listButtons.value.length == 0) {
    return true;
  }
  return listButtons.value.indexOf(name) >= 0;
};

const openPlay = (item) => {
  const url = `#/playing/${item.Id}`;
  if ($q.platform.is.electron) {
    window.electron.createWindow({ router: url });
  } else {
    window.open(url);
  }
};

const searchCode = (item) => {
  let itemCode = item.Code;
  if (itemCode.indexOf('-C') > 0) {
    itemCode = itemCode.substring(0, itemCode.indexOf('-C'));
  }
  if (itemCode.indexOf('-') == 0) {
    itemCode = itemCode.substring(1);
  }
  const url = `${view.settingInfo.BaseUrl}${itemCode}`;
  console.log(url);
  if ($q.platform.is.electron) {
    window.electron.createWindow({
      router: url,
      width: 1280,
      height: 1000,
      titleBarStyle: '',
    });
  } else {
    window.open(url);
  }
};

const focusEvent = (e) => {
  console.log(e);
  e.target.select();
};

const openFolder = (item) => {
  if ($q.platform.is.electron) {
    window.electron.showInFolder(item.Path);
  } else {
    commonExec(OpenFileFolder(item.Id));
  }
};

const confirmDelete = (item) => {
  $q.dialog({
    title: item.Name,
    message: '确定删除吗?',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log('>>>> onOk');
      commonExec(DeleteFile(item.Id), true);
    })
    .onCancel(() => {
      console.log('>>>> Cancel');
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const fetchGetSettingInfo = async () => {
  const data = await GetSettingInfo();
  view.settingInfo = data.data;
  systemProperty.SettingInfo = data.data;
};

const commonExec = async (exec, refresh) => {
  const { Code, Message } = (await exec) || {};
  console.log(Code, Message);
  if (Code != 200) {
    $q.notify({ message: `${Message}` });
  } else {
    if (refresh) {
      refreshIndex();
    }
  }
};

onKeyStroke(['`'], () => {
  refreshIndex();
});
onKeyStroke(['Enter'], () => {
  fetchSearch();
});

const copyText = async (str) => {
  await copy(str);
  $q.notify({ message: `${str}` });
};

const goActress = (Actress) => {
  if (!systemProperty.goActressNewWidow) {
    view.queryParam.Keyword = Actress;
    fetchSearch();
  } else {
    const { Page, PageSize, MovieType, SortField, SortType } = view.queryParam;
    const routeData = resolve({
      path: '/search',
      query: {
        Page,
        PageSize,
        MovieType,
        SortField,
        SortType,
        Keyword: Actress,
      },
    });
    window.open(routeData.href, '_blank');
  }
};

const picInPic = (item) => {
  view.currentData = item;
  const video = document.getElementById('vue3VideoPlayRef');
  if (video) {
    view.videoUrl = getFileStream(item.Id);
  }
};

const openListEditRef = () => {
  listEditRef.value.open({
    queryParam: view.queryParam,
    settingInfo: view.settingInfo,
    cb: listEditCallback,
  });
};

const openFileInfoRef = (item) => {
  fileInfoRef.value.open({ item, cb: refreshIndex });
};

const openRightDrawer = (item) => {
  view.currentData = item;
  systemProperty.Playing = item;
  systemProperty.drawerRight = true;
};

const searchKeyword = async (keyword) => {
  view.queryParam.Keyword = keyword;
  await fetchSearch();
};

const currentPageChange = async (no) => {
  if (no) {
    view.queryParam.Page = Number(no);
  }
  await fetchSearch();
  const top = document.querySelector('.scroll');
  if (top) {
    top.scrollTo(0, 0);
  }
};

const currentPageSizeChange = async (size) => {
  if (size) {
    view.queryParam.PageSize = Number(size);
  }
  await fetchSearch();
};

const nextPage = (n) => {
  view.queryParam.Page = view.queryParam.Page + n;
  currentPageChange();
};

const fetchSearch = async (newBlank) => {
  saveParam(newBlank);
  const { Keyword } = view.queryParam;
  const data = await SearchAPI(view.queryParam);
  console.log(data);
  view.resultData = { ...data };
  const { ResultSize, ResultCnt } = data;
  document.title = `搜索 ${Keyword || ''} : ${ResultSize} {${ResultCnt}}`;
};

const moveThis = async (item) => {
  const res = await FileRename({ ...item, NoRefresh: true, MoveOut: true });
  console.log(res);
  if (res.Code == 200) {
    $q.notify({ type: 'negative', message: res.Message });
  } else {
    $q.notify({ type: 'negative', message: res.Message });
  }
};

const refreshIndexLoading = ref(false);
const refreshIndex = async () => {
  refreshIndexLoading.value = true;
  const { Code, Message } = await RefreshAPI('/api/refreshIndex');
  console.log(Code, Message);
  if (Code == '200') {
    $q.notify({ type: 'negative', message: Message });
    await fetchSearch();
  }
  refreshIndexLoading.value = false;
};

const setMovieType = async (Id, Type) => {
  const { Code, Message } = await ResetMovieType(Id, Type);
  if (Code === '200') {
    $q.notify({ type: 'negative', message: Message });
  } else {
    $q.notify({ type: 'warning', message: Message });
  }
};

const saveParam = () => {
  systemProperty.syncSearchParam(view.queryParam);
  localStorage.setItem('queryParam', JSON.stringify(view.queryParam));

  const { Page, PageSize, MovieType, SortField, SortType, Keyword } =
    view.queryParam;

  push({
    path: '/search',
    query: {
      Page,
      PageSize,
      MovieType,
      SortField,
      SortType,
      Keyword,
    },
  });
};

const thisRoute = useRoute();
const { push, resolve } = useRouter();

onMounted(async () => {
  document.title = '搜索';
  const {
    Page,
    PageSize,
    MovieType,
    SortField,
    SortType,
    Keyword,
    showStyle,
    from,
  } = thisRoute.query;
  await fetchGetSettingInfo();
  if (Keyword) {
    view.queryParam.Keyword = Keyword;
  }
  if (Page && PageSize) {
    view.queryParam.Page = Number(Page);
    view.queryParam.PageSize = Number(PageSize);
    view.queryParam.MovieType = MovieType;
    view.queryParam.SortField = SortField;
    view.queryParam.SortType = SortType;
    view.queryParam.Keyword = Keyword;
    view.queryParam.showStyle = showStyle;
  } else {
    if (from == 'index') {
      const piniaParam = systemProperty.FileSearchParam;
      if (piniaParam) {
        console.log('piniaParam', piniaParam);
        view.queryParam = piniaParam;
      }
    } else {
      const storage = JSON.parse(localStorage.getItem('queryParam'));
      if (storage) {
        console.log('storage', storage);
        view.queryParam = storage;
      }
    }
  }

  fetchSearch();
});
</script>
<style lang="scss" scoped>
.mr10 {
  margin-right: 4px;
}

.float-head {
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.example-item {
  padding: 2px;
  width: 220px;
  height: 390px;
  overflow: hidden;
}

.mobile-item {
  padding: 2px;
  width: 45%;
  height: 320px;
  overflow: hidden;
}

.img-self {
  min-height: 270px;
  max-height: 340px;
}

.img-self-moblie {
  min-height: 160px;
}

.float-btn {
  margin: 0;
  padding: 4px;
}

.movieTypeSelectItem {
  color: antiquewhite;
  padding: 0;
  margin: 0;

  :hover {
    color: rgba(0, 0, 0, 0.8);
    font-size: large;
  }
}

.q-card__section--vert {
  padding: 4px;
}

.tag-popup {
  padding: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 400px;
}

.tag-item {
  margin: 2px 4px;
  padding: 1px 6px;
  border-radius: 8px;
}

.root-chip {
  margin-left: 0px;
  padding: 0 4px;
  background-color: rgba(236, 15, 15, 0.8);
}

.chip-tag {
  margin-left: 0px;
  padding: 0 4px;
  background-color: rgba(188, 24, 24, 0.6);
}

.movie-type-dropdown {
  background-color: rgba(0, 0, 0, 0.8);
  width: 85px;
  height: 1rem;
  color: antiquewhite;
}

.page-sticky {
  width: 4rem;
  height: 3rem;
}
</style>
