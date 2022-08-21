<script setup lang="ts">

import { onMounted, reactive } from 'vue'
import { ElCol, ElPagination, ElRadioButton, ElRadioGroup, ElRow, } from 'element-plus'
import { QueryActressList } from '@/api/actress'
import { useRouter } from 'vue-router'
import { useSystemProperty } from '@/store/System'
import { getActressImage } from '@/utils/ImageUtils'

const { push } = useRouter()
const systemProperty = useSystemProperty()
const view = reactive({
  CurCnt: 1,
  TotalCnt: 1,
  ResultCnt: 1,
  Page: 1,
  PageSize: 30,
  Keyword: '',
  SortType: 'desc',
  dataList: [],
  loading: false,
})
document.title = "图鉴";

const open = (name: string) => {
  systemProperty.setPage(1)
  systemProperty.setKeyword(name)
  systemProperty.setMovieType('')
  push('/filelist')
}

const pageLoading = (num: number) => {
  if (view.Page + num <= 0) {
    view.Page = 1
  }
  view.Page += num
  queryList()
}

const queryList = async () => {
  view.dataList = [];
  let data = {
    Page: view.Page,
    PageSize: view.PageSize,
    Keyword: view.Keyword,
    SortType: view.SortType,
  }
  view.loading = true;
  const res = await QueryActressList(data)
  if (res) {
    view.TotalCnt = res.TotalCnt;
    view.ResultCnt = res.ResultCnt;
    view.CurCnt = res.CurCnt;
    view.dataList = res.Data;
    view.loading = false;
  }
}
const handleSizeChange = (val) => {
  view.PageSize = val;
  queryList();
}
const handleCurrentChange = (val) => {
  view.Page = val;
  queryList();
}
onMounted(() => {
  queryList()
})
</script>

<template>
  <ElButton style="
        position: fixed;
        top: 600px;
        overflow: auto;
        z-index: 999;
        left: 20px;
      " round @click="pageLoading(-1)">上一页
  </ElButton>
  <ElButton style="
        position: fixed;
        top: 600px;
        overflow: auto;
        z-index: 999;
        right: 80px;
      " round @click="pageLoading(1)">下一页
  </ElButton>
  <ElRow :span="24">
    <ElCol :span="8" :offset="1"><span>
        扫描库：{{ view.TotalCnt }} 搜索：{{ view.ResultCnt }} 当前：{{
            view.CurCnt
        }}</span>
    </ElCol>
    <ElCol :span="3">
      <ElRadioGroup v-model="view.SortType" @change="queryList()" size="small">
        <ElRadioButton label="desc">倒</ElRadioButton>
        <ElRadioButton label="asc">正</ElRadioButton>
      </ElRadioGroup>
    </ElCol>
    <ElCol :span="6">
      <el-input placeholder="请输入内容" v-model="view.Keyword" clearable>
        <template #append>
          <ElButton slot="append" type="primary" size="small" icon="el-icon-search" @click="queryList()">Go!
          </ElButton>
        </template>
      </el-input>
    </ElCol>

  </ElRow>
  <div v-loading="view.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    style="margin-top: -10px">
    <ul class="infinite-list" style="overflow: auto">
      <li class="infinite-list list-item" v-for="item in view.dataList" :key="item.Id">
        <div v-if="item" class="img-list-item" @click="open(item.Name)">
          <el-link>
            <el-badge :value="item.Cnt">
              <el-image :src="getActressImage(item.JpgUrl)" lazy round></el-image>
            </el-badge>
          </el-link>
          {{ item.Name ? item.Name : "" }} 【{{ item.SizeStr }}】
        </div>
      </li>
    </ul>
  </div>
  <ElPagination class="pageTool" :page-sizes="[5, 7, 10, 12, 14, 30, 60, 90, 200]" :page-size="view.PageSize"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total,prev, pager, next, sizes"
    :current-page="view.Page" :total="view.ResultCnt" />
</template>

<style>
.list-item {
  margin-top: 8px;
  width: 168px;
  height: 250px;
  float: left;
  list-style: none;
  font-size: 12px;
}

.img-list-item {
  width: 150px;
  height: auto;
}

.up {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}

.pageTool {
  position: fixed;
  bottom: 1px;
  overflow: auto;
  z-index: 999;
}

.pagination {
  align-content: center;
  position: fixed;
  bottom: 0px;
  overflow: auto;
  z-index: 999;
}
</style>