<template>

  <div class="container">
    <div id="msg">
    </div>
    <div>
      <!-- <Logo />
      <h1 class="title">
        vuehome
      </h1> -->
 <el-container>

        <el-container>
            <el-header>
                <el-menu router :default-active="'/home'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="/home">
                        <i class="el-icon-document"></i>
                        <span slot="title"></span>
                    </el-menu-item>
                    <el-menu-item index="/menu/1">
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
                <el-main>
                    <router-view></router-view>
                </el-main>
            <el-backtop :bottom="100" style="width: 50px; height: 50px;">
                <div
                        style="
              height: 100%;
              width: 100%;
              background-color: #f2f5f6;
              box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
              text-align: center;
              line-height: 40px;
              color: #1989fa;
            "
                >
                    UP
                </div>
            </el-backtop>
        </el-container>
    </el-container>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
