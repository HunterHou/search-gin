package datamodels

import (
	"fmt"
	"searchGin/utils"
	"sort"
	"strings"
	"time"
)

// Movie 声明一个File结构体 表示一个文件信息
type Movie struct {
	Id        string `xorm:"Varchar(255) pk"  `
	Code      string `xorm:"Varchar(255)"`
	Name      string `xorm:"Text"`
	Path      string `xorm:"Text"`
	BaseDir   string `xorm:"Text"`
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

// MovieEdit 文件修改模型
type MovieEdit struct {
	Movie
	MoveOut   bool
	NoRefresh bool
}

func NewFile(dir string, path string, name string, fileType string, size int64, modTime time.Time, movieType string, baseDir string) Movie {
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
		BaseDir:   baseDir,
	}
	return result
}

func (f *Movie) SetId(id string) Movie {
	f.Id = id
	return *f
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

func SortMoviesUtils(sortModels []Movie, sF string, sT string, lastSortField string, lastSortType string) {
	//if sF == lastSortField && sT == lastSortType {
	//	return
	//}
	sort.Slice(sortModels, func(i, j int) bool {
		if sF == "Code" && sT == "desc" {
			return sortModels[i].Code > sortModels[j].Code
		} else if sF == "Code" && sT == "asc" {
			return sortModels[i].Code < sortModels[j].Code
		} else if sF == "Size" && sT == "desc" {
			return sortModels[i].Size > sortModels[j].Size
		} else if sF == "Size" && sT == "asc" {
			return sortModels[i].Size < sortModels[j].Size
		} else if sF == "MTime" && sT == "desc" {
			return sortModels[i].MTime > sortModels[j].MTime
		} else if sF == "MTime" && sT == "asc" {
			return sortModels[i].MTime < sortModels[j].MTime
		} else {
			return sortModels[i].MTime > sortModels[j].MTime
		}
	})
}

func GetPageOfFiles(files []Movie, pageNo int, pageSize int) ([]Movie, int64) {
	if len(files) == 0 {
		return files, 0
	}
	if pageNo <= 0 {
		pageNo = 1
	}
	length := len(files)
	start := (pageNo - 1) * pageSize

	end := length
	if length-start >= pageSize {
		end = start + pageSize
	}
	if len(files) <= pageSize {
		return files, 0
	}

	var data []Movie
	var volume int64
	for i := start; i < end; i++ {
		curFile := files[i]
		volume += curFile.Size
		data = append(data, curFile)
	}
	return data, volume
}

func SearchByKeyWord(files map[string]Movie, keyWord string, movieType string) SearchResultWrapper {

	resultWrapper := NewSearchWrapper()
	if (keyWord == "" || keyWord == "undefined") && (movieType == "" || movieType == "undefined") {
		for _, file := range files {
			resultWrapper.AddWrapperItem(file)
		}
		return resultWrapper
	}
	for _, file := range files {
		if movieType != "" {
			if file.MovieType != movieType {
				continue
			}
		}
		isAdd := false
		if len(keyWord) > 0 {
			arr := strings.Split(keyWord, " ")
			for i := 0; i < len(arr); i++ {
				words := arr[i]
				if len(words) == 0 || words == " " {
					break
				}
				if strings.Contains(strings.ToUpper(file.Code), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Name), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Actress), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Path), strings.ToUpper(words)) {
					isAdd = true
					break
				}
			}
		} else {
			isAdd = true
		}

		if isAdd {
			resultWrapper.AddWrapperItem(file)
		}

	}

	return resultWrapper
}
