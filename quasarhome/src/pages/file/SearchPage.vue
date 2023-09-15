<template>
  <div class="q-pa-md">

    <div class="row justify-center q-gutter-sm">
      <q-btn :loading="refreshIndexLoading" color="red" @click="refreshIndex">
        扫描
        <template v-slot:loading>
          执行中
        </template>
      </q-btn>
      <q-btn-toggle v-model="view.queryParam.SortField" @update:model-value="fetchSearch" toggle-color="primary" :options="[
        { label: '时', value: 'MTime' },
        { label: '容', value: 'Size' },
        { label: '名', value: 'Code' }
      ]" />
      <q-btn-toggle v-model="view.queryParam.SortType" @update:model-value="fetchSearch" toggle-color="primary" :options="[
        { label: '正', value: 'asc' },
        { label: '倒', value: 'desc' }
      ]" />

      <q-btn-toggle v-model="view.queryParam.MovieType" @update:model-value="fetchSearch" toggle-color="primary" :options="[
        { label: '全部', value: '' },
        { label: '骑兵', value: '骑兵' },
        { label: '步兵', value: '步兵' },
        { label: '国产', value: '国产' },
        { label: '斯巴达', value: '斯巴达' },
        { label: '漫动', value: '漫动' },
        { label: '无', value: '无' }
      ]" />
      <q-input v-model="view.queryParam.Keyword" :dense="true" filled clearable @update:model-value="fetchSearch" />
    </div>
    <q-page-sticky position="bottom" style="justify-items: center;z-index: 9;background-color: rgba(0, 0, 0, 0.6);"
      :offset="[0, 0]">
      <div class="q-pa-lg flex flex-center" ref="el" style="position: fixed" :style="style">
        <q-pagination v-model="view.queryParam.Page" @update:model-value="currentPageChange" color="purple"
          :ellipses="false" :max="view.resultData.TotalPage || 0" :max-pages="6" boundary-numbers />
      </div>
    </q-page-sticky>

    <div class="row justify-center q-gutter-sm">
      <q-intersection v-for="item  in view.resultData.Data" :key="item.Id" class="example-item">
        <q-card class="q-ma-sm">


          <q-img fit="cover" easier draggable :src="getPng(item.Id)" class="item-img" @click="openDialog(item)">
            <div
              style="padding:0;margin:0;background-color: rgba(0, 0, 0, 0);display: flex;flex-direction: row;justify-content: space-between;width: 100%;">

              <div @click.stop="() => { }"
                style="display: flex;flex-direction: column;justify-content: flex-start;width: fit-content;">
                <q-chip square color="red" text-color="white" v-for="tag in item.Tags" :key="tag"
                  style="margin-left: 0px;padding: 0;">
                  <span @click="view.queryParam.Keyword = tag; fetchSearch()">{{ tag }}</span>
                </q-chip>
              </div>
              <q-chip @click.stop="() => { }" square color="green" text-color="white"
                style="width: fit-content;margin-right: 0px;padding: 0;">
                <span @click="view.queryParam.Keyword = item.MovieType; fetchSearch()"> {{ item.MovieType }}</span>
              </q-chip>

            </div>
            <div class="absolute-bottom text-body1 text-center" style="padding: 4px;" @click.stop="() => { }">
              <q-btn flat style="color: #59d89d" :label="item.Actress?.substring(0, 10)"
                @click="view.queryParam.Keyword = item.Actress; fetchSearch()" />
              <q-btn flat style="color: goldenrod" :label="item.Code?.substring(0, 10)" @click="copy(item.Code)" />

            </div>
          </q-img>
          <q-card-section>
            <div class="text-subtitle2"><q-chip @click.stop="() => { }" square color="green" text-color="white"
                style="padding: 0px 4px;">
                {{ item.SizeStr }}
              </q-chip>{{ item.Title }}</div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </div>
  <q-dialog no-refocus no-focus square seamless allow-focus-outside :maximized="view.fullscreen" ref="dialogRef"
    @hide="onDialogHide">
    <div>
      <q-card class="q-dialog-plugin"
        :style="{ height: view.fullscreen ? '100%' : '45vh', width: 'auto', backgroundColor: 'rgba(0,0,0,0.7)' }">
        <q-card-actions align="right">
          <span style="color:orange;overflow: hidden;">{{ view.currentData.Name?.substring(0, view.fullscreen ? null : 30)
          }}</span>
          <q-btn color="primary" :label="view.fullscreen ? '小屏' : '全屏'" @click="onOKClick" />
          <q-btn color="primary" label="关闭" @click="onCancelClick" />
        </q-card-actions>
        <vue3VideoPlay ref="vue3VideoPlayRef" style="position: relative; object-fit: cover;height: auto;width: 100%;"
          v-bind="optionsPC" />
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar'
import vue3VideoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css' // 引入css

