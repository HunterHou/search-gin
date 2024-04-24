package controller

import (
	"net/http"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/service"
	"searchGin/utils"

	"github.com/gin-gonic/gin"
)

// PostSearch 文件搜索入口
func PostSearch(c *gin.Context) {
	PostMovies(c)
}

// PostMovies 文件搜索 map
func PostMovies(c *gin.Context) {
	searchParam := datamodels.SearchParam{}
	err := c.Bind(&searchParam)
	if err != nil {
		return
	}
	utils.InfoFormat("PostMovies： [%v]", searchParam)
	result := service.SearchApp.SearchDataSource(searchParam)
	result.SetProgress(cons.IndexDone)
	c.JSON(http.StatusOK, result)
}

// PostActress 脸谱搜索入口
func PostActress(c *gin.Context) {
	param := datamodels.SearchParam{}
	err := c.Bind(&param)
	if err != nil {
		utils.InfoNormal(param, err)
	}
	if service.SearchEngin.IsEmpty() {
		service.SearchApp.ScanAll()
	}
	pageActressResultWrapper := service.SearchEngin.PageActress(param)
	result := utils.NewPage()
	result.CurCnt = pageActressResultWrapper.ResultCount
	result.TotalCnt = pageActressResultWrapper.SearchCount
	result.ResultCnt = pageActressResultWrapper.SearchCount
	result.Data = pageActressResultWrapper.FileList
	c.JSON(http.StatusOK, result)
}
