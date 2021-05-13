<template>
  <div>
    <el-container>
      <el-container>
        <el-header>
          <el-menu
            router
            :default-active="'/home'"
            class="el-menu-demo"
            mode="horizontal"
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
        </el-header>
        <!-- <el-main>
          <router-view></router-view>
        </el-main>
        <el-backtop :bottom="100" style="width: 50px; height: 50px;">
          <div class="up">
            UP
          </div>
        </el-backtop> -->
      </el-container>
    </el-container>
  </div>
</template>
<style>
.up {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}
</style>


