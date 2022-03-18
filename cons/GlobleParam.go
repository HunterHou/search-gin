package cons

import (
	"search-gin/datamodels"
	"search-gin/datasource"
	"search-gin/utils"
)

//环境引用
// true 静态文件
// false 打包二进制文佳 (要求打包html目录)
//初始化 扫描路径

var PortNo = ":8081"
var Port = "//" + PortNo
var QueryTypes []string

var IndexOver = false

type MenuSize struct {
	Name    string
	Cnt     int64
	Size    int64
	SizeStr string
	IsDir   bool
}

func NewMenuSize(name string, size int64) MenuSize {
	cnt := int64(0)
	if size > 0 {
		cnt = int64(1)
	}
	return MenuSize{
		Name: name,
		Cnt:  cnt,
		Size: size,
	}
}

func NewMenuSizeFold(name string, size int64, isFold bool) MenuSize {
	cnt := int64(0)
	if size > 0 {
		cnt = int64(1)
	}
	return MenuSize{
		Name:  name,
		Cnt:   cnt,
		Size:  size,
		IsDir: isFold,
	}
}

func (m MenuSize) Plus(size int64) MenuSize {
	m.Cnt++
	m.Size += size
	return m
}

var TypeMenu map[string]MenuSize
var TagMenu map[string]MenuSize
var SmallDir []MenuSize

func TypeSizePlus(targetType string, targetSize int64) {
	if targetType == "" {
		targetType = "无"
	}
	if len(TypeMenu) == 0 {
		TypeMenu = make(map[string]MenuSize)
		TypeMenu["全部"] = MenuSize{
			Name: "全部",
			Cnt:  0,
			Size: 0,
		}
	}
	target, ok := TypeMenu[targetType]
	if ok {
		TypeMenu[targetType] = target.Plus(targetSize)
	} else {
		TypeMenu[targetType] = MenuSize{
			Name: targetType,
			Cnt:  1,
			Size: targetSize,
		}
	}
	TypeMenu["全部"] = TypeMenu["全部"].Plus(targetSize)
}

func TagSizePlus(targetType string, targetSize int64) {
	if len(TagMenu) == 0 {
		TagMenu = make(map[string]MenuSize)
	}
	target, ok := TagMenu[targetType]
	if ok {
		TagMenu[targetType] = target.Plus(targetSize)
	} else {
		TagMenu[targetType] = MenuSize{
			Name:  targetType,
			Cnt:   1,
			IsDir: true,
			Size:  targetSize,
		}
	}
}

func OverIndex() bool {
	libSize := len(datasource.FileList)
	// if libSize == 0 {
	// 	return false
	// }
	// pro := IndexProgress
	// fmt.Printf("total:%d  progress:%d", libSize, pro)
	// return pro >= libSize
	return IndexOver && libSize > 0
}

var MovieFields = utils.InterfaceFields(datamodels.Movie{})

var OSSetting = datamodels.Setting{
	SelfPath: "setting.json",
	BaseUrl:  "https://www.busjav.blog/",
	OMUrl:    "https://www.busjav.blog/",
	Remark:   "",
	Dirs: []string{
		"e://emby",
		"e://code",
	},
	Tags: []string{
		"東京熱",
	},
	ImageTypes: []string{GIF, PNG, JPG},
	DocsTypes:  []string{TXT, XLSX},
	VideoTypes: []string{AVI, MKV, WMV, MP4},
	Types:      []string{AVI, MKV, WMV, MP4, GIF, PNG, JPG, TXT, XLSX},
}

//Base Dictory
const PNG = "png"
const JPG = "jpg"
const GIF = "gif"
const XLSX = "xlsx"
const TXT = "txt"
const MP4 = "mp4"
const WMV = "wmv"
const MKV = "mkv"
const AVI = "avi"
const JAVA = "java"
const XML = "xml"

var Types = []string{PNG, JPG, GIF, XLSX, TXT, MP4, WMV, MKV, AVI, JAVA, XML}
