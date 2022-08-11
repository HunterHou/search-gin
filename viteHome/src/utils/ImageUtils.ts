import { useSystemProperty } from "@/store/System";

const systemProperty = useSystemProperty();

export const getPng = (Id: string) => {
  return systemProperty.ImageHost + "/api/png/" + Id;
};
export const getJpg = (Id: string) => {
  return systemProperty.ImageHost + "/api/jpg/" + Id;
};

export const getFileStream = (id: string) => {
  return systemProperty.StreamHost + "/api/file/" + id;
};

export const getActressImage = (actressUrl: string) => {
  return systemProperty.ImageHost + actressUrl;
};
