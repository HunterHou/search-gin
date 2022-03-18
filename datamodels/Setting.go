package datamodels

type Setting struct {
	SelfPath   string
	BaseUrl    string
	OMUrl      string
	Remark     string
	Tags       []string
	Dirs       []string
	ImageTypes []string
	DocsTypes  []string
	VideoTypes []string
	Types      []string
}
