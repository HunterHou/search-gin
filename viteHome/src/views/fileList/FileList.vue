

<template>
  <div class="searchRow">
    <ElRow :span="24">
      <ElCol :span="1">
        <ElLink style="color: green">
          <i :underline="true" class="el-icon-zoom-out" title="重复" @click="onlyRepeatQuery()">重</i>
        </ElLink>
      </ElCol>
      <ElCol :span="2">
        <ElRadioGroup v-model="queryParam.SortField" @change="queryList" size="small">
          <ElRadioButton label="Code">名</ElRadioButton>
          <ElRadioButton label="MTime">时</ElRadioButton>
          <ElRadioButton label="Size">容</ElRadioButton>
        </ElRadioGroup>
      </ElCol>
      <ElCol :span="2">
        <ElRadioGroup v-model="queryParam.SortType" @change="queryList" size="small">
          <ElRadioButton label="desc">倒</ElRadioButton>
          <ElRadioButton label="asc">正</ElRadioButton>
        </ElRadioGroup>
      </ElCol>
      <ElCol :span="5">
        <ElRadioGroup v-model="queryParam.MovieType" @change="queryList" size="small">
          <ElRadioButton label="">~</ElRadioButton>
          <ElRadioButton label="骑兵">骑</ElRadioButton>
          <ElRadioButton label="步兵">步</ElRadioButton>
          <ElRadioButton label="国产">国</ElRadioButton>
          <ElRadioButton label="斯巴达">欧</ElRadioButton>
        </ElRadioGroup>
      </ElCol>

      <ElCol :span="5">
        <ElAutocomplete id="searchInput" style="min-width: 80px; width: auto" placeholder="请输入关键词"
          v-model="queryParam.Keywords" clearable size="small" @keyup.enter.native="queryList">
          <template #append>
            <ElButton slot="append" type="primary" size="small" icon="el-icon-search" @click="
              () => {
                queryParam.Page = 1;
                queryList();
              }
            ">Enter
            </ElButton>
          </template>
          <!-- <template slot-scope="{ item }">
              <div v-if="item" class="name">{{ item }}</div>
            </template> -->
        </ElAutocomplete>
      </ElCol>
    </ElRow>
    <ElRow style="margin-top: 4px">
      <ElCol :span="3" :offset="1">
        <el-radio-group v-model="showStyle" size="small">
          <el-radio-button label="cover">封面</el-radio-button>
          <el-radio-button label="post">海报</el-radio-button>
        </el-radio-group>
      </ElCol>

      <ElCol :span="12">
        <span v-if="!running" style="color: red">运行异常</span>
        <el-divider v-if="!running" direction="vertical"></el-divider>
        <el-link :underline="false" @click="
          (e) => {
            queryParam.Page = 1;
            queryParam.Keywords = '';
            queryList();
          }
        ">
          <span> 总：{{ view.TotalSize }}({{ view.TotalCnt }}) </span>
        </el-link>

        <el-divider direction="vertical"></el-divider>
        <span> 搜：{{ view.ResultSize }}({{ view.ResultCnt }}) </span>
        <el-divider direction="vertical"></el-divider>
        <span> 页：{{ view.CurSize }}({{ view.CurCnt }})</span>
        <el-divider direction="vertical"></el-divider>
      </ElCol>
    </ElRow>
  </div>
  <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    style="margin-top: 8px; min-height: 600px">
    <li :class="isShowCover() ? 'list-item-cover' : 'list-item'" v-for="item in view.modelList" :key="item.Id">
      <el-card class="ecard" shadow="always" :body-style="{
        padding: '0px',
        margin: '4px 2px',
        background: item.MovieType ? '' : 'rgb(205, 138, 50)',
      }">

        <div v-if="item" :class="isShowCover() ? 'img-list-item-cover' : 'img-list-item'">
          <el-image style="width: 100%; height: 100%" :src="isShowCover() ? getJpg(item.Id) : getPng(item.Id)"
            @click="openInfoWindow(item.Id)" fit="contain" lazy />
        </div>
        <div class="image-tool">
          <el-button type="primary" plain class="icon-button" title="播放" @click="playThis(item.Id)">
            <el-icon>
              <VideoPlay />
            </el-icon>
          </el-button>
          <el-button type="warning" plain class="icon-button" title="优优" @click="thisActress(item.Actress)">
            <el-icon>
              <UserFilled />
            </el-icon>
          </el-button>
          <el-button type="success" plain class="icon-button" title="文件夹" @click="openThisFolder(item.Id, 2)">
            <el-icon>
              <FolderOpened />
            </el-icon>
          </el-button>
          <el-button plain type="success" class="icon-button " title="编辑" @click="editItem(item)">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>

          <el-button type="danger" plain class="icon-button" title="删除" @click="deleteThis(item.Id, 2)">
            <el-icon>
              <DeleteFilled />
            </el-icon>
          </el-button>
          <el-button type="danger" plain class="icon-button" title="刮图" @click="getImageList(item.Id)">
            <el-icon>
              <Download />
            </el-icon>
          </el-button>
          <el-button type="danger" plain class="icon-button" title="同步" @click="syncThis(item.Id)">
            <el-icon>
              <Refresh />
            </el-icon>
          </el-button>

          <el-button type="info" plain class="icon-button"
            v-if="7 < view.showIconNum && notQiBing(item.MovieType)" title="骑兵" @click="setMovieType(item.Id, 2)">
            <el-icon>
              <Bicycle />
            </el-icon>
          </el-button>
          <el-button plain type="info" class="icon-button"
            v-if="notBuBing(item.MovieType) && 7 < view.showIconNum" title="步兵" @click="setMovieType(item.Id, 1)">
            <el-icon>
              <Sunny />
            </el-icon>
          </el-button>
          <el-button plain type="info" class="icon-button" v-if="notNative(item.MovieType) && 7 < view.showIconNum"
            title="国产" @click="setMovieType(item.Id, 4)">
            <el-icon>
              <Location />
            </el-icon>
          </el-button>
          <el-button plain type="info" class="icon-button" v-if="notSiBaDa(item.MovieType) && 7 < view.showIconNum"
            title="欧美" @click="setMovieType(item.Id, 3)">
            <el-icon>
              <Ship />
            </el-icon>
          </el-button>

          <el-link>
            <el-dropdown placement="top-start" v-if="7 > view.showIconNum">
              <i class="el-icon-more icon-style"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="notQiBing(item.MovieType)">
                  <el-link>
                    <i class="el-icon-bicycle icon-style" title="骑兵" @click="setMovieType(item.Id, 2)">骑兵</i>
                  </el-link>
                </el-dropdown-item>

                <el-dropdown-item v-if="notBuBing(item.MovieType)">
                  <i class="icon-style" title="步兵" @click="setMovieType(item.Id, 1)">步兵</i>
                </el-dropdown-item>
                <el-dropdown-item v-if="notNative(item.MovieType)">
                  <el-link>
                    <i :underline="false" class="icon-style" title="国产" @click="setMovieType(item.Id, 4)">国产</i>
                  </el-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="notSiBaDa(item.MovieType)">
                  <el-link>
                    <i :underline="false" class="icon-style" title="欧美" @click="setMovieType(item.Id, 3)">欧美</i>
                  </el-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="7 > view.showIconNum">
                  <i class="el-icon-refresh-right icon-style" title="信息" @click="infoThis(item.Id)">信</i>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-link>

          <div class="context-text" style="font-size: 13px">
            <el-link v-if="item.Actress" style="color: green" @click="copy(item.Actress)">{{ item.Actress }}</el-link>
            <el-link v-if="item.Code" style="color: orange" @click="copy(item.Code)">{{ item.Code }}</el-link>
            <el-popover placement="top" width="460" trigger="hover" :close-delay="1">
              <el-link v-if="item.Actress" style="color: green" @click="copy(item.Actress)">{{ item.Actress }}</el-link>
              <el-divider v-if="item.Actress" direction="vertical"></el-divider>
              <el-link v-if="item.Code" style="color: orange" @click="copy(item.Code)">{{ item.Code }}</el-link>
              <el-divider v-if="item.Code" direction="vertical"></el-divider>
              【{{ item.SizeStr }}】
              {{ dateFormat(item.MTime, "yyyy-MM-DD HH:MM") }}
              <hr />
              <span style="
                    margin-buttom: 30px;
                    margin-top: 30px;
                    margin-left: 30px;
                    margin-right: 30px;
                  ">
                {{ item.Name }}</span>
              <span slot="reference" style="color: red">
                【{{ item.SizeStr }}】
              </span>
            </el-popover>
            {{ item.Name }}
          </div>
        </div>
      </el-card>
    </li>
     <ElPagination
      class="pageTool"
      v-model:currentPage="queryParam.Page"
      v-model:page-size="queryParam.PageSize"
      :page-sizes="[12, 14, 30, 50,200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="view.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

