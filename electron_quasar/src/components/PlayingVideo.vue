<template>
  <q-layout
    view="lHh Lpr lFf"
    container
    style="height: 120vh"
    class="shadow-2 rounded-borders"
    v-if="view.showMode === 'list' "
  >
    <q-header style="width: 100%">
      <q-card>
        <vue3VideoPlay
          v-show="view.playing?.Id"
          ref="vue3VideoPlayRef"
          id="vue3VideoPlayRef"
          style="
            object-fit: contain;
            width: 100%;
            height: auto;
            max-height: 99vh;
          "
          v-bind="optionsPC"
          @ended="playNext(1)"
          @timeupdate="timeupdate"
          @volumeupdate="volumeupdate"
        />
        <div style="display: flex; flex-direction: row">
          <q-btn
            size="sm"
            flat
            style="color: #59d89d"
            :label="view.playing.Actress?.substring(0, 8)"
            @click="fetchSearch(view.playing.Actress)"
          />
          <q-btn
            size="sm"
            flat
            style="color: goldenrod"
            :label="view.playing.Code?.substring(0, 8)"
            @click="fetchSearch(view.playing.Code)"
          />
          <q-input
            v-model="view.queryParam.Keyword"
            :dense="true"
            clearable
            @update:model-value="fetchSearch"
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
                        @click="fetchSearch(word)"
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
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          "
        >
          <q-btn-toggle
            v-model="view.queryParam.SortType"
            @update:model-value="fetchSearch()"
            toggle-color="primary"
            textColor="primary"
            :options="[
              { label: '正', value: 'asc' },
              { label: '倒', value: 'desc' },
            ]"
          />
          <q-btn
            v-if="!view.playlist"
            size="sm"
            color="primary"
            label="上一个"
            @click="playNext(-1)"
          />
          <q-btn
            v-if="!view.playlist"
            size="sm"
            color="primary"
            label="下一个"
            @click="playNext(1)"
          />
          <q-btn
            color="orange"
            size="sm"
            label="更多"
            @click="
              view.showMore = !view.showMore;
              fetchGetSettingInfo();
            "
          />
          <span v-if="view.showMore">
            <q-chip
              square
              color="red"
              text-color="white"
              v-for="tag in view.settingInfo.Tags"
              :key="tag"
              style="margin-left: 0px; padding: 0 4px"
            >
              <span
                @click="fetchSearch(tag)"
              >{{ tag }}</span
              >
            </q-chip>
          </span>
        </div>
      </q-card>
    </q-header>

    <q-page-container>
      <q-page>
        <div style="overflow: auto; background-color: rgba(0, 0, 0, 0.4)">
          <div class="row justify-center">
            <q-card
              class="q-ma-sm example-item"
              v-for="item in [...view.playList]"
              :key="item.Id"
            >
              <q-img
                fit="cover"
                easier
                draggable
                :src="getPng(item.Id)"
                class="item-img"
                @click="open(item)"
              >
                <div
                  style="
                    padding: 0;
                    margin: 0;
                    background-color: rgba(0, 0, 0, 0);
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                  "
                >
                  <div
                    @click.stop="() => {}"
                    style="
                      display: flex;
                      flex-direction: column;
                      justify-content: flex-start;
                      width: fit-content;
                    "
                  >
                    <q-btn
                      square
                      color="red"
                      size="sm"
                      text-color="white"
                      style="margin-left: 0px; padding: 0 4px"
                    >
                      <span @click="deleteThis(item.Id)">删除</span>
                    </q-btn>
                    <q-chip
                      square
                      color="red"
                      text-color="white"
                      v-for="tag in item.Tags"
                      :key="tag"
                      style="margin-left: 0px; padding: 0 4px"
                    >
                      <span
                        @click="fetchSearch(tag)"
                      >{{ tag }}</span
                      >
                    </q-chip>
                  </div>
                  <q-chip
                    @click.stop="() => {}"
                    square
                    color="green"
                    text-color="white"
                    style="
                      width: fit-content;
                      margin-right: 0px;
                      padding: 0 6px;
                    "
                  >
                    <span> {{ item.MovieType }}</span>
                  </q-chip>
                </div>
              </q-img>
              <q-card-section style="overflow: auto; padding: 4px">
                <div class="text-subtitle2" style="overflow: auto; padding: 0">
                  <q-chip
                    @click.stop="() => {}"
                    square
                    color="green"
                    text-color="orange"
                    style="padding: 0px 4px"
                  >
                    {{ item.SizeStr }}
                  </q-chip>
                  <span style="color: #0e4a2e">
                    {{ item.Title?.substring(0, 20) }}
                  </span>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-page-scroller
          position="bottom-right"
          :scroll-offset="150"
          :offset="[18, 18]"
        >
          <q-btn fab icon="keyboard_arrow_up" color="accent"/>
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>

  <q-layout
    view="hhh Lpr Lfr"
    class="shadow-2 rounded-borders"
    v-if="view.showMode === 'menu'"
  >
    <q-header class="bg-black" style="height: 5vh">
      <q-toolbar>
        <q-toolbar-title>
          <div style="overflow: hidden;display: flex;flex-direction: row">
            <span
              class="q-mr-sm"
              style="
                color: rgb(213, 90, 90);
                font-weight: 550;
                font-size: medium;
                overflow: hidden;
              "
            >{{ view.playing.Title }}</span>
            <q-btn
              flat
              style="color: #59d89d"
              :label="view.playing.Actress?.substring(0, 8)"
              @click="fetchSearch(view.playing.Actress)"
            />
            <q-btn
              flat
              style="color: goldenrod"
              :label="view.playing.Code?.substring(0, 8)"
              @click="fetchSearch(view.playing.Code)"
            />

          </div>
        </q-toolbar-title>
        <q-btn dense flat icon="close" @click="closeThis">
          <q-tooltip class="bg-white text-primary">关闭</q-tooltip>
        </q-btn>
        <q-btn
          flat
          @click="listRightW = !listRightW"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-page-container style="width: fit-content">
      <vue3VideoPlay
        v-show="view.playing?.Id"
        ref="vue3VideoPlayRef"
        id="vue3VideoPlayRef"
        style="
              object-fit: contain;
              width: 100%;
              height: 94vh;
            "
        v-bind="optionsPC"
        @ended="playNext(1)"
        @timeupdate="timeupdate"
        @volumeupdate="volumeupdate"
      />
    </q-page-container>
    <q-drawer side="right" v-model="listRightW" :width="380">
      <q-layout view="lHh Lpr lFf"
                container
                >
        <q-header>
          <div style="height: 10%;">
            <div class="row justify-between">
              <q-input
                v-model="view.queryParam.Keyword"
                :dense="true"
                clearable
                @update:model-value="fetchSearch"
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
              <q-btn-toggle
                v-model="view.queryParam.SortType"
                @update:model-value="fetchSearch()"
                toggle-color="primary"
                :options="[
                  { label: '正', value: 'asc' },
                  { label: '倒', value: 'desc' },
                ]"
              />
            </div>
            <div>
              <q-btn
                v-if="!view.playlist"
                color="primary"
                label="上一个"
                @click="playNext(-1)"
              />
              <q-btn
                v-if="!view.playlist"
                color="primary"
                label="下一个"
                @click="playNext(1)"
              />
            </div>
          </div>
        </q-header>
        <q-page-container>
          <div style="overflow: auto; background-color: rgba(0, 0, 0, 0.4)">
            <div class="row justify-center">
              <q-card
                class="q-ma-sm example-item"
                v-for="item in [...view.playList]"
                :key="item.Id"
              >
                <q-img
                  fit="cover"
                  easier
                  draggable
                  :src="getPng(item.Id)"
                  class="item-img"
                  @click="open(item)"
                >
                  <div
                    style="
                    padding: 0;
                    margin: 0;
                    background-color: rgba(0, 0, 0, 0);
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                  "
                  >
                    <div
                      @click.stop="() => {}"
                      style="
                      display: flex;
                      flex-direction: column;
                      justify-content: flex-start;
                      width: fit-content;
                    "
                    >
                      <q-btn
                        square
                        color="red"
                        size="sm"
                        text-color="white"
                        style="margin-left: 0px; padding: 0 4px"
                      >
                        <span @click="deleteThis(item.Id)">删除</span>
                      </q-btn>
                      <q-chip
                        square
                        color="red"
                        text-color="white"
                        v-for="tag in item.Tags"
                        :key="tag"
                        style="margin-left: 0px; padding: 0 4px"
                      >
                      <span
                        @click="fetchSearch(tag);"
                      >{{ tag }}</span
                      >
                      </q-chip>
                    </div>
                    <q-chip
                      @click.stop="() => {}"
                      square
                      color="green"
                      text-color="white"
                      style="
                      width: fit-content;
                      margin-right: 0px;
                      padding: 0 6px;
                    "
                    >
                      <span> {{ item.MovieType }}</span>
                    </q-chip>
                  </div>
                </q-img>
                <q-card-section style="overflow: auto; padding: 4px">
                  <div class="text-subtitle2" style="overflow: auto; padding: 0">
                    <q-chip
                      @click.stop="() => {}"
                      square
                      color="green"
                      text-color="orange"
                      style="padding: 0px 4px"
                    >
                      {{ item.SizeStr }}
                    </q-chip>
                    <span style="color: #0e4a2e">
                    {{ item.Title?.substring(0, 20) }}
                  </span>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-page-container>
      </q-layout>
    </q-drawer>
  </q-layout>
