<template>
  <q-dialog v-model="card" title="关机设置">
    <q-card class="my-card">
      <div style="width: 240px;padding: 10px;">
        <div class="text-h6">关机设置</div>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-sm">
            <q-radio v-model="view.shutdownType" val="now" label="立即" />
            <q-radio v-model="view.shutdownType" val="target" label="定时" />
          </div>
          <div v-if="view.shutdownType == 'target'"
            style="display: flex;flex-direction: row;justify-content: space-between;">
            <q-input class="timeSelect" v-model="view.shutdownHH"></q-input>
            <q-input class="timeSelect" v-model="view.shutdownMM"></q-input>
            <q-input class="timeSelect" v-model="view.shutdownSS"></q-input>
          </div>
        </q-card-section>
      </div>
      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary">取消</q-btn>
        <q-btn v-close-popup flat color="primary" @click="submitBtn">确定</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue';
// import { GetShutDown } from '../components/api/settingAPI';
const card = ref(false)

const view = reactive(
  {
    shutdownHH: 0,
    shutdownMM: 0,
    shutdownSS: 0,
    shutdownType: 'now',
    shutdownTime: new Date(),
    timeout: null,
    timer: null
  }
)

const open = () => {
  card.value = true
}

const close = () => {
  card.value = false
}

const submitBtn = () => {
  clearTimeout(view.timer)
  console.log('view.shutdownType', view.shutdownType)
  if (view.shutdownType == 'now') {
    console.log('GetShutDown')
    GetShutDown()
  } else {
    view.timeout = (view.shutdownHH || 0) * 3600 + (view.shutdownMM || 0) * 60 + (view.shutdownSS || 0)
    console.log('timeout', view.timeout)
    view.timer = setInterval(() => {
      console.log(view.timeout)
      view.timeout = view.timeout - 1
      if (view.timeout < 0) {
        clearTimeout(view.timer)
        GetShutDown()
        console.log('GetShutDown')
      }
    }, 1000);
  }
}

defineExpose({
  open,
  close
})

</script>
<style>
.timeSelect {
  width: 28px;
}
</style>
