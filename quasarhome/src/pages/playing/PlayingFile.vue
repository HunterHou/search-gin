<script setup>
import PlayingVideo from '../../components/PlayingVideo.vue';
import { useRoute } from 'vue-router';
const { params } = useRoute();
console.log(params);
</script>
<template>
  <PlayingVideo />
</template>
