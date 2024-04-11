<template>
  <div>
    <q-layout view="hHh Lpr lff" style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header reveal class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
          <q-toolbar-title style="-webkit-app-region: drag">
            文件搜索
          </q-toolbar-title>

          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" v-show="isWideScreen" :style="{
            color: currentPath === link.link ? 'red' : '',
            scale: 1.2,
          }" />
          <!-- <q-btn color="green" flat @click="systemProperty.drawerRight = !systemProperty.drawerRight" round dense
            icon="menu">
            <span v-if="systemProperty.drawerRight">{{
            `${(systemProperty &&
              systemProperty.Playing?.Code?.substring(0, 8)) ||
            systemProperty.Playing?.Title?.substring(0, 8)
            }`
          }}</span> 
          </q-btn>-->
          <q-space />
          <q-btn dense flat color="red" v-if="shutdownLeftSecond">关机倒计时：{{ shutdownLeftSecond }}</q-btn>
          <q-btn dense flat size="lg" icon="refresh" @click="refreshThis"></q-btn>
          <q-btn dense flat size="md" icon="ti-star" @click="openHistory" />
          <q-btn dense flat icon="ti-timer" @click="confirmShutDown" />
          <q-btn @click="$q.dark.set(!$q.dark.mode)" dense icon="ti-exchange-vertical" flat
            :color="$q.dark.mode ? 'white' : 'grey'"></q-btn>
          <q-btn v-if="isDesktop" dense flat icon="ti-minus" @click="minusScreen" />
          <q-btn flat dense size="lg" :icon="view.fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            v-model="view.fullscreen" @click="clickFullscreen" />
          <q-btn v-if="isDesktop" dense flat size="lg" icon="ti-close" @click="closeWindow" />

        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawerLeft" :width="200" :breakpoint="700" bordered>
        <q-scroll-area class="fit">
          <q-list>
            <q-item-label header> 你的搜索工具 </q-item-label>
            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" :style="{
            color: currentPath === link.link ? 'red' : '',
            scale: 1.2,
          }" />
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-drawer side="right" :width="withDrawer" v-model="systemProperty.drawerRight" bordered class="bg-grey-3">
        <Playing ref="vue3VideoPlayRef" mode="drawer" />
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
    <ShutdownComponent ref="shutdown" />
    <ListEdit ref="listEditRef" />
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import Playing from 'src/components/PlayingVideo.vue';
import { useSystemProperty } from 'stores/System';
import { useQuasar } from 'quasar';
import EssentialLink from 'components/EssentialLink.vue';
import ListEdit from 'pages/file/components/ListEdit.vue';
import ShutdownComponent from 'components/ShutdownComponent.vue';
import { onKeyStroke } from '@vueuse/core';

import { useRoute } from 'vue-router';


const listEditRef = ref(null);

const systemProperty = useSystemProperty();
const $q = useQuasar();

const shutdown = ref(null);
const view = reactive({
  fullscreen: false,
});

const openHistory = () => {
  listEditRef.value.open({
    tabName: 'history'
  })
}

onKeyStroke(['ctrl', 'y'], () => {
  openHistory()
});


const isWideScreen = computed(() => {
  return $q.screen.width > 1000;
});

const isDesktop = computed(() => {
  return $q.platform.is.electron;
});

const withDrawer = computed(() => {
  return $q.platform.is.mobile ? $q.screen.width : $q.screen.width / 2;
});

const playing = computed(() => {
  return systemProperty.Playing || {};
});

const closeWindow = () => {
  window.close();
};

const minusScreen = () => {
  window.electron.hideMainWindow()
};

const clickFullscreen = () => {
  if (isDesktop.value) {
    window.electron.maxMainWindow()
  } else {
    if (!view.fullscreen) {
      $q.fullscreen.request()
    } else {
      $q.fullscreen.exit()
    }

  }
  view.fullscreen = !view.fullscreen
  console.log(view.fullscreen)
}

const shutdownLeftSecond = computed(() => {
  let left = systemProperty.shutdownLeftSecond;
  if (!left) {
    return null;
  }

  return (
    `${Math.floor(systemProperty.shutdownLeftSecond / 3600)} 时 ${Math.floor((systemProperty.shutdownLeftSecond / 60) % 60)} 分 ${Math.floor(systemProperty.shutdownLeftSecond % 60)} 秒`
  );
});

const vue3VideoPlayRef = ref(null);

watch(playing, (v) => {
  if (v && v.Id) {
    vue3VideoPlayRef.value.open(v);
  } else {
    vue3VideoPlayRef.value.stop();
  }
});

const drawerLeft = ref(false);

const currentPath = computed(() => {
  return useRoute().path;
});

const refreshThis = () => {
  window.location.reload();
};

const confirmShutDown = () => {
  shutdown.value.open();
};

const essentialLinks = [
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
