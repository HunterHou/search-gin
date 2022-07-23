<script setup lang="ts">
import { ElContainer, ElHeader } from 'element-plus';
import HeaderVue from './components/Header/Header.vue';

</script>

<template>
  <ElContainer>
    <ElHeader>
      <HeaderVue />
    </ElHeader>
    <ElMain>
      <RouterView></RouterView>
    </ElMain>
  </ElContainer>
</template>
