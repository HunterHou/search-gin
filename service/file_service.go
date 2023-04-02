package service

import (
	"fmt"
	"github.com/goccy/go-json"
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

var noPic []byte
var contentType string

var this = CreateFileService()

// 心跳与定时
func HeartBeat() {
	//time.After(1 * time.Second)
	// 启动扫描系统
	this.ScanAll()
	// 启动转换执行任务
	TaskExecuting()
	// time.AfterFunc(180*time.Second, HeartBeat)
}

// 无图流设置
func writeNoPic(c *gin.Context) {

	if noPic == nil {
		// response, err := http.Get("https://images-cn.ssl-images-amazon.cn/images/I/613FYYzEjGL._AC_SX679_.jpg")
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
func DeleteOne(dirName string, fileName string) {
	if len(fileName) == 0 {
		return
	}
	files, _ := ioutil.ReadDir(dirName)
	for _, f := range files {
		if strings.Contains(f.Name(), fileName) {
			path := dirName + utils.PathSeparator + f.Name()
			err := os.Remove(path)
			if err != nil {
				fmt.Println(err)
			}
		}
	}
	// 删除父文件夹
	filesThen, _ := ioutil.ReadDir(dirName)
	if len(filesThen) == 0 {
		UpDirClear(dirName)
	}

}

// 删除递归文件夹
func DownDeleteDir(dirname string) {
	files2, _ := ioutil.ReadDir(dirname)
	if len(files2) > 0 {
		for _, ff := range files2 {
			path := dirname + utils.PathSeparator + ff.Name()
			if ff.IsDir() {
				DownDeleteDir(path)
			} else {
				os.Remove(path)
			}
		}
	}
	UpDirClear(dirname)

}

// 递归向上处理空文件夹
func UpDirClear(dirname string) {
	files2, _ := ioutil.ReadDir(dirname)
	if len(files2) == 0 {
		err := os.Remove(dirname)
		if err != nil {
			fmt.Println(err)
		}
		newpath := dirname[0:strings.LastIndex(dirname, utils.PathSeparator)]
		UpDirClear(newpath)
	} else {
		return

	}

}

func GetIpAddr() string {
	conn, err := net.Dial("udp", "8.8.8.8:53")
	if err != nil {
		fmt.Println(err)
		return "127.0.0.1"
	}
	localAddr := conn.LocalAddr().(*net.UDPAddr)
	// 192.168.1.20:61085
	ip := strings.Split(localAddr.String(), ":")[0]
	return ip
}

// 根据datasource map 更新datasource
func fileMapUpdateFileListFromDatasource(dirPath string, targetFiles []datamodels.Movie) {
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
func makeDatasourceMap(files []datamodels.Movie) {
	fileMap, actressMap, _, fileSize := ArrayToMap(files)
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
func ArrayToMap(files []datamodels.Movie) (map[string]datamodels.Movie, map[string]datamodels.Actress, map[string]datamodels.Supplier, int64) {
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
	db := CreateOrmService()
	go db.InsertAllIndex(toInsert)
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

// func ExpandsActess(originArr []datamodels.Actress, insertArr []datamodels.Actress) []datamodels.Actress {
// 	if len(insertArr) == 0 {
// 		return originArr
// 	}

// 	for i := 0; i < len(insertArr); i++ {
// 		originArr = append(originArr, insertArr[i])
// 	}
// 	return originArr
// }

// func ExpandsSupplier(originArr []datamodels.Supplier, insertArr []datamodels.Supplier) []datamodels.Supplier {
// 	if len(insertArr) == 0 {
// 		return originArr
// 	}

// 	for i := 0; i < len(insertArr); i++ {
// 		originArr = append(originArr, insertArr[i])
// 	}
// 	return originArr
// }

// 并发扫描多文件夹 并返回所有文件
func Walks(baseDir []string, types []string) []datamodels.Movie {

	var wg sync.WaitGroup
	var dataMovie = make(chan []datamodels.Movie, 10000)
	var scanTime = make(chan cons.MenuSize, 100)
	var result []datamodels.Movie
	wg.Add(len(baseDir))
	for i := 0; i < len(baseDir); i++ {
		go goWalk(baseDir[i], types, &wg, dataMovie, scanTime)
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
func goWalk(baseDir string, types []string, wg *sync.WaitGroup, datas chan []datamodels.Movie, scanTime chan cons.MenuSize) {
	defer wg.Done()
	start := time.Now()
	files, _ := WalkInnter(baseDir, types, 0, true)
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
func Walk(baseDir string, types []string, deep bool) []datamodels.Movie {
	var result []datamodels.Movie
	files, _ := ioutil.ReadDir(baseDir)
	if len(files) > 0 {
		for _, path := range files {
			pathAbs := filepath.Join(baseDir, path.Name())
			if path.IsDir() && deep {
				childResult := Walk(pathAbs, types, deep)
				result = ExpandsMovie(result, childResult)
			} else {
				name := path.Name()
				suffix := utils.GetSuffux(name)
				movieType := utils.GetMovieType(name)
				if utils.HasItem(types, suffix) {
					file := datamodels.NewFile(baseDir, pathAbs, name, suffix, path.Size(), path.ModTime(), movieType)
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
func WalkInnter(baseDir string, types []string, totalSize int64, queryChild bool) ([]datamodels.Movie, int64) {
	var result []datamodels.Movie
	currentSize := int64(0)
	files, _ := ioutil.ReadDir(baseDir)
	if len(files) > 0 {
		for _, path := range files {

			pathAbs := filepath.Join(baseDir, path.Name())
			if path.IsDir() && queryChild {
				childResult, innerSize := WalkInnter(pathAbs, types, currentSize, queryChild)
				result = ExpandsMovie(result, childResult)
				currentSize += innerSize
			} else {
				name := path.Name()
				currentSize += path.Size()
				suffix := utils.GetSuffux(name)
				movieType := utils.GetMovieType(name)
				if utils.HasItem(types, suffix) {
					file := datamodels.NewFile(baseDir, pathAbs, name, suffix, path.Size(), path.ModTime(), movieType)
					result = append(result, file)
				}

			}
		}
	} else {
		emptyFile, er := os.Stat(baseDir)
		if er == nil && emptyFile.ModTime().Day() == (time.Now().Day()-1) {
			os.Remove(baseDir)
		}

	}
	totalSize += currentSize
	if currentSize <= 20000000 && utils.IndexOf(cons.OSSetting.Dirs, baseDir) < 0 {

		cons.SmallDir = append(cons.SmallDir, cons.NewMenuSizeFold(baseDir, int64(currentSize), true))
	}
	return result, currentSize
}

func TaskExecuting() {
	//time.After(1 * time.Second)
	var todos []datamodels.TransferTaskModel
	var executing []datamodels.TransferTaskModel
	for _, model := range cons.TransferTask {
		if strings.EqualFold(model.Status, "等待") {
			todos = append(todos, model)
		}
		if strings.EqualFold(model.Status, "执行中") {
			executing = append(executing, model)
		}

	}
	if len(executing) == 0 && len(todos) > 0 {
		go TransferFormatter(todos[0])
	}
	time.AfterFunc(2*time.Second, TaskExecuting)
}

func TransferFormatter(model datamodels.TransferTaskModel) utils.Result {
	from := model.Path
	dest := strings.ReplaceAll(model.Path, "."+model.From, "."+model.To)
	thisNow := model.CreateTime
	res := transferFormatterBackground(from, dest, thisNow)
	if res.IsSuccess() {
		fmt.Println(json.Marshal(res))
		os.Remove(model.Path)
	}
	return res
}

func transferFormatterBackground(from string, to string, thisNow time.Time) utils.Result {
	task := cons.TransferTask[thisNow]
	task.SetStatus("执行中")
	task.CreateTime = time.Now()
	cons.TransferTask[thisNow] = task
	args := []string{"-i", from, "-vcodec", "copy", to}
	cmd := exec.Command("./ffmpeg.exe", args...)
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
			fmt.Println(cmdErr)
			fmt.Println(string(out))
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
