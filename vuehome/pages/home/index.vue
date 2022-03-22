<template>
  <div align="center">
    <div style="align: center; margin-left: 150px; margin-right: 150px">
      <el-badge
        v-for="tag in tagData"
        :key="tag"
        style="margin-right: 26px; margin-top: 10px"
        :value="tag.Cnt"
      >
        <el-tag @click="gotoMenu(tag)">
          <h4>
            <b> {{ tag.Name }} </b> 【{{ tag.SizeStr }}】
          </h4>
        </el-tag>
      </el-badge>
    </div>
    <el-divider></el-divider>
    <h2 style="margin-top: 20px">掃描結果分析</h2>

    <el-table
      :data="tableData"
      style="width: 1200px"
      align="center"
      :stripe="true"
    >
      <el-table-column
        label="结果集"
        header-align="right"
        width="400px"
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
        header-align="right"
        align="right"
        @click="openThis(Name)"
      >
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.IsDir"
            type="success"
            icon="el-icon-location"
            @click="refreshIndex()"
            >索引
          </el-button>
          <el-button
            v-if="scope.row.IsDir"
            type="info"
            @click="openThis(scope.$index, scope.row)"
            >打开</el-button
          >
          <el-button
            v-if="scope.row.IsDir"
            type="danger"
            @click="deleteThis(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      tagData: [],
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
    gotoMenu(data) {
      const { IsDir, Name } = data;
      this.$router.push({
        path: "/menu",
        query: {
          searchWords: !IsDir ? "" : Name,
          movieType: !IsDir && Name != "全部" ? Name : "",
          no: 1,
        },
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
      axios.get("api/refreshIndex").then((res) => {
        if (res.status === 200) {
          this.$message({
            message: res.data.Message,
            type: "success",
          });
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
