package main

import (
	"net/http"
	"path/filepath"
	"searchGin/cons"
	"searchGin/router"
	"searchGin/service"
	"searchGin/utils"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/sync/errgroup"
)

// var curDir string
// var staticDir string

// 打包命令
// 1 命令行UI 常规打包 go build
// 2 命令行UI 常规打包 go build windows
// 2 无窗口  go build -o viteApp/appVite.exe -ldflags  "-H=windowsgui" -tags=prod
// 3 命令行UI 常规打包 go build linux
// 3 无窗口  go build -o viteApp/appVite.exe -ldflags  "-H=windowsgui" -tags=prod

func init() {
	curDir, _ := filepath.Abs(".")
	osSetting := cons.OSSetting
	settingPath := curDir + utils.PathSeparator + cons.OSSetting.SelfPath
	dict := service.ReadDictionaryFromJson(settingPath)
	dict.SelfPath = osSetting.SelfPath
	ip := service.GetIpAddr()
	dict.ControllerHost = "http://" + ip + cons.PortNo
	dict.ImageHost = "http://" + ip + cons.PortNo2
	dict.StreamHost = "http://" + ip + cons.PortNo3
	cons.OSSetting = dict

	// staticDir = curDir + "/static"
}

var (
	g errgroup.Group
)

func main() {
	app := router.BuildRouter()
	serviceRequest := &http.Server{
		Addr:         cons.PortNo,
		Handler:      app,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	imageRequest := &http.Server{
		Addr:         cons.PortNo2,
		Handler:      app,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	fileRequest := &http.Server{
		Addr:         cons.PortNo3,
		Handler:      app,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	//默认启动页面
	fileService := service.CreateFileService()
	go fileService.HeartBeat()

	g.Go(func() error {
		return serviceRequest.ListenAndServe()
	})
	g.Go(func() error {
		return imageRequest.ListenAndServe()
	})
	g.Go(func() error {
		return fileRequest.ListenAndServe()
	})
	if err := g.Wait(); err != nil {
		cons.Logger("", err)
	}
	url := "http://127.0.0.1" + cons.PortNo + "/"
	go utils.ExecCmdStart(url)

	//启动服务
	// app.Run(cons.PortNo)

}
