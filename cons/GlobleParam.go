package cons

import (
	"search-gin/datamodels"
)

//环境引用
// true 静态文件
// false 打包二进制文佳 (要求打包html目录)
//初始化 扫描路径

var PortNo = ":80"
var Port = "//" + PortNo
var QueryTypes []string

var OSSetting = datamodels.Setting{
	SelfPath: "setting.json",
	BaseUrl:  "https://www.busjav.blog/",
	OMUrl:    "https://www.busjav.blog/",
	Dirs: []string{
		"e://emby",
	},
	ImageTypes: []string{GIF, PNG, JPG},
	DocsTypes:  []string{TXT, XLSX},
	VideoTypes: []string{AVI, MKV, WMV, MP4},
	Types:      []string{AVI, MKV, WMV, MP4, GIF, PNG, JPG, TXT, XLSX},
}
