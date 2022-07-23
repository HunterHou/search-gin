import {useAxios} from "../../hooks/userAxios";

const request = useAxios()

export const QueryFileList = async (data : any) => {
    const res = await request.post({url: '/api/movieList', data})
    return res
}
