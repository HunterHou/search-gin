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
	router.GET("/delete/:id", controller.GetDelete)
	router.GET("/openFolder/:id", controller.GetOpenFoler)

	router.GET("/image", controller.GetActess)

	router.GET("/buttoms", controller.GetButtom)
	router.GET("/refreshIndex", controller.GetRefresIndex)
	return router
}
