package controller

import (
	"net/http"
	"net/url"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/service"
	"searchGin/utils"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// GetPlay 本地打开文件
func GetPlay(c *gin.Context) {
	//id := c.Param("id")
	id := c.Param("id")
	fileService := service.CreateSearchService()
	file := fileService.FindOne(id)
	//c.File(file.Path)
	utils.ExecCmdStart(file.Path)
	res := utils.NewSuccessByMsg("播放成功")
	c.JSON(http.StatusOK, res)
}

// SetMovieType 设置类型
func SetMovieType(c *gin.Context) {
	id := c.Param("id")
	movieType := c.Param("movieType")
	fileService := service.CreateSearchService()
	file := fileService.FindOne(id)
	res := fileService.SetMovieType(file, movieType)
	c.JSON(http.StatusOK, res)
}

// GetInfo 获取Info信息
func GetInfo(c *gin.Context) {
	id := c.Param("id")
	fileService := service.CreateSearchService()
	file := fileService.FindOne(id)
	c.JSON(http.StatusOK, file)
}

// PostRename 改名
func PostRename(c *gin.Context) {
	currentFile := datamodels.MovieEdit{}
	c.ShouldBindJSON(&currentFile)
	utils.InfoFormat("PostRename :searchCnt[%v] \n\n", currentFile)
	fileService := service.CreateSearchService()
	res := fileService.Rename(currentFile)
	c.JSON(http.StatusOK, res)
}

// GetAddTag 添加标签
func GetAddTag(c *gin.Context) {
	idInt := c.Param("id")
	tag := c.Param("tag")
	utils.InfoFormat("GetAddTag [%v] [%v]  \n", idInt, tag)
	fileService := service.CreateSearchService()
	res := fileService.AddTag(idInt, tag)
	c.JSON(http.StatusOK, res)
}

// GetClearTag 删除标签
func GetClearTag(c *gin.Context) {
	idInt := c.Param("id")
	tag := c.Param("tag")
	fileService := service.CreateSearchService()
	res := fileService.ClearTag(idInt, tag)
	c.JSON(http.StatusOK, res)
}

// GetDirInfo 文件夹信息 文件列表
func GetDirInfo(c *gin.Context) {
	if len(cons.TempImage) > 1000 {
		cons.TempImage = make(map[string]datamodels.Movie)
	}
	id := c.Param("id")
	searchService := service.CreateSearchService()
	fileService := service.CreateFileService()
	file := searchService.FindOne(id)
	files := fileService.Walk(file.DirPath, cons.Images, false)
	for i := 0; i < len(files); i++ {
		// files[i].SetImageBase64()
		cons.TempImage[files[i].Id] = files[i]
	}
	c.JSON(http.StatusOK, files)
}

// GetDelete 删除文件
func GetDelete(c *gin.Context) {
	id := c.Param("id")
	fileService := service.CreateSearchService()
	fileService.Delete(id)
	res := utils.NewSuccessByMsg("删除成功")
	c.JSON(http.StatusOK, res)
}

// PostSync 同步 挂图 20231010 自动刮涂失败 功能遗弃
func PostSync(c *gin.Context) {
	currentFile := datamodels.MovieEdit{}
	err := c.ShouldBindJSON(&currentFile)
	if err != nil {
		utils.InfoFormat("PostSync err [%v] ", err)
	}

	searchService := service.CreateSearchService()
	curFile := searchService.FindOne(currentFile.Id)
	utils.InfoFormat("PostSync curFile [%v] \n ", curFile)

	result, newFile := searchService.RequestBusToFile(curFile)
	if result.Code != 200 {
		c.JSON(http.StatusOK, result)
		return
	}
	utils.InfoFormat("PostSync newFile [%v] \n", newFile)
	result = searchService.MoveCut(curFile, newFile)
	c.JSON(http.StatusOK, result)
}

// GetImageList 下拉相关图片
func GetImageList(c *gin.Context) {
	id := c.Param("id")
	utils.InfoFormat("id:%v" + id)
	serviceFile := service.CreateSearchService()
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

// GetRefreshIndex 刷新索引
func GetRefreshIndex(c *gin.Context) {
	fileService := service.CreateSearchService()
	fileService.ScanAll()
	res := utils.NewSuccessByMsg("扫描结束！")
	c.JSON(http.StatusOK, res)
}

// GetTempImage 临时图片 特指浏览某个文件夹的所有图片
func GetTempImage(c *gin.Context) {
	id := c.Param("path")
	file := cons.TempImage[id]
	if utils.ExistsFiles(file.Path) {
		c.File(file.Path)
	} else {
		return
	}
}
func GetTempImageByPath(c *gin.Context) {
	path := c.Param("path")
	if utils.ExistsFiles(path) {
		c.File(path)
	} else {
		return
	}
}

func GetFileByPathUseEncode(c *gin.Context) {
	escapeUrl := c.Param("path")
	path, _ := url.QueryUnescape(escapeUrl)
	if utils.ExistsFiles(path) {
		c.File(path)
	} else {
		return
	}
}

// GetFile 获取文件流
func GetFile(c *gin.Context) {
	fileService := service.CreateFileService()
	fileService.GetFile(c)
}

// GetPng 获取Png流
func GetPng(c *gin.Context) {
	fileService := service.CreateFileService()
	fileService.GetPng(c)
}

// GetJpg 获取jpg流
func GetJpg(c *gin.Context) {
	fs := service.CreateFileService()
	fs.GetJpg(c)

}

// GetActressImage 获取脸谱的图片流
func GetActressImage(c *gin.Context) {
	path := c.Param("path")
	actress := service.SearchEngin.FindActressByName(path)
	if actress.IsNotEmpty() {
		for _, v := range actress.Images {
			if utils.ExistsFiles(v) {
				c.File(v)
				return
			}
		}
	}

}

func PostMerge(c *gin.Context) {
	searchParam := datamodels.MergeParam{}
	err := c.Bind(&searchParam)
	if err != nil {
		c.JSON(http.StatusOK, err)
	}
	utils.InfoFormat("PostMerge： [%v]", searchParam)
	searchService := service.CreateSearchService()

	var paths = []string{}
	for _, file := range searchParam.Files {
		curFile := searchService.FindOne(file)
		paths = append(paths, curFile.Path)
	}
	if searchParam.Dest == "" {
		suffix := utils.GetSuffux(paths[0])
		searchParam.Dest = strings.ReplaceAll(paths[0], "."+suffix, time.Now().String()+"."+suffix)
	}

	task := datamodels.NewMergeTask(paths, searchParam.Dest, searchParam.DeleteSource)
	task.SetStatus("等待")
	cons.TransferTask[task.CreateTime] = task
	c.JSON(http.StatusOK, utils.NewSuccessByMsg("任务创建成功"))

}

// GetTransferToMp4 格式转换
func GetTransferToMp4(c *gin.Context) {
	id := c.Param("id")
	to := c.Param("to")
	fileService := service.CreateSearchService()
	utils.InfoFormat("GetTransferToMp4 newFile [%v][%v] ", id, to)

	model := fileService.FindOne(id)
	if !utils.ExistsFiles(model.Path) {
		c.JSON(http.StatusOK, utils.NewFailByMsg("文件不存在"))
		return
	}
	from := utils.GetSuffux(model.Path)
	if to == "" {
		to = "mp4"
	}
	exists := false
	for _, taskModel := range cons.TransferTask {
		if taskModel.Path == model.Path && taskModel.Status != "执行失败" {
			exists = true
			break
		}
	}
	if exists {
		c.JSON(http.StatusOK, utils.NewFailByMsg("任务不可重复"))
		return
	} else {
		task := datamodels.NewTask(model.Path, model.Name, from, to)
		task.SetStatus("等待")
		cons.TransferTask[task.CreateTime] = task
		c.JSON(http.StatusOK, utils.NewSuccessByMsg("任务创建成功"))
	}

}

func GetCutMovie(c *gin.Context) {
	id := c.Param("id")
	start := c.Param("start")
	end := c.Param("end")
	fileService := service.CreateSearchService()
	utils.InfoFormat("GetTransferToMp4 newFile [%v][%v][%v] ", id, start, end)

	model := fileService.FindOne(id)
	if !utils.ExistsFiles(model.Path) {
		c.JSON(http.StatusOK, utils.NewFailByMsg("文件不存在"))
		return
	}
	from := utils.GetSuffux(model.Path)
	task := datamodels.NewCutTask(model.Path, model.Name, start, end, from)
	task.SetStatus("等待")
	cons.TransferTask[task.CreateTime] = task
	c.JSON(http.StatusOK, utils.NewSuccessByMsg("任务创建成功"))

}

func GetTransferTask(c *gin.Context) {
	result := utils.NewSuccess()
	result.Data = cons.TransferTask
	c.JSON(http.StatusOK, result)
}