import { ref, watch } from 'vue'

import { useDialogPluginComponent } from 'quasar'

import { onMounted, reactive } from 'vue';
import { axios } from '../../boot/axios';
import { useRoute } from 'vue-router';
import { getPng, getFileStream, getJpg } from '../../components/utils/images';
import { useSystemProperty } from '../../stores/System';
import { useDraggable, useElementSize } from '@vueuse/core'

import { useClipboard } from '@vueuse/core'

const source = ref('Hello')
const { copy } = useClipboard({ source })

const el = ref < HTMLElement | null > (null)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
useElementSize(el)

const systemProperty = useSystemProperty();

const vue3VideoPlayRef = ref(null)
const $q = useQuasar()
const view = reactive({
  currentData: {},
  queryParam: {
    Keyword: '',
    MovieType: '',
    OnlyRepeat: false,
    Page: 1,
    PageSize: 30,
    SortField: 'MTime',
    SortType: 'desc',
  },
  resultData: {},
  fullscreen: false
});


const optionsPC = reactive({
  width: '100%', //播放器高度
  height: 'auto', //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "", //视频源
  muted: false, //静音
  preload: "false",
  webFullScreen: false,
  speedRate: ["1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: true, //关灯模式
  currentTime: 10,
  volume: systemProperty.videoOptions.volume, //默认音量大小
  control: systemProperty.videoOptions.control, //是否显示控制
  controlBtns: systemProperty.videoOptions.controlBtns, //显示所有按钮,
});

const { dialogRef, onDialogHide } = useDialogPluginComponent()


const openDialog = (item) => {
  view.currentData = item
  optionsPC.src = getFileStream(item.Id)
  optionsPC.post = getJpg(item.Id)
  dialogRef.value.show()
  setTimeout(() => {
    vue3VideoPlayRef.value.play()
  }, 200);
}

const onOKClick = () => {
  view.fullscreen = !view.fullscreen
  console.log('onOKClick')
}

const onCancelClick = () => {
  console.log('onCancelClick')
  dialogRef.value.hide()
}

function getItemsPerPage() {
  if ($q.screen.lt.sm) {
    return 9
  }
  if ($q.screen.lt.md) {
    return 9
  }
  return 9
}

const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage()
})

watch(() => $q.screen.name, () => {
  pagination.value.rowsPerPage = getItemsPerPage()
})

const currentPageChange = (e) => {
  console.log('view.queryParam.Page', e)
  fetchSearch()
}


const fetchSearch = async () => {
  systemProperty.syncSearchParam(view.queryParam)
  localStorage.setItem("queryParam", JSON.stringify(view.queryParam))
  const { data } = await axios.post('/api/movieList', view.queryParam);
  console.log(data);
  view.resultData = data
};

const refreshIndexLoading = ref(false)
const refreshIndex = async () => {
  refreshIndexLoading.value = true
  const { Code, Message } = await axios.get('/api/refreshIndex');
  if (Code === '200') {
    $q.notify(Message)
  }
  refreshIndexLoading.value = false

};
const thisRoute = useRoute();


onMounted(() => {
  const { Page, PageSize, MovieType, SortField, SortType, Keyword, showStyle } =
    thisRoute.query;
  if (Page && PageSize) {
    view.queryParam.Page = Number(Page);
    view.queryParam.PageSize = Number(PageSize);
    view.queryParam.MovieType = MovieType;
    view.queryParam.SortField = SortField;
    view.queryParam.SortType = SortType;
    view.queryParam.Keyword = Keyword;
    view.queryParam.Keyword = Keyword;
    view.queryParam.showStyle = showStyle;
  } else {
    view.queryParam = JSON.parse(localStorage.getItem("queryParam"))
    // view.queryParam.Page = systemProperty.getSearchParam?.Page;
    // view.queryParam.PageSize = systemProperty.getSearchParam.PageSize;
    // view.queryParam.MovieType = systemProperty.getSearchParam.MovieType;
    // view.queryParam.SortField = systemProperty.getSearchParam.SortField;
    // view.queryParam.SortType = systemProperty.getSearchParam.SortType;
    // view.queryParam.Keyword = systemProperty.getSearchParam.Keyword;
    // view.queryParam.showStyle = systemProperty.getSearchParam.showStyle;
  }
  fetchSearch();
});

</script>
<style lang="scss" scoped>
.example-item {
  height: auto;
  width: 240px;
  max-height: 500px;
}

.item-img {
  max-height: 300px;
}
</style>