</template>
<script setup lang="ts">
import {
  FindFileInfo,
  QueryFileList,
  QueryDirImageBase64,
  PlayMovie,
  OpenFileFolder,
  HeartBeatQuery,
  DeleteFile,
  DownImageList,
  SyncFileInfo,
  ResetMovieType,
  RefreshIndex
} from '../../api/file'
import { onMounted, reactive, ref } from 'vue'
import { ElRow, ElCol, ElLink, ElRadioGroup, ElRadioButton, ElMessage, ElMessageBox,ElPagination } from 'element-plus';
import { MovieQuery, MovieModel } from '.';
import { dateFormat } from '../../utils/timeUtils';

const running = ref(true)
const loading = ref(false)
const showStyle = ref('post')

const view = reactive<any>({
  file: new MovieModel(),
  showIconNum: 6,
  modelList: [],
  totalCount: 0
})
const queryParam = reactive<MovieQuery>(new MovieQuery())

const queryList = async (params?: any) => {
  const res = await QueryFileList(queryParam)

  if (res) {
    console.log(res)
    view.modelList = res.Data
    view.totalCount = res.TotalCnt
    view.ResultCnt = res.ResultCnt
    view.TotalCnt = res.TotalCnt
    view.CurCnt = res.CurCnt
    view.TotalPage = res.TotalPage
    view.TotalSize = res.TotalSize
    view.ResultSize = res.ResultSize
    view.CurSize = res.CurSize
  }
}
const onlyRepeatQuery = () => {
  queryParam.OnlyRepeat = true
  queryList()
}

