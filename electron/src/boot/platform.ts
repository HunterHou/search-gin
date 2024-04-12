import {useQuasar} from 'quasar';

const $q = useQuasar();


export const isElectron =$q.platform.is.electron;
export const isMobile =$q.platform.is.mobile;
