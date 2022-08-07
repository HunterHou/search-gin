<script setup lang="ts">
import { computed } from "vue";
import DefaultLay from "./layout/DefaultLay.vue";
import { useRoute } from "vue-router";
const key = computed(() => {
  console.log('key',useRoute().path)
  return useRoute().path
})
</script>

<template>
  <section>
    <RouterView :key="key"></RouterView>
  </section>
  <!-- <DefaultLay /> -->
</template>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  --el-header-height: 48px;
}

.main {
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
}
</style>
