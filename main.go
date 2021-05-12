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
	cons.DirFile = curDir + "\\dirList.ini"
	dict := service.ReadDictionary(cons.DirFile)
	dirs := dict.GetProperty("dir")
	baseUrls := dict.GetProperty("BaseUrl")
	if len(baseUrls) > 0 {
		cons.BaseUrl = baseUrls[0]
	}
	Images := dict.GetProperty("Images")
	if len(Images) > 0 {
		cons.Images = Images
	}
	VideoTypes := dict.GetProperty("VideoTypes")
	if len(VideoTypes) > 0 {
		cons.VideoTypes = VideoTypes
	}
	Docs := dict.GetProperty("Docs")
	if len(Images) > 0 {
		cons.Docs = Docs
	}
	Types := dict.GetProperty("Types")
	if len(Types) > 0 {
		cons.Types = Types
	}

	cons.SetBaseDir(dirs)
	staticDir = curDir + "/static"
	// cons.Play = "data:image/png;base64," + utils.ImageToString(staticDir+"/image/play.jpg")
	// cons.Open = "data:image/png;base64," + utils.ImageToString(staticDir+"/image/open.jpg")
	// cons.Change = "data:image/png;base64," + utils.ImageToString(staticDir+"/image/change.jpg")
	// cons.Replay = "data:image/png;base64," + utils.ImageToString(staticDir+"/image/replay.jpg")
	// cons.Close = "data:image/png;base64," + utils.ImageToString(staticDir+"/image/close.jpg")
	// cons.Stop = "data:image/png;base64," + utils.ImageToString(staticDir+"/image/stop.jpg")
}

func main() {
	app := router.BuildRouter()
	utils.ExecCmdStart("http://127.0.0.1:80/")
	app.Run(":80")

}
