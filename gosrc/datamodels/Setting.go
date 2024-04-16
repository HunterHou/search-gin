package datamodels

type Setting struct {
	IsDb       bool
	IsJavBus   bool
	SelfPath   string
	BaseUrl    string
	OMUrl      string
	ImageUrl   string
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
	Buttons        []string
	MovieTypes     []string
	ControllerHost string
	ImageHost      string
	StreamHost     string
}
