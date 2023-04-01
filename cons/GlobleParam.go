package cons

import (
	"searchGin/datamodels"
	"searchGin/utils"
	"sync"
	"time"
)

//环境引用
// true 静态文件
// false 打包二进制文佳 (要求打包html目录)
//初始化 扫描路径

var PortNo = ":10081"
var PortNo2 = ":10082"
var PortNo3 = ":10083"
var Port = "//" + PortNo
var QueryTypes []string

var CurSortField = ""
var CurSortType = ""

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

var TypeMenu sync.Map
var TagMenu sync.Map
var FolderTime []MenuSize

func InitFolderTime() {
	FolderTime = []MenuSize{}
}
func AddFolderTime(name string, time int64) {
	FolderTime = append(FolderTime, MenuSize{
		Name: name,
		Cnt:  time,
	})
}

var SmallDir []MenuSize

func TypeSizePlus(targetType string, targetSize int64) {
	if targetType == "" {
		targetType = "无"
	}
	TypeMenu.LoadOrStore("全部", MenuSize{
		Name: "全部",
		Cnt:  0,
		Size: 0,
	})
	target, ok := TypeMenu.LoadOrStore(targetType, MenuSize{
		Name: targetType,
		Cnt:  1,
		Size: targetSize,
	})
	if ok {
		TypeMenu.Store(targetType, target.(MenuSize).Plus(targetSize))
	}
	all, okAll := TypeMenu.Load("全部")
	if okAll {
		TypeMenu.Store("全部", all.(MenuSize).Plus(targetSize))
	}
}

func TagSizePlus(targetType string, targetSize int64) {

	target, ok := TagMenu.LoadOrStore(targetType, MenuSize{
		Name:  targetType,
		Cnt:   1,
		IsDir: true,
		Size:  targetSize,
	})
	if ok {
		TagMenu.Store(targetType, target.(MenuSize).Plus(targetSize))
	}
}

var MovieFields = utils.InterfaceFields(datamodels.Movie{})

// IndexDone 索引构建中标记
var IndexDone = true

// OSSetting 系统配置信息
var OSSetting = datamodels.Setting{
	IsDb:           true,
	IsJavBus:       false,
	SelfPath:       "setting.json",
	ControllerHost: "127.0.0.1:17001",
	ImageHost:      "127.0.0.1:17002",
	StreamHost:     "127.0.0.1:17003",
	BaseUrl:        "https://www.busjav.blog/",
	OMUrl:          "https://www.busjav.blog/",
	Remark:         "",
	SystemHtml:     "",
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
	Buttons:    []string{"刮图", "删除", "移动"},
}

// PNG Base Dictory
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
var Images = []string{PNG, JPG, GIF}

var TempImage = make(map[string]datamodels.Movie)

var IndexHtml = "./vitehome/dist/index.html"
var StaticFs = map[string]string{
	"/css": "./vitehome/dist/css",
	"/js":  "./vitehome/dist/js",
}

var TransferTask = map[time.Time]datamodels.TransferTaskModel{}
