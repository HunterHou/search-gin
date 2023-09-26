package controller

import (
	"fmt"
	"net/http"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/datasource"
	"searchGin/service"
	"searchGin/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

// 文件搜索入口
func PostSearch(c *gin.Context) {

	if cons.OSSetting.IsDb && cons.IndexDone {
		//当使用db 且索引已完成更新  使用sqlite 查询
		PostSearchMovie(c)
	} else {
		//当不使用db 或索引更新中  使用map查询
		PostMovies(c)
	}
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

// sqlite搜索
func PostSearchMovie(c *gin.Context) {
	searchParam := datamodels.SearchParam{}
	c.Bind(&searchParam)
	fileService := service.CreateSearchService()
	result := fileService.SearchIndex(searchParam)
	result.SetProgress(cons.IndexDone)
	c.JSON(http.StatusOK, result)
}

func GetNextInfo(c *gin.Context) {
	id := c.Param("id")
	keywords := c.DefaultQuery("keywords", "")
	pageNo, _ := strconv.Atoi(c.DefaultQuery("pageNo", "1"))
	if pageNo < 1 {
		pageNo = 1
	}
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "14"))
	if pageSize < 1 {
		pageSize = 14
	}
	sortType := c.DefaultQuery("sortType", "desc")
	sortField := c.DefaultQuery("sortField", "MTime")
	movieType := c.DefaultQuery("movieType", "")
	searchParam := datamodels.NewSearchParam(keywords, pageNo, pageSize, sortField, sortType, movieType)
	res := getNextOne(searchParam, 1, id)
	if res.Id == "" {
		searchParam.Page = searchParam.Page + 1
		res = getNextOne(searchParam, +1, id)
	}
	c.JSON(http.StatusOK, res)
}

func GetLastInfo(c *gin.Context) {
	id := c.Param("id")
	keywords := c.DefaultQuery("keywords", "")
	pageNo, _ := strconv.Atoi(c.DefaultQuery("pageNo", "1"))
	if pageNo < 1 {
		pageNo = 1
	}
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "14"))
	if pageSize < 1 {
		pageSize = 14
	}
	sortType := c.DefaultQuery("sortType", "desc")
	sortField := c.DefaultQuery("sortField", "code")
	movieType := c.DefaultQuery("movieType", "")
	searchParam := datamodels.NewSearchParam(keywords, pageNo, pageSize, sortField, sortType, movieType)
	res := getNextOne(searchParam, -1, id)
	if res.Id == "" {
		searchParam.Page = searchParam.Page - 1
		res = getNextOne(searchParam, -1, id)
	}
	c.JSON(http.StatusOK, res)

}

func getNextOne(searchParam datamodels.SearchParam, _ int, currentId string) datamodels.Movie {
	var res datamodels.Movie
	fileService := service.CreateSearchService()
	result := fileService.SearchIndex(searchParam)
	datas := result.Data.([]datamodels.Movie)
	for i := 0; i < len(datas); i++ {
		if datas[i].Id == currentId {
			if i == 0 {
				res = datas[i]
			} else {
				res = datas[i+1]
			}

		}
	}
	return res
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
