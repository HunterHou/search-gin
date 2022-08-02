<template>
  <ElBacktop :bottom="100" style="width: 50px; height: 50px">
    <div class="up">UP</div>
  </ElBacktop>
  <ElButton style="
        position: fixed;
        top: 640px;
        overflow: auto;
        z-index: 999;
        left: 5px;
      " size="small" type="danger" round v-if="!loading && view.ResultCnt > queryParam.PageSize"
    @click="pageLoading(-1)"><i class="el-icon-back"></i>上一頁
  </ElButton>
  <!-- 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40 -->
  <ElButton v-if="!loading && view.ResultCnt > queryParam.PageSize" style="
        position: fixed;
        top: 640px;
        overflow: auto;
        z-index: 999;
        right: 5px;
      " size="small" type="danger" round @click="pageLoading(1)">下一頁<i class="el-icon-right"></i>
  </ElButton>
  <div class="searchRow">
    <ElRow :span="24">
      <ElCol :span="2">
        <ElButton type="success" size="small" :loading-icon="Eleme" :loading="refreshIndexFlag" @click="refreshIndex()">
          扫 描
        </ElButton>
        <ElPopover placement="bottom-end" v-model="view.settingInfoShow" width="800px" trigger="click">
          <template #reference>
            <ElLink> ({{ view.settingInfo.DirsCnt }})</ElLink>
          </template>
          <template #default>
            <h1 align="center">索引配置</h1>
            <div style="margin: 2px 2px">
              <ElRow>
                <ElCol :span="20">
                  <ElRow>
                    <ElCol :span="4">
                      <span>视频类型：</span>
                    </ElCol>
                    <ElCol :span="20">
                      <ElSelect v-model="view.settingInfo.VideoTypes" multiple placeholder="请选择" style="width: 90%">
                        <ElOption v-for="item in view.settingInfo.Types" :key="item" :label="item" :value="item">
                        </ElOption>
                      </ElSelect>
                    </ElCol>
                  </ElRow>
                  <ElRow>
                    <ElCol :span="4">
                      <span>扫描路径：</span>
                    </ElCol>
                    <ElCol :span="20">
                      <el-checkbox size="small" :indeterminate="view.isIndeterminateDir" v-model="view.settingCheckAll"
                        @change="handleCheckAllChange">全选
                      </el-checkbox>
                      <el-checkbox-group v-model="view.settingInfo.Dirs" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="dir in view.settingInfo.DirsLib" :label="dir" :key="dir">{{ dir }}
                        </el-checkbox>
                      </el-checkbox-group>
                    </ElCol>
                  </ElRow>
                </ElCol>
                <ElCol :span="4">
                  <ElButton type="primary" style="height: 50px; width: 120px" @click="settingSubmit">提 交</ElButton>
                </ElCol>
              </ElRow>
            </div>
          </template>
        </ElPopover>
      </ElCol>
      <ElCol :span="1">
        <ElLink style="color: green">
          <i :underline="true" class="ElIcon-zoom-out" title="重复" @click="onlyRepeatQuery()">重</i>
        </ElLink>
      </ElCol>
      <ElCol :span="3">
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
          v-model="queryParam.Keyword" clearable size="small" @change="keywordChange" @select="selectSuggestion"
          :fetch-suggestions="fetchSuggestion" @keyup.enter.native="queryList">
          <template #append>
            <ElButton slot="append" type="primary" size="small" icon="ElIcon-search" @click="
              () => {
                queryParam.Page = 1;
                queryList();
              }
            ">Enter
            </ElButton>
          </template>
          <template #default="{ item }">
            <div class="value">{{ item }}</div>
          </template>
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
        <ElDivider v-if="!running" direction="vertical"></ElDivider>
        <ElLink :underline="false" @click="
          (e) => {
            queryParam.Page = 1;
            queryParam.Keyword = '';
            queryList();
          }
        ">
          <span> 总：{{ view.TotalSize }}({{ view.TotalCnt }}) </span>
        </ElLink>

        <ElDivider direction="vertical"></ElDivider>
        <span> 搜：{{ view.ResultSize }}({{ view.ResultCnt }}) </span>
        <ElDivider direction="vertical"></ElDivider>
        <span> 页：{{ view.CurSize }}({{ view.CurCnt }})</span>
        <ElDivider direction="vertical"></ElDivider>
      </ElCol>
    </ElRow>
  </div>
  <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="ElIcon-loading"
    style="margin-top: 4px; min-height: 700px">
    <li :class="isShowCover() ? 'list-item-cover' : 'list-item'" v-for="item in view.ModelList" :key="item.Id">


      <div class="tag-area">
    <li v-for="tag in item.Tags" :key="tag">
      <el-tag closable effect="dark" :size="isShowCover() ? 'small' : 'small'" @close="closeTag(item.Id, tag)">
        <el-link :underline="false" plain @click="gotoSearch(tag)">
          <span> {{ tag }}</span>
        </el-link>
      </el-tag>
    </li>
  </div>
  <ElPopover placement="bottom-start" width="auto" v-model="view.addTagShow" trigger="click" :auto-close="0">
    <template #reference>
      <ElButton :class="isShowCover() ? 'tag-buttom-cover' : 'tag-buttom'" :size="isShowCover() ? 'small' : 'small'"
        type="warning" @click="() => {
          view.addTagShow = !view.addTagShow
        }">
        <b>
          {{ item.MovieType ? item.MovieType : "无" }}
        </b>
      </ElButton>
    </template>
    <template #default>
      <div v-if="item.MovieType != ''" style="max-width: 300px">
        <ElButton size="small" type="warning" plain v-for="tag in view.settingInfo.Tags" :key="tag"
          style="margin: 1px 2px" :disabled="!notContainTag(item.Tags, tag)" @click="addTag(item.Id, tag)">
          <span style="font-size: 12px">{{ tag }}</span>
        </ElButton>
        <br /><br />
        <ElAutocomplete placeholder="新标签" v-model="view.customerTag" :fetch-suggestions="fetchTagsLib"
          @select="handleSelectTag" size="small" style="width: 240px">
          <template #append>
            <ElButton size="small" type="primary" :disabled="customerTagEmpty()" @click="addCustomerTag(item.Id)"
              style="font-size: 14px">加
            </ElButton>
          </template>
          <template #default="{ item }">
            <div v-if="item" style="font-size: 14px" class="value">
              {{ item }}
            </div>
          </template>
        </ElAutocomplete>
      </div>
      <div v-if="item.MovieType == ''" style=" float: right">
        <ElButton plain size="small" @click="setMovieType(item.Id, 2)">
          <i class="el-icon-bicycle icon-style" title="骑兵">骑兵</i>
        </ElButton>
        <ElButton plain size="small" @click="setMovieType(item.Id, 1)">
          <i class="el-icon-sunny icon-style" title="步兵">步兵</i>
        </ElButton>
        <ElButton plain size="small" @click="setMovieType(item.Id, 4)">
          <i class="el-icon-location icon-style" title="国产">国产</i>
        </ElButton>
        <ElButton plain size="small" @click="setMovieType(item.Id, 3)">
          <i class="el-icon-ship icon-style" title="欧美">斯巴达</i>
        </ElButton>
      </div>
    </template>

  </ElPopover>
  <el-card class="ecard" shadow="always" :body-style="{
    padding: '0px',
    margin: '4px 2px',
    background: item.MovieType ? '' : 'rgb(205, 138, 50)',
  }">

    <div v-if="item" :class="isShowCover() ? 'img-list-item-cover' : 'img-list-item'">

      <!-- <el-popover title="Title" :width="200" trigger="contextmenu" placement="right"
        content="this is content, this is content, this is content">
        <template #reference>
          <el-image style="width: 100%; height: 100%" :src="isShowCover() ? getJpg(item.Id) : getPng(item.Id)"
            @click="openInfoWindow(item.Id)" fit="contain" lazy />
        </template>
      </el-popover> -->
      <el-image style="width: 100%; height: 100%" :src="isShowCover() ? getJpg(item.Id) : getPng(item.Id)"
        @click="openInfoWindow(item.Id)" @contextmenu.prevent.native="() => {
          openInfoWindow(item.Id)
        }" fit="contain" lazy />
    </div>
    <div class="image-tool">
      <ElButton type="primary" plain class="icon-button" title="播放" @click="playThis(item.Id)">
        <ElIcon>
          <VideoPlay />
        </ElIcon>
      </ElButton>
      <ElButton type="warning" plain class="icon-button" title="优优" @click="thisActress(item.Actress)">
        <ElIcon>
          <UserFilled />
        </ElIcon>
      </ElButton>
      <ElButton type="success" plain class="icon-button" title="文件夹" @click="openThisFolder(item.Id, 2)">
        <ElIcon>
          <FolderOpened />
        </ElIcon>
      </ElButton>
      <ElButton plain type="success" class="icon-button " title="编辑" @click="editItem(item)">
        <ElIcon>
          <Edit />
        </ElIcon>
      </ElButton>
      <ElButton type="danger" plain class="icon-button" title="刮图" @click="getImageList(item.Id)">
        <ElIcon>
          <Download />
        </ElIcon>
      </ElButton>
      <ElButton type="danger" plain class="icon-button" title="删除" @click="deleteThis(item.Id, 2)">
        <ElIcon>
          <DeleteFilled />
        </ElIcon>
      </ElButton>
      <ElButton v-if="!item.MovieType" type="danger" plain class="icon-button" title="同步" @click="syncThis(item.Id)">
        <ElIcon>
          <Refresh />
        </ElIcon>
      </ElButton>

      <ElButton type="info" plain class="icon-button" v-if="7 < view.showIconNum && notQiBing(item.MovieType)"
        title="骑兵" @click="setMovieType(item.Id, 2)">
        <ElIcon>
          <Bicycle />
        </ElIcon>
      </ElButton>
      <ElButton plain type="info" class="icon-button" v-if="notBuBing(item.MovieType) && 7 < view.showIconNum"
        title="步兵" @click="setMovieType(item.Id, 1)">
        <ElIcon>
          <Sunny />
        </ElIcon>
      </ElButton>
      <ElButton plain type="info" class="icon-button" v-if="notNative(item.MovieType) && 7 < view.showIconNum"
        title="国产" @click="setMovieType(item.Id, 4)">
        <ElIcon>
          <Location />
        </ElIcon>
      </ElButton>
      <ElButton plain type="info" class="icon-button" v-if="notSiBaDa(item.MovieType) && 7 < view.showIconNum"
        title="欧美" @click="setMovieType(item.Id, 3)">
        <ElIcon>
          <Ship />
        </ElIcon>
      </ElButton>

      <ElLink>
        <ElDropdown placement="top-start" v-if="7 > view.showIconNum">
          <i class="ElIcon-more icon-style"></i>
          <ElDropdown-menu slot="dropdown">
            <ElDropdownItem v-if="notQiBing(item.MovieType)">
              <ElLink>
                <i class="ElIcon-bicycle icon-style" title="骑兵" @click="setMovieType(item.Id, 2)">骑兵</i>
              </ElLink>
            </ElDropdownItem>

            <ElDropdownItem v-if="notBuBing(item.MovieType)">
              <i class="icon-style" title="步兵" @click="setMovieType(item.Id, 1)">步兵</i>
            </ElDropdownItem>
            <ElDropdownItem v-if="notNative(item.MovieType)">
              <ElLink>
                <i :underline="false" class="icon-style" title="国产" @click="setMovieType(item.Id, 4)">国产</i>
              </ElLink>
            </ElDropdownItem>
            <ElDropdownItem v-if="notSiBaDa(item.MovieType)">
              <ElLink>
                <i :underline="false" class="icon-style" title="欧美" @click="setMovieType(item.Id, 3)">欧美</i>
              </ElLink>
            </ElDropdownItem>
            <ElDropdownItem v-if="7 > view.showIconNum">
              <i class="ElIcon-refresh-right icon-style" title="信息" @click="infoThis(item.Id)">信</i>
            </ElDropdownItem>
          </ElDropdown-menu>
        </ElDropdown>
      </ElLink>

      <div class="context-text" style="font-size: 13px">
        <ElLink v-if="item.Actress" style="color: green" @click="copy(item.Actress)">{{ item.Actress }}</ElLink>
        <ElLink v-if="item.Code" style="color: orange" @click="copy(item.Code)">{{ item.Code }}</ElLink>
        <ElPopover placement="top" width="400px" trigger="hover" :auto-close="1" :show-after="500">
          <template #reference>
            <span style="color: red"> 【{{ item.SizeStr }}】</span>
          </template>
          <template #default>
            <ElLink v-if="item.Actress" style="color: green" @click="copy(item.Actress)">{{ item.Actress }}</ElLink>
            <ElDivider v-if="item.Actress" direction="vertical"></ElDivider>
            <ElLink v-if="item.Code" style="color: orange" @click="copy(item.Code)">{{ item.Code }}</ElLink>
            <ElDivider v-if="item.Code" direction="vertical"></ElDivider>
            【{{ item.SizeStr }}】
            {{ useDateFormat(item.MTime, 'YYYY-MM-DD HH:MM', { locales: 'zh-cn' }) }}
            <hr />
            <span style="
                    margin-buttom: 30px;
                    margin-top: 30px;
                    margin-left: 30px;
                    margin-right: 30px;
                  ">
              {{ item.Name }}</span>
          </template>
        </ElPopover>
        {{ item.Name }}
      </div>
    </div>
  </el-card>
  </li>
  <ElPagination class="pageTool" v-model:currentPage="queryParam.Page" v-model:page-size="queryParam.PageSize"
    :page-sizes="[12, 14, 30, 50, 200]" layout="total, sizes, prev, pager, next, jumper" :total="view.ResultCnt"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>


  <ElDialog title="文件信息" v-model="view.dialogFormItemVisible" :close-on-press-escape="false"
    :close-on-click-modal="false">
    <el-form label-position="right" :model="view.formItem" size="small" label-width="18%">
      <el-form-item label="类型">
        <el-radio-group v-model="view.formItem.MovieType" @change="formMovieTypeChange" size="small">
          <el-radio-button label="">无</el-radio-button>
          <el-radio-button label="骑兵">骑</el-radio-button>
          <el-radio-button label="步兵">步</el-radio-button>
          <el-radio-button label="国产">国</el-radio-button>
          <el-radio-button label="斯巴达">欧</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="脸谱">
        <el-input v-model="view.formItem.Actress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="编码">
        <el-input v-model="view.formItem.Code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文件名称">
        <el-input type="textarea" v-model="view.formItem.Name" autocomplete="off"></el-input>
        <!-- {{formItem.Title}} -->
      </el-form-item>
      <!-- <el-form-item label="标签">
        <el-tag v-for="tag in view.formItem.Tags" :key="tag" effect="dark" closable style="margin-right: 8px" type=""
          size="small" @close="removeFormTag(tag)">
          {{ tag }}
        </el-tag>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="view.dialogFormItemVisible = false">取 消</el-button>
      <el-button type="primary" @click="editItemSubmit">确 定</el-button>
    </div>
  </ElDialog>
  <ElDialog width="66%" :modal="true" :lock-scroll="true" :title="view.formItem.Title"
    :visible.sync="view.dialogVisible">
    <div v-if="view.formItem">
      <div border="1">
        <el-image :src="getJpg(view.formItem.Id)" style="margin: 1px auto; width: 80%; height: auto"
          @click="gotoContext(view.formItem.Id)" />
        <ElRow :gutter="24">
          <ElCol :span="4" tyle="text-align:right">
            YY：
            <a href="javascript:void(0);" @click="openSearch(view.formItem.Actress)">
              <span>{{ view.formItem.Actress }}</span></a>
          </ElCol>
          <ElCol :span="8">
            Code：
            <a href="javascript:void(0);" @click="openLick(view.formItem.Code)"><span>{{ view.formItem.Code
            }}</span></a>
          </ElCol>
          <ElCol :span="12">
            <span @click="gotoContext(view.formItem.Id)">大小：【{{ view.formItem.SizeStr }}】</span>
            <span>时间：{{ useDateFormat(view.formItem.MTime, "yyyy-MM-DD") }}</span>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="20">
            <span>源：</span> <span>{{ view.formItem.Path }}</span>
          </ElCol>
        </ElRow>
        <el-divider></el-divider>
      </div>
    </div>
    <div v-for="(item, index) in view.sourceList" :key="index" style="display: flex; margin: 10px auto">
      <el-image style="min-width: 800px; margin: 0 auto" :src="item" :preview-src-list="view.sourceList" lazy>
      </el-image>
    </div>
  </ElDialog>
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
  RefreshIndex,
  FileRename,
  AddTag
} from '@/api/file'
import { GetSettingInfo, PostSettingInfo } from '@/api/setting'


