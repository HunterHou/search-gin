<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin q-pa-md"
      style="max-width: 1200px; width: 60vw"
    >
      <q-form class="q-gutter-md">
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
          "
        >
          <div class="q-gutter-y-md" style="width: 100%; padding: 10px">
            <q-btn-toggle
              v-model="view.item.MovieType"
              :options="MovieTypeOptions"
              toggle-color="primary"
            />
            <q-input
              label="编码"
              autogrow
              v-model="view.item.Code"
              :dense="false"
              @change="makePreview"
            />
            <q-input
              label="图鉴"
              autogrow
              v-model="view.item.Actress"
              :dense="false"
            />
            <q-input
              color="red-12"
              label="名称"
              autogrow
              v-model="view.item.Title"
              :dense="false"
              @change="titleChange"
            />
            <q-input
              class="col-8"
              label="JPG地址"
              autogrow
              v-model="view.item.Jpg"
              :dense="false"
            />
            <q-input
              label="PNG地址"
              autogrow
              v-model="view.item.Png"
              :dense="false"
            />
          </div>
          <div
            style="
              width: 200px;
              border-radius: 5px;
              margin: 10px 20px;
            "
            v-if="view.item.Jpg"
          >
            <q-img width="200px" :src="view.item.Jpg"></q-img>
          </div>
        </div>
      </q-form>
      <q-card-actions align="center">
        <q-btn color="primary" label="移动" @click="editMoveout"/>
        <q-btn color="primary" label="命名" @click="editItemSubmit(false)"/>
        <q-btn color="primary" label="预览" @click="view.preview === true"/>
        <q-btn color="primary" label="关闭" @click="onDialogCancel"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useQuasar} from 'quasar';
import {useDialogPluginComponent} from 'quasar';
import {reactive} from 'vue';

import {
  formatTitle,
  formatCode,
  MovieTypeOptions,
} from '../../../components/utils';
import {FileRename} from '../../../components/api/searchAPI';
import {FileModel} from 'src/components/model/File';
import {useSystemProperty} from 'stores/System';

const systemProperty = useSystemProperty();

const $q = useQuasar();

const view = reactive({
  item: null,
  preview: false,
  callback: null,
});

const emits = defineEmits([
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  'plus-one',
  'sub-one',
  'update:modelValue',
  ...useDialogPluginComponent.emits,
]);

const makePreview = () => {
  const uriCode = view.item.Code.toLowerCase().trim().replace('-', '00');
  view.item.Jpg =
    systemProperty.SettingInfo.ImageUrl + `${uriCode}/${uriCode}pl.jpg`;
};

const reg = /\w+[-_]\d+/;

const titleChange = (v) => {
  if (v) {
    console.log(v.length);
    v = v.replace(/[\r\n\t]+/g, "");
    v = v.replace(/&nbsp;/g, "");
    console.log(v.length);
    v = v.trimEnd()
    console.log(v.length);
    const code = v.match(reg);
    if (code && code[0] && code[0].length > 0) {
      view.item.Code = code[0];
      if (!view.item.MovieType || view.item.MovieType === '无') {
        makePreview();
      }

    }
    const arr = v.split(' ');
    if (arr && arr.length > 2) {
      view.item.Actress = arr[arr.length - 1];
    }
    view.item.Title = view.item.Title.replace(view.item.Code, '');
  }
};

const open = (item, cb) => {
  view.item = new FileModel().fromObject(item);
  view.item.Jpg = null;
  view.item.Png = null;
  view.item.Code = formatCode(item.Code);
  view.item.Title = formatTitle(item.Title);
  view.previewUrl = null;
  view.callback = cb;
  dialogRef.value.show();
};

const editMoveout = async () => {
  await editItemSubmit(true);
};

const editItemSubmit = async (MoveOut) => {
  const {Id, Title, Code, Actress, FileType, MovieType, Jpg, Png} = view.item;
  let code = Code.trim();
  if (code && code.indexOf('-') < 0) {
    code = '-' + code;
  }
  let name = '';
  if (Actress.length !== 0) {
    name += '[' + Actress.trim() + ']';
  }
  if (code.length !== 0) {
    name += ' [' + code.trim() + ']';
  }
  if (MovieType && MovieType !== '无') {
    if (name.indexOf('{{') < 0) {
      name += `{{${MovieType}}}`;
    } else {
    }
  }
  const arr = Title.trim().split('.');
  const arrLength = arr.length;
  for (let idx = 0; idx < arrLength; idx++) {
    const str = arr[idx];
    const strNew = str.replace(str.charAt(0), str.charAt(0).toUpperCase());
    name += strNew;
  }

  if (name.indexOf('.' + FileType) < 0) {
    name += '.' + FileType;
  }
  const param = {
    Id,
    Name: name,
    Code: code,
    Title,
    Actress,
    MoveOut,
    Jpg,
    Png,
    NoRefresh: true,
  };
  emits('plus-one');
  onDialogOK();
  const res = await FileRename(param);
  if (res.Code === 200) {
    emits('sub-one');
    if (view.callback) {
      view.callback();
    }
  } else {
    emits('sub-one');
    $q.notify({type: 'negative', message: res.Message});
  }
};

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} =
  useDialogPluginComponent();
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
defineExpose({
  open,
});
</script>
