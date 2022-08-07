import { request} from '@/utils/request.js'

export const GetSettingInfo = (data) => {
	return request({
		url: "/api/scanTime",
		method: "GET",
		data
	})
}
