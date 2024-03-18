<template>
  <q-dialog ref="dialogRef" @escape-key="onDialogClose" @before-hide="onDialogClose" @hide="onDialogClose"
    style="width: 80vw !important;" v-model:model-value="showDialog">
    <q-card class="q-dialog-plugin q-pa-md" :style="{
      color: 'white',
      height: '100%',
      width: '100%',
      padding: '0 4px',
      lineHeight: '32px',
      maxWidth: '80vw !important'
    }">
      <div style="margin-top: 0;height: 96%;overflow: auto;">
        <q-img fit="fit" v-for="item in view.prewiewImages" :key="item.Id" :src="getTempImage(item.Id)"
               style="width: 100%;height: auto;"></q-img>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from 'quasar';
import { reactive, ref } from 'vue';
import {
  QueryDirImageBase64
} from '../../../components/api/searchAPI';
import { getTempImage } from 'src/components/utils/images';

const showDialog = ref(false)


const view = reactive({
  item: {},
  prewiewImages: [],
});

defineEmits([
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  ...useDialogPluginComponent.emits,
]);

const open = (data) => {
  const { item } = data
  view.prewiewImages = [];
  view.item = { ...item };
  dialogRef.value.show();
  setTimeout(() => {
    QueryDirImageBase64(item.Id).then((res) => {
      view.prewiewImages = res.data
    })
  }, 500);
};



// onDialogOK, onDialogCancel
const { dialogRef, onDialogHide } = useDialogPluginComponent();

const onDialogClose = () => {
  showDialog.value = false
  onDialogHide()
}

defineExpose({
  open,
});
</script>
