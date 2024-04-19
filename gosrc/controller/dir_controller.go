package controller

import (
	"net/http"
	"searchGin/service"
	"searchGin/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

// GetOpenFolder 本地打开文件夹
func GetOpenFolder(c *gin.Context) {
	id := c.Param("id")
	SearchService := service.CreateSearchService()
	file := SearchService.FindOne(id)
	utils.InfoFormat("open folder:[%v]", file.DirPath)
	utils.ExecCmdExplorer(file.DirPath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

// PostOpenFolderByPath 通过路径打开文件夹
func PostOpenFolderByPath(c *gin.Context) {

	forms := make(map[string]string)
	err := c.ShouldBindJSON(&forms)
	if err != nil {
		return
	}
	dirpath := forms["dirpath"]
	dirpath = strings.ReplaceAll(dirpath, utils.PathSeparator+utils.PathSeparator, utils.PathSeparator)
	utils.ExecCmdExplorer(dirpath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

// PostDeleteFolerByPath 通过路径删除文件夹
func PostDeleteFolerByPath(c *gin.Context) {

	fileService := service.CreateFileService()
	forms := make(map[string]string)
	err := c.ShouldBindJSON(&forms)
	if err != nil {
		return
	}
	dirpath := forms["dirpath"]
	dirpath = strings.ReplaceAll(dirpath, utils.PathSeparator+utils.PathSeparator, utils.PathSeparator)
	fileService.DownDeleteDir(dirpath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}
