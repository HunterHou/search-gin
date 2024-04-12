import {commonAxios} from '../../boot/axios';

export const QueryActressList = async (data: unknown) => {
  const res = await commonAxios().post('/api/actressList', data);
  return res;
};

export const PostPicture = async (data: unknown) => {
  const res = await commonAxios().post('/api/actressList', {path: data});
  return res;
};
