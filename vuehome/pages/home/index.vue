<template>
  <div>
    <!-- <h2>This is Home</h2> -->
    <el-table
      :data="tableData"
      style="text-algin: center; align: center"
    >
      <el-table-column prop="name" label="结果集"> </el-table-column>
      <el-table-column prop="size" label="大小"> </el-table-column>
      <el-table-column prop="cnt" label="数量"> </el-table-column>
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
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let data = new FormData();
      data.append("pageNo", this.pageNo);
      data.append("pageSize", this.pageSize);
      axios.post("api/movieList", data).then((res) => {
        if (res.status === 200) {
          this.tableData = [
            {
              name: "扫描库",
              cnt: res.data.TotalCnt,
              size: res.data.TotalSize,
            },
          ];
        }
      });
    },
  },
};
</script>
