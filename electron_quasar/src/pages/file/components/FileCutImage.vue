<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin q-pa-md"
      style="max-width: 1200px; width: 60vw"
    >
      <q-form class="q-gutter-md">
        <q-card-actions align="center">
          <q-btn color="primary" label="预览" @click="previewImg"/>
          <q-btn color="primary" label="下載" @click="downloadImg"/>
          <q-btn color="primary" label="关闭" @click="onDialogCancel"/>
        </q-card-actions>
        <div class="row" style="display:flex;flex-direction: row; justify-content: space-between">
          <q-input
            label="JPG时间"
            v-model="view.startJpg"
          />
          <q-input
            label="PNG时间"
            v-model="view.startPng"
          />
        </div>
<!--        <div style="width:100%;display: flex;flex-direction: row;justify-content: space-between">-->
<!--          <q-img fit="fill" height="auto" width="48%" :src="getJpg(view.item?.Id)"/>-->
<!--          <q-img fit="fill" height="auto" width="48%" :src="getPng(view.item?.Id)"/>-->
<!--        </div>-->
        <br/>
        <div style="width:100%;display: flex;flex-direction: row;justify-content: space-between">
          <q-img v-if="view.uImage" height="auto" width="48%" :src="view.uImage"/>
          <q-img v-if="view.uPng" height="auto" width="48%" :src="view.uPng"/>
        </div>
      </q-form>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {FileModel} from "components/model/File";
import {reactive} from "vue";
import {useDialogPluginComponent} from "quasar";
import {CutImage} from "components/api/searchAPI";
import {getJpg, getPng} from "components/utils/images";

const {dialogRef, onDialogHide, onDialogCancel} = useDialogPluginComponent();

const view = reactive({
  item: null,
  startJpg: '00:00:05',
  startPng: '00:00:05',
  uPng: null,
  uImage: null,
  callback: null,
});

const open = (item, cb) => {
  view.item = new FileModel().fromObject(item);
  console.log(view.item)
  view.callback = cb;
  dialogRef.value.show();
};

const previewImg = async (downFlag) => {
  if (view.startJpg) {
    const res = await CutImage(view.item.Id, 'Jpg', view.startJpg, false);
    view.uImage = `data:image/jpeg;base64,${res.Data}`
  }
  if (view.startPng) {
    const res = await CutImage(view.item.Id, 'Png', view.startPng, false);
    view.uPng = `data:image/png;base64,${res.Data}`
  }

}
const downloadImg = (downFlag) => {
  previewImg(false)
}

defineExpose({
  open,
});
</script>

<style scoped>

</style>
