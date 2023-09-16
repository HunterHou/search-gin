import { axios } from '../../boot/axios';

export const QueryActressList = async (data: any) => {
  const res = await axios.post(`/api/actressList`, data);
  return res;
};
