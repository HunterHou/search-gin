<template>
  <div>
    <!-- <h2>This is Home</h2> -->
    <el-table :data="tableData" style="width: 1000px; height: 800px" :stripe="true">
      <el-table-column prop="Name" label="结果集" header-align="right" align="right">
      </el-table-column>
      <el-table-column prop="SizeStr" label="大小" header-align="right" align="right">
      </el-table-column>
      <el-table-column prop="Cnt" label="数量" header-align="right" align="right">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="操作"
        header-align="right"
        align="right"
        @click="openThis(Name)"
      >
        <template slot-scope="scope" v-if="scope.row.IsDir">
          <el-button size="mini" type="danger" @click="openThis(scope.row.Name)"
            >打开</el-button
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
    };
  },
  mounted() {
    document.title = "首页";
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.get("api/typeSizeMap").then((res) => {
        if (res.status === 200) {
          const { data } = res;
          this.tableData = data;
        }
      });
    },
    openThis(dirname) {
      axios.post("api/OpenFolerByPath", { dirpath: dirname }).then((res) => {
        if (res.status === 200) {
          this.$message({
            message: "执行成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>
