package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"../cons"
)

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "main.html", gin.H{"title": "首页"})
}
func Setting(c *gin.Context) {
	c.HTML(http.StatusOK, "setting.html", gin.H{
		"title":   "设置",
		"BaseUrl": cons.BaseUrl,
		"":        ""})
}
