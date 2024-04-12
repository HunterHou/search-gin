import {useQuasar} from 'quasar';

const $q = useQuasar();


export const isElectron = () => {
  return $q.platform.is.electron;
};
