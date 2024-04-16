package controller

import (
	"fmt"
	"net/http"
	"os/exec"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/service"
	"searchGin/utils"

	"github.com/gin-gonic/gin"
)

func GetSettingInfo(c *gin.Context) {
	c.JSON(http.StatusOK, cons.OSSetting)
}
func PostSetting(c *gin.Context) {
	setInfo := datamodels.Setting{}
	err := c.ShouldBindJSON(&setInfo)
	if err != nil {
		return
	}
	setInfo.SelfPath = cons.OSSetting.SelfPath
	cons.OSSetting = setInfo
	service.FlushDictionary(cons.OSSetting.SelfPath)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}

// GetIpAddr2 获取本地IP地址 利用udp
func GetIpAddr2(c *gin.Context) {
	res := utils.NewSuccess()
	res.Data = service.GetIpAddr()
	c.JSON(http.StatusOK, res)
}

// GetShutdown 系统关机
func GetShutdown(c *gin.Context) {
	res := utils.NewSuccess()
	err := exec.Command("cmd", "/C", "shutdown -s -t 0").Run()
	if err != nil {
		_, err := fmt.Fprintln(gin.DefaultWriter, "shutdown", err)
		if err != nil {
			return
		}
	}
	c.JSON(http.StatusOK, res)
}
