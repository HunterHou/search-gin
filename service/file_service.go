package service

import (
	"fmt"
	"io/ioutil"
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
	"syscall"
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

func (fileService FileService) GetPng(c *gin.Context) {
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

// 心跳与定时
func (f *FileService) HeartBeat() {
	//time.After(1 * time.Second)
	// 启动扫描系统
	var fileService = CreateSearchService()
	fileService.ScanAll()
	// 启动转换执行任务
	f.TaskExecuting()
	time.AfterFunc(180*time.Second, f.HeartBeat)
}

// 无图流设置
func (f *FileService) writeNoPic(c *gin.Context) {
	if noPic == nil {
		response, err := http.Get("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.bianminchewu.com%2Fimgs%2F18%2F0804%2F1533370482927057.png&refer=http%3A%2F%2Fwww.bianminchewu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666008344&t=9da005a04a6c6209595f46dd05477c0f")
		if err != nil || response.StatusCode != http.StatusOK {
			c.Status(http.StatusServiceUnavailable)
			return
		}
		defer response.Body.Close()
		noPic, _ = ioutil.ReadAll(response.Body)
		contentType = response.Header.Get("Content-Type")
	}
	c.Data(http.StatusOK, contentType, noPic)
}

// 删除指定文件夹下的 指定文件名的文件
func (f *FileService) DeleteOne(dirName string, fileName string) {
	if len(fileName) == 0 {
		return
	}
	files, _ := ioutil.ReadDir(dirName)
	for _, f := range files {
		if strings.Contains(f.Name(), fileName) {
			path := dirName + utils.PathSeparator + f.Name()
			err := os.Remove(path)
			if err != nil {
				fmt.Fprint(gin.DefaultWriter, "delete:", err)
			}
		}
	}
	// 删除父文件夹
	filesThen, _ := ioutil.ReadDir(dirName)
	if len(filesThen) == 0 {
		f.UpDirClear(dirName)
	}

}

// 删除递归文件夹
func (f *FileService) DownDeleteDir(dirname string) {
	files2, _ := ioutil.ReadDir(dirname)
	if len(files2) > 0 {
		for _, ff := range files2 {
			path := dirname + utils.PathSeparator + ff.Name()
			if ff.IsDir() {
				f.DownDeleteDir(path)
			} else {
				os.Remove(path)
			}
		}
	}
	f.UpDirClear(dirname)

}

// 递归向上处理空文件夹
func (f *FileService) UpDirClear(dirname string) {
	files2, _ := ioutil.ReadDir(dirname)
	if len(files2) == 0 {
		err := os.Remove(dirname)
		if err != nil {
			fmt.Println(err)
		}
		newpath := dirname[0:strings.LastIndex(dirname, utils.PathSeparator)]
		f.UpDirClear(newpath)
	} else {
		return

	}

}

func GetIpAddr() string {
	conn, err := net.Dial("udp", "8.8.8.8:53")
	if err != nil {
		fmt.Fprint(gin.DefaultWriter, "GetIpAddr:", err)
		return "127.0.0.1"
	}
	localAddr := conn.LocalAddr().(*net.UDPAddr)
	// 192.168.1.20:61085
	ip := strings.Split(localAddr.String(), ":")[0]
	return ip
}

// 根据datasource map 更新datasource
func (f *FileService) fileMapUpdateFileListFromDatasource(dirPath string, targetFiles []datamodels.Movie) {
	// 声明新文件列表
	newList := []datamodels.Movie{}
	// 删除数据源map中指定文件夹的文件
	for _, v := range datasource.FileLib {
		if v.DirPath == dirPath {
			delete(datasource.FileLib, v.Id)
			datasource.FileSize -= v.Size
		} else {
			newList = append(newList, v)
		}
	}
	//添加新文件到 数据源map
	for _, value := range targetFiles {
		if val, ok := datasource.FileLib[value.Id]; !ok {
			datasource.FileLib[value.Id] = val
		}
		newList = append(newList, value)
		datasource.FileSize += value.Size
	}
	//排序
	datasource.SortMovieForce()
	datasource.FileList = newList

}

// 制作DataSource数据
func (f *FileService) makeDatasourceMap(files []datamodels.Movie) {
	fileMap, actressMap, _, fileSize := f.ArrayToMap(files)
	var newActress []datamodels.Actress
	for _, item := range actressMap {
		if item.Cnt > 1 {
			newActress = append(newActress, item)
		}

	}
	datasource.FileLib = fileMap
	datasource.FileList = files
	datasource.ActressLib = actressMap
	datasource.ActressList = newActress
	datasource.FileSize = fileSize
}

// 总文件 转不同数据模型
func (f *FileService) ArrayToMap(files []datamodels.Movie) (map[string]datamodels.Movie, map[string]datamodels.Actress, map[string]datamodels.Supplier, int64) {
	filemap := make(map[string]datamodels.Movie)
	filemapCount := make(map[string]int)
	actessmap := make(map[string]datamodels.Actress)
	suppliermap := make(map[string]datamodels.Supplier)
	var size int64
	var toInsert []datamodels.Movie
	for i := 0; i < len(files); i++ {
		curFile := files[i]
		cons.TypeSizePlus(curFile.MovieType, curFile.Size)
		if len(curFile.Tags) > 0 {
			for i := 0; i < len(curFile.Tags); i++ {
				cons.TagSizePlus(curFile.Tags[i], curFile.Size)
			}

		}
		size = size + curFile.Size
		_, ok := filemap[curFile.Id]
		if ok {
			//重名处理
			count := filemapCount[curFile.Id]
			count++
			curFile.SetId(utils.PKId(curFile.Path + fmt.Sprintf("repeat(%d)", count)))
			filemap[curFile.Id] = curFile
			toInsert = append(toInsert, curFile)
		} else {
			filemap[curFile.Id] = curFile
			filemapCount[curFile.Id] = 1

			toInsert = append(toInsert, curFile)
		}

		curActress, ok := actessmap[curFile.Actress]
		if ok {
			curActress.PlusCnt()
			curActress.PlusSize(curFile.Size)
			curActress.AddImage(curFile.Png)
			curActress.AddImage(curFile.Jpg)
			actessmap[curFile.Actress] = curActress
		} else {
			actessmap[curFile.Actress] = datamodels.NewActres(curFile.Actress, curFile.Png, curFile.Size)
		}
		curSupplier, okS := suppliermap[curFile.Supplier]
		if okS {
			curSupplier.Plus()
			suppliermap[curFile.Supplier] = curSupplier
		} else {
			suppliermap[curFile.Supplier] = datamodels.NewSupplier(curFile.Supplier)
		}

	}
	if cons.OSSetting.IsDb {
		db := CreateOrmService()
		go db.InsertAllIndex(toInsert)
	}
	return filemap, actessmap, suppliermap, size
}

// 合并文件数组
func ExpandsMovie(originArr []datamodels.Movie, insertArr []datamodels.Movie) []datamodels.Movie {
	if len(insertArr) == 0 {
		return originArr
	}

	for i := 0; i < len(insertArr); i++ {
		originArr = append(originArr, insertArr[i])
	}
	return originArr
}

// 并发扫描多文件夹 并返回所有文件
func (f *FileService) Walks(baseDir []string, types []string) []datamodels.Movie {

	var wg sync.WaitGroup
	var dataMovie = make(chan []datamodels.Movie, 20000)
	var scanTime = make(chan cons.MenuSize, 100)
	var result []datamodels.Movie
	wg.Add(len(baseDir))
	for i := 0; i < len(baseDir); i++ {
		go f.goWalk(baseDir[i], types, &wg, dataMovie, scanTime)
	}
	wg.Wait()
	close(dataMovie)
	close(scanTime)
	for {
		data, ok := <-dataMovie
		if !ok {
			break
		}
		result = ExpandsMovie(result, data)
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
	return result

}

// 协程方法 扫描单个文件夹并送入管道
func (f *FileService) goWalk(baseDir string, types []string, wg *sync.WaitGroup, datas chan []datamodels.Movie, scanTime chan cons.MenuSize) {
	defer wg.Done()
	start := time.Now()
	files, _ := f.WalkInnter(baseDir, types, 0, true, baseDir)
	datas <- files
	ti := time.Since(start)
	thisTime := cons.MenuSize{
		Name: baseDir,
		Cnt:  int64(ti.Milliseconds()),
		Size: int64(len(files)),
	}
	scanTime <- thisTime

}

// Walk 遍历目录 获取文件库
func (f *FileService) Walk(baseDir string, types []string, deep bool) []datamodels.Movie {
	var result []datamodels.Movie
	files, _ := ioutil.ReadDir(baseDir)
	if len(files) > 0 {
		for _, path := range files {
			pathAbs := filepath.Join(baseDir, path.Name())
			if path.IsDir() && deep {
				childResult := f.Walk(pathAbs, types, deep)
				result = ExpandsMovie(result, childResult)
			} else {
				name := path.Name()
				suffix := utils.GetSuffux(name)
				movieType := utils.GetMovieType(name)
				if utils.HasItem(types, suffix) {
					file := datamodels.NewFile(baseDir, pathAbs, name, suffix, path.Size(), path.ModTime(), movieType, "")
					result = append(result, file)
				}

			}
		}
	} else {
		os.Remove(baseDir)
	}

	return result
}

//文件夹搜索
/**
baseDir 文件夹路径
types 扫描类型
totalSize 总数
queryChild 是否递归
*/
func (f *FileService) WalkInnter(currentDir string, types []string, totalSize int64, queryChild bool, basePath string) ([]datamodels.Movie, int64) {
	var result []datamodels.Movie
	currentSize := int64(0)
	files, _ := ioutil.ReadDir(currentDir)
	if len(files) > 0 {
		for _, path := range files {

			pathAbs := filepath.Join(currentDir, path.Name())
			if path.IsDir() && queryChild {
				childResult, innerSize := f.WalkInnter(pathAbs, types, currentSize, queryChild, basePath)
				result = ExpandsMovie(result, childResult)
				currentSize += innerSize
			} else {
				name := path.Name()
				currentSize += path.Size()
				suffix := utils.GetSuffux(name)
				movieType := utils.GetMovieType(name)
				if utils.HasItem(types, suffix) {
					file := datamodels.NewFile(currentDir, pathAbs, name, suffix, path.Size(), path.ModTime(), movieType, basePath)
					result = append(result, file)
				}

			}
		}
	} else {
		emptyFile, er := os.Stat(currentDir)
		if er == nil && emptyFile.ModTime().Day() == (time.Now().Day()-1) {
			os.Remove(currentDir)
		}

	}
	totalSize += currentSize
	if currentSize <= 20000000 && utils.IndexOf(cons.OSSetting.Dirs, currentDir) < 0 {

		cons.SmallDir = append(cons.SmallDir, cons.NewMenuSizeFold(currentDir, int64(currentSize), true))
	}
	return result, currentSize
}

func (f *FileService) TaskExecuting() {
	//time.After(1 * time.Second)
	var todos []datamodels.TransferTaskModel
	var todosCuts []datamodels.TransferTaskModel
	var executing []datamodels.TransferTaskModel
	var executingCuts []datamodels.TransferTaskModel
	for _, model := range cons.TransferTask {
		if strings.EqualFold(model.Status, "等待") {
			if strings.EqualFold(model.Type, "分切") {
				todosCuts = append(executing, model)
			} else {
				todos = append(executing, model)
			}
		}
		if strings.EqualFold(model.Status, "执行中") {
			if strings.EqualFold(model.Type, "分切") {
				executingCuts = append(executing, model)
			} else {
				executing = append(executing, model)
			}

		}

	}
	if len(executing) == 0 && len(todos) > 0 {
		go f.TransferFormatter(todos[0])
	}
	if len(executingCuts) == 0 && len(todosCuts) > 0 {
		go f.CutFormatter(todosCuts[0])
	}
	time.AfterFunc(2*time.Second, f.TaskExecuting)
}

func (f *FileService) TransferFormatter(model datamodels.TransferTaskModel) utils.Result {
	from := model.Path
	suffix := utils.GetSuffux(model.Path)
	dest := strings.ReplaceAll(model.Path, "."+suffix, "."+model.To)
	thisNow := model.CreateTime
	args := []string{"-i", from, "-vcodec", "copy", dest}
	res := f.ffmepgExec(args, thisNow)
	if res.IsSuccess() {
		os.Remove(model.Path)
	}
	return res
}

func (f *FileService) CutFormatter(model datamodels.TransferTaskModel) utils.Result {
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
	res := f.ffmepgExec(args, thisNow)
	if res.IsSuccess() {
		os.Remove(model.Path)
	}
	return res

}

func (f *FileService) ffmepgExec(args []string, thisNow time.Time) utils.Result {
	task := cons.TransferTask[thisNow]
	task.SetStatus("执行中")
	task.CreateTime = time.Now()
	cons.TransferTask[thisNow] = task

	cmd := exec.Command("./ffmpeg.exe ", args...)
	if cmd != nil {
		if runtime.GOOS == "windows" {
			cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		}
		out, cmdErr := cmd.CombinedOutput()
		if cmdErr != nil {
			task.SetStatus("执行失败")
			task.SetLog(string(out))
			task.FinishTime = time.Now()
			cons.TransferTask[thisNow] = task
			fmt.Fprint(gin.DefaultWriter, "out:", string(out))
			fmt.Fprint(gin.DefaultWriter, "cmdErr:", cmdErr)
			fmt.Fprint(gin.DefaultWriter, "args:", args)
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
