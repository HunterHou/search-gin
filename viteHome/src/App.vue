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
</template>
<style>
</style>
