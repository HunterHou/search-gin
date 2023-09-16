import { axios } from '../../boot/axios';

export const SearchAPI = async (params: object) => {
  const { data } = await axios.post('/api/movieList', params);
  return data;
};

export const RefreshAPI = async (params: object) => {
  const data = await axios.get('/api/refreshIndex', params);
  return data;
};

export const FindFileInfo = async (data: string) => {
  const res = await axios.get(`/api/info/${data}`);
  return res;
};

export const QueryDirImageBase64 = async (data: string) => {
  const res = await axios.get(`/api/dir/${data}`);
  return res;
};

export const PlayMovie = async (data: string) => {
  const res = await axios.get(`/api/play/${data}`);
  return res as unknown;
};

export const OpenFileFolder = async (data: string) => {
  const res = await axios.get(`/api/openFolder/${data}`);
  return res as unknown;
};

export const DeleteFile = async (data: string) => {
  const res = await axios.get(`/api/delete/${data}`);
  return res as unknown;
};

export const SyncFileInfo = async (data: string) => {
  const res = await axios.get(`/api/sync/${data}`);
  return res as unknown;
};

export const TransferTasksInfo = async () => {
  const res = await axios.get('/api/transferTasks');
  return res as unknown;
};

export const TansferFile = async (data: string) => {
  const res = await axios.get(`/api/tranferToMp4/${data}`);
  return res as unknown;
};

export const CutFile = async (id: string, start: string, end: string) => {
  const res = await axios.get(`/api/cutMovie/${id}/${start}/${end}`);
  return res as unknown;
};

export const ResetMovieType = async (data: string, movieType: string) => {
  const res = await axios.get(`/api/setMovieType/${data}/${movieType}`);
  return res && res.data;
};

export const DownImageList = async (data: string): Promise<any> => {
  const res = await axios.get(`/api/imageList/${data}`);
  return res as unknown;
};

export const HeartBeatQuery = async () => {
  const res = await axios.get('/api/heartBeat');
  return res as unknown;
};

export const AddTag = async (clickId: string, title: string) => {
  const res = await axios.get(`/api/file/addTag/${clickId}/${title}`);
  return res as unknown;
};

export const FileRename = async (data: any) => {
  const res = await axios.post('/api/file/rename', data);
  return res as unknown;
};

export const OpenFolerByPath = async (data: any) => {
  const res = await axios.post('/api/OpenFolerByPath', data);
  return res as unknown;
};
export const DeleteFolerByPath = async (data: any) => {
  const res = await axios.post('/api/DeleteFolerByPath', data);
  return res as unknown;
};

export const CloseTag = async (id: string, title: string) => {
  const res = await axios.get(`/api/file/clearTag//${id}/${title}`);
  return res as unknown;
};