import { onMounted, reactive, ref } from 'vue'
import {
  ElRow,
  ElCol,
  ElLink,
  ElDialog,
  ElBacktop,
  ElPopover,
  ElDivider,
  ElRadioGroup,
  ElRadioButton,
  ElMessage,
  ElMessageBox,
  ElDropdown,
  ElDropdownItem,
  ElPagination
} from 'element-plus';
import { Eleme } from '@element-plus/icons-vue'
import { MovieQuery, MovieModel } from '.';
import { ResultList } from '@/utils/ResultResponse';
import { useSystemProperty } from '@/store/System'
import { useClipboard, onKeyStroke } from '@vueuse/core'
import { getPng, getJpg } from '@/utils/ImageUtils'
import { useDateFormat } from '@vueuse/core'

const running = ref(true)
const loading = ref(false)
const refreshIndexFlag = ref(false)
const showStyle = ref('post')
const systemProperty = useSystemProperty()


const source = ref('')
const { copy } = useClipboard({ source })

const view = reactive<any>({
  formItem: new MovieModel(),
  dialogFormItemVisible: false,
  addTagShow: false,
  settingInfo: {},
  showIconNum: 6,
  ModelList: [],
  ResultCnt: 0
})
const queryParam = reactive<MovieQuery>(new MovieQuery())

