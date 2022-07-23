<script setup lang='ts'>
import { ElMenu, ElMenuItem } from 'element-plus';

import { useRouter } from 'vue-router'
import { staticRoutes } from '../../route'
import { ref } from 'vue'
const { push } = useRouter()
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    push(key)
    console.log(key, keyPath)
}
</script>
<template>
    <ElMenu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect" :router="true">
        <ElMenuItem index="/">Logo</ElMenuItem>
        <div class="flex-grow" />
        <div v-for="item in staticRoutes">
            <ElMenuItem :index="item.path">{{ item.meta.hidden ? '' : item.meta.title }}</ElMenuItem>
        </div>

        <!-- <ElMenuItem index="1">Processing Center</ElMenuItem>
        <ElSubMenu index="2">
            <template #title>Workspace</template>
            <ElMenuItem index="2-1">item one</ElMenuItem>
            <ElMenuItem index="2-2">item two</ElMenuItem>
            <ElMenuItem index="2-3">item three</ElMenuItem>
            <ElSubMenu index="2-4">
                <template #title>item four</template>
                <ElMenuItem index="2-4-1">item one</ElMenuItem>
                <ElMenuItem index="2-4-2">item two</ElMenuItem>
                <ElMenuItem index="2-4-3">item three</ElMenuItem>
            </ElSubMenu>
        </ElSubMenu> -->
    </ElMenu>
</template>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>