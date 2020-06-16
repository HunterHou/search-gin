package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)
import "../controller"

func BuildRouter() *gin.Engine {
	router := gin.Default()
	router.StaticFS("/static", http.Dir("static"))
	router.LoadHTMLFiles("static/main.html","static/setting.html")
	//router.LoadHTMLGlob("templates/*")
	router.GET("/", controller.Index)
	router.GET("/setting", controller.Setting)
	router.GET("/index", controller.GetMovies)
	return router
}
