package main

import (
	"log"
	"net/http"
	"path/filepath"
	"searchGin/cons"
	"searchGin/router"
	"searchGin/service"
	"searchGin/utils"
	"time"

	"golang.org/x/sync/errgroup"
)

// var curDir string
// var staticDir string

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
	// staticDir = curDir + "/static"
}

var (
	g errgroup.Group
)

func main() {
	app := router.BuildRouter()
	server01 := &http.Server{
		Addr:         cons.PortNo,
		Handler:      app,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	server02 := &http.Server{
		Addr:         cons.PortNo2,
		Handler:      app,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	//默认启动页面
	go service.HeartBeat()

	g.Go(func() error {
		return server01.ListenAndServe()
	})
	g.Go(func() error {
		return server02.ListenAndServe()
	})
	if err := g.Wait(); err != nil {
		log.Fatal(err)
	}
	url := "http://127.0.0.1" + cons.PortNo + "/"
	go utils.ExecCmdStart(url)

	//启动服务
	// app.Run(cons.PortNo)

}
