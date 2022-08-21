package datamodels

type Setting struct {
	IsDb       bool
	SelfPath   string
	BaseUrl    string
	OMUrl      string
	Remark     string
	SystemHtml string

	Tags           []string
	TagsLib        []string
	Dirs           []string
	DirsLib        []string
	ImageTypes     []string
	DocsTypes      []string
	VideoTypes     []string
	Types          []string
	ControllerHost string
	ImageHost      string
	StreamHost     string
}
