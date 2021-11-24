package cons

import (
	"fmt"
	"search-gin/datamodels"
	"strings"
)

//环境引用
// true 静态文件
// false 打包二进制文佳 (要求打包html目录)
//初始化 扫描路径
var OSSetting = datamodels.Setting{
	SelfPath: "setting.json",
	BaseUrl:  BaseUrl,
	Dirs: []string{
		"e://emby",
	},
	ImageTypes: []string{GIF, PNG, JPG},
	DocsTypes:  []string{TXT, XLSX},
	VideoTypes: []string{AVI, MKV, WMV, MP4},
	Types:      []string{AVI, MKV, WMV, MP4, GIF, PNG, JPG, TXT, XLSX},
}
var PortNo = ":80"
var Port = "//" + PortNo
var BaseUrl = "https://www.busjav.blog/"
var DirFile = ""
var BaseDir = map[string]string{}
var Images = []string{GIF, PNG, JPG}
var Docs = []string{TXT, XLSX}
var VideoTypes = []string{AVI, MKV, WMV, MP4}
var QueryTypes = []string{}

func SetBaseDir(dirs []string) {
	BaseDir = make(map[string]string)
	for _, name := range dirs {
		index := strings.ReplaceAll(name, "\\", "~")
		fmt.Println(index, ":", name)
		BaseDir[string(index)] = name
	}
}

func GetBaseDir() []string {
	var dirs []string
	for _, name := range BaseDir {
		dirs = append(dirs, name)
	}
	return dirs
}
