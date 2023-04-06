package router

import (
	"io"
	"log"
	"net/http"
	"os"
	"searchGin/cons"
	"searchGin/controller"
	"searchGin/utils"

	"github.com/gin-gonic/gin"
)

func BuildRouter() *gin.Engine {
	router := gin.Default()

	router.Use(gin.Recovery())
	router.Use(gin.Logger())

	fLog, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(fLog, os.Stdout)

	if utils.ExistsFiles(cons.IndexHtml) {
		log.Fatalln("static exists:" + cons.IndexHtml)
		router.LoadHTMLFiles(cons.IndexHtml)
		for k, v := range cons.StaticFs {
			router.StaticFS(k, http.Dir(v))
		}
	} else {
		log.Fatalln("static not exists:" + cons.IndexHtml)
	}

	router.NoRoute(controller.Index)
	router.GET("/", controller.Index)
	router.POST("/api/movieList", controller.PostSearch)
	router.GET("/api/transferTasks", controller.GetTransferTask)
	router.POST("/api/actressList", controller.PostActess)
	router.GET("/api/actressImgae/:path", controller.GetActressImage)

	router.GET("/api/play/:id", controller.GetPlay)
	router.GET("/api/tranferToMp4/:id", controller.GetTransferToMp4)
	router.GET("/api/file/:id", controller.GetFile)
	router.GET("/api/setMovieType/:id/:movieType", controller.SetMovieType)
	router.GET("/api/info/:id", controller.GetInfo)
	router.POST("/api/file/rename", controller.PostRename)
	router.GET("/api/file/addTag/:id/:tag", controller.GetAddTag)
	router.GET("/api/file/clearTag/:id/:tag", controller.GetClearTag)
	router.GET("/api/imageList/:id", controller.GetImageList)
	router.GET("/api/dir/:id", controller.GetDirInfo)
	router.GET("/api/delete/:id", controller.GetDelete)
	router.GET("/api/sync/:id", controller.GetSync)
	router.GET("/api/openFolder/:id", controller.GetOpenFolder)
	router.POST("/api/OpenFolerByPath", controller.PostOpenFolderByPath)
	router.POST("/api/DeleteFolerByPath", controller.PostDeleteFolerByPath)

	router.GET("/api/infoNext/:id", controller.GetNextInfo)
	router.GET("/api/infoLast/:id", controller.GetLastInfo)

	router.GET("/api/png/:path", controller.GetPng)
	router.GET("/api/jpg/:path", controller.GetJpg)
	router.GET("/api/tempimage/:path", controller.GetTempImage)

	router.GET("/api/buttoms", controller.GetSettingInfo)
	router.GET("/api/refreshIndex", controller.GetRefreshIndex)
	router.GET("/api/settingInfo", controller.GetSettingInfo)
	router.POST("/api/setting", controller.PostSetting)
	router.GET("/api/GetIpAddr", controller.GetIpAddr2)
	router.GET("/api/shutDown", controller.GetShutdown)

	router.GET("/api/typeSizeMap", controller.GetTypeSize)
	router.GET("/api/tagSizeMap", controller.GetTagSize)
	router.GET("/api/scanTime", controller.GetScanTime)
	router.GET("/api/heartBeat", controller.GetHeartBeat)
	return router
}