const isShowCover = () => {
  if (showStyle.value == "cover") {
    view.showIconNum = 10;
    return true;
  }
  view.showIconNum = 6;
  return false;
}
const getPng = (Id: string) => {
  return "http://127.0.0.1:8082/api/png/" + Id;
}
const getJpg = (Id: string) => {
  return "http://127.0.0.1:8082/api/jpg/" + Id;
}
const openInfoWindow = async (id: string) => {
  const res = await FindFileInfo(id)
  view.sourceList = [];
  if (res.Code === 200) {
    view.file = res.Data;
    view.dialogVisible = true;
    loadDirInfo(view.file.Id, true);
  }
}

const loadDirInfo = async (id: string, loading: boolean) => {
  const res = await QueryDirImageBase64(id)
  if (res.Data && res.Data.length > 0) {
    view.imageList = [];
    for (let i = 0; i < res.Data.length; i++) {
      if (res.Data[i].FileType == "jpg") {
        view.imageList.push(res.Data[i].ImageBase);
      }
    }
    if (loading) {
      view.sourceList = view.imageList;
    }
  }
}

const playThis = async (id: string) => {
  const res = await PlayMovie(id)
  if (res.Code === 200) {
    ElMessage.success(res.Message)
  } else {
    ElMessage.error(res.Message)
  }
}

const syncThis = async (id: string) => {
  const res = await SyncFileInfo(id)
  if (res.Code === 200) {
    ElMessage.success(res.Message)
  } else {
    ElMessage.error(res.Message)
  }
}

const setMovieType = async (id: string, typeId: number) => {
  const movieType =
    (typeId == 4
      ? "国产"
      : typeId == 3
        ? "斯巴达"
        : typeId == 1
          ? "步兵"
          : "骑兵");
  const res = await ResetMovieType(id, movieType)
  if (res.Code === 200) {
    ElMessage.success(res.Message)
  } else {
    ElMessage.error(res.Message)
  }
}

const refreshIndex = async () => {
  view.refreshIndexFlag = true
  const res = await RefreshIndex()
  if (res.Code === 200) {
    view.refreshIndexFlag = false
    ElMessage.success(res.Message)
  }
}

const thisActress = async (actress: string) => {
  queryParam.Keywords = actress
  queryParam.Page = 1
  queryList()
}

const openThisFolder = async (id: string, a?: number) => {
  const res = await OpenFileFolder(id)
  if (res.Code === 200) {
    ElMessage.success(res.Message)
  }
}

const heartBeat = async () => {

  HeartBeatQuery().then((res) => {
    if (res.Code == 200) {
      running.value = true;
    } else {
      running.value = false;
      ElMessage.error('系统意外关闭，请重启')
    }
  }).catch(() => {
    running.value = false;
    ElMessage.error('系统意外关闭，请重启')
  })

}

