<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { GetSettingInfo } from "./api/setting";
import { useSystemProperty } from "./store/System";

const systemProperty =useSystemProperty()
const key = computed(() => {
  console.log('key',useRoute().path)
  return useRoute().path
})

const loadSetting = async () => {
  const res = await GetSettingInfo()
  systemProperty.setSettingInfo(res)
}
onMounted(()=>{
  loadSetting()
})
</script>

<template>
  <section>
    <RouterView :key="key"></RouterView>
  </section>
</template>
<style>
</style>
