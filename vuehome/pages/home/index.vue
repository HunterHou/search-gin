<template>
  <div>
    <!-- <h2>This is Home</h2> -->
    <el-table
      :data="tableData"
      style="width:1000px;height:800px"
      :stripe = "true"
    >
      <el-table-column prop="name" label="结果集" header-align="right" align="right"> </el-table-column>
      <el-table-column prop="size" label="大小" header-align="right" align="right"> </el-table-column>
      <el-table-column prop="cnt" label="数量" header-align="right" align="right"> </el-table-column>
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
   mounted(){
     document.title="首页"
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.get("api/typeSizeMap").then((res) => {
        if (res.status === 200) {
          const {data}=res
          if(data.length>0){
            for (let index = 0; index <data.length; index++) {
              const element = data[index];
              this.tableData.push({"name":element.Name,"cnt":element.Cnt,"size":element.SizeStr})
            }
          }
        }
      });
    },
  },
};
</script>
