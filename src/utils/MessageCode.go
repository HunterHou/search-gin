package utils

type MessageCode struct {
	Code    int
	Message string
}

func Success() MessageCode {
	code := MessageCode{200, "執行成功"}
	return code
}
func Fail() MessageCode {
	code := MessageCode{200, "執行失败"}
	return code
}

func (r *MessageCode) Success() *MessageCode {
	r.Code = 200
	r.Message = "執行成功"
	return r
}

func (r *MessageCode) Fail() *MessageCode {
	r.Code = 400
	r.Message = "執行失败"
	return r
}
