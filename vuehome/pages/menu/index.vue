<template>
  <div class="container-body">
    <el-backtop :bottom="100" style="width: 50px; height: 50px">
      <div class="up">UP</div>
    </el-backtop>
    <!-- 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40 -->
    <el-button
      style="
        position: fixed;
        top: 600px;
        overflow: auto;
        z-index: 999;
        left: 20px;
      "
      round
      @click="pageLoading(-1)"
      >上一页
    </el-button>
    <!-- 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40 -->
    <el-button
      style="
        position: fixed;
        top: 600px;
        overflow: auto;
        z-index: 999;
        right: 80px;
      "
      round
      @click="pageLoading(1)"
      >下一页
    </el-button>
    <el-row>
      <el-col :span="2" :offset="1">
        <el-button
          type="success"
          size="mini"
          icon="el-icon-location"
          @click="refreshIndex()"
          >索引
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-radio-group v-model="sortField" @change="queryList()" size="mini">
          <el-radio-button label="code">名</el-radio-button>
          <el-radio-button label="mtime">时</el-radio-button>
          <el-radio-button label="size">容</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="3">
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

      <el-col :span="6">
        <el-autocomplete
          id="searchInput"
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
            >Go
          </el-button>
          <template slot-scope="{ item }">
            <div v-if="item" class="name">{{ item }}</div>
          </template>
        </el-autocomplete>
      </el-col>
    </el-row>

    <el-row style="margin-top: 4px">
      <el-col :span="3" :offset="1">
        <el-radio-group v-model="showStyle" size="mini">
          <el-radio-button label="cover">封面</el-radio-button>
          <el-radio-button label="post">海报</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="1">
        <el-link style="color: green">
          <i
            :underline="true"
            class="el-icon-zoom-out"
            title="播放"
            @click="onlyRepeatQuery()"
            >查重</i
          ></el-link
        >
      </el-col>
      <el-col :span="12">
        <el-divider direction="vertical"></el-divider>
        <span> 扫描库：{{ totalSize }} </span>
        <el-divider direction="vertical"></el-divider>
        <span> 搜索：{{ resultSize }} </span>
        <el-divider direction="vertical"></el-divider>
        <span> 当前：{{ curSize }}</span>
        <el-divider direction="vertical"></el-divider>
      </el-col>
    </el-row>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      style="margin-top: 10px; padding-buttom: 40px"
    >
      <li
        style="overflow: auto"
        :class="isShowCover() ? 'list-item-cover' : 'list-item'"
        v-for="item in dataList"
        :key="item.Id"
      >
        <div
          v-if="item"
          @click="openWin(item.Id)"
          :class="isShowCover() ? 'img-list-item-cover' : 'img-list-item'"
        >
          <el-tag v-if="item.MovieType" type="danger" effect="dark"
            >{{ item.MovieType }}
          </el-tag>
          <el-image
            style="width: 100%; height: 100%"
            :src="item.PngUrl"
            fit="contain"
            lazy
          >
          </el-image>
        </div>
        <div class="image-tool">
          <el-link
            ><i
              :underline="false"
              class="el-icon-video-play icon-style"
              title="播放"
              @click="playThis(item.Id)"
            ></i
          ></el-link>
          <el-link
            ><i
              :underline="false"
              class="el-icon-user-solid icon-style"
              title="搜同"
              @click="thisActress(item.Actress)"
            ></i
          ></el-link>
          <el-link>
            <i
              class="el-icon-folder-opened icon-style"
              title="文件夹"
              @click="openThisFolder(item.Id, 2)"
            ></i
          ></el-link>
          <el-link>
            <i
              class="el-icon-edit icon-style"
              title="编辑"
              @click="editItem(item)"
            ></i
          ></el-link>
          <el-link>
            <i
              v-if="notQiBing(item.MovieType)"
              class="el-icon-bicycle icon-style"
              title="骑兵"
              @click="setMovieType(item.Id, 2)"
            ></i
          ></el-link>
          <el-link>
            <i
              v-if="notBuBing(item.MovieType)"
              class="el-icon-sunny icon-style"
              title="步兵"
              @click="setMovieType(item.Id, 1)"
            ></i
          ></el-link>
          <el-link>
            <i
              v-if="notSiBaDa(item.MovieType)"
              class="el-icon-ship icon-style"
              title="欧美"
              @click="setMovieType(item.Id, 3)"
            ></i
          ></el-link>

          <el-link v-if="7 < showIconNum">
            <i
              class="el-icon-delete icon-style"
              title="删除"
              @click="deleteThis(item.Id, 2)"
            ></i
          ></el-link>
          <el-link v-if="8 < showIconNum">
            <i
              class="el-icon-download icon-style"
              title="刮图"
              @click="getImageList(item.Id, 2)"
            ></i
          ></el-link>
          <el-link v-if="9 < showIconNum">
            <i
              :underline="false"
              class="el-icon-refresh icon-style"
              title="同步"
              @click="syncThis(item.Id)"
            ></i
          ></el-link>

          <el-link>
            <el-dropdown placement="top-start" v-if="7 > showIconNum">
              <i class="el-icon-more icon-style"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="7 > showIconNum">
                  <i
                    class="el-icon-refresh-right icon-style"
                    title="信息"
                    @click="infoThis(item.Id, 2)"
                  ></i>
                </el-dropdown-item>
                <el-dropdown-item v-if="8 > showIconNum">
                  <el-link>
                    <i
                      class="el-icon-delete icon-style"
                      title="删除"
                      @click="deleteThis(item.Id, 2)"
                    ></i
                  ></el-link>
                </el-dropdown-item>

                <el-dropdown-item v-if="9 > showIconNum">
                  <i
                    class="el-icon-download icon-style"
                    title="刮图"
                    @click="getImageList(item.Id, 2)"
                  ></i>
                </el-dropdown-item>
                <el-dropdown-item v-if="10 > showIconNum">
                  <el-link>
                    <i
                      :underline="false"
                      class="el-icon-refresh icon-style"
                      title="同步"
                      @click="syncThis(item.Id)"
                    ></i
                  ></el-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-link>
          <div class="context-text">
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
      :page-sizes="[2, 4, 6, 10, 12, 14, 30, 60, 90, 200]"
      :page-size="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total,prev, pager, next, sizes, jumper"
      :current-page="pageNo"
      :total="totalCnt"
    ></el-pagination>
    <!-- 弹窗 -->
    <el-dialog
      width="72%"
      :modal="true"
      :lock-scroll="true"
      :title="file.Name"
      :visible.sync="dialogVisible"
    >
      <div v-if="file">
        <div @click="open(file.Id)">
          <el-image
            :src="file.JpgUrl"
            style="magin: 0 0; width: 80%; height: auto"
          />
        </div>
        <el-row :gutter="24"></el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>番:</span>
          </el-col>
          <el-col :span="16">
            <a href="javascript:void(0);" @click="openLick(file.Code)"
              ><span>{{ file.Code }}</span></a
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>脸谱:</span>
          </el-col>
          <el-col :span="16">
            <a href="javascript:void(0);" @click="openSearch(file.Actress)">
              <span>{{ file.Actress }}</span></a
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"><span>时间:</span></el-col>
          '
          <el-col :span="16">
            <span>{{ file.MTime }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>大小:</span>
          </el-col>
          <el-col :span="16">
            <span>{{ file.SizeStr }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <span>源:</span>
          </el-col>
          <el-col :span="16">
            <span>{{ file.Path }}</span>
          </el-col>
        </el-row>
      </div>
      <div
        v-for="(item, index) in sourceList"
        :key="index"
        style="display: flex; margin: 10px auto"
      >
        <el-image
          style="width: 80%; min-width: 800px; height: auto; margin: 0 auto"
          :src="item"
          :preview-src-list="sourceList"
          lazy
        >
        </el-image>
      </div>
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
        border="1"
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

export default {
  data() {
    const { searchWords, no } = this.$route.query;
    var searchPage = new Map();
    return {
      showIconNum: 5,
      sourceList: [],
      showStyle: "post",
      file: "",
      baseUrl: "",
      onlyRepeat: false, //是否查重
      dialogVisible: false, //是否弹窗
      dialogFormItemVisible: false,
      sortField: "mtime",
      sortType: "desc",
      movieType: "",
      dataList: "",
      dataCnt: 0,
      errorMsg: "",
      fit: "fit",
      searchWords: searchWords ? searchWords : "",
      searchPage: searchPage,
      pagerCount: 10,
      pageNo: no ? parseInt(no) : 1,
      pageSize: 12,
      totalCnt: 0,
      totalPage: 0,
      loading: false,
      totalSize: 0,
      resultSize: 0,
      curSize: 0,
      suggestions: [], //搜索框 提示
      formItem: {},
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
    });
  },
  mounted() {
    document.onkeydown = () => {
      let key = window.event.keyCode;
      if (key === 37) {
        //left
        // this.pageLoading(-1);
      } else if (key === 39) {
        //right
        // this.pageLoading(1);
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
  },
  watch: {
    searchWords: (a) => {
      console.log(a);
    },
  },
  methods: {
    editItem(item) {
      console.log(item);
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
      console.log("clear:", this.searchPage);
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
      if (this.pageNo > this.totalPage) {
        this.pageNo = this.totalPage;
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
          this.alertSuccess(res.data.Message);
        }
      });
    },
    setMovieType(id, movieType) {
      movieType =
        movieType == "3" ? "斯巴达" : movieType == "1" ? "步兵" : "骑兵";
      axios.get("api/setMovieType/" + id + "/" + movieType).then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
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
      axios.get("api/refreshIndex").then((res) => {
        if (res.status === 200) {
          this.alertSuccess(res.data.Message);
          this.queryList();
        }
      });
    },

    handleSelect(item) {
      this.searchWords = item;
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
      console.log("query:", this.searchPage);
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
        title = "目录";
      }

      this.loading = true;

      axios.post("api/movieList", data).then((res) => {
        if (res.status === 200) {
          const resData = res.data.Data;
          this.totalCnt = res.data.TotalCnt;
          this.totalPage = res.data.TotalPage;
          this.totalSize = res.data.TotalSize;
          this.resultSize = res.data.ResultSize;
          this.curSize = res.data.CurSize;
          if (resData && resData.length > 0) {
            resData.map((item) => {
              if (item.Code == item.Actress) {
                item.Code = "";
                item.Actress = "";
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

    open(fileId) {
      this.$router.push({
        path: `/context/${id}`,
        param: { id: fileId },
        query: { ...this.getRouterParam() },
      });
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

.icon-style {
  font-size: 21px;
  color: red;
  margin-left: 2px;
}

.context-text {
  font-size: 14px;
  font-size-adjust: inherit;
  margin-right: 2px;
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
  width: 240px;
  height: auto;
  float: left;
  list-style: none;
}

.img-list-item {
  width: 220px;
  height: 280px;
}

.img-list-item span {
  filter: alpha(opacity=80);
  opacity: 0.8;
  background: #e01616;
  position: absolute;
  z-index: 99;
  margin-top: 4px;
  margin-left: 4px;
  text-align: justify;
  text-align-last: justify;
  width: 54px;
  color: #ffffff;
}

.list-item-cover {
  width: 476px;
  /* min-height: 300px; */
  height: auto;
  /* height: auto; */
  float: left;
  list-style: none;
}

.img-list-item-cover {
  width: 460px;
  height: 280px;
}

.img-list-item-cover span {
  filter: alpha(opacity=80);
  opacity: 0.8;
  background: #e01616;
  position: absolute;
  z-index: 99;
  margin-top: 4px;
  margin-left: 4px;
  text-align: justify;
  text-align-last: justify;
  width: 54px;
  color: #ffffff;
}

.pageTool {
  position: fixed;
  bottom: 4px;
  overflow: auto;
  z-index: 999;
}

/*.pagination {*/
/*  align-content: center;*/
/*  position: absolute;*/
/*  bottom: 0px;*/
/*  overflow: auto;*/
/*  z-index: 999;*/
/*}*/

.up {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}

v-deep .el-tooltip__popper {
  width: 300px;
  height: 40px;
}
</style>
