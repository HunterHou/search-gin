<template>
  <div>
    <q-layout view="lhh LpR lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header reveal class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawerLeft" :width="200" :breakpoint="700" bordered class="bg-grey-3">
        <q-scroll-area class="fit">
          <q-list>
            <q-item-label header>
              你的搜索工具
            </q-item-label>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-drawer side="right" v-model="drawerRight" bordered :width="400" :breakpoint="600" class="bg-grey-3">
         
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

const drawerLeft = ref(false)
const drawerRight = ref(true)

const essentialLinks: EssentialLinkProps[] = [
  {
    title: '首页',
    caption: 'quasar.dev',
    icon: 'home',
    link: '/home'
  },
  {
    title: '搜索',
    caption: 'github.com/quasarframework',
    icon: 'search',
    link: '/search'
  },
  {
    title: '图鉴',
    caption: 'chat.quasar.dev',
    icon: 'image',
    link: '/picture'
  },
  {
    title: '设置',
    caption: 'chat.quasar.dev',
    icon: 'settings',
    link: '/setting'
  },
  {
    title: '系统',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/system'
  },
];




</script>
