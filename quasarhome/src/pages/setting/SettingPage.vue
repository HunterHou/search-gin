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
          <!-- <q-input v-model="view.settingInfo.Buttons" label="Buttons" /> -->


          <q-field color="purple-12" label="Buttons" stack-label>
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:control>
              <div class="q-gutter-xs">
                <div class="cursor-pointer">
                  {{ view.settingInfo.Buttons }}
                  <q-popup-edit v-model="view.settingInfo.Buttons" auto-save v-slot="scope">
                    <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                  </q-popup-edit>
                </div>
              </div>
            </template>
          </q-field>

          <q-field color="purple-12" label="Dirs" stack-label>
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:control>
              <div class="q-gutter-xs">
                <MutiSelector v-bind:model-value="view.settingInfo.Dirs" :options="view.settingInfo.DirsLib"
                  @onchange="(arr) => view.settingInfo.Dirs = arr" />
              </div>
            </template>
          </q-field>
          <q-field color="purple-12" label="MovieTypes" stack-label>
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:control>
              <div class="q-gutter-xs">
                <MutiSelector v-bind:model-value="view.settingInfo.MovieTypes" :options="view.settingInfo.Types"
                  @onchange="(arr) => view.settingInfo.MovieTypes = arr" />
              </div>
            </template>
          </q-field>
          <q-field color="purple-12" label="VideoTypes" stack-label>
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:control>
              <div class="q-gutter-xs">
                <MutiSelector v-bind:model-value="view.settingInfo.VideoTypes" :options="view.settingInfo.Types"
                  @onchange="(arr) => view.settingInfo.VideoTypes = arr" />
              </div>
            </template>
          </q-field>
          <q-field color="purple-12" label="Tags" stack-label>
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>
            <template v-slot:control>
              <div class="q-gutter-xs">
                <MutiSelector v-bind:model-value="view.settingInfo.Tags" :options="view.settingInfo.TagsLib"
                  @onchange="(arr) => view.settingInfo.Tags = arr" />
              </div>
            </template>
          </q-field>
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
          <div v-html="view.settingInfo.SystemHtml"></div>
          <q-input v-model="view.settingInfo.SystemHtml" label="SystemHtml" />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <div style="width: 100%;">
      <q-btn color="blue" style="width: 200px;margin: 0 auto;" @click="submitForm">提交</q-btn>
    </div>

  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

import { onMounted, reactive, ref } from 'vue';
import { GetSettingInfo, PostSettingInfo, GetIpAddr } from '../../components/api/settingAPI';
import MutiSelector from '../../components/MutiSelector.vue';

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
    window.location.reload()
  } else {
    $q.notify({ message: `${Message}` })
  }
}


// const commonExec = async (exec) => {
//   const { Code, Message } = await exec
//   console.log(Code, Message)
//   if (Code != 200) {
//     $q.notify({ message: `${Message}` })
//   } else {
//     $q.notify({ message: `${Message}` })
//   }
// }

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