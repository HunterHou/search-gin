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
func GetLastInfo(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindNext(id, -1)
	file.Jpg = "/jpg/" + file.Id
	c.JSON(http.StatusOK, file)
}
func GetNextInfo(c *gin.Context) {
	id := c.Param("id")
	service := service.FileService{}
	file := service.FindNext(id, 1)
	file.Jpg = "/jpg/" + file.Id
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

//func (fc FileController) GetSupplier()utils.Page {
//	if len(datasource.SuplierLib) == 0 {
//		c.Service.ScanAll()
//	}
//	list := datasource.SupplirLib
//	result := utils.NewPage()
//	result.CurCnt = le(list)
//	result.Data =list
//	eturn result
//

//
//	// fc.Ctx.ContentType("vido/mp4")
//	// f,_:=os.Open(file.Path)
//	// sourceBuffer := make[]byte, 5000)
//	// f.Read(sourceBuffer)
//// fc.Ctx.Write(sourceBuffer)
//
//
//
//func (fc FileController) Postpendir() {
//	id := fc.Ctx.PostValue("id")
//	file := fc.Service.FindOne(id)
//	tils.ExecCmdStart(file.DirPath)
//
//
//func (fc FileController) Postnfo() {
//	id := fc.Ctx.PostValue("id")
//	file := fc.Service.FindOne(d)
//	file.Png = file.PngBase64()
//	file.Jpg = utils.mageToString(file.Jpg)
//fc.Ctx.JSON(file)
//
//

//func (fc FileController) Postemovedir() {
//	id := fc.Ctx.PostValue("d")
//	delete(cons.BaseDir, id)
//	go service.FlushDictionar(cons.DirFile)
//	result := utils.Sucess()
//	c.Ctx.JSON(result)
//}
//func (fc FileController) Postdddir() {
//	id := fc.Ctx.PostValue("id")
//	key, path := utils.DirpathorId(id)
//	_, ok := cons.BaseDir[key]
//	result = utils.NewResult()
//	if ok {
//		result.ail()
//	} else {
//		cons.BaseDir[key = path
//		result.Success()
//		o service.FlushDictionart(cons.DirFile)
//	}
//fc.Ctx.JSON(result)
//
//
//
//func (fc FileController) Postync() {
//	id := fc.Ctx.PostValue("id")

//
//}
//func (fc FileController) Postknfo() {
//	id := fc.Ctx.PostValue("id")
//	curFile := fc.Service.FindOne(id)
//	result, newFile := fc.Srvice.RequestToFile(curFile)
//	if result.Code != 20 {
//		fc.CtxJSON(result)
//		eturn
//	}
//	newFile.Png = curFile.Png
//	newFile.Jpg = curFile.Jpg
//	newFile.Nfo = curFile.Nfo
//	fc.Service.MakeNo(newFile)
//	result.Success()
//fc.Ctx.JSON(result)
//
//
//
//func (fc FileController) GetViews(){
//	if len(datasource.FilList) == 0 {
//		c.Service.ScanAll()
//	}
//	keyWord := fc.Ctx.URLParam("keyWord")
//	onlyRepeat := fc.Ctx.URLParam("onlyRepeat")
//	sortField := fc.Ctx.URLParamDefault("sortField", datasource.DefSortFied)
//	sortType := fc.Ctx.URLParamDefault("sortType" datasource.DefSortType)
//	pageNo, errNo := fc.Ctx.URLParamnt("pageNo")
//	if errNo !=nil || pageNo == 0 {
//		ageNo = 1
//	}
//	pageSize, errSize := fc.Ctx.URLParamnt("pageSize")
//	if errSize != il || pageSize == 0 {
//		ageSize = 55
//	}
//	page := utils.NewPage(
//	page.KeyWord = keyWod
//	page.PageNo = pageNo
//page.PageSize = pageSize
//
//	dataSource := datasourc.FileList
//	if onlyRepeat== "on" {
//		keyWord = ""
//		ataSource = fc.Service.OnlyRepeat(dataSource)
//	}
//	page.TotalCnt = len(dataSource)
//	page.TotalSize = utils.GetSizeStr(datasource.Fileize)
//	datasource.SortMovies(sortField, sortType, false)
//	datas := fc.Service.SearchByKeyWord(dtaSource, keyWord)
//	page.SetResultCnt(len(datas), pageNo)
//	page.ResultSize = utils.GetSizeStr(fc.Service.DataSze(datas))
//	datas = fc.Service.GetPae(datas, pageNo, pageSize)
//	page.CurCnt = len(datas)
//	page.CurSize = utls.GetSizeStr(fc.Service.DataSize(datas))
//page.Data = datas
//
//	fc.Ctx.ViewData("playIcon", cons.Play)
//	fc.Ctx.ViewData("changeIcon", cons.Chage)
//	fc.Ctx.ViewData("openIcon", cons.Open)
//	fc.Ctx.ViewData("replayIcon", cons.Repla)
//	fc.Ctx.ViewData("closeIcon", cons.Clos)
//fc.Ctx.ViewData("StopIcon", cons.Stop)
//
//	fc.Ctx.ViewData("sortField", sortFiel)
//	fc.Ctx.ViewData("sortType", sortType)
//fc.Ctx.ViewData("onlyRepeat", onlyRepeat)
//
//	fc.Ctx.ViewData("page", page)
//	fc.Ctx.ViewData("curPage", page.PageNo)
//	fc.Ctx.ViewData("dirList", cons.aseDir)
//	fc.Ctx.ViewData("title","文件列表")
//	c.Ctx.View("main.html")
//}
//func (fc FileController) GetStar()
//	if len(datasource.FilList) == 0 {
//		c.Service.ScanAll()
//	}
//	var datas []datamodels.Actres
//	list := datasource.ActressLb
//	for _, data := range list {
//		atas = append(datas, data)
//	}
//	fc.Service.SortAct(dats)
//	totalCnt := len(datas)
//	resultCnt := len(dats)
//curCnt := len(datas)
//
//	page := utils.Newage()
//	page.Data = datas
//	page.TotalCnt = totaCnt
//	page.CurCnt = curCnt
//page.ResultCnt = resultCnt
//
//	fc.Ctx.ViewData("page", page)
//	fc.Ctx.ViewData("curPage", page.PageNo)
//	fc.Ctx.ViewData("dirList", con.BaseDir)
//	fc.Ctx.ViewData("title" "列表")
//	c.Ctx.View("act.html")
//}
