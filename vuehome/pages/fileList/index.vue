<template>
  <div class="container-body">
    <el-backtop :bottom="100" style="width: 50px; height: 50px">
      <div class="up">UP</div>
    </el-backtop>
    <!-- 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40 -->
    <el-button
      style="
        position: fixed;
        top: 640px;
        overflow: auto;
        z-index: 999;
        left: 5px;
      "
      round
      @click="pageLoading(-1)"
      ><i class="el-icon-back"></i>上一頁
    </el-button>
    <!-- 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40 -->
    <el-button
      style="
        position: fixed;
        top: 640px;
        overflow: auto;
        z-index: 999;
        right: 5px;
      "
      round
      @click="pageLoading(1)"
      >下一頁<i class="el-icon-right"></i>
    </el-button>
    <div id="mainButtom">
      <el-row id="mainButtomRow">
        <el-col :span="2" :offset="1">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-location"
            :loading="refreshIndexFlag"
            @click="refreshIndex()"
            >索引
          </el-button>
        </el-col>
        <el-col :span="1">
          <el-link style="color: green">
            <i
              :underline="true"
              class="el-icon-zoom-out"
              title="重复"
              @click="onlyRepeatQuery()"
              >重</i
            ></el-link
          >
        </el-col>
        <el-col :span="4">
          <el-radio-group v-model="sortField" @change="queryList()" size="mini">
            <el-radio-button label="Code">名</el-radio-button>
            <el-radio-button label="MTime">时</el-radio-button>
            <el-radio-button label="Size">容</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="2">
          <el-radio-group v-model="sortType" @change="queryList()" size="mini">
            <el-radio-button label="desc">倒</el-radio-button>
            <el-radio-button label="asc">正</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="4">
          <el-radio-group v-model="movieType" @change="queryList()" size="mini">
            <el-radio-button label="">全</el-radio-button>
            <el-radio-button label="骑兵">骑</el-radio-button>
            <el-radio-button label="步兵">步</el-radio-button>
            <el-radio-button label="斯巴达">欧</el-radio-button>
          </el-radio-group>
        </el-col>

        <el-col :span="10">
          <el-autocomplete
            id="searchInput"
            style="min-width: 80px; width: auto"
            placeholder="请输入关键词"
            v-model="searchWords"
            clearable
            :fetch-suggestions="fetchSuggestion"
            @select="handleSelect"
            @clear="clearWords"
            size="mini"
            @keyup.enter.native="queryList()"
          >
            <el-button
              slot="append"
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="
                (e) => {
                  this.pageNo = 1;
                  queryList();
                }
              "
              >Enter
            </el-button>
            <template slot-scope="{ item }">
              <div v-if="item" class="name">{{ item }}</div>
            </template>
          </el-autocomplete>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 4px">
      <el-col :span="3" :offset="1">
        <el-radio-group v-model="showStyle" size="mini">
          <el-radio-button label="cover">封面</el-radio-button>
          <el-radio-button label="post">海报</el-radio-button>
        </el-radio-group>
      </el-col>

      <el-col :span="12">
        <el-divider direction="vertical"></el-divider>
        <span> 进度：{{ IndexProgress ? "完成" : "进行中" }} </span>
        <el-divider direction="vertical"></el-divider>
        <span> 扫描：{{ TotalSize }}({{ TotalCnt }}) </span>
        <el-divider direction="vertical"></el-divider>
        <span> 搜：{{ ResultSize }}({{ ResultCnt }}) </span>
        <el-divider direction="vertical"></el-divider>
        <span> 页：{{ CurSize }}({{ CurCnt }})</span>
        <el-divider direction="vertical"></el-divider>
      </el-col>
    </el-row>
    <v-contextmenu
      ref="contextmenu"
      :theme="theme"
      @contextmenu="handleContextmenu"
    >
      <v-contextmenu-item @click="handleClick"
        ><i
          :underline="false"
          class="el-icon-refresh right-font"
          style="margin: 0 8px; color: green;"
          title="同步"
          action="sync"
          ><b>同步</b></i
        ></v-contextmenu-item
      >

      <v-contextmenu-item @click="handleClick"
        ><i
          :underline="false"
          class="el-icon-share right-font"
          style="margin: 0 16px; color: green"
          title="链接"
          action="sourceLink"
          >链接</i
        ></v-contextmenu-item
      >

      <v-contextmenu-item @click="handleClick"
        ><i
          :underline="false"
          class="el-icon-folder-opened right-font"
          style="margin: 0 24px"
          title="文件夹"
          action="fold"
          >文夹</i
        ></v-contextmenu-item
      >
      <v-contextmenu-item @click="handleClick"
        ><i
          :underline="false"
          class="el-icon-video-play"
          style="margin: 0 16px; color: green right-font"
          title="播放"
          action="play"
          ><b>播放</b></i
        ></v-contextmenu-item
      >
      <v-contextmenu-item @click="handleClick">
        <i
          class="el-icon-question right-font"
          style="margin: 0 14px"
          title="详情"
          action="info"
          >详情</i
        >
      </v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">
        <i
          :underline="false"
          class="el-icon-download right-font"
          style="margin: 0 8px"
          title="刮图"
          action="downImage"
          >刮图</i
        >
      </v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">
        <i
          :underline="false"
          class="el-icon-delete right-font"
          style="margin: 2 8px"
          title="删除"
          action="delete"
          >删除</i
        >
      </v-contextmenu-item>
    </v-contextmenu>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      style="margin-top: 10px; min-height: 600px"
    >
      <li
        :class="isShowCover() ? 'list-item-cover' : 'list-item'"
        v-for="item in dataList"
        :key="item.Id"
      >
        <div class="tag-area">
          <li v-for="tag in item.Tags" :key="tag">
            <el-tag
              closable
              effect="dark"
              type=""
              size="small"
              @close="closeTag(item.Id, tag)"
            >
              <el-link :underline="false" plain @click="gotoSearch(tag)">
                <span> {{ tag }}</span>
              </el-link>
            </el-tag>
          </li>
        </div>
        <div
          :class="[theme]"
          v-contextmenu:contextmenu
          :key="item.Id"
          :code="item.Code"
        >
          <div
            v-if="item"
            :class="isShowCover() ? 'img-list-item-cover' : 'img-list-item'"
          >
            <el-popover placement="bottom-start" width="auto" trigger="click">
              <div v-if="item.MovieType != ''" style="max-width: 420px">
                <el-button
                  size="mini"
                  type="primary"
                  plain
                  v-for="tag in Tags"
                  :key="tag"
                  style="margin: 1px 2px"
                  :disabled="!notContainTag(item.Tags, tag)"
                  @click="addTag(item.Id, tag)"
                >
                  {{ tag }}</el-button
                >
                <el-autocomplete
                  placeholder="新标签"
                  v-model="customerTag"
                  :fetch-suggestions="fetchTagsLib"
                  @select="handleSelectTag"
                  size="mini"
                  style="width: 200px"
                >
                  <el-button
                    slot="append"
                    size="mini"
                    :disabled="customerTagEmpty()"
                    @click="addCustomerTag(item.Id)"
                    icon="el-icon-circle-plus"
                    >加</el-button
                  >
                  <template slot-scope="{ item }">
                    <div v-if="item" class="name">{{ item }}</div>
                  </template>
                </el-autocomplete>
              </div>
              <div v-if="item.MovieType == ''" style="max-width: 600px">
                <el-button
                  style="margin-right: 10px"
                  plain
                  size="mini"
                  @click="setMovieType(item.Id, 2)"
                >
                  <i
                    v-if="notQiBing(item.MovieType)"
                    class="el-icon-bicycle icon-style"
                    title="骑兵"
                    >骑兵</i
                  ></el-button
                >
                <el-button
                  style="margin-right: 10px"
                  plain
                  size="mini"
                  @click="setMovieType(item.Id, 1)"
                >
                  <i
                    v-if="notBuBing(item.MovieType)"
                    class="el-icon-sunny icon-style"
                    title="步兵"
                    >步兵</i
                  ></el-button
                >
                <el-button
                  style="margin-right: 10px"
                  plain
                  size="mini"
                  @click="setMovieType(item.Id, 3)"
                >
                  <i
                    v-if="notSiBaDa(item.MovieType)"
                    class="el-icon-ship icon-style"
                    title="欧美"
                    >斯巴达</i
                  ></el-button
                >
              </div>

              <el-button
                class="tag-buttom"
                size="mini"
                type="danger"
                slot="reference"
                icon="el-icon-circle-plus"
                round
              >
                <b>
                  {{ item.MovieType ? item.MovieType : "无" }}
                </b>
              </el-button>
            </el-popover>
            <el-image
              style="width: 100%; height: 100%"
              :src="isShowCover() ? getJpg(item.Id) : getPng(item.Id)"
              @click="openWin(item.Id)"
              fit="contain"
              lazy
            />
          </div>
        </div>

        <div class="image-tool">
          <el-button
            type="primary"
            plain
            class="icon-button el-icon-video-play"
            title="播放"
            @click="playThis(item.Id)"
          ></el-button>
          <el-button
            type="warning"
            plain
            class="icon-button el-icon-user-solid"
            title="优优"
            @click="thisActress(item.Actress)"
          ></el-button>
          <el-button
            type="success"
            plain
            class="icon-button el-icon-folder-opened"
            title="文件夹"
            @click="openThisFolder(item.Id, 2)"
          >
          </el-button>
          <el-button
            plain
            type="success"
            class="icon-button el-icon-edit"
            title="编辑"
            @click="editItem(item)"
          >
          </el-button>
          <el-button
            type="info"
            plain
            class="icon-button el-icon-bicycle"
            v-if="notQiBing(item.MovieType)"
            title="骑兵"
            @click="setMovieType(item.Id, 2)"
          >
          </el-button>
          <el-button
            plain
            type="info"
            class="icon-button el-icon-sunny"
            v-if="notBuBing(item.MovieType)"
            title="步兵"
            @click="setMovieType(item.Id, 1)"
          >
          </el-button>
          <el-button
            plain
            type="info"
            class="icon-button"
            v-if="notSiBaDa(item.MovieType)"
            title="欧美"
            @click="setMovieType(item.Id, 3)"
          >
            <i class="el-icon-ship"></i
          ></el-button>
          <el-button
            type="danger"
            plain
            v-if="7 < showIconNum"
            class="icon-button"
            title="删除"
            @click="deleteThis(item.Id, 2)"
          >
            <i class="el-icon-delete"></i
          ></el-button>
          <el-button
            type="danger"
            plain
            v-if="8 < showIconNum"
            class="icon-button"
            title="刮图"
            @click="getImageList(item.Id, 2)"
          >
            <i class="el-icon-download"></i
          ></el-button>
          <el-button
            type="danger"
            plain
            v-if="9 < showIconNum"
            class="icon-button"
            title="同步"
            @click="syncThis(item.Id)"
          >
            <i class="el-icon-refresh"></i
          ></el-button>

          <el-link>
            <el-dropdown placement="top-start" v-if="7 > showIconNum">
              <i class="el-icon-more icon-style"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="7 > showIconNum">
                  <i
                    class="el-icon-refresh-right icon-style"
                    title="信息"
                    @click="infoThis(item.Id, 2)"
                    >信</i
                  >
                </el-dropdown-item>
                <el-dropdown-item v-if="8 > showIconNum">
                  <el-link>
                    <i
                      class="el-icon-delete icon-style"
                      title="删除"
                      @click="deleteThis(item.Id, 2)"
                      >删</i
                    ></el-link
                  >
                </el-dropdown-item>

                <el-dropdown-item v-if="9 > showIconNum">
                  <i
                    class="el-icon-download icon-style"
                    title="刮图"
                    @click="getImageList(item.Id, 2)"
                    >刮</i
                  >
                </el-dropdown-item>
                <el-dropdown-item v-if="10 > showIconNum">
                  <el-link>
                    <i
                      :underline="false"
                      class="el-icon-refresh icon-style"
                      title="同步"
                      @click="syncThis(item.Id)"
                      >同</i
                    ></el-link
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-link>

          <div
            class="context-text"
            :class="item.MovieType ? '' : 'redbackground'"
          >
            <el-tooltip placement="bottom" effect="dark">
              <div slot="content">{{ item.name }}</div>
              <span>
                <el-link style="color: green" @click="copy(item.Actress)">{{
                  item.Actress
                }}</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link style="color: orange" @click="copy(item.Code)">{{
                  item.Code
                }}</el-link>
                【{{ item.SizeStr }}】 {{ item.Name }}
              </span>
            </el-tooltip>
          </div>
        </div>
      </li>
    </div>
    <el-pagination
      class="pageTool"
      style="align: center"
      background
      :page-sizes="pageSizes"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="prev, pager, next, sizes, jumper"
      :current-page="pageNo"
      :total="ResultCnt"
    ></el-pagination>
    <!-- 弹窗 -->
    <el-dialog
      width="60%"
      :modal="true"
      :lock-scroll="true"
      :title="file.Title"
      :visible.sync="dialogVisible"
    >
      <div v-if="file">
        <div
          border="1"
          @click="gotoContext(file.Id)"
          style="margin: 0px auto; width: 86%; height: auto"
        >
          <el-image :src="getJpg(file.Id)" style="width: 100%; width: auto" />
          <br />
          <el-row :gutter="24">
            <el-col :span="4" tyle="text-align:right">
              YY：
              <a href="javascript:void(0);" @click="openSearch(file.Actress)">
                <span>{{ file.Actress }}</span></a
              >
            </el-col>
            <el-col :span="4">
              Code：
              <a href="javascript:void(0);" @click="openLick(file.Code)"
                ><span>{{ file.Code }}</span></a
              >
            </el-col>
            <el-col :span="16">
              <span>大小：【{{ file.SizeStr }}】</span>
              <span>时间：{{ file.MTime }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <span>源：</span> <span>{{ file.Path }}</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </div>
      </div>
      <div
        v-for="(item, index) in sourceList"
        :key="index"
        style="display: flex; margin: 10px auto"
      >
        <el-image
          style="min-width: 800px; margin: 0 auto"
          :src="item"
          :preview-src-list="sourceList"
          lazy
        >
        </el-image>
      </div>
      <el-divider></el-divider>
    </el-dialog>
    <el-dialog
      title="文件信息"
      :visible.sync="dialogFormItemVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form
        label-position="right"
        :model="formItem"
        size="small"
        label-width="20%"
      >
        <el-form-item label="脸谱">
          <el-input v-model="formItem.Actress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="formItem.Code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input v-model="formItem.Name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormItemVisible = false">取 消</el-button>
        <el-button type="primary" @click="editItemSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import setStorePath from "@/mixin/setStorePath";

export default {
  mixins: [setStorePath],
  data() {
    const { searchWords, no, movieType } = this.$route.query;
    var searchPage = new Map();

    return {
      showIconNum: 5,
      customerTag: "",
      sourceList: [],
      showStyle: "post",
      file: "",
      baseUrl: "",
      Tags: [],
      TagsLib: [],
      onlyRepeat: false, //是否查重
      dialogVisible: false, //是否弹窗
      dialogFormItemVisible: false,
      sortField: "MTime",
      sortType: "desc",
      movieType: movieType || "",
      dataList: "",
      dataCnt: 0,
      errorMsg: "",
      fit: "fit",
      searchWords: searchWords ? searchWords : "",
      searchPage: searchPage,
      pagerCount: 10,
      pageNo: no ? parseInt(no) : 1,
      pageSize: 12,
      pageSizes: [2, 4, 6, 10, 12, 14, 30, 60, 90, 200],
      TotalCnt: 0,
      TotalPage: 0,
      loading: false,
      TotalSize: 0,
      CurCnt: 0,
      ResultCnt: 0,
      ResultSize: 0,
      CurSize: 0,
      theme: "dark",
      suggestions: [], //搜索框 提示
      formItem: {}, //编辑弹窗模型
      IndexProgress: false,
      rightClick: {
        clickId: "",
        clickCode: "",
      },
      pressCtrl: false,
      refreshIndexFlag: false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.fetchButtom();
      this.queryList();
      this.$nuxt.$loading.finish();
      const suggestionsCaches = localStorage.getItem("searchSuggestions");
      if (suggestionsCaches) {
        this.suggestions = suggestionsCaches.split(",");
      }
      const pageSize = localStorage.getItem("pageSizeStore");
      if (pageSize) {
        this.pageSize = parseInt(pageSize);
      }
    });
  },
  mounted() {
    document.onkeydown = (e) => {
      var key = e.keyCode || e.keyCode || e.keyCode;
      var pressCtrl = e.ctrlKey || e.metaKey;

      if (key == 17) {
        pressCtrl = true;
        setTimeout(() => {
          pressCtrl = false;
        }, 2000);
      }
      console.log(key, pressCtrl);
      if (key === 37 && pressCtrl) {
        //left
        this.pageLoading(-1);
      } else if (key === 39 && pressCtrl) {
        //right
        this.pageLoading(1);
      } else if (key == 45) {
        //insert
        document.getElementById("searchInput").focus();
      } else if (key == 13) {
        //enter
        document.getElementById("searchInput").click();
      } else if (key == 192) {
        //esc
        this.refreshIndex();
      } else if (key == 9) {
      } else if (key >= 49 && key <= 59) {
        //1
        // const pageIndex = key - 48;
        // this.pageNo = pageIndex > this.totalPage ? this.totalPage : pageIndex;
        // this.queryList();
      }
    };
    this.listenScroll();
  },
  watch: {
    searchWords: (a) => {
      // console.log(a);
    },
  },
  methods: {
    listenScroll() {
      document.addEventListener(
        "scroll",
        () => {
          let ele = document.documentElement.scrollTop;
          let main = document.getElementById("mainButtom");
          let mainButtomRow = document.getElementById("mainButtomRow");
          if (ele > 60) {
            main.classList.add("mainButtomFloat");
            mainButtomRow.classList.add("mainButtomRowFloat");
          } else {
            main.classList.remove("mainButtomFloat");
            mainButtomRow.classList.add("mainButtomRowFloat");
          }
        },
        true
      );
    },
    gotoSearch(tag) {
      this.searchWords = tag;
      this.queryList();
    },
    //确认点击事件 并执行
    handleClick(vm, event) {
      var buttom = vm.$slots.default[0];
      var title = buttom.data.attrs.action;
      var { clickId, clickCode } = this.rightClick;

      if ("sync" == title) {
        this.syncThis(clickId);
      } else if ("play" == title) {
        this.playThis(clickId);
      } else if ("fold" == title) {
        this.openThisFolder(clickId);
      } else if ("downImage" == title) {
        this.getImageList(clickId, 2);
      } else if ("delete" == title) {
        this.deleteThis(clickId, 2);
      } else if ("info" == title) {
        this.gotoContext(clickId);
      } else if ("sourceLink" == title) {
        window.open(`${this.baseUrl}/${clickCode}`, "_blank");
      } else if (this.Tags.indexOf(title) >= 0) {
        this.addTag(clickId, title);
      }
    },
    notContainTag(tags, tag) {
      if (!tags || !tag) {
        return true;
      }
      if (tags.indexOf(tag) < 0) {
        return true;
      }
      return false;
    },
    customerTagEmpty() {
      if (this.customerTag) {
        return false;
      }
      return true;
    },
    addCustomerTag(clickId) {
      this.addTag(clickId, this.customerTag);
      this.customerTag = "";
    },
    addTag(clickId, title) {
      const url = "api/file/addTag/" + clickId + "/" + title;
      axios.get(url).then((res) => {
        if (res.status === 200) {
          if (res.data.Code == 200) {
            this.alertSuccess(res.data.Message);
            // this.refreshIndex();
            for (var i = 0; i < this.dataList.length; i++) {
              if (this.dataList[i].Id == clickId) {
                this.dataList[i].Tags.push(title);
                return;
              }
            }
          } else {
            this.alertFail(res.data.Message);
          }
        }
      });
    },
    closeTag(clickId, title) {
      const url = "api/file/clearTag/" + clickId + "/" + title;
      axios.get(url).then((res) => {
        if (res.status === 200) {
          if (res.data.Code == 200) {
            this.alertSuccess(res.data.Message);
            for (var i = 0; i < this.dataList.length; i++) {
              if (this.dataList[i].Id == clickId) {
                const idx = this.dataList[i].Tags.indexOf(title);
                this.dataList[i].Tags.splice(idx, 1);
              }
              return;
            }
            this.refreshIndex();
          } else {
            this.alertFail(res.data.Message);
          }
        }
      });
    },
    //确定点击的区域Id
    handleContextmenu(vnode) {
      this.rightClick = {
        clickId: vnode.key,
        clickCode: vnode.data.attrs["code"],
      };
    },

    getPng(Id) {
      return "api/png/" + Id;
    },
    getJpg(Id) {
      return "api/jpg/" + Id;
    },
    editItem(item) {
      this.formItem = item;
      this.dialogFormItemVisible = true;
    },
    editItemSubmit() {
      const { Id, Name, Code, Actress } = this.formItem;
      const code = Code.trim().replaceAll(".", "_");
      let name = "";
      if (Actress.length != 0) {
        name += "[" + Actress.trim().replaceAll(".", " ").trim() + "]";
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
      axios.post("api/file/rename", param).then((res) => {
        if (res.status === 200) {
          if (res.data.Code == 200) {
            this.alertSuccess(res.data.Message);
            this.refreshIndex();
            this.formItem = {};
            this.dialogFormItemVisible = false;
          } else {
            this.alertFail(res.data.Message);
          }
        }
      });
    },
    clearWords() {
      this.pageNo = this.searchPage.get("");
      this.queryList();
    },
    isShowCover() {
      if (this.showStyle == "cover") {
        this.showIconNum = 10;
        return true;
      }
      this.showIconNum = 6;
      return false;
    },
    copy(data) {
      let target = document.createElement("input"); //创建input节点
      target.value = data; // 给input的value赋值
      target.id = "copyInput";
      document.body.appendChild(target); // 向页面插入input节点
      target.select(); // 选中input
      try {
        let success = document.execCommand("Copy"); // 执行浏览器复制命令
        this.alertSuccess("复制成功");
      } catch {
        this.alertFail("复制失败");
      }
      document.body.removeChild(target);
    },
    fetchButtom() {
      axios.get("api/buttoms").then((res) => {
        if (res.status == 200) {
          this.baseUrl = res.data.baseUrl;
          this.Tags = res.data.Tags;
          this.TagsLib = res.data.TagsLib;
        }

        // store.commit('setStars', res.data)
      });
    },
    notQiBing(movieType) {
      if (movieType != "骑兵") {
        return true;
      }
      return false;
    },
    notSiBaDa(movieType) {
      if (movieType != "斯巴达") {
        return true;
      }
      return false;
    },
    notBuBing(movieType) {
      if (movieType != "步兵") {
        return true;
      }
      return false;
    },
    onlyRepeatQuery() {
      this.onlyRepeat = true;
      this.queryList();
    },
    pageLoading(i) {
      this.pageNo = parseInt(this.pageNo) + parseInt(i);
      if (this.pageNo < 1) {
        this.pageNo = 1;
      }
      if (this.pageNo > this.TotalPage) {
        this.pageNo = this.TotalPage;
      }
      this.queryList(true);
    },
    playThis(id) {
      axios.get("api/play/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        } else {
          this.alertFail(res.data.Message);
        }
      });
    },
    openThisFolder(id) {
      axios.get("api/openFolder/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        }
      });
    },
    deleteThis(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.get("api/delete/" + id).then((res) => {
            if (res.status === 200) {
              this.alertSuccess(res.data.Message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    thisActress(actress) {
      this.pageNo = 1;
      this.searchWords = actress;
      this.queryList();
    },

    syncThis(id) {
      axios.get("api/sync/" + id).then((res) => {
        if (res.status === 200) {
          // this.alertSuccess(res.data.Message);
          this.$notify({
            title: "成功",
            message: res.data.Message,
            type: "success",
          });
        }
      });
    },
    setMovieType(id, movieType) {
      movieType =
        movieType == "3" ? "斯巴达" : movieType == "1" ? "步兵" : "骑兵";
      axios.get("api/setMovieType/" + id + "/" + movieType).then((res) => {
        if (res.status === 200) {
          // this.alertSuccess(res.data.Message);
          this.$notify({
            title: "成功",
            message: res.data.Message,
            type: "success",
          });
        }
      });
    },
    infoThis(id) {
      axios.get("api/info/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        }
      });
    },
    getImageList(id) {
      axios.get("api/imageList/" + id).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
        }
      });
    },

    refreshIndex() {
      this.refreshIndexFlag = true;
      axios.get("api/refreshIndex").then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
          this.queryList();
          this.refreshIndexFlag = false;
        }
      });
    },

    handleSelect(item) {
      this.searchWords = item;
    },
    handleSelectTag(item) {
      this.customerTag = item;
    },
    fetchTagsLib(queryString, callback) {
      const suggrestTagsLib = this.TagsLib;
      console.log(suggrestTagsLib);
      const results = queryString
        ? suggrestTagsLib.filter(this.createFilter(queryString))
        : suggrestTagsLib;
      callback(results);
    },
    fetchSuggestion(queryString, callback) {
      const sourceSuggestions = this.suggestions;
      const results = queryString
        ? sourceSuggestions.filter(this.createFilter(queryString))
        : sourceSuggestions;
      // 调用 callback 返回建议列表的数据
      const finalResults = results.slice(0, 50);
      callback(finalResults);
    },
    createFilter(queryString) {
      return (res) => {
        return res.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
      };
    },
    queryList(concat) {
      this.dataList = [];
      let data = new FormData();
      const keywords = this.searchWords ? this.searchWords : "";
      this.searchPage.set(keywords, this.pageNo);
      data.append("pageNo", this.pageNo);
      data.append("pageSize", this.pageSize);
      data.append("keywords", keywords);
      data.append("sortType", this.sortType);
      data.append("sortField", this.sortField);
      data.append("movieType", this.movieType);
      data.append("onlyRepeat", this.onlyRepeat);
      let title = keywords;
      if (keywords !== "") {
        const idx = this.suggestions.indexOf(keywords);
        if (idx >= 0) {
          this.suggestions.splice(idx, 1);
        }
        this.suggestions.unshift(keywords);
        if (this.suggestions.length > 100) {
          this.suggestions.pop();
        }
        localStorage.setItem("searchSuggestions", this.suggestions);
      } else {
        title = "文件";
      }

      this.loading = true;
      this.IndexProgress = false;

      axios.post("api/movieList", data).then((res) => {
        if (res.status === 200) {
          const resData = res.data.Data;
          this.ResultCnt = res.data.ResultCnt;
          this.TotalCnt = res.data.TotalCnt;
          this.CurCnt = res.data.CurCnt;
          this.TotalPage = res.data.TotalPage;
          this.TotalSize = res.data.TotalSize;
          this.ResultSize = res.data.ResultSize;
          this.CurSize = res.data.CurSize;

          this.IndexProgress = res.data.IndexProgress;
          if (resData && resData.length > 0) {
            resData.map((item) => {
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
            if (!concat) {
              this.dataList = resData;
            } else {
              resData.map((item) => {
                this.dataList.push(item);
              });
            }
          }
          const query = this.getRouterParam();
          const { path } = query;
          this.$router.push({
            path,
            query: {
              ...query,
              searchWords: keywords,
              no: this.pageNo,
              path: undefined,
            },
          });
          this.onlyRepeat = false;
          this.loading = false;
          document.title = title;
          this.$forceUpdate();
        }
      });
    },

    getRouterParam() {
      const { query, path } = this.$route;
      const queryParam = {
        ...query,
        path,
        pageSize: this.pageSize,
        sortField: this.sortField,
        sortType: this.sortType,
        movieType: this.movieType,
      };
      return queryParam;
    },

    gotoContext(fileId) {
      this.$router.push({
        path: `/context/${fileId}`,
        query: { ...this.getRouterParam() },
      });
      // this.$router.push({path: `/context/${fileId}`  ,query:{...this.$router.query} });
    },
    openLick(code) {
      const url = this.baseUrl + code;
      window.open(url, "_blank");
    },
    openSearch(actress) {
      const url = this.baseUrl + "search/" + actress;
      window.open(url, "_blank");
    },

    openWin(id) {
      axios.get("api/info/" + id).then((res) => {
        this.sourceList = [];
        if (res.status === 200) {
          this.file = res.data;
          this.dialogVisible = true;
          this.loadDirInfo(this.file.Id, true);
        }
      });
    },
    loadDirInfo(id, loading) {
      axios.get("/api/dir/" + id).then((res) => {
        if (res.status === 200) {
          if (res.data && res.data.length > 0) {
            this.imageList = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].FileType == "jpg") {
                this.imageList.push(res.data[i].ImageBase);
              }
            }
            if (loading) {
              this.sourceList = this.imageList;
            }
          }
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      localStorage.setItem("pageSizeStore", val);
      this.queryList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryList();
    },
    alertSuccess(msg) {
      this.$message({
        message: msg,
        type: "success",
      });
    },
    alertFail(msg) {
      this.$message({
        message: msg,
        type: "fail",
      });
    },
  },
};
</script>
<style scoped>
.container-body {
  min-width: 600px;
  min-height: 600px;
  height: 100%;
  padding: 1px;
  margin-bottom: 40px;
}

