package controller

import (
	"fmt"
	"net/http"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/datasource"
	"searchGin/service"
	"searchGin/utils"

	"github.com/gin-gonic/gin"
)

// 文件搜索入口
func PostSearch(c *gin.Context) {
	PostMovies(c)
}

// 文件搜索 map
func PostMovies(c *gin.Context) {
	searchParam := datamodels.SearchParam{}
	c.Bind(&searchParam)
	fmt.Fprintf(cons.LogWriter, "PostMovies： [%v]", searchParam)
	fileService := service.CreateSearchService()
	result := fileService.SearchDataSource(searchParam)
	result.PageSize = searchParam.PageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)
	result.SetProgress(cons.IndexDone)
	c.JSON(http.StatusOK, result)
}

// 脸谱搜索入口
func PostActess(c *gin.Context) {

	param := datamodels.SearchParam{}
	c.Bind(&param)
	service := service.CreateSearchService()
	if len(datasource.FileList) == 0 {
		service.ScanAll()
		service.SortAct(datasource.ActressList, param.SortType)
	}
	service.SortAct(datasource.ActressList, param.SortType)
	totalCnt := len(datasource.ActressList)
	list, searchCnt := service.SearchActressByKeyWord(datasource.ActressList, param.Keyword)
	list = service.GetActressPage(list, param.Page, param.PageSize)
	result := utils.NewPage()
	result.CurCnt = len(list)
	result.TotalCnt = totalCnt
	result.ResultCnt = searchCnt
	result.Data = list
	c.JSON(http.StatusOK, result)
}
