package controller

import (
	"../cons"
	"../datasource"
	"../service"
	"../utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

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
	c.File(file.Jpg)
}

func PostMovies(c *gin.Context) {
	keywords := c.PostForm("keywords")
	pageNo, _ := strconv.Atoi(c.DefaultPostForm("pageNo", "1"))
	if pageNo < 1 {
		pageNo = 1
	}
	pageSize, _ := strconv.Atoi(c.DefaultPostForm("pageSize", "30"))
	sortType := c.DefaultPostForm("sortType", "code")
	sortField := c.DefaultPostForm("sortField", "desc")
	service := service.FileService{}
	result := utils.NewPage()
	if len(datasource.FileList) == 0 {
		service.ScanAll()
		datasource.SortMovies(sortField, sortType, true)
	}
	datasource.SortMovies(sortField, sortType, false)
	list, size := service.SearchByKeyWord(datasource.FileList, datasource.FileSize, keywords)
	result.TotalCnt = len(list)
	result.PageSize = pageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)
	result.ResultSize = utils.GetSizeStr(size)
	result.SetResultCnt(result.TotalCnt, pageNo)
	list = service.GetPage(list, pageNo, pageSize)

	for i := range list {
		list[i].Png = "http://127.0.0.1:8888/png/" + list[i].Id
		list[i].Jpg = "http://127.0.0.1:8888/jpg/" + list[i].Id
	}
	result.CurCnt = len(list)
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

