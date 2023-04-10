<template>
  <div class="mainBody">
    <NavBar title="图鉴">
      <template #left>
        <div>
          <span> 总数:{{ view.TotalCnt }} </span>
        </div>
      </template>
      <template #right>
        <div @click="showSearch = true">
          {{}}
          <Icon name="search" size="18" />
          <span> {{ view.queryParam.Keyword }} </span>
        </div>
      </template>
    </NavBar>
    <ActionSheet v-model:show="showSearch" title="搜索" :close-on-click-overlay="true">
      <Search
        v-model="view.queryParam.Keyword"
        placeholder="请输入搜索"
        label="关键词"
        show-action
        input-align="center"
        @search="onSearch"
        @update:model-value="keywordUpdate"
        @cancel="onCancel"
      >
        <template #action>
          <div style="margin: 2px 4px" @click="onCancel">搜索</div>
        </template>
      </Search>
    </ActionSheet>
    <MobileBar></MobileBar>
    <PullRefresh
      v-model="refreshing"
      @refresh="
        () => {
          view.queryParam.Page = 1
          onSearch()
          refreshing = false
        }
      "
    >
      <div class="actressDiv">
        <div v-for="item in view.ModelList" :key="item.Id">
          <div class="actressDivItem" @click="gotoSearch(item.Name)">
            <Image :src="getActressImage(item.Name)"> </Image>
            <Row class="actressDivButtom">
              <Col>
                <Tag color="#7232dd" style="height: 100%"> {{ item.Name }}</Tag>
              </Col>
              <Col>
                <Tag color="orange" style="height: 100%"> {{ item.SizeStr }}</Tag>
              </Col>
              <Col>
                <Tag color="red" style="height: 100%"> {{ item.Cnt }}</Tag>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </PullRefresh>
    <LoadMoreVue :more="true" @loadMore="onLoadMore" />
  </div>
</template>

<script setup lang="ts">
import { QueryActressList } from '@/api/actress'
import { ResultList } from '@/config/ResultModel'
import { useSystemProperty } from '@/store/System'
import { getActressImage } from '@/utils/ImageUtils'
import { ActionSheet, Button, Col, Icon, Image, NavBar, PullRefresh, Row, Search, Tag } from 'vant'
import 'vant/lib/index.css'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MovieQuery } from '../fileList'
import MobileBar from './MobileBar.vue'
import LoadMoreVue from './LoadMore.vue'

const systemProperty = useSystemProperty()

const { push } = useRouter()

const loadingList = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const view = reactive({
  queryParam: {
    Page: 1,
    PageSize: 30,
    SortField: 'MTime',
    SortType: 'desc',
    MovieType: '',
    Keyword: ''
  } as unknown as MovieQuery,
  loadCnt: 0,
  ModelList: [],
  TotalCnt: 0,
  ResultCnt: 0
})

const showSearch = ref(false)

const onLoadMore = async () => {
  view.queryParam.Page += 1
  await queryList()
}

const gotoSearch = (actress: string) => {
  systemProperty.setKeyword(actress)
  systemProperty.setPage(1)
  push('/mfilelist')
}
const searchKeyword = (words: string) => {
  view.queryParam.Keyword = words
  view.queryParam.Page = 1
  onSearch()
}
const queryList = async (pageStart?: number) => {
  const queryParam = { ...view.queryParam }
  if (pageStart > 0) {
    queryParam.Page = pageStart
    queryParam.PageSize = 1
  }
  const res = await QueryActressList(queryParam)
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
  })
  const newList = [...view.ModelList, ...model.Data]
  view.ModelList = newList
  view.TotalCnt = model.TotalCnt
  view.ResultCnt = model.ResultCnt
  view.loadCnt = view.loadCnt + model.Data.length
  refreshing.value = false
  loadingList.value = false
}

const onSearch = async (clear?: boolean) => {
  view.queryParam.Page = 1
  view.ModelList = []
  view.loadCnt = 0
  await queryList()
}
const onCancel = async () => {
  await onSearch()
}
const keywordUpdate = () => {
  if (view.queryParam.Keyword.length >= 2) {
    view.queryParam.Page = 1
    onSearch()
  }
}
onMounted(() => {
  const { currentRoute } = useRouter()
  onSearch()
})
</script>
<style>
.mainBody {
  width: 100%;
  position: absolute;
  display: block;
}

.actressDiv {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 99%;
  text-align: center;
}

.actressDivItem {
  border-radius: 3%;
  overflow: hidden;
  position: relative;
  max-width: 45vw;
  width: auto;
  margin: 4px 4px;
}

.actressDivButtom {
  margin-top: -40px;
}

.mlist {
  float: none;
  z-index: 99;
  width: 100%;
}
</style>
