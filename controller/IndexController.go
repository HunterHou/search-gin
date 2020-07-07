package controller

import (
	"net/http"

	"../cons"
	"github.com/gin-gonic/gin"
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
