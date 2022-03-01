package router

import (
	"io"
	"net/http"
	"os"
	"search-gin/controller"

	"github.com/gin-gonic/gin"
)

func BuildRouter() *gin.Engine {
	router := gin.Default()

	router.Use(gin.Recovery())

	fLog, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(fLog, os.Stdout)

	// router.StaticFS("/static", http.Dir("static"))
	router.StaticFS("/_nuxt", http.Dir("./vuehome/dist/_nuxt"))
	router.LoadHTMLFiles("./vuehome/dist/index.html")
	// router.LoadHTMLGlob("vuehome/dist/*")

	router.NoRoute(controller.Index)
	router.GET("/", controller.Index)
	router.POST("/api/movieList", controller.PostSearch)
	router.GET("/api/refresh", controller.GetFresh)
	router.POST("/api/actressList", controller.PostActess)
	router.GET("/api/actressImgae/:path", controller.GetActessImage)

	router.GET("/api/play/:id", controller.GetPlay)
	router.GET("/api/setMovieType/:id/:movieType", controller.SetMovieType)
	router.GET("/api/info/:id", controller.GetInfo)
	router.POST("/api/file/rename", controller.PostRename)
	router.GET("/api/imageList/:id", controller.GetImageList)
	router.GET("/api/dir/:id", controller.GetDirInfo)
	router.GET("/api/delete/:id", controller.GetDelete)
	router.GET("/api/sync/:id", controller.GetSync)
	router.GET("/api/openFolder/:id", controller.GetOpenFoler)
	router.POST("/api/OpenFolerByPath", controller.PostOpenFolerByPath)

	router.GET("/api/infoNext/:id", controller.GetNextInfo)
	router.GET("/api/infoLast/:id", controller.GetLastInfo)

	router.GET("/api/png/:path", controller.GetPng)
	router.GET("/api/jpg/:path", controller.GetJpg)

	router.GET("/api/buttoms", controller.GetButtom)
	router.GET("/api/refreshIndex", controller.GetRefresIndex)
	router.GET("/api/settingInfo", controller.GetSettingInfo)
	router.POST("/api/setting", controller.PostSetting)

	router.GET("/api/typeSizeMap", controller.GetTypeSize)
	return router
}
