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
func (res *Result) Fail() {
	res.MessageCode.Fail()
}
