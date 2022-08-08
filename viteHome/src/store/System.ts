import { defineStore } from "pinia";
import { MovieQuery } from "../views/fileList";
import { store } from "./pinia";

const SystemProperty = defineStore({
  id: "system",
  persist: {
    enabled: true,
    // 自定义持久化参数
    strategies: [
      {
        // 自定义key
        key: "systemProperty",
        // 自定义存储方式，默认sessionStorage
        storage: localStorage,
        // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
      },
    ],
  },
  state: () => ({
    Logo: {
      title: "文件系统",
      url: "",
    },
    FileSearchParam: {
      Page: 1,
      PageSize: 14,
      MovieType: "",
      SortField: "MTime",
      SortType: "desc",
      Keyword: "",
      OnlyRepeat: false,
    },
    SearchSuggestions: [],
    ControllerHost: "http://127.0.0.1",
  }),
  getters: {
    getControllerHost() {
      return this.ControllerHost;
    },
    getSuggestions() {
      return this.SearchSuggestions;
    },
    getSearchParam() {
      return this.FileSearchParam;
    },
  },
  actions: {
    syncSearchParam(param: MovieQuery) {
      this.FileSearchParam.Page = param.Page;
      this.FileSearchParam.PageSize = param.PageSize;
      this.FileSearchParam.MovieType = param.MovieType;
      this.FileSearchParam.SortField = param.SortField;
      this.FileSearchParam.SortType = param.SortType;
      this.FileSearchParam.Keyword = param.Keyword;
      if (param.Keyword) {
        this.addSuggestions(param.Keyword);
      }
    },

    setPage(page: number) {
      this.FileSearchParam.Page = page;
    },
    setPageSize(pageSize: number) {
      this.FileSearchParam.PageSize = pageSize;
    },
    setMovieType(MovieType: string) {
      this.FileSearchParam.MovieType = MovieType;
    },
    setKeyword(Keyword: string) {
      this.FileSearchParam.Keyword = Keyword;
    },
    setSortField(SortField: string) {
      this.FileSearchParam.SortField = SortField;
    },
    setSortType(SortType: string) {
      this.FileSearchParam.SortType = SortType;
    },
    setOnlyRepeat(OnlyRepeat: boolean) {
      this.FileSearchParam.OnlyRepeat = OnlyRepeat;
    },
    setControllerHost(ControllerHost: string) {
      this.ControllerHost = ControllerHost;
    },

    addSuggestions(queryParam: string) {
      if (!queryParam) {
        return;
      }
      if (!this.SearchSuggestions) {
        this.SearchSuggestions = [];
      }
      const idx = this.SearchSuggestions.indexOf(queryParam);
      if (idx >= 0) {
        this.SearchSuggestions.splice(idx, 1);
      }
      this.SearchSuggestions.unshift(queryParam);
      if (this.SearchSuggestions.length > 100) {
        this.SearchSuggestions.pop();
      }
    },
  },
});
export const useSystemProperty = () => {
  return SystemProperty(store);
};
