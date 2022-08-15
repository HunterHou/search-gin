<template>
  <div class="mainBody">
    <NavBar title="首页" left-text="返回" left-arrow @click-left="push('/home')">
      <template #right>
        <Button size="small" round type="success" @click="refreshIndex">刷新索引</Button>
      </template>
    </NavBar>
    <MobileBar></MobileBar>
    <PullRefresh v-model="refreshing" @refresh="
      () => {
        loadAll()
        refreshing = false;
      }
    ">
      <Collapse v-model="indexes">
        <div style="box-shadow: 4 4 8px grey;">
          <Tag type="primary" plain v-for="tag in view.tagData" :key="tag" style="margin:3px 6px ;height:24px"
            @click="folderGotoMenu(tag.Name)">
            {{ tag.Name }} {{ tag.SizeStr }}
          </Tag>
        </div>
        <CollapseItem title="扫描" name="scan">
          <Row v-for="item, index in view.scanTime" :key="item.Name"
            :style="{ color: (index % 2 == 0 ? '#07c160' : '#000000'), hover: 'mouse', height: '30px' }">
            <Col :span="20" style="text-align:left;">{{ item.Name }}
            </Col>
            <Col :span="4">{{ item.Size }}
            </Col>
          </Row>
        </CollapseItem>
        <CollapseItem title="分析" name="type">
          <Row v-for="item, index in view.tableData" :key="item.Name" @click="gotoMenu(item)"
            :style="{ color: (index % 2 == 0 ? '#07c160' : '#000000'), hover: 'mouse', height: '30px' }">
            <Col :span="16" style="text-align:left;">{{ item.Name }}
            </Col>
            <Col :span="4">{{ item.Cnt }}
            </Col>
            <Col :span="4">{{ item.SizeStr }}
            </Col>
          </Row>
        </CollapseItem>
      </Collapse>

    </PullRefresh>
  </div>
</template>

<script setup lang="ts">
import { RefreshIndex } from "@/api/file";
import { ScanTime, TagSizeMap, TypeSizeMap } from "@/api/home";
import { useSystemProperty } from "@/store/System";
import { FullScreen } from "@element-plus/icons-vue";
import {
  Button,
  Col,
  Image,
  NavBar,
  PullRefresh,
  Row,
  Cell,
  CollapseItem,
  Collapse,
  Tag,
  Toast,
} from "vant";
import "vant/lib/index.css";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import MobileBar from './MobileBar.vue'

const indexes = ref(['tag', 'scan', 'type'])
const { push } = useRouter();
const systemProperty = useSystemProperty()

const view = reactive({
  tableData: [],
  tagData: [],
  scanTime: [],
})
const refreshing = ref(false)

const loadAll = () => {
  loadTypeSize()
}

const refreshIndex = async () => {
  refreshing.value = true;
  const res = await RefreshIndex();
  if (res.Code == 200) {
    refreshing.value = false;
    Toast("执行成功");
    loadAll()
  } else {
    Toast.fail("执行失败");
  }
};
const folderGotoMenu = (Name) => {
  systemProperty.setPage(1);
  systemProperty.setKeyword(Name);
  systemProperty.setMovieType("");
  push("/mfilelist");
};
const gotoMenu = (data) => {
  const { IsDir, Name } = data;
  const movieType = (!IsDir && Name !== '全部') ? Name : "";
  systemProperty.setPage(1);
  systemProperty.setKeyword(Name);
  systemProperty.setMovieType(movieType);
  push("/mfilelist");
};
const loadTypeSize = async () => {
  const res = await TypeSizeMap();
  if (res) {
    view.tableData = res;
    loadTagSize();
    loadScanTime();
  }
};
const loadTagSize = async () => {
  const res = await TagSizeMap();
  if (res) {
    view.tagData = res.slice(0, 27);
  }
};
const loadScanTime = async () => {
  const res3 = await ScanTime();
  view.scanTime = res3;
};

onMounted(() => {
  loadAll()
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
