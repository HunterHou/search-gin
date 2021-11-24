package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/service"
	"search-gin/utils"
)

func GetSettingInfo(c *gin.Context) {
	//resData := utils.InterfaceToMap(cons.OSSetting)
	//fmt.Println(resData)
	c.JSON(http.StatusOK, cons.OSSetting)
}
func PostSetting(c *gin.Context) {
	setInfo := datamodels.Setting{}
	c.ShouldBindJSON(&setInfo)
	//cons.OSSetting.BaseUrl = c.PostForm("BaseUrl")
	//cons.OSSetting.Dirs = c.PostFormArray("BaseDir")
	//cons.OSSetting.ImageTypes = c.PostFormArray("Images")
	//cons.OSSetting.Types = c.PostFormArray("Types")
	//cons.OSSetting.VideoTypes = c.PostFormArray("VideoTypes")
	//cons.OSSetting.DocsTypes = c.PostFormArray("Docs")
	setInfo.SelfPath = cons.OSSetting.SelfPath
	cons.OSSetting = setInfo
	service.FlushDictionart(cons.OSSetting.SelfPath)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
