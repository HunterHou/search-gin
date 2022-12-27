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
	c.ShouldBindJSON(&setInfo)
	setInfo.SelfPath = cons.OSSetting.SelfPath
	cons.OSSetting = setInfo
	service.FlushDictionart(cons.OSSetting.SelfPath)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}

// GetIpAddr2 获取本地IP地址 利用udp
func GetIpAddr2(c *gin.Context) {
	res := utils.NewSuccess()
	res.Data = service.GetIpAddr()
	c.JSON(http.StatusOK, res)
}

// 系统关机
func GetShutdown(c *gin.Context) {
	res := utils.NewSuccess()
	// err := exec.Command("cmd", "/C", "shutdown -s -t 0").Run()
	// if err != nil {
	// 	fmt.Println(err)
	// }
	utils.ExecCmd("", "shutdown /s -t 0")
	c.JSON(http.StatusOK, res)
}
