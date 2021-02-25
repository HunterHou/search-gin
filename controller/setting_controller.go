package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"search-gin/cons"
	"search-gin/service"
	"search-gin/utils"
	"strings"
)

func GetSettingInfo(c *gin.Context) {
	fmt.Println(cons.BaseDir)
	dirs := cons.GetBaseDir()
	data := gin.H{
		"BaseUrl":    cons.BaseUrl,
		"Images":     cons.Images,
		"Docs":       cons.Docs,
		"VideoTypes": cons.VideoTypes,
		"Types":      cons.Types,
		"BaseDir":    dirs,
	}

	c.JSON(http.StatusOK, data)
}
func PostSetting(c *gin.Context) {

	cons.BaseUrl = c.PostForm("BaseUrl")
	dirs := strings.Split(c.PostForm("BaseDir"), ",")

	cons.Images = strings.Split(c.PostForm("Images"), ",")
	cons.Types = strings.Split(c.PostForm("Types"), ",")
	cons.VideoTypes = strings.Split(c.PostForm("VideoTypes"), ",")
	cons.Docs = strings.Split(c.PostForm("Docs"), ",")
	cons.SetBaseDir(dirs)
	service.FlushDictionart(cons.DirFile)

	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
