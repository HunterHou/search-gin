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
        <h3>{{ view.item.Name }}{{ view.item.SizeStr }}</h3>
        <q-img fit="fit" v-for="item in view.prewiewImages" :key="item" :src="GetFileByPathUseEncode(item)"
          style="width: 100%;height: auto;">
        </q-img>
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from 'quasar';
import { reactive, ref } from 'vue';
import { GetFileByPathUseEncode } from 'src/components/utils/images';

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
  const item = data
  console.log(data)
  view.prewiewImages = [];
  view.item = { ...item };
  dialogRef.value.show();
  view.prewiewImages = item.Images
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
