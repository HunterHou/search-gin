<template>
  <q-item clickable tag="a" target="_self" :to="link">
    <!-- <q-item-section
      avatar
    >
    </q-item-section> -->
    <q-item-section>
      <q-item-label><q-btn flat dense v-if="icon" :icon="icon" />{{ title }}</q-item-label>
    </q-item-section>
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
