package utils

type Result struct {
	MessageCode
	Data interface{}
}

func (res *Result) Success() {
	res.MessageCode.Success()
}
func NewResult() Result {
	return Result{}
}
func NewSuccess() Result {
	res := Result{}
	res.Success()
	return res
}
func NewSuccessByMsg(msg string) Result {
	res := Result{}
	res.Success()
	res.Message = msg
	return res
}
func NewFailByMsg(msg string) Result {
	res := Result{}
	res.Success()
	res.Message = msg
	return res
}
func (res *Result) Fail() {
	res.MessageCode.Fail()
}
func (res *Result) FailByMsg(msg string) {
	res.MessageCode.Fail()
	res.Message = msg
}
