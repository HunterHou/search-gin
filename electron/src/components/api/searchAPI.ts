import { commonAxios } from '../../boot/axios';

export const SearchcommonAxios = async (params: object) => {
  const { data } = await commonAxios.post('/commonAxios/movieList', params);
  return data;
};

export const RefreshcommonAxios = async (params: object) => {
  const res = await commonAxios.get('/commonAxios/refreshIndex', params);
  return res && res.data;
};

export const FindFileInfo = async (data: string) => {
  const res = await commonAxios.get(`/commonAxios/info/${data}`);
  return res && res.data;
};

export const QueryDirImageBase64 = async (data: string) => {
  const res = await commonAxios.get(`/commonAxios/dir/${data}`);
  return res;
};

export const PlayMovie = async (data: string) => {
  const res = await commonAxios.get(`/commonAxios/play/${data}`);
  return res && res.data;
};

export const OpenFileFolder = async (data: string) => {
  const res = await commonAxios.get(`/commonAxios/openFolder/${data}`);
  return res && res.data;
};

export const DeleteFile = async (data: string) => {
  const res = await commonAxios.get(`/commonAxios/delete/${data}`);
  return res && res.data;
};

export const SyncFileInfo = async (data: object) => {
  const res = await commonAxios.post(`/commonAxios/sync`, data);
  return res && res.data;
};

export const TransferTasksInfo = async () => {
  const res = await commonAxios.get('/commonAxios/transferTasks');
  return res && res.data;
};

export const TansferFile = async (data: string) => {
  const res = await commonAxios.get(`/commonAxios/tranferToMp4/${data}`);
  return res && res.data;
};

export const CutFile = async (id: string, start: string, end: string) => {
  const res = await commonAxios.get(`/commonAxios/cutMovie/${id}/${start}/${end}`);
  return res && res.data;
};

export const ResetMovieType = async (data: string, movieType: string) => {
  const res = await commonAxios.get(`/commonAxios/setMovieType/${data}/${movieType}`);
  return res && res.data;
};

export const DownImageList = async (data: string): Promise<unknown> => {
  const res = await commonAxios.get(`/commonAxios/imageList/${data}`);
  return res && res.data;
};

export const HeartBeatQuery = async () => {
  const res = await commonAxios.get('/commonAxios/heartBeat');
  return res && res.data;
};

export const AddTag = async (clickId: string, title: string) => {
  const res = await commonAxios.get(`/commonAxios/file/addTag/${clickId}/${title}`);
  return res && res.data;
};

export const CloseTag = async (id: string, title: string) => {
  const res = await commonAxios.get(`/commonAxios/file/clearTag/${id}/${title}`);
  return res && res.data;
};

export const FileRename = async (data: unknown) => {
  const res = await commonAxios.post('/commonAxios/file/rename', data);
  return res && res.data;
};

export const OpenFolerByPath = async (data: unknown) => {
  const res = await commonAxios.post('/commonAxios/OpenFolerByPath', data);
  return res && res.data;
};
export const DeleteFolerByPath = async (data: unknown) => {
  const res = await commonAxios.post('/commonAxios/DeleteFolerByPath', data);
  return res && res.data;
};
