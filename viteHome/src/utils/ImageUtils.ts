import { useSystemProperty } from "@/store/System";

const systemProperty = useSystemProperty();

export const getPng = (Id: string) => {
  return systemProperty.getControllerHost + ":8082/api/png/" + Id;
};
export const getJpg = (Id: string) => {
  return systemProperty.getControllerHost + ":8082/api/jpg/" + Id;
};

export const getFileStream = (id: string) => {
  return systemProperty.getControllerHost + ":8083/api/file/" + id;
};

export const getActressImage = (actressUrl: string) => {
  return systemProperty.getControllerHost + ":8082" + actressUrl;
};
