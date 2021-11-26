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
	c.JSON(http.StatusOK, cons.OSSetting)
}
func PostSetting(c *gin.Context) {
	setInfo := datamodels.Setting{}
	c.ShouldBindJSON(&setInfo)
	setInfo.SelfPath = cons.OSSetting.SelfPath
	cons.OSSetting = setInfo
	service.FlushDictionart(cons.OSSetting.SelfPath)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
