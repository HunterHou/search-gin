import { useQuasar } from 'quasar';
import { computed } from 'vue';

export const isElectron = computed(() => {
  const $q = useQuasar();
  return $q.platform.is.electron;
});

export const isMobile = computed(() => {
  const $q = useQuasar();
  return $q.platform.is.mobile;
});
