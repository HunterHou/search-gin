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
	"strings"

	"github.com/gin-gonic/gin"
)

//临时图片 特指浏览某个文件夹的所有图片
func GetTempImage(c *gin.Context) {
	id := c.Param("path")
	file := cons.TempImage[id]
	if utils.ExistsFiles(file.Path) {
		c.File(file.Path)
	} else {
		return
	}
}

// 获取文件流
func GetFile(c *gin.Context) {
	service := service.CreateFileService()
	id := c.Param("id")
	file := service.FindOne(id)
	if utils.ExistsFiles(file.Path) {
		c.File(file.Path)
	} else {
		return
	}
}

// 获取Png流
func GetPng(c *gin.Context) {
	service := service.CreateFileService()
	service.GetPng(c)
}

// 获取jpg流
func GetJpg(c *gin.Context) {
	fs := service.CreateFileService()
	fs.GetJpg(c)

}

//  获取脸谱的图片流
func GetActressImage(c *gin.Context) {
	path := c.Param("path")
	list := datasource.ActressLib
	actress, ok := list[path]
	if ok {
		for _, v := range actress.Images {
			if utils.ExistsFiles(v) {
				c.File(v)
				return
			}
		}
	}

}

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

// sqlite搜索
func PostSearchMovie(c *gin.Context) {
	searchParam := datamodels.SearchParam{}
	c.Bind(&searchParam)
	fileService := service.CreateFileService()
	result := fileService.SearchIndex(searchParam)
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
	fileService := service.CreateFileService()
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
	service := service.CreateFileService()
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

// 刷新索引
func GetFresh(c *gin.Context) {
	service := service.CreateFileService()
	service.ScanAll()
	datasource.SortMovieForce()
	result := utils.NewSuccessByMsg("刷新成功")
	c.JSON(http.StatusOK, result)
}

// 本地打开文件
func GetPlay(c *gin.Context) {
	//id := c.Param("id")
	id := c.Param("id")
	service := service.CreateFileService()
	file := service.FindOne(id)
	//c.File(file.Path)
	utils.ExecCmdStart(file.Path)
	res := utils.NewSuccessByMsg("播放成功")
	c.JSON(http.StatusOK, res)
}

// 设置类型
func SetMovieType(c *gin.Context) {
	id := c.Param("id")
	movieType := c.Param("movieType")
	service := service.CreateFileService()
	file := service.FindOne(id)
	res := service.SetMovieType(file, movieType)
	c.JSON(http.StatusOK, res)
}

// 获取Info信息
func GetInfo(c *gin.Context) {
	id := c.Param("id")
	service := service.CreateFileService()
	file := service.FindOne(id)
	c.JSON(http.StatusOK, file)
}

// 改名
func PostRename(c *gin.Context) {
	currentFile := datamodels.Movie{}
	c.ShouldBindJSON(&currentFile)
	service := service.CreateFileService()
	res := service.Rename(currentFile)
	c.JSON(http.StatusOK, res)
}

// 添加标签
func GetAddTag(c *gin.Context) {
	idInt := c.Param("id")
	tag := c.Param("tag")
	service := service.CreateFileService()
	res := service.AddTag(idInt, tag)
	c.JSON(http.StatusOK, res)
}

// 删除标签
func GetClearTag(c *gin.Context) {
	idInt := c.Param("id")
	tag := c.Param("tag")
	service := service.CreateFileService()
	res := service.ClearTag(idInt, tag)
	c.JSON(http.StatusOK, res)
}

// 文件夹信息 文件列表
func GetDirInfo(c *gin.Context) {
	if len(cons.TempImage) > 1000 {
		cons.TempImage = make(map[string]datamodels.Movie)
	}
	id := c.Param("id")
	fileService := service.CreateFileService()
	file := fileService.FindOne(id)

	files := service.Walk(file.DirPath, cons.Images, false)
	for i := 0; i < len(files); i++ {
		// files[i].SetImageBase64()
		cons.TempImage[files[i].Id] = files[i]
	}
	c.JSON(http.StatusOK, files)
}

// 本地打开文件夹
func GetOpenFolder(c *gin.Context) {
	id := c.Param("id")
	service := service.CreateFileService()
	file := service.FindOne(id)
	fmt.Println(file.DirPath)
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

	forms := make(map[string]string)
	c.ShouldBindJSON(&forms)
	dirpath := forms["dirpath"]
	dirpath = strings.ReplaceAll(dirpath, utils.PathSeparator+utils.PathSeparator, utils.PathSeparator)
	service.DownDeleteDir(dirpath)
	res := utils.NewSuccessByMsg("打开成功")
	c.JSON(http.StatusOK, res)
}

// 删除文件
func GetDelete(c *gin.Context) {
	id := c.Param("id")
	service := service.CreateFileService()
	service.Delete(id)
	res := utils.NewSuccessByMsg("删除成功")
	c.JSON(http.StatusOK, res)
}

// 同步 挂图
func GetSync(c *gin.Context) {
	id := c.Param("id")
	serviceFile := service.CreateFileService()
	curFile := serviceFile.FindOne(id)
	result, newFile := serviceFile.RequestBusToFile(curFile)
	if result.Code != 200 {
		c.JSON(http.StatusOK, result)
		return
	}
	result = serviceFile.MoveCut(curFile, newFile)
	c.JSON(http.StatusOK, result)
}

// 下拉相关图片
func GetImageList(c *gin.Context) {
	id := c.Param("id")
	serviceFile := service.CreateFileService()
	curFile := serviceFile.FindOne(id)
	result, newFile := serviceFile.RequestBusToFile(curFile)
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

// 刷新索引
func GetRefreshIndex(c *gin.Context) {
	service := service.CreateFileService()
	service.ScanAll()
	datasource.SortMovieForce()
	res := utils.NewSuccessByMsg("扫描结束！")
	c.JSON(http.StatusOK, res)
}

// 文件搜索 map
func PostMovies(c *gin.Context) {
	searchParam := datamodels.SearchParam{}
	c.Bind(&searchParam)
	fileService := service.CreateFileService()
	result := fileService.SearchDataSource(searchParam)
	result.PageSize = searchParam.PageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)
	c.JSON(http.StatusOK, result)
}
