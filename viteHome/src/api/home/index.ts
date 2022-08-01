import {useAxios} from "../../hooks/userAxios";

const request = useAxios()

export const TypeSizeMap = async (data : any) => {
    const res = await request.get({url: '/api/typeSizeMap'})
    return res
}

export const TagSizeMap = async (data : any) => {
    const res = await request.get({url: '/api/tagSizeMap'})
    return res
}

export const ScanTime = async (data : any) => {
    const res = await request.get({url: '/api/scanTime'})
    return res
}