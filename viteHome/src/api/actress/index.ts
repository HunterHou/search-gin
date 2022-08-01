import {useAxios} from "../../hooks/userAxios";

const request = useAxios()


export const QueryActressList = async (data : string) => {
    const res = await request.post({url: `/api/actressList`,data})
    return res
}