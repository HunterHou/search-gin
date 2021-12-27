package datamodels

import (
	"fmt"
	"time"

	"search-gin/utils"
)

// Movie 声明一个File结构体 表示一个文件信息
type Movie struct {
	Id        string
	Code      string
	Name      string
	Path      string
	Png       string
	Nfo       string
	Srt       string
	Jpg       string
	Actress   string
	FileType  string
	DirPath   string
	Size      int64
	SizeStr   string
	CTime     string
	MTime     string
	PTime     string
	MovieType string
	ImageBase string
	ImageList []string

	Studio   string
	Supplier string
	Length   string
	Series   string
	Director string
	Title    string
	PngUrl   string
	JpgUrl   string
}

func NewFile(dir string, path string, name string, fileType string, size int64, modTime time.Time, movieType string) Movie {
	// 使用工厂模式 返回一个 Movie 实例
	_, id := utils.DirpathForId(path)
	result := Movie{
		Id:        id,
		Code:      utils.GetCode(name),
		Name:      name,
		Path:      path,
		Png:       utils.GetPng(path, "png"),
		Nfo:       utils.GetPng(path, "nfo"),
		Jpg:       utils.GetPng(path, "jpg"),
		Srt:       utils.GetPng(path, "srt"),
		Actress:   utils.GetActress(name),
		FileType:  fileType,
		DirPath:   dir,
		Size:      size,
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