const settingInfo = reactive({})


onKeyStroke(['`'], (e) => {
  refreshIndex()
})
onKeyStroke(['Enter'], (e) => {
  queryList()
})

const gotoContext = (id: string) => {
  console.log('gotoContext', id)
}
const openSearch = (name: string) => {
  console.log('gotoContext', name)
}
const openLick = (code: string) => {
  console.log('gotoContext', code)
}

const editItemSubmit = async () => {
  const { Id, Name, Code, Actress } = view.formItem;
  const code = Code.trim()
  let name = "";
  if (Actress.length != 0) {
    name += "[" + Actress.trim() + "]";
  }
  if (code.length != 0) {
    name += " [" + code.trim() + "]";
  }
  const arr = Name.trim().split(".");
  const arrLength = arr.length;
  for (let idx = 0; idx < arrLength; idx++) {
    const str = arr[idx];

    if (idx == arrLength - 1) {
      name += "." + str;
    } else if (idx == 0) {
      const strNew = str.replace(
        str.charAt(0),
        str.charAt(0).toUpperCase()
      );
      name += strNew;
    } else {
      const strNew = str.replace(
        str.charAt(0),
        str.charAt(0).toUpperCase()
      );
      name += " " + strNew;
    }
  }
  const param = { Id, Name: name, Code: code, Actress };
  const res = await FileRename(param)
  if (res.Code == 200) {
    view.formItem = {};
    view.dialogFormItemVisible = false;
    refreshIndex();
  } else {
    ElMessage.error(res.Message)
  }
}

