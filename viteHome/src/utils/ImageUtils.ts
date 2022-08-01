export const getPng = (Id : string) => {
    return "http://127.0.0.1:8082/api/png/" + Id;
}
export const getJpg = (Id : string) => {
    return "http://127.0.0.1:8082/api/jpg/" + Id;
}

export const getActressImage = (actressUrl : string) => {
    return "http://127.0.0.1:8082" + actressUrl;
}