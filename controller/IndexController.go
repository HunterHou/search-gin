package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{"title": "首页"})
}

// func Setting(c *gin.Context) {
// 	c.HTML(http.StatusOK, "setting.html", gin.H{
// 		"title":   "设置",
// 		"BaseUrl": cons.BaseUrl,
// 		"":        ""})
// }
