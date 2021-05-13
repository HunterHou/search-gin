<template>
  <el-menu
    router
    :default-active="'/home'"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/home">
      <i class="el-icon-document"></i>
      <span slot="title"></span>
    </el-menu-item>
    <el-menu-item index="/menu">
      <i class="el-icon-menu"></i>
      <span slot="title">目录</span>
    </el-menu-item>
    <el-menu-item index="/context">
      <i class="el-icon-location"></i
    ></el-menu-item>
    <el-menu-item index="/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">设置</span>
    </el-menu-item>
  </el-menu>
</template>
<style>
.header-style {
  height: 50px;
  line-height: 50px;
}
</style>


