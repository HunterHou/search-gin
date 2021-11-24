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
	resData := utils.InterfaceToMap(cons.OSSetting)
	fmt.Println(resData)
	c.JSON(http.StatusOK, resData)
}
func PostSetting(c *gin.Context) {
	cons.OSSetting.BaseUrl = c.PostForm("BaseUrl")
	cons.OSSetting.Dirs = strings.Split(c.PostForm("BaseDir"), ",")
	cons.OSSetting.ImageTypes = strings.Split(c.PostForm("Images"), ",")
	cons.OSSetting.Types = strings.Split(c.PostForm("Types"), ",")
	cons.OSSetting.VideoTypes = strings.Split(c.PostForm("VideoTypes"), ",")
	cons.OSSetting.DocsTypes = strings.Split(c.PostForm("Docs"), ",")
	service.FlushDictionart(cons.OSSetting.SelfPath)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
