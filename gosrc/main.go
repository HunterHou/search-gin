package main

import (
	"fmt"
	"github.com/shirou/gopsutil/v3/disk"
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

	fmt.Println("start")
	parts, err := disk.Partitions(true)
	if err != nil {
		fmt.Printf("get Partitions failed, err:%v\n", err)
		return
	}
	for _, part := range parts {
		fmt.Printf("part:%v\n", part.String())
		diskInfo, _ := disk.Usage(part.Mountpoint)
		fmt.Printf("disk info%v:used:%v free:%v\n", diskInfo.Path, diskInfo.UsedPercent, diskInfo.Free)
	}
	fmt.Println("over")
	return

	app := router.BuildRouter()
	serviceRequest := &http.Server{
		Addr:         cons.PortNo,
		Handler:      app,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	imageRequest := &http.Server{
		Addr:         cons.PortNo2,
		Handler:      app,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	fileRequest := &http.Server{
		Addr:         cons.PortNo3,
		Handler:      app,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	//默认启动页面
	fileService := service.CreateFileService()
	// 启动扫描系统
	go fileService.HeartBeat()
	// 启动转换执行任务
	go fileService.TaskExecuting()

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
		utils.InfoFormat("%v", err)
	}
	url := "http://127.0.0.1" + cons.PortNo + "/"
	go utils.ExecCmdStart(url)

	//启动服务
	// app.Run(cons.PortNo)

}
