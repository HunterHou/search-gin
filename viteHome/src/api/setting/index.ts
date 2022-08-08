import { useAxios } from "../../hooks/userAxios";
import { useSystemProperty } from "@/store/System";
import { ResultEdit } from "@/config/ResultModel";
import { SettingInfo } from "@/views/settting";

const request = useAxios();
const systemProperty = useSystemProperty();

export const GetSettingInfo = async () => {
  const res = await request.get({ url: "/api/buttoms" });
  systemProperty.setControllerHost(res.ControllerHost);
  return res as unknown as SettingInfo;
};

export const PostSettingInfo = async (data: any) => {
  const res = await request.post({ url: "/api/setting", data });
  return res as unknown as ResultEdit;
};
