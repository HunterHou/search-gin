package router

import (
	"net/http"

	"search-gin/controller"

	"github.com/gin-gonic/gin"
)

func BuildRouter() *gin.Engine {
	router := gin.Default()
	router.StaticFS("/static", http.Dir("static"))
	router.LoadHTMLFiles("static/index.html")

	router.GET("/", controller.Index)
	router.POST("api/movieList", controller.PostMovies)
	router.GET("api/refresh", controller.GetFresh)
	router.GET("api/actressList", controller.GetActess)

	router.GET("api/play/:id", controller.GetPlay)
	router.GET("api/setMovieType/:id/:movieType", controller.SetMovieType)
	router.GET("api/info/:id", controller.GetInfo)
	router.GET("api/delete/:id", controller.GetDelete)
	router.GET("api/sync/:id", controller.GetSync)
	router.GET("api/openFolder/:id", controller.GetOpenFoler)

	router.GET("api/infoNext/:id", controller.GetNextInfo)
	router.GET("api/infoLast/:id", controller.GetLastInfo)

	router.GET("api/png/:path", controller.GetPng)
	router.GET("api/jpg/:path", controller.GetJpg)

	router.GET("api/buttoms", controller.GetButtom)
	router.GET("api/refreshIndex", controller.GetRefresIndex)
	router.GET("api/settingInfo", controller.GetSettingInfo)
	router.POST("api/setting", controller.PostSetting)
	return router
}
