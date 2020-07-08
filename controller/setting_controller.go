package controller

import (
	"../cons"
	"../service"
	"../utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetSettingInfo(c *gin.Context) {
	data := gin.H{
		"BaseUrl":    cons.BaseUrl,
		"Images":     cons.Images,
		"Docs":       cons.Docs,
		"VideoTypes": cons.VideoTypes,
		"Types":      cons.Types,
		"BaseDir":    cons.BaseDir,
	}

	c.JSON(http.StatusOK, data)
}
func PostSetting(c *gin.Context) {

	cons.BaseUrl = c.PostForm("BaseUrl")
	dirs := c.PostFormArray("BaseDir")
	cons.Images = c.PostFormArray("Images")
	cons.VideoTypes = c.PostFormArray("VideoTypes")
	cons.Docs = c.PostFormArray("Docs")
	cons.SetBaseDir(dirs)
	service.FlushDictionart(cons.DirFile)

	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
