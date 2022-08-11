package datamodels

type Setting struct {
	SelfPath   string
	BaseUrl    string
	OMUrl      string
	Remark     string
	SystemInfo string

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
