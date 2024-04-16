package controller

import (
	"fmt"
	"net/http"
	"searchGin/service"
	"searchGin/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

// 本地打开文件夹
func GetOpenFolder(c *gin.Context) {
	id := c.Param("id")
	SearchService := service.CreateSearchService()
	file := SearchService.FindOne(id)
	fmt.Fprint(gin.DefaultWriter, "open folder", file.DirPath)
	utils.ExecCmdExplorer(file.DirPath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

// 通过路径打开文件夹
func PostOpenFolderByPath(c *gin.Context) {

	forms := make(map[string]string)
	c.ShouldBindJSON(&forms)
	dirpath := forms["dirpath"]
	dirpath = strings.ReplaceAll(dirpath, utils.PathSeparator+utils.PathSeparator, utils.PathSeparator)
	utils.ExecCmdExplorer(dirpath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

// 通过路径删除文件夹
func PostDeleteFolerByPath(c *gin.Context) {

	fileService := service.CreateFileService()
	forms := make(map[string]string)
	c.ShouldBindJSON(&forms)
	dirpath := forms["dirpath"]
	dirpath = strings.ReplaceAll(dirpath, utils.PathSeparator+utils.PathSeparator, utils.PathSeparator)
	fileService.DownDeleteDir(dirpath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}
