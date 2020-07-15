package router

import (
	"net/http"

	"../controller"
	"github.com/gin-gonic/gin"
)

func BuildRouter() *gin.Engine {
	router := gin.Default()
	router.StaticFS("/static", http.Dir("static"))
	router.LoadHTMLFiles("static/index.html")

	router.GET("/", controller.Index)
	router.POST("/movieList", controller.PostMovies)
	router.GET("/refresh", controller.GetFresh)
	router.GET("/actressList", controller.GetActess)

	router.GET("/play/:id", controller.GetPlay)
	router.GET("/info/:id", controller.GetInfo)
	router.GET("/delete/:id", controller.GetDelete)
	router.GET("/sync/:id", controller.GetSync)
	router.GET("/openFolder/:id", controller.GetOpenFoler)

	router.GET("/infoNext/:id", controller.GetNextInfo)
	router.GET("/infoLast/:id", controller.GetLastInfo)

	router.GET("/png/:path", controller.GetPng)
	router.GET("/jpg/:path", controller.GetJpg)

	router.GET("/buttoms", controller.GetButtom)
	router.GET("/refreshIndex", controller.GetRefresIndex)
	router.GET("/settingInfo", controller.GetSettingInfo)
	router.POST("/setting", controller.PostSetting)
	return router
}
