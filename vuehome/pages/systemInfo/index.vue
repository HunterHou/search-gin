<template>
  <div>
    <p  style="width:80%;"  v-html=" form.SystemInfo"></p>
  </div>
</template>
<script>
import axios from "axios";
import setStorePath from "@/mixin/setStorePath";

export default {
  mixins: [setStorePath],
  data: function () {
    return {
      form: {
        BaseUrl: "",
        OMUrl: "",
        Remark: "",
        SystemInfo: "",
        ImageTypes: [],
        DocsTypes: [],
        VideoTypes: [],
        Types: [],
        Dirs: [],
        DirsLib: [],
        Tags: [],
        TagsLib: [],
        tagLibData: [],
      },
    };
  },
  mounted: function () {
    document.title = "系统信息";
    this.loadData();
  },
  watch: {},
  methods: {
    loadData() {
      axios.get("api/settingInfo").then((res) => {
        if (res.status == 200) {
          this.form = res.data;
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
