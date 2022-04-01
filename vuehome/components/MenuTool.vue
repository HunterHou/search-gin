<template>
  <el-menu
    router
    :default-active="activePath"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/home">
      <i class="el-icon-document"></i>
      <span slot="title">首頁</span>
    </el-menu-item>
    <el-menu-item index="/fileList">
      <i class="el-icon-menu"></i>
      <span slot="title">目录</span>
    </el-menu-item>
    <el-menu-item index="/actress">
      <i class="el-icon-location"></i><span slot="title">脸谱</span>
    </el-menu-item>
    <el-menu-item index="/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
    <el-menu-item index="/systemInfo">
      <i class="el-icon-setting"></i>
      <span slot="title">系統信息</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data: function () {
    let { path } = this.$route;
    return {
      activePath: path,
      isCollapse: true,
    };
  },
  computed: {
    listenStorePath() {
      const { activeMenu } = this.$store.state;
      this.activePath = activeMenu;
      return;
    },
  },
  watch: {
    
  },
};
</script>
<style>
.el-menu-demo {
  margin-top: 1px;
}
.el-menu--horizontal > .el-menu-item {
  height: 44px;
  line-height: 44px;
}
.el-menu-item {
  text-align: center;
  width: 20%;
}
</style>


