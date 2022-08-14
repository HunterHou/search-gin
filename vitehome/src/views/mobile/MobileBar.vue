<template>
    <Tabbar v-model="tabbarActive" @change="tabbarChange">
        <TabbarItem name="home" to="/mhome" icon="home-o">首页</TabbarItem>
        <TabbarItem name="filelist" to="/mfilelist" icon="search">
            搜索
        </TabbarItem>
        <TabbarItem name="actress" to="/mactress" icon="friends-o">脸谱</TabbarItem>
        <TabbarItem name="setting" to="/msetting" icon="setting-o">设置</TabbarItem>
    </Tabbar>
</template>
<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant';
import { ref } from 'vue';

const tabbarActive = ref("fileList")

const tabbarChange=(index)=>{
    console.log(index,tabbarActive.value)
}

</script>