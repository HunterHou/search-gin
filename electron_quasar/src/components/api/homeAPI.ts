import { commonAxios } from '../../boot/axios';

export const TypeSizeMap = async () => {
  const res = await commonAxios().get('/api/typeSizeMap');
  return res && res.data;
};

export const TagSizeMap = async () => {
  const res = await commonAxios().get('/api/tagSizeMap');
  return res && res.data;
};

export const ScanTime = async () => {
  const res = await commonAxios().get('/api/scanTime');
  return res && res.data;
};
