<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" style="width: 80vw !important;">
    <div style="max-width: 80vw !important;">
      <q-card class="q-dialog-plugin q-pa-md" :style="{
        color: 'white',
        width: '100%',
        maxHeight: '90vh',
        padding: '20px',
        lineHeight: '32px',
      }">
        <q-btn round class="q-mr-sm" size="sm" ripple color="green" icon="ti-fullscreen" @click="openPlay(view.item)" />
        <q-btn round class="q-mr-sm" size="sm" ripple color="green-7" icon="ti-blackboard"
          @click="openDialog(view.item)" />
        <q-btn round class="q-mr-sm" size="sm" color="primary" icon="ti-control-eject"
          @click="commonExec(PlayMovie(view.item.Id))" />
        <q-btn round class="q-mr-sm" size="sm" color="primary" icon="open_in_new"
          @click="commonExec(OpenFileFolder(view.item.Id))" />
        <q-btn round class="q-mr-sm" size="sm" color="brown-5" icon="wifi_protected_setup"
          v-if="!view.item.MovieType || view.item.MovieType == '无'"
          @click="commonExec(SyncFileInfo(view.item.Id), true)" />
        <q-btn round class="q-mr-sm" size="sm" color="secondary" icon="ti-import"
          @click="commonExec(DownImageList(view.item.Id))" />
        <q-btn round class="q-mr-sm" size="sm" color="amber" glossy text-color="black" icon="ti-trash"
          @click="confirmDelete(view.item)" />
        <q-btn round class="q-mr-sm" size="sm" color="black" @click="moveThis(view.item)" icon="ti-control-shuffle" />
        <q-img fit="fit" easier draggable :src="getJpg(view.item.Id)" style="min-width:600px ;max-height: 50vh">
        </q-img>
        <q-field label="Code" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline cursor-pointer" style="color: blue" tabindex="0" @click="searchCode">
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
        <q-field label="Code" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ view.item.Path }}
            </div>
          </template>
        </q-field>

      </q-card>
      <div v-if="view.prewiewImages">
        <q-img fit="fit" v-for="item in view.prewiewImages" :key="item.Id" :src="getTempImage(item.Id)"
          style="width: 100%;height: auto;"></q-img>
      </div>
    </div>
  </q-dialog>
</template>
<script setup>
import { useQuasar } from 'quasar'
import { useDialogPluginComponent } from 'quasar';
import { onMounted, reactive } from 'vue';

import { formatTitle } from '../../../components/utils';
import { GetSettingInfo } from '../../../components/api/settingAPI';
import {
  QueryDirImageBase64, OpenFileFolder,
  DownImageList, FileRename, DeleteFile,
  PlayMovie, SyncFileInfo
} from '../../../components/api/searchAPI';
import { getJpg, getTempImage } from 'src/components/utils/images';
import { useSystemProperty } from '../../../stores/System';

const $q = useQuasar()
const systemProperty = useSystemProperty();

const commonExec = async (exec) => {
  const { Code, Message } = (await exec) || {};
  console.log(Code, Message);
  if (Code != 200) {
    $q.notify({ message: `${Message}` });
  }
}

const openPlay = (item) => {
  window.open(`/playing/${item.Id}`)
}

const moveThis = async (item) => {
  const res = await FileRename({ ...item, NoRefresh: true, MoveOut: true });
  console.log(res);
  if (res.Code == 200) {
    $q.notify({ type: 'negative', message: res.Message });
  } else {
    $q.notify({ type: 'negative', message: res.Message });
  }
};


const confirmDelete = (item) => {
  $q.dialog({
    title: item.Name,
    message: '确定删除吗?',
    cancel: true,
    persistent: true
  })
    .onOk(() => {
      commonExec(DeleteFile(item.Id), true);
    })
    .onCancel(() => {
      console.log('>>>> Cancel');
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const openDialog = (item) => {
  view.currentData = item;
  systemProperty.Playing = item;
  systemProperty.drawerRight = true;
};

const view = reactive({
  item: {},
  settingInfo: {},
  callback: null,
  prewiewImages: [],
});

defineEmits([
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  ...useDialogPluginComponent.emits,
]);

const open = (item, cb) => {
  view.prewiewImages = [];
  view.item = { ...item };
  view.callback = cb;
  dialogRef.value.show();

  setTimeout(() => {
    QueryDirImageBase64(item.Id).then((res) => {
      console.log(res.data)
      view.prewiewImages = res.data
    })
  }, 500);
};

const fetchSetting = async () => {
  const res = await GetSettingInfo();
  view.settingInfo = res.data;
};

const searchCode = () => {
  window.open(`${view.settingInfo.BaseUrl}/${view.item.Code}`);
};

// onDialogOK, onDialogCancel
const { dialogRef, onDialogHide } = useDialogPluginComponent();
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