const editItem = (item: MovieModel) => {
  view.formItem = item;
  view.dialogFormItemVisible = true;
}

const deleteThis = async (id: string, a?: number) => {
  ElMessageBox.alert('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    callback: async () => {
      await DeleteFile(id).then((res) => {
        if (res.Code === 200) {
          ElMessage.success(res.Message)
        }
      }).catch(() => {
        ElMessage.error('已取消删除')
      })

    }
  })

}

const getImageList = async (params: string) => {
  const res = await DownImageList(params)
  if (res.Code === 200) {
    ElMessage.success(res.Message)
  }
}

const infoThis = async (id: string) => {
  const res = await FindFileInfo(id)
  if (res.Code === 200) {
    ElMessage.success(res.Message)
  }
}


const notQiBing = async (movieType: string) => {
  if (movieType != "骑兵") {
    return true;
  }
  return false;
}


const notSiBaDa = async (movieType: string) => {
  if (movieType != "斯巴达") {
    return true;
  }
  return false;
}
const notNative = async (movieType: string) => {
  if (movieType != "国产") {
    return true;
  }
  return false;
}

const notBuBing = async (movieType: string) => {
  if (movieType != "步兵") {
    return true;
  }
  return false;
}

const copy = async (params: string) => {
  console.log(params)

}

const handleCurrentChange=(page:number)=>{
  queryParam.Page = page
  queryList()
}
const handleSizeChange=(pageSize:number)=>{
  queryParam.PageSize = pageSize
  queryList()
}

setInterval(heartBeat, 10000);

queryList()
onMounted(() => {
  
})

</script>

<style scoped>
.container-body {
  min-width: 600px;
  min-height: 600px;
  height: 100%;
  padding: 1px;
  margin-bottom: 20px;
}

.floatButton {
  float: right;
  position: fixed;
  width: 90px;
  top: 320px;
  overflow: auto;
  z-index: 999;
}

.image-tool {
  margin-top: 3px;
  margin-bottom: 1px;
}

.redbackground {
  background-color: rgb(205, 138, 50);
}

.icon-style {
  font-size: 18px;
  color: red;
  margin-left: 2px;
}

.context-text {
  font-size: 14px;
  font-size-adjust: inherit;
  margin-right: 4px;
  margin-left: 4px;
  position: relative;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.popperClass {
  height: auto;
  width: 400px;
}

.ecard {
  margin-left: 6px;
  padding: 0;
  background: #e4e6d1;
}

.list-item {
  width: 238px;
  height: 358px;
  float: left;
  list-style: none;
}

.image-tag {
  position: fixed;
}

.img-list-item {
  width: auto;
  height: 270px;
}

.list-item-cover {
  width: 420px;
  height: 358px;
  float: left;
  list-style: none;
}

.img-list-item-cover {
  width: auto;
  height: 270px;
}

.pageTool {
  position: fixed;
  bottom: 4px;
  overflow: auto;
  z-index: 999;
  margin-bottom: 8px;
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

.tag-area {
  position: absolute;
  z-index: 999;
  opacity: 1;
}

.tag-buttom {
  margin-left: 144px;
  filter: alpha(opacity=100);
  opacity: 1;
  position: absolute;
  z-index: 999;
  margin-top: 2px;
  float: right;
  text-align: justify;
  text-align-last: justify;
}

.tag-buttom-cover {
  margin-left: 344px;
  filter: alpha(opacity=100);
  opacity: 1;
  position: absolute;
  z-index: 999;
  margin-top: 2px;
  float: right;
  text-align: justify;
  text-align-last: justify;
}

.tag-area span {
  filter: alpha(opacity=90);
  opacity: 0.9;
  background: #94df71;
  margin-bottom: 8px;
  z-index: 99;
  height: 23px;
  color: #000;
  line-height: 20px;
}

v-deep .el-tooltip__popper {
  width: 300px;
  height: 40px;
}

.icon-button {
  margin: 0px 0px;
  padding: 0;
  width: 24px;
  height: 24px;
  font-size: 16px;
  /* color: red; */
  text-align: center;
}

.mainButtomFloat {
  top: 0px;
  opacity: 1;
  position: fixed;
  z-index: 9999;
  width: 100%;
  background: #b8aeae;
}

.mainButtomRowFloat {
  margin: 8px auto;
}

.right-font {
  font-size: 16px;
}
</style>