</template>
<script setup>
import vue3VideoPlay from 'vue3-video-play';
import 'vue3-video-play/dist/style.css'; // 引入css
import {computed, reactive, ref, watch, defineEmits} from 'vue';
import {useSystemProperty} from 'stores/System';
import {getFileStream} from './utils/images';
import {getPng} from './utils/images';
import {SearchAPI, DeleteFile, RefreshAPI} from './api/searchAPI';
import {GetSettingInfo} from './api/settingAPI';
import {useRouter} from 'vue-router';
import {onKeyStroke} from '@vueuse/core';

const systemProperty = useSystemProperty();
const vue3VideoPlayRef = ref(null);
const {replace} = useRouter();


const listRightW = ref(true);
const view = reactive({
  playList: [],
  showMode: 'list',
  queryParam: {SortType: 'desc'},
  showMore: false,
  settingInfo: {},
  currentTime: 1,
  playing: {},
});

const props = defineProps({
  mode: {
    type: String,
    default: 'list',
  },
});

onKeyStroke(['ArrowLeft'], () => {
  videoForward(-10);
});

onKeyStroke(['ArrowRight'], () => {
  videoForward(60);
});

window.addEventListener("beforeunload", () => {
  stop();
})

const emits = defineEmits(['close']);

const deleteThis = async (Id) => {
  await DeleteFile(Id);
  await RefreshAPI();
  await fetchSearch();
};

