import {useAxios} from "../../hooks/userAxios";

const request = useAxios()

export const QueryFileList = async (data : any) => {
    const res = await request.post({url: '/api/movieList', data})
    return res
}

export const FindFileInfo = async (data : string) => {
    const res = await request.get({url: `/api/info/${data}`})
    return res
}

export const QueryDirImageBase64 = async (data : string) => {
    const res = await request.get({url: `/api/dir/${data}`})
    return res
}

export const PlayMovie = async (data : string) => {
    const res = await request.get({url: `/api/play/${data}`})
    return res
}

export const OpenFileFolder = async (data : string) => {
    const res = await request.get({url: `/api/openFolder/${data}`})
    return res
}

export const DeleteFile = async (data : string) => {
    const res = await request.get({url: `/api/delete/${data}`})
    return res
}

export const SyncFileInfo = async (data : string) => {
    const res = await request.get({url: `/api/sync/${data}`})
    return res
}


export const ResetMovieType = async (data : string,movieType :string) => {
    const res = await request.get({url: `/api/setMovieType/${data}/${movieType}`})
    return res
}

export const RefreshIndex = async () => {
    const res = await request.get({url: `/api/refreshIndex`})
    return res
}

export const DownImageList = async (data : string) => {
    const res = await request.get({url: `/api/imageList/${data}`})
    return res
}


export const HeartBeatQuery = async () => {
    const res = await request.get({url: `/api/heartBeat`})
    return res
}
