package service

import (
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/datasource"
	"searchGin/utils"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

type FileService struct {
	SearchService SearchService
}

func CreateFileService() FileService {
	searchService := CreateSearchService()
	return FileService{SearchService: searchService}
}

var noPic []byte
var contentType string

func (fileService *FileService) GetPng(c *gin.Context) {
	//path := c.Param("path")
	id := c.Param("path")
	file := fileService.SearchService.FindOne(id)
	if !file.IsNull() && utils.ExistsFiles(file.Png) {
		c.File(file.Png)
	} else if !file.IsNull() && utils.ExistsFiles(file.Jpg) {
		c.File(file.Jpg)
	} else if !file.IsNull() && utils.ExistsFiles(file.Gif) {
		c.File(file.Gif)
	} else {
		fileService.writeNoPic(c)
	}

}

func (fileService FileService) GetJpg(c *gin.Context) {
	//path := c.Param("path")
	id := c.Param("path")
	file := fileService.SearchService.FindOne(id)
	if !file.IsNull() && utils.ExistsFiles(file.Jpg) {
		c.File(file.Jpg)
	} else if !file.IsNull() && utils.ExistsFiles(file.Png) {
		c.File(file.Png)
	} else if !file.IsNull() && utils.ExistsFiles(file.Gif) {
		c.File(file.Gif)
	} else {
		fileService.writeNoPic(c)
	}

}

func (fileService FileService) GetFile(c *gin.Context) {
	id := c.Param("id")
	file := fileService.SearchService.FindOne(id)
	if utils.ExistsFiles(file.Path) {
		c.File(file.Path)
	} else {
		return
	}

}

// HeartBeat 心跳与定时
func (fileService FileService) HeartBeat() {
	var SearchService = CreateSearchService()
	go SearchService.ScanAll()
	time.AfterFunc(180*time.Second, fileService.HeartBeat)
}

// 无图流设置
func (fileService *FileService) writeNoPic(c *gin.Context) {
	if noPic == nil {
		response, err := http.Get("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.bianminchewu.com%2Fimgs%2F18%2F0804%2F1533370482927057.png&refer=http%3A%2F%2Fwww.bianminchewu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666008344&t=9da005a04a6c6209595f46dd05477c0f")
		if err != nil || response.StatusCode != http.StatusOK {
			c.Status(http.StatusServiceUnavailable)
			return
		}
		defer func(Body io.ReadCloser) {
			err := Body.Close()
			if err != nil {

			}
		}(response.Body)
		noPic, _ = io.ReadAll(response.Body)
		contentType = response.Header.Get("Content-Type")
	}
	c.Data(http.StatusOK, contentType, noPic)
}

// DeleteOne 删除指定文件夹下的 指定文件名的文件
func (fileService *FileService) DeleteOne(dirName string, fileName string) {
	if len(fileName) == 0 {
		return
	}
	files, _ := os.ReadDir(dirName)
	for _, f := range files {
		if strings.Contains(f.Name(), fileName) {
			path := dirName + utils.PathSeparator + f.Name()
			err := os.Remove(path)
			if err != nil {
				utils.InfoFormat("DeleteOne:[%v]", err)
			}
		}
	}
	// 删除父文件夹
	filesThen, _ := os.ReadDir(dirName)
	if len(filesThen) == 0 {
		fileService.UpDirClear(dirName)
	}

}

// DownDeleteDir 删除递归文件夹
func (fileService FileService) DownDeleteDir(dirname string) {
	files2, _ := os.ReadDir(dirname)
	if len(files2) > 0 {
		for _, ff := range files2 {
			path := dirname + utils.PathSeparator + ff.Name()
			if ff.IsDir() {
				fileService.DownDeleteDir(path)
			} else {
				err := os.Remove(path)
				if err != nil {
					return
				}
			}
		}
	}
	fileService.UpDirClear(dirname)

}

// UpDirClear 递归向上处理空文件夹
func (fileService FileService) UpDirClear(dirname string) {
	files2, _ := os.ReadDir(dirname)
	if len(files2) == 0 {
		err := os.Remove(dirname)
		if err != nil {
			utils.InfoFormat("%v", err)
		}
		newPath := dirname[0:strings.LastIndex(dirname, utils.PathSeparator)]
		fileService.UpDirClear(newPath)
	} else {
		return

	}

}

func GetIpAddr() string {
	conn, err := net.Dial("udp", "8.8.8.8:53")
	if err != nil {
		utils.InfoFormat("GetIpAddrError:%v \n\n", err)
		return "127.0.0.1"
	}
	localAddr := conn.LocalAddr().(*net.UDPAddr)
	ip := strings.Split(localAddr.String(), ":")[0]
	return ip
}

// Walks 并发扫描多文件夹 并返回所有文件
func (fileService *FileService) Walks(baseDir []string, types []string) []datamodels.Movie {

	var wg sync.WaitGroup
	var dataMovie = make(chan []datamodels.Movie, 20000)
	var scanTime = make(chan cons.MenuSize, 100)
	var result []datamodels.Movie
	dirSize := len(baseDir)
	cons.IndexDone = dirSize
	SearchEngin.Reset()
	wg.Add(dirSize)
	for i := 0; i < len(baseDir); i++ {
		go fileService.goWalk(baseDir[i], types, &wg, dataMovie, scanTime)
	}
	wg.Wait()
	close(dataMovie)
	close(scanTime)
	for {
		data, ok := <-dataMovie
		if !ok {
			break
		}
		result = utils.ExtendsItems(result, data)
	}
	cons.InitFolderTime()
	for {
		data, ok := <-scanTime
		if !ok {
			break
		}
		if data.Cnt > 0 {
			cons.FolderTime = append(cons.FolderTime, data)
		}

	}
	go SearchEngin.BuildActress()
	return result

}

// 协程方法 扫描单个文件夹并送入管道
func (fileService *FileService) goWalk(baseDir string, types []string, wg *sync.WaitGroup, datas chan []datamodels.Movie, scanTime chan cons.MenuSize) {
	defer wg.Done()
	start := time.Now()
	files, _ := fileService.WalkInnter(baseDir, types, 0, true, baseDir)
	datas <- files
	ti := time.Since(start)
	thisTime := cons.MenuSize{
		Name: baseDir,
		Cnt:  ti.Milliseconds(),
		Size: int64(len(files)),
	}
	scanTime <- thisTime
	SearchEngin.SetBucket(baseDir, datasource.NewInstanceWithFiles(baseDir, files))
	cons.IndexDone = cons.IndexDone - 1

}

// Walk 遍历目录 获取文件库
func (fileService *FileService) Walk(baseDir string, types []string, deep bool) []datamodels.Movie {
	var result []datamodels.Movie
	files, _ := os.ReadDir(baseDir)
	if len(files) > 0 {
		for _, path := range files {
			pathAbs := filepath.Join(baseDir, path.Name())
			if path.IsDir() && deep {
				childResult := fileService.Walk(pathAbs, types, deep)
				result = utils.ExtendsItems(result, childResult)
			} else {
				info, _ := path.Info()
				name := path.Name()
				suffix := utils.GetSuffux(name)
				movieType := utils.GetMovieType(name)
				if utils.HasItem(types, suffix) {
					file := datamodels.NewFile(baseDir, pathAbs, name, suffix, info.Size(), info.ModTime(), movieType, "")
					result = append(result, file)
				}

			}
		}
	} else {
		err := os.Remove(baseDir)
		if err != nil {
			utils.InfoFormat("os.Remove(baseDir):[%v]", err)
		}
	}

	return result
}

// WalkInnter 文件夹搜索
/**
baseDir 文件夹路径
types 扫描类型
totalSize 总数
queryChild 是否递归
*/
func (fileService *FileService) WalkInnter(currentDir string, types []string, totalSize int64, queryChild bool, basePath string) ([]datamodels.Movie, int64) {
	var result []datamodels.Movie
	currentSize := int64(0)
	files, _ := os.ReadDir(currentDir)
	if len(files) > 0 {
		for _, path := range files {

			pathAbs := filepath.Join(currentDir, path.Name())
			if path.IsDir() && queryChild {
				childResult, innerSize := fileService.WalkInnter(pathAbs, types, currentSize, queryChild, basePath)
				result = utils.ExtendsItems(result, childResult)
				currentSize += innerSize
			} else {
				name := path.Name()
				info, _ := path.Info()
				currentSize += info.Size()
				suffix := utils.GetSuffux(name)
				movieType := utils.GetMovieType(name)
				if utils.HasItem(types, suffix) {
					file := datamodels.NewFile(currentDir, pathAbs, name, suffix, info.Size(), info.ModTime(), movieType, basePath)
					result = append(result, file)
				}

			}
		}
	} else {
		emptyFile, er := os.Stat(currentDir)
		if er == nil && emptyFile.ModTime().Day() == (time.Now().Day()-1) {
			err := os.Remove(currentDir)
			if err != nil {
				utils.InfoFormat("os.Remove(currentDir):[%v]", err)
			}
		}

	}
	totalSize += currentSize
	if currentSize <= 20000000 && utils.IndexOf(cons.OSSetting.Dirs, currentDir) < 0 {

		cons.SmallDir = append(cons.SmallDir, cons.NewMenuSizeFold(currentDir, currentSize, true))
	}
	return result, currentSize
}

func (fileService *FileService) TaskExecuting() {
	var todos []datamodels.TransferTaskModel
	var todosCuts []datamodels.TransferTaskModel
	var todosMerges []datamodels.TransferTaskModel
	var executing []datamodels.TransferTaskModel
	var executingCuts []datamodels.TransferTaskModel
	var executingMerges []datamodels.TransferTaskModel
	for _, model := range cons.TransferTask {
		if strings.EqualFold(model.Status, "等待") {
			if strings.EqualFold(model.Type, "分切") {
				todosCuts = append(executing, model)
			} else if strings.EqualFold(model.Type, "合并") {
				todosMerges = append(executing, model)
			} else if strings.EqualFold(model.Type, "转码") {
				todos = append(executing, model)
			}
		}
		if strings.EqualFold(model.Status, "执行中") {
			if strings.EqualFold(model.Type, "分切") {
				executingCuts = append(executing, model)
			} else if strings.EqualFold(model.Type, "合并") {
				executingMerges = append(executing, model)
			} else if strings.EqualFold(model.Type, "转码") {
				executing = append(executing, model)
			}
		}

	}
	if len(executing) == 0 && len(todos) > 0 {
		go fileService.TransferFormatter(todos[0])
	}
	if len(executingCuts) == 0 && len(todosCuts) > 0 {
		go fileService.CutFormatter(todosCuts[0])
	}
	if len(executingMerges) == 0 && len(todosMerges) > 0 {
		go fileService.MergeFiles(todosMerges[0])
	}
	time.AfterFunc(2*time.Second, fileService.TaskExecuting)
}

func (fileService *FileService) TransferFormatter(model datamodels.TransferTaskModel) utils.Result {
	from := model.Path
	suffix := utils.GetSuffux(model.Path)
	dest := strings.ReplaceAll(model.Path, "."+suffix, "."+model.To)
	thisNow := model.CreateTime
	args := []string{"-i", from, "-vcodec", "copy", dest}
	res := fileService.ffmepgExec(args, thisNow)
	if res.IsSuccess() {
		err := os.Remove(model.Path)
		if err != nil {
			return utils.Result{}
		}
	}
	return res
}

func (fileService *FileService) MergeFiles(model datamodels.TransferTaskModel) utils.Result {
	thisNow := model.CreateTime
	args := []string{"-i", "concat:" + strings.Join(model.Files, "|"), "-vcodec", "copy", model.Dest}
	res := fileService.ffmepgExec(args, thisNow)
	if res.IsSuccess() && model.DeleteSource {
		err := os.Remove(model.Path)
		if err != nil {
			return utils.Result{}
		}
	}
	return res
}

// ./ffmpeg.exe -i  concat:"E:\\emby\\emby-rename\\[bbs.yzkof.com]JUC-911.1080P A[约战竞技场].mp4|E:\\emby\\emby-rename\\[bbs.yzkof.com]JUC-911.1080P B[约战竞技场].mp4|E:\\emby\\emby-rename\\[bbs.yzkof.com]JUC-911.1080P C[约战竞技场].mp4" -vcodec copy as.mp4

func (fileService *FileService) CutFormatter(model datamodels.TransferTaskModel) utils.Result {
	from := model.Path
	suffix := utils.GetSuffux(model.Path)
	toSuffix := "mkv"
	if suffix == "mkv" {
		toSuffix = "mp4"
	}
	dest := strings.ReplaceAll(model.Path, "."+suffix, "."+toSuffix)
	thisNow := model.CreateTime
	if !strings.Contains(from, "\\\\") && strings.Contains(from, "\\") {
		from = strings.ReplaceAll(from, "\\", "\\\\")
	}
	if !strings.Contains(dest, "\\\\") && strings.Contains(dest, "\\") {
		dest = strings.ReplaceAll(dest, "\\", "\\\\")
	}
	args := []string{"-i", from, "-ss", model.Start, "-t", model.End, "-c", "copy", dest}
	res := fileService.ffmepgExec(args, thisNow)
	if res.IsSuccess() {
		err := os.Remove(model.Path)
		if err != nil {
			return utils.Result{}
		}
	}
	return res

}

func (fileService *FileService) ffmepgExec(args []string, thisNow time.Time) utils.Result {
	task := cons.TransferTask[thisNow]
	task.SetStatus("执行中")
	task.CreateTime = time.Now()
	cons.TransferTask[thisNow] = task

	cmd := exec.Command("./ffmpeg.exe ", args...)
	if cmd != nil {
		if runtime.GOOS == "windows" {
			utils.FixOnWin(cmd)
		}
		out, cmdErr := cmd.CombinedOutput()
		if cmdErr != nil {
			task.SetStatus("执行失败")
			task.SetLog(string(out))
			task.FinishTime = time.Now()
			cons.TransferTask[thisNow] = task
			utils.InfoFormat("out:%v", string(out))
			utils.InfoFormat("cmdErr:%v", cmdErr)
			utils.InfoFormat("args:%v", args)
			res := utils.NewFailByMsg("转换失败")
			res.Data = cmdErr
			return res
		}
		task.SetStatus("成功")
		task.FinishTime = time.Now()
		task.SetLog(string(out))
		cons.TransferTask[thisNow] = task
		res := utils.NewSuccessByMsg("转换成功")
		res.Data = string(out)
		return res
	}
	task.SetStatus("执行失败")
	task.FinishTime = time.Now()
	cons.TransferTask[thisNow] = task
	return utils.NewFailByMsg("命令生成失败")

}
