<template>
  <div>
    <q-layout
      view="LHR lpr lfr"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header reveal class="bg-black">
        <q-toolbar>
          <q-btn
            flat
            @click="drawerLeft = !drawerLeft"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title>文件搜索</q-toolbar-title>
          <!-- <q-space /> -->
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
            v-show="isWideScreen"
            :style="{
              color: currentPath == link.link ? 'red' : '',
              scale: 1.2,
            }"
          />

          <q-space />
          <q-btn @click="GetShutDown()">关机</q-btn>
          <q-btn
            flat
            @click="systemProperty.drawerRight = !systemProperty.drawerRight"
            round
            dense
            icon="menu"
          >
            {{ `${systemProperty.Playing?.Code || ''}` }}
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawerLeft"
        :width="200"
        :breakpoint="700"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>
            <q-item-label header> 你的搜索工具 </q-item-label>
            <EssentialLink
              v-for="link in essentialLinks"
              :key="link.title"
              v-bind="link"
              :style="{
                color: currentPath == link.link ? 'red' : '',
                scale: 1.2,
              }"
            />
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-drawer
        side="right"
        :breakpoint="700"
        v-model="systemProperty.drawerRight"
        bordered
        class="bg-grey-3"
      >
        <Playing />
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Playing from 'src/components/PlayingVideo.vue';
import { useSystemProperty } from '../stores/System';
import { GetShutDown } from '../components/api/settingAPI';
import { useQuasar } from 'quasar';

import { useRoute } from 'vue-router';
const systemProperty = useSystemProperty();
const $q = useQuasar();

const isWideScreen = computed(() => {
  return $q.screen.width > 1000;
});

import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const drawerLeft = ref(false);

// const PlayMode = computed(() => {
//   return systemProperty.PlayMode;
// });

const currentPath = computed(() => {
  return useRoute().path;
});

const essentialLinks: EssentialLinkProps[] = [
  {
    title: '首页',
    caption: 'quasar.dev',
    icon: 'home',
    link: '/',
  },
  {
    title: '搜索',
    caption: 'github.com/quasarframework',
    icon: 'search',
    link: '/search',
  },
  {
    title: '图鉴',
    caption: 'chat.quasar.dev',
    icon: 'image',
    link: '/picture',
  },
  {
    title: '设置',
    caption: 'chat.quasar.dev',
    icon: 'settings',
    link: '/setting',
  },
  {
    title: '系统',
    caption: 'forum.quasar.dev',
    icon: 'chat',
    link: '/system',
  },
];
</script>