const suggestions = computed(() => {
  return systemProperty.getSuggestions;
});

const listRight = computed(() => {
  return systemProperty.listRight;
});

watch(listRight, (v) => {
  if (v) {
    fetchSearch();
  }
});

const open = (v) => {
  view.playing = v;
  optionsPC.currentTime = 1;
  optionsPC.src = getFileStream(v.Id);
  // optionsPC.webFullScreen = true;
  const top = document.querySelector('.topRef');
  if (top) {
    top.scrollTo(0, 0);
  }
  view.showMode = props.mode;
  if (view.showMode === 'menu') {
    replace(`/playing/${v.Id}`);
  }
  setTimeout(() => {
    vue3VideoPlayRef.value.play();
  }, 100);
  if (!view.queryParam.Keyword && view.showMode !== 'picInPic') {
    view.queryParam.Keyword = v.Actress;
    fetchSearch();
  }
};

const fetchGetSettingInfo = async () => {
  const data = await GetSettingInfo();
  view.settingInfo = data.data;
};

const stop = () => {
  optionsPC.src = null;
};
const hideThis = () => {
  systemProperty.listRight = false;
};

const timeupdate = (e) => {
  view.currentTime = e.target.currentTime;
};

const volumeupdate = (e) => {
  systemProperty.videoOptions.volume = e.target.volume;
  optionsPC.volume = e.target.volume;
};
const videoForward = (fastForwardTime) => {
  if (vue3VideoPlayRef.value) {
    console.log(vue3VideoPlayRef.value)
    optionsPC.currentTime = view.currentTime + fastForwardTime;
    const temp = optionsPC.src;
    optionsPC.src = '';
    setTimeout(() => {
      optionsPC.src = temp;
    }, 0);
  }
};

const closeThis = () => {
  stop();
  if (view.showMode === 'list') {
    hideThis();
  } else {
    window.close();
  }
  emits('close');
};

const fetchSearch = async (keywords) => {
  if (keywords) {
    view.queryParam.Keyword = keywords
  }
  const data = await SearchAPI({
    ...systemProperty.FileSearchParam,
    ...view.queryParam,
    Page: 1,
    PageSize: 500,
  });
  view.playList = [...data.Data];
  if (!view.playing) {
    view.playing = view.playList[0];
    open(view.playing);
  }
};

const playNext = (step) => {
  if (!view.playList) {
    return;
  }
  for (let i = 0; i < view.playList.length; i++) {
    if (view.playList[i].Id === view.playing.Id) {
      if (i === view.playList.length - 1) {
        open(view.playList[0]);
        return;
      } else {
        if (i + step <= 0) {
          open(view.playList[0]);
          return;
        } else {
          open(view.playList[i + step]);
          return;
        }
      }
    }
  }
};

const optionsPC = reactive({
  width: '100%', //播放器高度
  height: 'auto', //播放器高度
  color: '#ffffff', //主题色
  title: view.playing?.Title, //视频名称
  src: getFileStream(view.playing.Id), //视频源
  muted: false, //静音
  preload: 'false',
  webFullScreen: false,
  speedRate: ['1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: true, //关灯模式
  currentTime: 1,
  volume: systemProperty.videoOptions?.volume, //默认音量大小
  control: systemProperty.videoOptions?.control, //是否显示控制
  controlBtns: systemProperty.videoOptions?.controlBtns, //显示所有按钮,
});

defineExpose({
  open,
  stop,
});
</script>
<style lang="scss" scoped>
.example-item {
  width: 160px;
  height: auto;
  max-height: 320px;
  overflow: hidden;
}

.item-img {
  width: 160px;
  height: auto;
  max-height: 220px;
}
</style>