func GetActess(c *gin.Context) {
	if len(datasource.FileList) == 0 {
		service := service.FileService{}
		service.ScanAll()
	}
	list := datasource.ActressLib
	result := utils.NewPage()
	result.CurCnt = len(list)
	result.Data = list
	c.JSON(http.StatusOK, result)
}
func GetButtom(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"Play":    cons.Play,
		"Change":  cons.Change,
		"Open":    cons.Open,
		"Replay":  cons.Replay,
		"Close":   cons.Close,
		"Stop":    cons.Stop,
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
func GetInfo(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindOne(id)
	file.Jpg = "http://127.0.0.1:8888/jpg/" + file.Id
	c.JSON(http.StatusOK, file)
}
func GetLastInfo(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindNext(id, -1)
	file.Jpg = "http://127.0.0.1:8888/jpg/" + file.Id
	c.JSON(http.StatusOK, file)
}
func GetNextInfo(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindNext(id, 1)
	file.Jpg = "http://127.0.0.1:8888/jpg/" + file.Id
	c.JSON(http.StatusOK, file)
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

//func (fc FileController) GetSupplier() utils.Page {
//	if len(datasource.SupplierLib) == 0 {
//		fc.Service.ScanAll()
//	}
//	list := datasource.SupplierLib
//	result := utils.NewPage()
//	result.CurCnt = len(list)
//	result.Data = list
//	return result
//}
//

//
//	// fc.Ctx.ContentType("video/mp4")
//	// f,_:=os.Open(file.Path)
//	// sourceBuffer := make([]byte, 5000)
//	// f.Read(sourceBuffer)
//	// fc.Ctx.Write(sourceBuffer)
//
//}
//
//func (fc FileController) PostOpendir() {
//	id := fc.Ctx.PostValue("id")
//	file := fc.Service.FindOne(id)
//	utils.ExecCmdStart(file.DirPath)
//}
//
//func (fc FileController) PostInfo() {
//	id := fc.Ctx.PostValue("id")
//	file := fc.Service.FindOne(id)
//	file.Png = file.PngBase64()
//	file.Jpg = utils.ImageToString(file.Jpg)
//	fc.Ctx.JSON(file)
//
//}
//

//func (fc FileController) PostRemovedir() {
//	id := fc.Ctx.PostValue("id")
//	delete(cons.BaseDir, id)
//	go service.FlushDictionart(cons.DirFile)
//	result := utils.Success()
//	fc.Ctx.JSON(result)
//}
//func (fc FileController) PostAdddir() {
//	id := fc.Ctx.PostValue("id")
//	key, path := utils.DirpathForId(id)
//	_, ok := cons.BaseDir[key]
//	result := utils.NewResult()
//	if ok {
//		result.Fail()
//	} else {
//		cons.BaseDir[key] = path
//		result.Success()
//		go service.FlushDictionart(cons.DirFile)
//	}
//	fc.Ctx.JSON(result)
//
//}
//
//func (fc FileController) PostSync() {
//	id := fc.Ctx.PostValue("id")

//
//}
//func (fc FileController) PostMknfo() {
//	id := fc.Ctx.PostValue("id")
//	curFile := fc.Service.FindOne(id)
//	result, newFile := fc.Service.RequestToFile(curFile)
//	if result.Code != 200 {
//		fc.Ctx.JSON(result)
//		return
//	}
//	newFile.Png = curFile.Png
//	newFile.Jpg = curFile.Jpg
//	newFile.Nfo = curFile.Nfo
//	fc.Service.MakeNfo(newFile)
//	result.Success()
//	fc.Ctx.JSON(result)
//
//}
//
//func (fc FileController) GetViews() {
//	if len(datasource.FileList) == 0 {
//		fc.Service.ScanAll()
//	}
//	keyWord := fc.Ctx.URLParam("keyWord")
//	onlyRepeat := fc.Ctx.URLParam("onlyRepeat")
//	sortField := fc.Ctx.URLParamDefault("sortField", datasource.DefSortField)
//	sortType := fc.Ctx.URLParamDefault("sortType", datasource.DefSortType)
//	pageNo, errNo := fc.Ctx.URLParamInt("pageNo")
//	if errNo != nil || pageNo == 0 {
//		pageNo = 1
//	}
//	pageSize, errSize := fc.Ctx.URLParamInt("pageSize")
//	if errSize != nil || pageSize == 0 {
//		pageSize = 55
//	}
//	page := utils.NewPage()
//	page.KeyWord = keyWord
//	page.PageNo = pageNo
//	page.PageSize = pageSize
//
//	dataSource := datasource.FileList
//	if onlyRepeat == "on" {
//		keyWord = ""
//		dataSource = fc.Service.OnlyRepeat(dataSource)
//	}
//	page.TotalCnt = len(dataSource)
//	page.TotalSize = utils.GetSizeStr(datasource.FileSize)
//	datasource.SortMovies(sortField, sortType, false)
//	datas := fc.Service.SearchByKeyWord(dataSource, keyWord)
//	page.SetResultCnt(len(datas), pageNo)
//	page.ResultSize = utils.GetSizeStr(fc.Service.DataSize(datas))
//	datas = fc.Service.GetPage(datas, pageNo, pageSize)
//	page.CurCnt = len(datas)
//	page.CurSize = utils.GetSizeStr(fc.Service.DataSize(datas))
//	page.Data = datas
//
//	fc.Ctx.ViewData("playIcon", cons.Play)
//	fc.Ctx.ViewData("changeIcon", cons.Change)
//	fc.Ctx.ViewData("openIcon", cons.Open)
//	fc.Ctx.ViewData("replayIcon", cons.Replay)
//	fc.Ctx.ViewData("closeIcon", cons.Close)
//	fc.Ctx.ViewData("StopIcon", cons.Stop)
//
//	fc.Ctx.ViewData("sortField", sortField)
//	fc.Ctx.ViewData("sortType", sortType)
//	fc.Ctx.ViewData("onlyRepeat", onlyRepeat)
//
//	fc.Ctx.ViewData("page", page)
//	fc.Ctx.ViewData("curPage", page.PageNo)
//	fc.Ctx.ViewData("dirList", cons.BaseDir)
//	fc.Ctx.ViewData("title", "文件列表")
//	fc.Ctx.View("main.html")
//}
//func (fc FileController) GetStar() {
//	if len(datasource.FileList) == 0 {
//		fc.Service.ScanAll()
//	}
//	var datas []datamodels.Actress
//	list := datasource.ActressLib
//	for _, data := range list {
//		datas = append(datas, data)
//	}
//	fc.Service.SortAct(datas)
//	totalCnt := len(datas)
//	resultCnt := len(datas)
//	curCnt := len(datas)
//
//	page := utils.NewPage()
//	page.Data = datas
//	page.TotalCnt = totalCnt
//	page.CurCnt = curCnt
//	page.ResultCnt = resultCnt
//
//	fc.Ctx.ViewData("page", page)
//	fc.Ctx.ViewData("curPage", page.PageNo)
//	fc.Ctx.ViewData("dirList", cons.BaseDir)
//	fc.Ctx.ViewData("title", "列表")
//	fc.Ctx.View("act.html")
//}
