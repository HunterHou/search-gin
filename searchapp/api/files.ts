import { request} from '../utils/request.js'

export const QueryFileList = (data) => {
	return request({
		url: "/api/movieList",
		method: "POST",
		data
	})
}