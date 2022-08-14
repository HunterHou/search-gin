<template>
  <div class="mainBody">
    <NavBar title="首页" left-text="返回" left-arrow @click-left="push('/home')">
    </NavBar>
    <MobileBar></MobileBar>
    首页
  </div>
</template>

<script setup lang="ts">
import { DownImageList, QueryDirImageBase64, QueryFileList } from "@/api/file";
import { GetSettingInfo } from "@/api/setting";
import { ResultList } from "@/config/ResultModel";
import {
  Icon,
  NavBar,
} from "vant";
import "vant/lib/index.css";
import {  onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { MovieModel, MovieQuery } from "../fileList";
import { SettingInfo } from "../settting";
import MobileBar from './MobileBar.vue'

const { push } = useRouter();
const loadingList = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const view = reactive({
  settingInfo: new SettingInfo(),
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
  currentFile: new MovieModel(),
  imageList: [],
});


watch(loadingList, () => {
  console.log("loadingListWatch", loadingList.value);
});
watch(finished, () => {
  console.log("finished", finished.value);
});

const showSearch = ref(false);
const loadSettingInfo = async () => {
  const res = await GetSettingInfo();
  if (res) {
    view.settingInfo = { ...res };
  }
};

const queryList = async (pageStart?: number) => {
  let queryParam = { ...view.queryParam };
  if (pageStart > 0) {
    queryParam.Page = pageStart;
    queryParam.PageSize = 1;
  }
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
    item.name = item.Name.trim();
    item.Name = item.Name.replace("[" + item.Code + "]", "");
    item.Name = item.Name.replace("[" + item.Actress + "]", "");
  });
  const newList = [...view.ModelList, ...model.Data];
  view.ModelList = newList;
  view.TotalCnt = model.TotalCnt;
  view.ResultCnt = model.ResultCnt;
  view.loadCnt = view.loadCnt + model.Data.length;
  refreshing.value = false;
  loadingList.value = false;
  console.log("queryListOver", loadingList.value);
};

const onSearch = async (clear?: Boolean) => {
  view.queryParam.Page = 1;
  view.ModelList = [];
  view.loadCnt = 0;
  await queryList();
  // refreshing.value = false
  // error.value = true
};
onMounted(() => {
  onSearch();
  loadSettingInfo();
});
</script>
<style>
.mainBody {
  width: 100%;
  position: absolute;
  display: block;
}

.mlist {
  float: none;
  z-index: 99;
  width: 100%;
}
</style>
