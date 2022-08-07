const common= {
		baseUrl: "",
		data: {},
		header: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json; charset=utf-8"
		},
		dataType: 'json',
		method: 'GET',

	}
export const  request=(options = {})=> {
		options.url = common.baseUrl + options.url
		options.data = options.data || common.data
		options.header = options.header || common.header
		options.dataType = options.dataType || common.dataType
		options.method = options.method || common.method
		return new Promise((res, resj) => {
			uni.request({
				...options,
				success: (result) => {
					console.log(result)
					if (result.statusCode ==200) {
						res(result.data)
					} else {
						resj(null)
					}
				}
			})
		})
	}