const editItem = (item: MovieModel) => {
  view.formItem = item;
  view.dialogFormItemVisible = true;
}

const formMovieTypeChange = () => {
  let { MovieType, Name, FileType } = view.formItem;
  let newName = "";
  if (Name.indexOf("{{") >= 0) {
    const startC = Name.substr(0, Name.indexOf("{{"));
    const endC = Name.substr(Name.indexOf("}}") + 2, Name.length);
    newName = startC;
    if (MovieType && MovieType !== "") {
      newName += "{{" + MovieType + "}}";
    }
    newName += endC;
  } else {
    newName = Name.replaceAll("." + FileType, "");
    newName = newName + "{{" + MovieType + "}}" + "." + FileType;
  }
  view.formItem.Name = newName;
}

const loadSettingInfo = async () => {
  const res = await GetSettingInfo()
  if (res) {
    view.settingInfo = { DirsCnt: res.Dirs?.length, ...res }
  }
}


const handleCheckAllChange = (val) => {
  view.settingInfo.Dirs = val ? view.settingInfo.DirsLib : [];
  view.isIndeterminateDir = false;
}

const handleCheckedCitiesChange = (value) => {
  let checkedCount = value.length;
  view.settingCheckAll = checkedCount === view.settingInfo.Dirs.length;
  view.isIndeterminateDir =
    checkedCount > 0 && checkedCount < view.settingInfo.Dirs.length;
}

