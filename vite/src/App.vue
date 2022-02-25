<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MenuTool from "./components/MenuTool.vue";
import Home from "./components/Home.vue";
</script>

<template>
  <div class="common-layout">
   <el-container>
      <el-header>
        <MenuTool></MenuTool>
      </el-header>
      <el-main>
        <Home/>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="less">
.common-layout {
  .el-header {
    // background-color: #b3c0d1;
    // color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    // background-color: #e9eef3;
    // color: var(--el-text-color-primary);
    text-align: center;
    line-height: 160px; 
  }

  body > .el-container {
    margin-bottom: 40px;
  }
}
</style>
