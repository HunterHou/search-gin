package controller

import (
	"fmt"
	"net/http"
	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/datasource"
	"search-gin/service"
	"search-gin/utils"
	"strconv"
	"strings"

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
	service := service.CreateFileService()
	service.GetPng(c)
}

func GetJpg(c *gin.Context) {
	fs := service.CreateFileService()
	fs.GetJpg(c)

}

func PostStream(c *gin.Context) {
	path := c.Param("path")
	if utils.ExistsFiles(path) {
		c.File(path)
	} else {
		c.File(path)
	}
}

func PostSearch(c *gin.Context) {
	onlyRepeat := c.DefaultPostForm("onlyRepeat", "false")
	if cons.OverIndex() && onlyRepeat != "true" {
		PostSearchMovie(c)
		// PostMovies(c)
	} else {
		// PostSearchMovie(c)
		PostMovies(c)
	}
}

func PostSearchMovie(c *gin.Context) {
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
	movieType := c.DefaultPostForm("movieType", "")
	fileService := service.CreateFileService()
	searchParam := datamodels.NewSearchParam(keywords, pageNo, pageSize, sortField, sortType, movieType)
	result := fileService.SearchIndex(searchParam)
	result.IndexProgress = cons.IndexOver
	c.JSON(http.StatusOK, result)
}

func GetNextInfo(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
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
	if res.Id == 0 {
		searchParam.Page = searchParam.Page + 1
		res = getNextOne(searchParam, +1, id)
	}
	c.JSON(http.StatusOK, res)
}

func GetLastInfo(c *gin.Context) {
	id, _ := strconv.Atoi(c.DefaultQuery("id", "1"))
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
	if res.Id == 0 {
		searchParam.Page = searchParam.Page - 1
		res = getNextOne(searchParam, -1, id)
	}
	c.JSON(http.StatusOK, res)

}

func getNextOne(searchParam datamodels.SearchParam, offset int, currentId int) datamodels.Movie {
	var res datamodels.Movie
	fileService := service.CreateFileService()
	result := fileService.SearchIndex(searchParam)
	datas := result.Data.([]datamodels.Movie)
	for i := 0; i < len(datas); i++ {
		if datas[i].Id == int64(currentId) {
			if i == 0 {
				res = datas[i]
			} else {
				res = datas[i+1]
			}

		}
	}
	return res
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
	service := service.CreateFileService()
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
	service := service.CreateFileService()
	service.ScanAll()
	datasource.SortMovieForce()
	result := utils.NewSuccessByMsg("刷新成功")
	c.JSON(http.StatusOK, result)
}

func GetButtom(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"baseUrl": cons.OSSetting.BaseUrl,
		"Tags":    cons.OSSetting.Tags,
		"TagsLib": cons.OSSetting.TagsLib,
	})
}
func GetPlay(c *gin.Context) {
	//id := c.Param("id")
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	service := service.CreateFileService()
	file := service.FindOne(id)
	//c.File(file.Path)
	utils.ExecCmdStart(file.Path)
	res := utils.NewSuccessByMsg("播放成功")
	c.JSON(http.StatusOK, res)
}
func SetMovieType(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	movieType := c.Param("movieType")
	service := service.CreateFileService()
	file := service.FindOne(id)
	res := service.SetMovieType(file, movieType)
	c.JSON(http.StatusOK, res)
}
func GetInfo(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	service := service.CreateFileService()
	file := service.FindOne(id)
	c.JSON(http.StatusOK, file)
}

func PostRename(c *gin.Context) {
	currentFile := datamodels.Movie{}
	c.ShouldBindJSON(&currentFile)
	service := service.CreateFileService()
	res := service.Rename(currentFile)
	c.JSON(http.StatusOK, res)
}

func GetAddTag(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	tag := c.Param("tag")
	service := service.CreateFileService()
	res := service.AddTag(int64(idInt), tag)
	c.JSON(http.StatusOK, res)
}
func GetClearTag(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	tag := c.Param("tag")
	service := service.CreateFileService()
	res := service.ClearTag(int64(idInt), tag)
	c.JSON(http.StatusOK, res)
}

func GetDirInfo(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	fileService := service.CreateFileService()
	file := fileService.FindOne(id)

	files := service.Walk(file.DirPath, cons.Types)
	for i := 0; i < len(files); i++ {
		files[i].SetImageBase64()
	}
	c.JSON(http.StatusOK, files)
}

func GetOpenFoler(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	service := service.CreateFileService()
	file := service.FindOne(id)
	fmt.Println(file.DirPath)
	utils.ExecCmdExplorer(file.DirPath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

func PostOpenFolerByPath(c *gin.Context) {

	forms := make(map[string]string)
	c.ShouldBindJSON(&forms)
	dirpath := forms["dirpath"]
	dirpath = strings.ReplaceAll(dirpath, "\\\\", "\\")
	utils.ExecCmdExplorer(dirpath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

func PostDeleteFolerByPath(c *gin.Context) {

	forms := make(map[string]string)
	c.ShouldBindJSON(&forms)
	dirpath := forms["dirpath"]
	dirpath = strings.ReplaceAll(dirpath, "\\\\", "\\")
	service.DownDeleteDir(dirpath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

func GetDelete(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	service := service.CreateFileService()
	service.Delete(id)
	res := utils.NewSuccessByMsg("删除成功")
	c.JSON(http.StatusOK, res)
}
func GetSync(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	serviceFile := service.CreateFileService()
	curFile := serviceFile.FindOne(id)
	result, newFile := serviceFile.RequestToFile(curFile)
	if result.Code != 200 {
		c.JSON(http.StatusOK, result)
		return
	}
	result = serviceFile.MoveCut(curFile, newFile)
	c.JSON(http.StatusOK, result)
}

func GetImageList(c *gin.Context) {
	idInt, _ := strconv.Atoi(c.Param("id"))
	id := int64(idInt)
	serviceFile := service.CreateFileService()
	curFile := serviceFile.FindOne(id)
	result, newFile := serviceFile.RequestToFile(curFile)
	if result.Code != 200 {
		c.JSON(http.StatusOK, result)
		return
	}
	if len(newFile.ImageList) == 0 {
		result.Fail()
		result.Message = "无图可用"
		c.JSON(http.StatusOK, result)
		return
	}
	curFile.Jpg = newFile.Jpg
	curFile.ImageList = newFile.ImageList
	curFile.Actress = newFile.Actress
	result = serviceFile.DownImage(curFile)
	c.JSON(http.StatusOK, result)
}

func GetRefresIndex(c *gin.Context) {
	service := service.CreateFileService()
	service.ScanAll()
	datasource.SortMovieForce()
	res := utils.NewSuccessByMsg("扫描结束！")
	c.JSON(http.StatusOK, res)
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

	fileService := service.CreateFileService()

	searchParam := datamodels.NewSearchParam(keywords, pageNo, pageSize, sortField, sortType, movieType)
	searchParam.SetOnlyRepeat(strings.EqualFold("true", onlyRepeat))
	result := fileService.SearchDataSource(searchParam)
	result.PageSize = pageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)
	result.SetResultCnt(result.TotalCnt, pageNo)
	result.IndexProgress = cons.IndexOver
	c.JSON(http.StatusOK, result)
}
