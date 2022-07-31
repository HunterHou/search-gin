import {useAxios} from "../../hooks/userAxios";

const request = useAxios()

export const GetSettingInfo = async (data : any) => {
    const res = await request.get({url: '/api/buttoms', data})
    return res
}

export const PostSettingInfo = async (data : any) => {
    const res = await request.post({url: '/api/setting', data})
    return res
}