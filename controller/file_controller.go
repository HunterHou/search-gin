package controller

import (
	"fmt"
	"net/http"
	"search-gin/cons"
	"search-gin/datasource"
	"search-gin/service"
	"search-gin/utils"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetActessImage(c *gin.Context) {
	path := c.Param("path")
	list := datasource.ActressLib
	actress, ok := list[path]
	if ok {
		if utils.ExistsFiles(actress.Url) {
			c.File(actress.Url)
		} else {
			return
		}
	}

}
func GetPng(c *gin.Context) {
	path := c.Param("path")
	service := service.FileService{}
	file := service.FindOne(path)
	if utils.ExistsFiles(file.Png) {
		c.File(file.Png)
	} else {
		c.File(file.Jpg)
	}
}
func GetJpg(c *gin.Context) {
	path := c.Param("path")
	service := service.FileService{}
	file := service.FindOne(path)
	if utils.ExistsFiles(file.Jpg) {
		c.File(file.Jpg)
	} else {
		c.File(file.Png)
	}
}

func PostStream(c *gin.Context) {
	path := c.Param("path")
	if utils.ExistsFiles(path) {
		c.File(path)
	} else {
		c.File(path)
	}
}

func PostMovies(c *gin.Context) {
	keywords := c.PostForm("keywords")
	pageNo, _ := strconv.Atoi(c.DefaultPostForm("pageNo", "1"))
	if pageNo < 1 {
		pageNo = 1
	}
	pageSize, _ := strconv.Atoi(c.DefaultPostForm("pageSize", "14"))
	if pageSize < 1 {
		pageSize = 14
	}
	sortType := c.DefaultPostForm("sortType", "code")
	sortField := c.DefaultPostForm("sortField", "desc")
	onlyRepeat := c.DefaultPostForm("onlyRepeat", "false")
	movieType := c.DefaultPostForm("movieType", "")

	service := service.FileService{}
	result := utils.NewPage()
	if len(datasource.FileList) == 0 {
		service.ScanAll()
		datasource.SortMovies(sortField, sortType, true)
	}
	datasource.SortMovies(sortField, sortType, false)
	dataSource := datasource.FileList
	if onlyRepeat == "true" {
		keywords = ""
		dataSource = service.OnlyRepeat(dataSource)
	}
	list, size := service.SearchByKeyWord(dataSource, datasource.FileSize, keywords, movieType)
	result.TotalCnt = len(list)
	result.PageSize = pageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)
	result.ResultSize = utils.GetSizeStr(size)
	result.SetResultCnt(result.TotalCnt, pageNo)
	list = service.GetPage(list, pageNo, pageSize)

	result.CurSize = utils.GetSizeStr(service.DataSize(list))
	result.CurCnt = len(list)
	result.Data = list

	c.JSON(http.StatusOK, result)
}
func GetLastInfo(c *gin.Context) {
	id := c.Param("id")
	keywords := c.DefaultQuery("keywords", "")
	sortType := c.DefaultQuery("sortType", "")
	sortField := c.DefaultQuery("sortField", "desc")
	movieType := c.DefaultQuery("movieType", "")
	service := service.FileService{}
	if len(datasource.FileList) == 0 {
		service.ScanAll()
	}
	datasource.SortMovies(sortField, sortType, false)
	list, _ := service.SearchByKeyWord(datasource.FileList, datasource.FileSize, keywords, movieType)
	file := service.FindNext(id, list, -1)
	file.Jpg = "/jpg/" + file.Id
	c.JSON(http.StatusOK, file)
}
func GetNextInfo(c *gin.Context) {
	id := c.Param("id")
	keywords := c.DefaultQuery("keywords", "")
	sortType := c.DefaultQuery("sortType", "")
	sortField := c.DefaultQuery("sortField", "desc")
	movieType := c.DefaultQuery("movieType", "")
	service := service.FileService{}
	if len(datasource.FileList) == 0 {
		service.ScanAll()
	}
	datasource.SortMovies(sortField, sortType, false)
	list, _ := service.SearchByKeyWord(datasource.FileList, datasource.FileSize, keywords, movieType)
	file := service.FindNext(id, list, 1)
	file.Jpg = "/jpg/" + file.Id
	c.JSON(http.StatusOK, file)
}
func PostActess(c *gin.Context) {

	keywords := c.PostForm("keywords")
	pageNo, _ := strconv.Atoi(c.DefaultPostForm("pageNo", "1"))
	sortType := c.DefaultPostForm("sortType", "desc")
	if pageNo < 1 {
		pageNo = 1
	}
	pageSize, _ := strconv.Atoi(c.DefaultPostForm("pageSize", "14"))
	if pageSize < 1 {
		pageSize = 14
	}
	service := service.FileService{}
	if len(datasource.FileList) == 0 {
		service.ScanAll()
		service.SortAct(datasource.ActressList, sortType)
	}
	service.SortAct(datasource.ActressList, sortType)
	totalCnt := len(datasource.ActressList)
	list, searchCnt := service.SearchActressByKeyWord(datasource.ActressList, keywords)
	list = service.GetActressPage(list, pageNo, pageSize)
	result := utils.NewPage()
	result.CurCnt = len(list)
	result.TotalCnt = totalCnt
	result.ResultCnt = searchCnt
	result.Data = list
	c.JSON(http.StatusOK, result)
}

func GetFresh(c *gin.Context) {
	service := service.FileService{}
	service.ScanAll()
	datasource.SortMovieForce()
	result := utils.Success()
	c.JSON(http.StatusOK, result)
}

func GetButtom(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"baseUrl": cons.BaseUrl,
	})
}
func GetPlay(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindOne(id)
	//c.File(file.Path)
	utils.ExecCmdStart(file.Path)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
func SetMovieType(c *gin.Context) {
	id := c.Param("id")
	movieType := c.Param("movieType")
	service := service.FileService{}
	file := service.FindOne(id)
	service.SetMovieType(file, movieType)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
func GetInfo(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindOne(id)
	c.JSON(http.StatusOK, file)
}
func GetDirInfo(c *gin.Context) {
	id := c.Param("id")
	fileService := service.FileService{}
	file := fileService.FindOne(id)

	files := service.Walk(file.DirPath, cons.Types)
	for i := 0; i < len(files); i++ {
		files[i].SetImageBase64()
	}
	c.JSON(http.StatusOK, files)
}

func GetOpenFoler(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindOne(id)
	fmt.Println(file.DirPath)
	utils.ExecCmdExplorer(file.DirPath)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}

func GetDelete(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	service.Delete(id)
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
func GetSync(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	curFile := service.FindOne(id)
	result, newFile := service.RequestToFile(curFile)
	if result.Code != 200 {
		c.JSON(http.StatusOK, result)
		return
	}
	result = service.MoveCut(curFile, newFile)
	c.JSON(http.StatusOK, result)
}

func GetRefresIndex(c *gin.Context) {
	service := service.FileService{}
	service.ScanAll()
	datasource.SortMovieForce()
	res := utils.NewSuccess()
	c.JSON(http.StatusOK, res)
}
