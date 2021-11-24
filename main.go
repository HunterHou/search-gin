package main

import (
	"path/filepath"
	"search-gin/cons"
	"search-gin/router"
	"search-gin/service"
	"search-gin/utils"
)

// var curDir string
var staticDir string

// 打包命令
// 1 命令行UI 常规打包 go build
// 2 无窗口  go build -o app/appVue.exe -ldflags "-H=windowsgui"

func init() {
	curDir, _ := filepath.Abs(".")
	osSetting := cons.OSSetting
	settingPath := curDir + "\\" + cons.OSSetting.SelfPath
	dict := service.ReadDictionaryFromJson(settingPath)
	dict.SelfPath = osSetting.SelfPath
	cons.OSSetting = dict
	staticDir = curDir + "/static"
}

func main() {
	app := router.BuildRouter()
	url := "http://127.0.0.1" + cons.PortNo + "/"
	utils.ExecCmdStart(url)
	app.Run(cons.PortNo)

}
