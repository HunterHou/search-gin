package datamodels

import (
	"fmt"
	"time"

	"searchGin/utils"
)

// Movie 声明一个File结构体 表示一个文件信息
type Movie struct {
	Id        string `xorm:"Varchar(255) pk"  `
	Code      string `xorm:"Varchar(255)"`
	Name      string `xorm:"Text"`
	Path      string `xorm:"Text"`
	Png       string `xorm:"Text"`
	Nfo       string `xorm:"Text"  json:"Nfo,omitempty"`
	Srt       string `xorm:"Text" json:"Srt,omitempty"`
	Jpg       string `xorm:"Text"`
	Gif       string `xorm:"Text"`
	Actress   string `xorm:"Text"`
	FileType  string `xorm:"Text"`
	DirPath   string `xorm:"Text"`
	Size      int64
	Flag      int64
	SizeStr   string
	CTime     string `xorm:"DateTime"`
	MTime     string `xorm:"DateTime"`
	PTime     string `xorm:"DateTime"`
	MovieType string
	ImageBase string   `json:"ImageBase,omitempty"`
	ImageList []string `json:"ImageList,omitempty"`
	Tags      []string

	Studio   string `json:"Studio,omitempty"`
	Supplier string `json:"Supplier,omitempty"`
	Length   string `json:"Length,omitempty"`
	Series   string `json:"Series,omitempty"`
	Director string `json:"Director,omitempty"`
	Title    string
	PngUrl   string `json:"PngUrl,omitempty" xorm:"Text" `
	JpgUrl   string `json:"JpgUrl,omitempty" xorm:"Text"`
}

func NewFile(dir string, path string, name string, fileType string, size int64, modTime time.Time, movieType string) Movie {
	// 使用工厂模式 返回一个 Movie 实例
	id, _ := utils.DirpathForId(path)
	code := utils.GetCode(name)
	Actress := utils.GetActress(name)
	_, name_1 := utils.DirpathForId(name)
	id = id + name_1
	result := Movie{
		Id:        id,
		Code:      code,
		Title:     utils.GetTitle(name),
		Name:      name,
		Path:      path,
		Png:       utils.GetPng(path, "png"),
		Nfo:       utils.GetPng(path, "nfo"),
		Jpg:       utils.GetPng(path, "jpg"),
		Srt:       utils.GetPng(path, "srt"),
		Gif:       utils.GetPng(path, "gif"),
		Tags:      utils.GetTags(path, ""),
		Actress:   Actress,
		FileType:  fileType,
		DirPath:   dir,
		Size:      size,
		Flag:      1,
		SizeStr:   utils.GetSizeStr(size),
		CTime:     "",
		MTime:     modTime.Format("2006-01-02 15:04:05"),
		MovieType: movieType,
	}
	return result
}

func (f Movie) SetId(id string) Movie {
	f.Id = id
	return f
}

func (f Movie) GetFileInfo() string {
	//
	info := fmt.Sprintf("name: %v\t code:%v\t fileType:%v\t sizeStr:%v\t actress:%v\t path:%v\t",
		f.Name, f.Code, f.FileType, f.SizeStr, f.Actress, f.Path)
	return info
}

func (f Movie) IsNull() bool {
	//
	if f.Id == "" || f.Path == "" {
		return true
	}
	return false
}

func (f *Movie) SetImageBase64() {
	path := f.Jpg
	if !utils.ExistsFiles(path) {
		path = f.Png
	}
	if !utils.ExistsFiles(path) {
		path = f.Path
	}
	res := "data:image/jpg;base64," + utils.ImageToString(path)
	f.ImageBase = res

}

//func (f Movie) PngBase64() string {
//	path := f.Png
//	if !utils.ExistsFiles(path) {
//		path = f.Jpg
//	}
//	if !utils.ExistsFiles(path) {
//		path = f.Path
//	}
//	res := "data:image/png;base64," + utils.ImageToString(path)
//	return res
//
//}

//func (f *Movie) SetPngBase64() {
//	path := f.Png
//	if !utils.ExistsFiles(path) {
//		path = f.Jpg
//	}
//	if !utils.ExistsFiles(path) {
//		path = f.Path
//	}
//	res := "data:image/png;base64," + utils.ImageToString(path)
//	f.PngBase = res
//
//}

//func (f Movie) GetPng() string {
//	path := f.Path
//	return utils.GetPng(path, "png")
//}
