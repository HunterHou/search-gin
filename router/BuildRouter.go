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
	//router.LoadHTMLGlob("templates/*")
	router.GET("/", controller.Index)
	// router.GET("/setting", controller.Setting)
	router.GET("/movielist", controller.GetMovies)
	return router
}
