import { commonAxios } from '../../boot/axios';

export const TypeSizeMap = async () => {
  const res = await commonAxios.get('/commonAxios/typeSizeMap');
  return res && res.data;
};

export const TagSizeMap = async () => {
  const res = await commonAxios.get('/commonAxios/tagSizeMap');
  return res && res.data;
};

export const ScanTime = async () => {
  const res = await commonAxios.get('/commonAxios/scanTime');
  return res && res.data;
};
