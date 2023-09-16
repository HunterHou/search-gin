<template>
  <div class="q-mg-md" style="margin-bottom: 60px;">
    <div class="row justify-center q-gutter-sm">
      <q-btn :loading="refreshIndexLoading" color="red" @click="refreshIndex">
        扫描
        <template v-slot:loading>
          执行中
        </template>
      </q-btn>
      <q-btn-toggle v-model="view.queryParam.SortField" @update:model-value="fetchSearch()" toggle-color="primary"
        :options="[
          { label: '时', value: 'MTime' },
          { label: '容', value: 'Size' },
          { label: '名', value: 'Code' }
        ]" />
      <q-btn-toggle v-model="view.queryParam.SortType" @update:model-value="fetchSearch()" toggle-color="primary"
        :options="[
          { label: '正', value: 'asc' },
          { label: '倒', value: 'desc' }
        ]" />

      <q-btn-toggle v-model="view.queryParam.MovieType" @update:model-value="fetchSearch()" toggle-color="primary"
        :options="MovieTypeSelects" />
      <q-input label="..." v-model="view.queryParam.Keyword" :dense="true" filled clearable
        @update:model-value="fetchSearch()" />
      <q-checkbox v-model="view.queryParam.OnlyRepeat" @update:model-value="fetchSearch()" label="重" />
    </div>
    <q-page-sticky position="bottom" style="z-index: 9;background-color: rgba(0, 0, 0, 0.3);">
      <div class="q-pa-sm flex flex-center">
        <q-select color="lime-11 q-mr-md" bg-color="green" dense
          @update:model-value="(no) => { view.queryParam.PageSize = Number(no); fetchSearch() }" filled
          v-model="view.queryParam.PageSize" :options="[10, 20, 30, 50, 200]">
        </q-select> <q-pagination v-model="view.queryParam.Page" @update:model-value="currentPageChange"
          color="deep-orange" :ellipses="true" :max="view.resultData.TotalPage || 0" :max-pages="10"
          boundary-numbers>12313</q-pagination>
        <q-input v-model="view.queryParam.Page" :dense="true"
          style="background-color: aliceblue;width: 60px;text-align: center;"
          @update:model-value="(no) => { view.queryParam.Page = Number(no); fetchSearch() }" />
      </div>
    </q-page-sticky>

    <div class="row justify-center q-gutter-sm q-mr-sm">
      <q-card class="q-ma-sm example-item" v-for="item  in view.resultData.Data" :key="item.Id">
        <q-img fit="cover" easier draggable :src="getPng(item.Id)" class="item-img" @click="openDialog(item)">
          <div
            style="padding:0;margin:0;background-color: rgba(0, 0, 0, 0);display: flex;flex-direction: row;justify-content: space-between;width: 100%;">
            <div @click.stop="() => { }"
              style="display: flex;flex-direction: column;justify-content: flex-start;width: fit-content;">
              <q-chip square text-color="white"
                style="margin-left: 0px;padding: 0 4px;background-color: rgba(236, 15, 15, 0.872)">
                <span>种草</span>
              </q-chip>
              <q-chip square text-color="white" v-for="tag in item.Tags" :key="tag"
                style="margin-left: 0px;padding: 0 4px;background-color: rgba(188, 24, 24, 0.6)">
                <span @click="view.queryParam.Keyword = tag; fetchSearch()">{{ tag }}</span>
              </q-chip>
            </div>
            <div>
              <q-btn-dropdown style="background-color: rgba(0, 0, 0, 0.8);" :label="item.MovieType"
                @click.stop="() => { }">
                <q-list>
                  <q-item v-for="mt in MovieTypeOptions" :key="mt.value" v-close-popup>
                    <q-item-section @click="setMovieType(item.Id, mt.value)">
                      <q-item-label>{{ mt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>




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
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getPng } from '../../components/utils/images';
import { ResetMovieType, RefreshAPI, SearchAPI } from '../../components/api/searchAPI';
import { useSystemProperty } from '../../stores/System';

import { useClipboard } from '@vueuse/core'

const source = ref('Hello')
const { copy } = useClipboard({ source })


const systemProperty = useSystemProperty();

const $q = useQuasar()
const view = reactive({
  currentData: {},
  queryParam: {
    Keyword: '',
    MovieType: '',
    OnlyRepeat: false,
    Page: 1,
    PageSize: 10,
    SortField: 'MTime',
    SortType: 'desc',
  },
  resultData: {},
  fullscreen: false
});



const MovieTypeOptions = [
  ,
  { label: '骑兵', value: '骑兵' },
  { label: '步兵', value: '步兵' },
  { label: '国产', value: '国产' },
  { label: '斯巴达', value: '斯巴达' },
  { label: '漫动', value: '漫动' },
];

const MovieTypeSelects = [{ label: '全部', value: '' }, ...MovieTypeOptions,
{ label: '无', value: '无' }]


const openDialog = (item) => {
  view.currentData = item
  systemProperty.Playing = item
  systemProperty.drawerRight = true
}


const currentPageChange = (e) => {
  console.log('view.queryParam.Page', e)
  fetchSearch()
}


const fetchSearch = async () => {
  systemProperty.syncSearchParam(view.queryParam)
  localStorage.setItem('queryParam', JSON.stringify(view.queryParam))

  const data = await SearchAPI(view.queryParam);
  console.log(data)
  view.resultData = data
};

const refreshIndexLoading = ref(false)
const refreshIndex = async () => {
  refreshIndexLoading.value = true
  const { Code, Message } = await RefreshAPI('/api/refreshIndex');
  if (Code === '200') {
    $q.notify({ type: 'negative', message: Message })
    fetchSearch()
  }
  refreshIndexLoading.value = false

};

const setMovieType = async (Id, Type) => {
  const { Code, Message } = await ResetMovieType(Id, Type)
  if (Code === '200') {
    $q.notify({ type: 'negative', message: Message })
  } else {
    $q.notify({ type: 'warning', message: Message })
  }
}

const thisRoute = useRoute();


onMounted(() => {
  const { Page, PageSize, MovieType, SortField, SortType, Keyword, showStyle, from } =
    thisRoute.query;
  console.log(from)
  if (Page && PageSize) {
    view.queryParam.Page = Number(Page);
    view.queryParam.PageSize = Number(PageSize);
    view.queryParam.MovieType = MovieType;
    view.queryParam.SortField = SortField;
    view.queryParam.SortType = SortType;
    view.queryParam.Keyword = Keyword;
    view.queryParam.Keyword = Keyword;
    view.queryParam.showStyle = showStyle;
  }
  else {
    if (from == 'index') {
      const piniaParam = systemProperty.FileSearchParam
      if (piniaParam) {
        console.log('piniaParam', piniaParam)
        view.queryParam = piniaParam
      }
    } else {
      const storage = JSON.parse(localStorage.getItem('queryParam'));
      if (storage) {
        console.log('storage', storage)
        view.queryParam = storage
      }
    }
  }
  fetchSearch();
});

</script>
<style lang="scss" scoped>
.example-item {
  width: 240px;
  height: auto;
  max-height: 400px;
  overflow: hidden;
}

.item-img {
  height: auto;
  max-height: 300px;
}
</style>