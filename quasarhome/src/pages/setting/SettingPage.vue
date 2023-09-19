<template>
  <div class="q-pa-md">
    <!-- {{ view.settingInfo }} -->
    <div style="display: flex;flex-direction: row;justify-content: space-between; width: 100%;">
      <a :href="view.ipAddr">访问： {{ view.ipAddr }}</a>
    </div>
    <div style="margin: 0 10px 40px 10px;">
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
        narrow-indicator>
        <q-tab name="search" label="搜索设置" />
        <q-tab name="base" label="基础设置" />
        <q-tab name="system" label="系统设置" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="search">
          
          
          <q-input v-model="view.settingInfo.Buttons" label="Buttons" />
          <q-input v-model="view.settingInfo.Dirs" label="Dirs" />
          <q-input v-model="view.settingInfo.MovieTypes" label="MovieTypes" />
          <q-input v-model="view.settingInfo.VideoTypes" label="VideoTypes" />
          <q-input v-model="view.settingInfo.Tags" label="Tags" />
        </q-tab-panel>

        <q-tab-panel name="base">
          <q-input v-model="view.settingInfo.ControllerHost" label="ControllerHost" />
          <q-input v-model="view.settingInfo.ImageHost" label="ImageHost" />
          <q-input v-model="view.settingInfo.StreamHost" label="StreamHost" />
          <q-input v-model="view.settingInfo.BaseUrl" label="BaseUrl" />
          <q-input v-model="view.settingInfo.OMUrl" label="OMUrl" />
          <q-input v-model="view.settingInfo.DirsLib" label="DirsLib" />
          <q-input v-model="view.settingInfo.TagsLib" label="TagsLib" />
          <q-input v-model="view.settingInfo.TagsLib" label="TagsLib" />
          <q-input v-model="view.settingInfo.Types" label="Types" />
        </q-tab-panel>

        <q-tab-panel name="system">
          <q-input v-model="view.settingInfo.SystemHtml" label="SystemHtml" />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <div style="position: fixed;bottom: 30px;align-items: center;margin: 0 auto;">
      <q-btn style="width: 200px;" @click="submitForm">提交</q-btn>
    </div>

  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

import { onMounted, reactive, ref } from 'vue';
import { GetSettingInfo, PostSettingInfo, GetIpAddr } from '../../components/api/settingAPI';

const $q = useQuasar()
const tab = ref('search')
const view = reactive({
  settingInfo: {},
  ipAddr: ''
});

const submitForm = async () => {
  const { Code, Message } = await PostSettingInfo(view.settingInfo)
  if (Code != 200) {
    $q.notify({ message: `${Message}` })
  } else {
    $q.notify({ message: `${Message}` })
  }
}

const commonExec = async (exec) => {
  const { Code, Message } = await exec
  console.log(Code, Message)
  if (Code != 200) {
    $q.notify({ message: `${Message}` })
  } else {
    $q.notify({ message: `${Message}` })
  }
}

const fetchSearch = async () => {
  const { data } = await GetSettingInfo();
  console.log(data);
  view.settingInfo = data
};

const queryIpAddr = async () => {
  const { Code, Data } = await GetIpAddr()
  if (Code == '200') {
    view.ipAddr = `http://${Data}:10081`
  }
}

onMounted(() => {
  fetchSearch();
  queryIpAddr()
});

</script>
<style lang="scss" scoped></style>