.floatButton {
  float: right;
  position: fixed;
  width: 80px;
  top: 320px;
  overflow: auto;
  z-index: 999;
}

.image-tool {
  margin-top: 2px;
  margin-bottom: 2px;
}
.redbackground {
  background-color: yellowgreen;
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

.list-item {
  width: 238px;
  height: 350px;
  float: left;
  list-style: none;
}
.image-tag {
  position: fixed;
}
.img-list-item {
  width: 200px;
  height: 280px;
}

.list-item-cover {
  width: 470px;
  height: auto;
  float: left;
  list-style: none;
}

.img-list-item-cover {
  width: 460px;
  height: 280px;
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
  filter: alpha(opacity=100);
  opacity: 1;
  /* background: #e01616; */
  position: absolute;
  z-index: 999;
  margin-left: 130px;
  margin-top: 5px;
  text-align: justify;
  text-align-last: justify;
  /* color: #ffffff; */
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
  font-size: 18px;
  /* color: red; */
  text-align: center;
}
.mainButtomFloat {
  top: 0px;
  opacity: 1;
  position: fixed;
  z-index: 9999;
  width: 100%;
  background: #ffffff;
}
.mainButtomRowFloat {
  margin: 8px auto;
}
.right-font{
  font-size: 16px;
}
</style>
