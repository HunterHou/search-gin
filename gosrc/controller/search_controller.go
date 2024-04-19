package controller

import (
	"net/http"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/datasource"
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
	fileService := service.CreateSearchService()
	result := fileService.SearchDataSource(searchParam)
	result.PageSize = searchParam.PageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)
	result.SetProgress(cons.IndexDone)
	c.JSON(http.StatusOK, result)
}

// PostActess 脸谱搜索入口
func PostActess(c *gin.Context) {

	param := datamodels.SearchParam{}
	err := c.Bind(&param)
	if err != nil {
		return
	}
	SearchService := service.CreateSearchService()
	if len(datasource.FileList) == 0 {
		SearchService.ScanAll()
	}
	SearchService.SortAct(datasource.ActressList, param.SortType)
	totalCnt := len(datasource.ActressList)
	// TODO 关键词缓存
	list, searchCnt := SearchService.SearchActressByKeyWord(datasource.ActressList, param.Keyword)
	list = SearchService.GetActressPage(list, param.Page, param.PageSize)
	result := utils.NewPage()
	result.CurCnt = len(list)
	result.TotalCnt = totalCnt
	result.ResultCnt = searchCnt
	result.Data = list
	c.JSON(http.StatusOK, result)
}
