<template>
  <q-item clickable tag="a" target="_self" :to="link" style="padding: 0;">
    <q-btn style="margin:1px  8px" flat dense v-if="icon" :icon="icon">{{ title }}</q-btn>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
