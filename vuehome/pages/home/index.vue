<template>
  <div>
    <h2 align="center" style="margin-top: 0px">
      掃描结果分析
      <el-divider direction="vertical"></el-divider>
      <el-button
        type="primary"
        :loading="indexLoading"
        size="small"
        @click="refreshIndex()"
        >重建索引
      </el-button>
    </h2>
    <div
      class="d-tag"
      style="background: white"
      v-if="tagData && tagData.length > 0"
    >
      <el-link
        v-for="tag in tagData"
        :key="tag.Name"
        class="e-tag"
        :underline="false"
      >
        <el-tag
          size="large"
          style="font-size: 12px"
          :value="tag.Cnt"
          @click="gotoMenu(tag)"
        >
          <el-badge :value="tag.Cnt">
            <span>
              <b
                >{{ tag.Name }} (<i>{{ tag.SizeStr }}</i
                >)
              </b>
            </span>
          </el-badge>
        </el-tag>
      </el-link>
    </div>
    <li class="s-table d-li" v-if="scanTime && scanTime.length > 0">
      <el-table :data="scanTime" align="center" :stripe="true" border>
        <el-table-column label="文件夹" header-align="left" align="left">
          <template slot-scope="scope">
            <el-link
              :title="scope.row.Name"
              @click="folderGotoMenu(scope.row.Name)"
            >
              {{ scope.row.Name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="数量" header-align="right" align="right">
          <template slot-scope="scope">
            <el-link
              :title="scope.row.Size"
              @click="folderGotoMenu(scope.row.Size)"
            >
              {{ scope.row.Size }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="耗时"
          width="80px"
          header-align="right"
          align="right"
        >
          <template slot-scope="scope">
            <el-link
              :title="scope.row.Cnt"
              @click="folderGotoMenu(scope.row.Name)"
            >
              {{ scope.row.Cnt }}&nbsp;ms
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </li>

    <li class="d-table d-li">
      <el-table
        :data="tableData"
        align="center"
        style="margin: 20px auto"
        :stripe="true"
        border
      >
        <el-table-column
          label="结果集"
          header-align="left"
          min-width="250px"
          align="left"
        >
          <template slot-scope="scope">
            <el-link :title="scope.row.Name" @click="gotoMenu(scope.row)">
              {{ scope.row.Name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="大小" header-align="right" align="right">
          <template slot-scope="scope">
            <el-link :title="scope.row.Name" @click="gotoMenu(scope.row)">
              {{ scope.row.SizeStr }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="数量" header-align="right" align="right">
          <template slot-scope="scope">
            <el-link :title="scope.row.Name" @click="gotoMenu(scope.row)">
              {{ scope.row.Cnt }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="Name"
          label="操作"
          header-align="left"
          align="left"
          @click="openThis(Name)"
        >
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.IsDir"
              type="success"
              @click="gotoMenu(scope.row)"
              >前往
            </el-button>
            <el-button
              size="small"
              v-if="scope.row.IsDir"
              type="info"
              @click="openThis(scope.$index, scope.row)"
              >打开</el-button
            >
            <el-button
              size="small"
              v-if="scope.row.IsDir"
              type="danger"
              @click="deleteThis(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </li>
  </div>
</template>
<script>
import axios from "axios";
import setStorePath from "@/mixin/setStorePath";
export default {
  mixins: [setStorePath],
  data() {
    return {
      indexLoading: false,
      tableData: [],
      tagData: [],
      scanTime: [],
      refreshIndexFlag: false,
    };
  },
  mounted() {
    document.title = "首页";
  },
  created() {
    this.loadData();
  },
  methods: {
    folderGotoMenu(Name) {
      const queryParam = {
        searchWords: Name,
        movieType: "",
        no: 1,
      };
      this.$router.push({
        path: "/fileList",
        query: queryParam,
      });
    },
    gotoMenu(data) {
      const { IsDir, Name } = data;
      const queryParam = {
        searchWords: !IsDir ? "" : Name,
        movieType: !IsDir && Name != "全部" ? Name : "",
        no: 1,
      };
      this.$router.push({
        path: "/fileList",
        query: queryParam,
      });
    },
    loadData() {
      axios
        .get("api/typeSizeMap")
        .then((res) => {
          if (res.status === 200) {
            const { data } = res;
            this.tableData = data;
          }
        })
        .then(
          axios.get("api/tagSizeMap").then((res) => {
            if (res.status === 200) {
              const { data } = res;
              this.tagData = data;
            }
          })
        )
        .then(
          axios.get("api/scanTime").then((res) => {
            if (res.status === 200) {
              const { data } = res;
              this.scanTime = data;
            }
          })
        );
    },
    openThis(index, data) {
      const { Name } = data;
      axios.post("api/OpenFolerByPath", { dirpath: Name }).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: "执行成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "执行失败",
            type: "fail",
          });
        }
      });
    },
    deleteThis(index, data) {
      const { Name } = data;
      axios.post("api/DeleteFolerByPath", { dirpath: Name }).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: "执行成功",
            type: "success",
          });
          this.tableData.splice(index, 1);
        } else {
          this.$message({
            message: "执行失败",
            type: "fail",
          });
        }
      });
    },
    refreshIndex() {
      this.indexLoading = true;
      axios.get("api/refreshIndex").then((res) => {
        if (res.status === 200) {
          // this.$message({
          //   message: res.data.Message,
          //   type: "success",
          // });
          this.indexLoading = false;
          this.loadData();
        } else {
          this.$message({
            message: "执行失败",
            type: "fail",
          });
        }
      });
    },
  },
};
</script>
<style >
.d-li {
  overflow: inherit;
  display: block;
  float: left;
}
.d-tag {
  margin: 5px 0px;
  padding: 18px 18px;
}
.s-table {
  width: 250px;
  width: 18%;
}
.d-table {
  margin: 0 10px;
  width: 80%;
  min-width: 350px;
}
.e-tag {
  margin-right: 24px;
  margin-top: 12px;
}
</style>