const settingSubmit = async () => {
  const postForm = { ...view.settingInfo };
  const res = await PostSettingInfo(postForm)
  console.log(res)
  if (res.Code === 200) {
    view.settingInfoShow = false
    ElMessage.success(res.Message)
  } else {
    ElMessage.error(res.Message)
  }

}

const notContainTag = (tags: string[], tag: string) => {
  if (!tags || !tag) {
    return true;
  }
  if (tags.indexOf(tag) < 0) {
    return true;
  }
  return false;
}

const gotoSearch = (tag: string) => {
  queryParam.Keyword = tag
  queryList()
}


const fetchTagsLib = (queryString, callback) => {
  const suggrestTagsLib = view.settingInfo?.TagsLib;
  const results = queryString
    ? suggrestTagsLib.filter(createFilter(queryString))
    : suggrestTagsLib;
  callback(results);
}
const customerTagEmpty = () => {
  if (view.customerTag) {
    return false;
  }
  return true;
}

const addTag = async (clickId, title) => {
  const res = await AddTag(clickId, title)
  if (res.Code == 200) {
    view.addTagShow = false
    for (var i = 0; i < view.ModelList.length; i++) {
      if (view.ModelList[i].Id == clickId) {
        if (!view.ModelList[i].Tags) {
          view.ModelList[i].Tags = []
        }
        view.ModelList[i].Tags.push(title);
        return;
      }
    }
    ElMessage.success(res.Message)
  } else {
    ElMessage.error(res.Message)
  }
}

