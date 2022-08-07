<script setup lang="ts">
import { ElContainer, ElHeader } from "element-plus";
import HeaderVue from "../components/Header/Header.vue";


</script>

<template>
    <ElContainer>
        <ElHeader >
            <HeaderVue />
        </ElHeader>
        <div class="main">
            <RouterView></RouterView>
        </div>
        <ElFooter >
            <hr />
        </ElFooter>
    </ElContainer>
</template>
<style>
.main {
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
}
</style>