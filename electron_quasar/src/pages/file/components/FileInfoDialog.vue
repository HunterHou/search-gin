<template>
  <q-dialog ref="dialogRef" @escape-key="onDialogClose" @before-hide="onDialogClose" @hide="onDialogClose"
            v-model:model-value="showDialog" :maximized="isMobile" full-width style="max-width: 1200px;">
    <q-card style="max-width: 1200px!important;height: 96vh!important;">
      <q-toolbar class="bg-black text-white shadow-2 rounded-borders flex-center "
                 style="position: fixed;z-index: 5;max-width: 1200px;">
        <q-toolbar-title shrink>
          <div style="max-width: 50vw;height: 1.5rem;overflow: hidden;">
            {{ view.item.Name }}
          </div>
        </q-toolbar-title>
        <q-space/>
        <q-tabs v-model="showDetail" shrink>
          <q-tab v-for="item in ClickButtons" :key="item.value" :name="item.value" :label="item.label"
                 @click="tabClick(item.value)"/>
        </q-tabs>
        <q-space/>
        <q-btn dense flat icon="close" @click="onDialogClose">
          <q-tooltip class="bg-white text-primary">关闭</q-tooltip>
        </q-btn>
      </q-toolbar>
      <div style="margin-top:50px">
        <div v-if="showDetail === 'web'" style="overflow: auto;">
          <iframe :frameborder="0" :allowfullscreen="true" width="100%" height="900px"
                  :src="`${view.settingInfo.BaseUrl}${view.item.Code}`"></iframe>
        </div>
        <div v-if="showDetail === 'movie'">
          <Playing ref="vue3VideoPlayRef" mode="list" @close="onDialogClose"/>
        </div>
        <div v-if="showDetail === 'detail'">
          <q-img fit="fit" easier draggable :src="getJpg(view.item.Id)" style="max-height: 60vh;">
          </q-img>
          <q-field label="Code" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline cursor-pointer" style="color: blue" tabindex="0"
                   @click="searchCode(view.item)">
                {{ view.item.Code }}
              </div>
            </template>
          </q-field>
          <q-field label="Actress" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ view.item.Actress }}
              </div>
            </template>
          </q-field>
          <q-field label="Name" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ formatTitle(view.item.Name) }}
              </div>
            </template>
          </q-field>
          <q-field label="Time" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ formatTitle(view.item.MTime) }}
              </div>
            </template>
          </q-field>
          <q-field label="Path" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ view.item.Path }}
              </div>
            </template>
          </q-field>
        </div>
        <div v-if="showDetail == 'image'">
          <q-img fit="fit" v-for="item in view.prewiewImages" :key="item.Id" :src="getTempImage(item.Id)"
                 style="width: 100%;height: auto;"></q-img>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import {useQuasar} from 'quasar'
import {useDialogPluginComponent} from 'quasar';
import {onMounted, reactive, ref, computed} from 'vue';

import {formatTitle} from '../../../components/utils';
import {GetSettingInfo} from '../../../components/api/settingAPI';
import {
  QueryDirImageBase64
} from '../../../components/api/searchAPI';
import {getJpg, getTempImage} from 'src/components/utils/images';
import Playing from 'src/components/PlayingVideo.vue';

const $q = useQuasar()

const isMobile = computed(() => {
  return $q.platform.is.mobile;
});

const ClickButtons = [
  {label: '播放', value: 'movie'},
  {label: '详情', value: 'detail'},
  {label: '图层', value: 'image'},
  {label: 'JavBus', value: 'web'}
]

const vue3VideoPlayRef = ref(null)
const showDialog = ref(false)
const showDetail = ref('detail')
const view = reactive({
  item: {},
  settingInfo: {},
  callback: null,
  prewiewImages: [],
});


const showMovie = () => {
  showDetail.value = 'movie';
  setTimeout(() => {
    vue3VideoPlayRef.value.open(view.item)
  }, 100);
}
const tabClick = (value) => {
  showDetail.value = value;
  if (value == 'movie') {
    showMovie()
  }
}

defineEmits([
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  ...useDialogPluginComponent.emits,
]);

const open = (data) => {
  const {item, cb, playing} = data
  view.prewiewImages = [];
  view.item = {...item};
  view.callback = cb;
  dialogRef.value.show();
  if (playing) {
    showMovie()
  }
  setTimeout(() => {
    QueryDirImageBase64(item.Id).then((res) => {
      view.prewiewImages = res.data
    })
  }, 500);
};

const fetchSetting = async () => {
  const res = await GetSettingInfo();
  view.settingInfo = res.data;
};

const searchCode = (item) => {
  let itemCode = item.Code
  if (itemCode.indexOf('-C') > 0) {
    itemCode = itemCode.substring(0, itemCode.indexOf('-C'))
  }
  if (itemCode.indexOf('-') == 0) {
    itemCode = itemCode.substring(1)
  }
  const url = `${view.settingInfo.BaseUrl}/${itemCode}`
  console.log(url)
  if ($q.platform.is.electron) {
    window.electron.createWindow({router: url, width: 1280, height: 1000, titleBarStyle: '',})
  } else {
    window.open(url)
  }
};

// onDialogOK, onDialogCancel
const {dialogRef, onDialogHide} = useDialogPluginComponent();

const onDialogClose = () => {
  if (vue3VideoPlayRef.value) {
    vue3VideoPlayRef.value.stop()
  }
  showDetail.value = 'detail'
  showDialog.value = false
  onDialogHide()
}
// dialogRef      - 用在 QDialog 上的 Vue ref 模板引用
// onDialogHide   - 处理 QDialog 上 @hide 事件的函数
// onDialogOK     - 对话框结果为 ok 时会调用的函数
//                    示例: onDialogOK() - 不带参数
//                    示例: onDialogOK({ /*.../* }) - 带参数
// onDialogCancel - 对话框结果为 cancel 时调用的函数

// 这是示例的内容，不是必需的
// const onOKClick = () => {
// REQUIRED！ 对话框的结果为 ok 时，必须调用 onDialogOK()  (参数是可选的)
// onDialogOK()
// 带参数的版本: onDialogOK({ ... })
// ...会自动关闭对话框
// }

onMounted(() => {
  fetchSetting();
});

defineExpose({
  open,
});
</script>
