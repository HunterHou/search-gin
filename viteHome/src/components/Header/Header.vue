<script setup lang='ts'>
import { ElMenu, ElMenuItem } from 'element-plus';
import { computed } from 'vue'

import { useRouter } from 'vue-router'
import { staticRoutes } from '../../route'
import { useSystemProperty } from '../../store/System'
import { ref } from 'vue'
const { push } = useRouter()
const systemProperty = useSystemProperty()
const activeIndex = ref('1')
const logo = computed(() => {
    return systemProperty.Logo
})
const handleSelect = (key: string, keyPath: string[]) => {
    push(key)
    console.log(key, keyPath)
}
</script>
<template>
    <ElMenu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect" :router="true">
        <ElMenuItem index="/">
            <ElImage v-if="logo.url" src="logo.url"></ElImage>
            {{ logo.title }}
        </ElMenuItem>
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
<style scoped>
.flex-grow {
    flex-grow: 1;
}
.el-header {
    height: 40px
}
.el-menu-demo {
    height:48px;
}
.el-menu-item{
    height:48px;
}
</style>