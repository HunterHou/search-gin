import { useAxios } from "../../hooks/userAxios";
import { ResultList } from "@/utils/ResultResponse";
import { ResultEdit } from "@/config/ResultModel";

const request = useAxios();

export const QueryFileList = async (data: any): Promise<ResultList> => {
  const res = await request.post({ url: "/api/movieList", data });
  return res as unknown as ResultList;
};

export const FindFileInfo = async (data: string) => {
  const res = await request.get({ url: `/api/info/${data}` });
  return res;
};

export const QueryDirImageBase64 = async (data: string):Promise<any> => {
  const res = await request.get({ url: `/api/dir/${data}` });
  return res;
};

export const PlayMovie = async (data: string):Promise<ResultEdit> => {
  const res = await request.get({ url: `/api/play/${data}` });
  return res as unknown as ResultEdit;
};

export const OpenFileFolder = async (data: string) => {
  const res = await request.get({ url: `/api/openFolder/${data}` });
  return res;
};

export const DeleteFile = async (data: string) => {
  const res = await request.get({ url: `/api/delete/${data}` });
  return res;
};

export const SyncFileInfo = async (data: string) => {
  const res = await request.get({ url: `/api/sync/${data}` });
  return res;
};

export const ResetMovieType = async (data: string, movieType: string) => {
  const res = await request.get({
    url: `/api/setMovieType/${data}/${movieType}`,
  });
  return res;
};

export const RefreshIndex = async () => {
  const res = await request.get({ url: `/api/refreshIndex` });
  return res;
};

export const DownImageList = async (data: string):Promise<any>  => {
  const res = await request.get({ url: `/api/imageList/${data}` });
  return res;
};

export const HeartBeatQuery = async () => {
  const res = await request.get({ url: `/api/heartBeat` });
  return res;
};

export const AddTag = async (clickId: string, title: string) => {
  const res = await request.get({
    url: `/api/file/addTag/${clickId}/${title}`,
  });
  return res;
};

export const FileRename = async (data: any) => {
  const res = await request.post({ url: `/api/file/rename`, data });
  return res as unknown as ResultEdit;
};

export const OpenFolerByPath = async (data: any) => {
  const res = await request.post({ url: `/api/OpenFolerByPath`, data });
  return res as unknown as ResultEdit;
};
export const DeleteFolerByPath = async (data: any) => {
  const res = await request.post({ url: `/api/DeleteFolerByPath`, data });
  return res as unknown as ResultEdit;
};

export const CloseTag = async (id: string,title:string) => {
  const res = await request.get({ url: `/api/file/clearTag//${id}/${title}` });
  return res;
};

export const GetFile = async (id: string) => {
  const res = await request.get({ url: `/api/file/${id}` });
  return res;
};
