package main

import (
	"path/filepath"

	"./cons"
	"./router"
	"./service"
	"./utils"
)

var curDir string
var staticDir string

// 打包命令
// 1 命令行UI 常规打包 go build
// 2 无窗口  go build -o app/app.exe -ldflags "-H=windowsgui"

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

	cons.SetBaseDir(dirs)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, cons.VideoTypes)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, cons.Docs)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, cons.Images)
	/*
		staticDir = curDir + "/static"
		cons.Play = utils.ImageToString(staticDir + "/image/play.jpg")
		cons.Open = utils.ImageToString(staticDir + "/image/open.jpg")
		cons.Change = utils.ImageToString(staticDir + "/image/change.jpg")
		cons.Replay = utils.ImageToString(staticDir + "/image/replay.jpg")
		cons.Close = utils.ImageToString(staticDir + "/image/close.jpg")
		cons.Stop = utils.ImageToString(staticDir + "/image/stop.jpg")*/
}

func main() {
	app := router.BuildRouter()
	utils.ExecCmdStart("http://127.0.0.1:8000/")
	app.Run(":8000")

}
