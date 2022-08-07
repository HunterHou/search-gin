import { request} from './request.ts'

export const GetSettingInfo = (data:any) => {
	return request({
		url: "/api/scanTime",
		method: "GET",
		data
	})
}