const addCustomerTag = (clickId: string) => {
  addTag(clickId, view.customerTag)
  view.addTagShow = false
  view.customerTag = ""
}
const handleSelectTag = (item: string) => {
  view.customerTag = item;
}
const closeTag = (clickId: string, title: string) => {
  console.log(clickId, title)
}

const queryList = async (params?: any) => {

  let title = queryParam.Keyword;
  systemProperty.syncSearchParam(queryParam)
  if (queryParam.Keyword && queryParam.Keyword !== '') {
    // if (!view.suggestions) {
    //   view.suggestions = []
    // }
    // const idx = view.suggestions.indexOf(queryParam.Keyword);
    // if (idx >= 0) {
    //   view.suggestions.splice(idx, 1);
    // }
    // view.suggestions.unshift(queryParam.Keyword);
    // console.log(view.suggestions)
    // if (view.suggestions.length > 100) {
    //   view.suggestions.pop();
    // }
    // localStorage.setItem("searchSuggestions", view.suggestions);
  } else {
    title = "文件";
  }
  document.title = title
  view.ModelList = []
  loading.value = true
  const res = await QueryFileList(queryParam)

  if (res) {
    loading.value = false
    const model = res as unknown as ResultList
    model.Data.map((item) => {
      if (item.Code == item.Actress) {
        item.Code = "";
        item.Actress = "";
      }
      if (item.Code.lastIndexOf("-") == item.Code.length - 1) {
        item.Code = item.Code.substring(0, item.Code.length - 1);
      }
      item.name = item.Name.trim();
      item.Name = item.Name.replace("[" + item.Code + "]", "");
      item.Name = item.Name.replace("[" + item.Actress + "]", "");
    })
    view.ModelList = model.Data
    view.TotalCnt = model.TotalCnt
    view.ResultCnt = model.ResultCnt
    view.CurCnt = model.CurCnt
    view.TotalPage = model.TotalPage
    view.TotalSize = model.TotalSize
    view.ResultSize = model.ResultSize
    view.CurSize = model.CurSize
  }
}

