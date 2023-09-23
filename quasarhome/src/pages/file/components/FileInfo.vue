<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin q-pa-md"
      :style="{
        color: 'white',
        width: '100%',
        height: 'auto',
        padding: '20px',
        lineHeight: '32px',
      }"
    >
      <q-img
        fit="fit"
        easier
        draggable
        :src="getJpg(view.item.Id)"
        style="max-height: 40vh"
      >
      </q-img>
      <q-field label="Code" stack-label>
        <template v-slot:control>
          <div
            class="self-center full-width no-outline"
            style="color: blue"
            tabindex="0"
            @click="searchCode"
          >
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
      <q-field label="Code" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ view.item.Path }}
          </div>
        </template>
      </q-field>
    </q-card>
  </q-dialog>
</template>

<script setup>
// import { useQuasar } from 'quasar'
import { useDialogPluginComponent } from 'quasar';
import { onMounted, reactive } from 'vue';

import { formatTitle } from '../../../components/utils';
import { GetSettingInfo } from '../../../components/api/settingAPI';
import { getJpg } from 'src/components/utils/images';

// const props = defineProps({
//     // ...自定义 props
// })

// const $q = useQuasar()

const view = reactive({
  item: {},
  settingInfo: {},
  callback: null,
});

defineEmits([
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  ...useDialogPluginComponent.emits,
]);

const open = (item, cb) => {
  view.item = {};
  view.item = { ...item };
  view.callback = cb;
  dialogRef.value.show();
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
