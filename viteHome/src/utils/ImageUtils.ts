export const getPng = (Id : string) => {
    return "http://192.168.3.38:8082/api/png/" + Id;
}
export const getJpg = (Id : string) => {
    return "http://192.168.3.38:8082/api/jpg/" + Id;
}

export const getFileStream = (id : string) => {
    return "http://192.168.3.38:8083/api/file/" + id;
}

export const getActressImage = (actressUrl : string) => {
    return "http://192.168.3.38:8082" + actressUrl;
}