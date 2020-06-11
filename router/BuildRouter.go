package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)
import "../controller"

func BuildRouter() *gin.Engine {
	r := gin.Default()
	r.StaticFS("/static", http.Dir("static"))
	r.LoadHTMLFiles("static/index.html")
	r.GET("/", controller.Index)
	r.GET("/index", controller.GetMovies)
	return r
}