const selectSuggestion = (item) => {
  queryParam.Keyword = item
  queryList()
}

const pageLoading = (num: number) => {
  if (queryParam.Page + num <= 0) {
    queryParam.Page = 1
  }
  queryParam.Page += num

  queryList()
}

const fetchSuggestion = (queryString: string, callback) => {
  // const sourceSuggestions = view.suggestions;
  const sourceSuggestions = systemProperty.getSuggestions;
  if (!sourceSuggestions) {
    return
  }
  const results = queryString
    ? sourceSuggestions.filter(createFilter(queryString))
    : sourceSuggestions;
  // 调用 callback 返回建议列表的数据
  const finalResults = results.slice(0, 50)
  callback(finalResults)
}

const createFilter = (queryString) => {
  return (res) => {
    return res.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
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

const openInfoWindow = async (id: string) => {
  console.log(id)
  const res = await FindFileInfo(id)
  view.dialogVisible = true;
  view.sourceList = [];
  if (res.Code === 200) {
    view.file = res.Data;
    view.dialogVisible = false;
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
  refreshIndexFlag.value = true
  const res = await RefreshIndex()
  if (res.Code === 200) {
    ElMessage.success(res.Message)
    await queryList()
    refreshIndexFlag.value = false
  }
}

const thisActress = async (actress: string) => {
  queryParam.Keyword = actress
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

const keywordChange = (value) => {
  queryParam.Keyword = value
  queryList()
}


const handleCurrentChange = (page: number) => {
  queryParam.Page = page
  queryList()
}
const handleSizeChange = (pageSize: number) => {
  queryParam.PageSize = pageSize
  queryList()
}

setInterval(heartBeat, 10000);

// const suggestionsInit = () => {
//   const suggestionsCaches = localStorage.getItem("searchSuggestions");
//   if (suggestionsCaches) {
//     view.suggestions = suggestionsCaches.split(",");
//   }
// }

onMounted(() => {

  // suggestionsInit()
  loadSettingInfo()
  queryParam.Page = systemProperty.getSearchParam.Page
  queryParam.PageSize = systemProperty.getSearchParam.PageSize
  queryParam.MovieType = systemProperty.getSearchParam.MovieType
  queryParam.SortField = systemProperty.getSearchParam.SortField
  queryParam.SortType = systemProperty.getSearchParam.SortType
  queryParam.Keyword = systemProperty.getSearchParam.Keyword
  setTimeout(queryList, 200)
})

</script>

<style scoped>
.searchRow {
  margin-top: -20px;
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
  font-size: 10px;
  font-size-adjust: inherit;
  margin-right: 1px;
  margin-left: 1px;
  position: relative;
  height: 46px;
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
  margin-left: 4px;
  padding: 0;
  background: #e4e6d1;
}

.list-item {
  width: 220px;
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
  margin: 4px 4px;
}

.tag-buttom {
  margin-left: 64px;
  filter: alpha(opacity=100);
  position: absolute;
  z-index: 999;
  height: 28px;
  float: right;
  text-align: justify;
  text-align-last: justify;
}

.tag-buttom-cover {
  margin-left: 156px;
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
  margin-bottom: 0px;
  z-index: 99;
  height: 28px;
  color: #000;
  line-height: 28px;
}

/* v-deep .el-tooltip__popper {
  width: 300px;
  height: 40px;
} */

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