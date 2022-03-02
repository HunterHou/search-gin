package service

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/datasource"
	"search-gin/utils"
	"sort"
	"strconv"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"

	"github.com/PuerkitoBio/goquery"
)

type FileService struct {
}

func CreateFileService() FileService {
	return FileService{}
}

func (fs FileService) SearchIndex(searchParam datamodels.SearchParam) utils.Page {
	db := CreateOrmService()
	result := utils.NewPage()
	result.TotalCnt = len(datasource.FileLib)
	result.PageNo = searchParam.Page
	result.PageSize = searchParam.PageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)

	pageList, pageSize := db.query(searchParam)
	searchCount, searchSize := db.queryCount(searchParam)
	result.ResultSize = utils.GetSizeStr(searchSize)
	result.SetResultCnt(int(searchCount), searchParam.Page)
	result.CurSize = utils.GetSizeStr(pageSize)
	result.CurCnt = len(pageList)
	fmt.Printf("query over :searchCnt[%d] searchSize [%d]", searchCount, searchSize)
	result.Data = pageList
	return result

}

func (fs FileService) SearchDataSource(searchParam datamodels.SearchParam) utils.Page {

	result := utils.NewPage()
	result.SetProgress(cons.OverIndex())
	if len(datasource.FileList) == 0 {
		fs.ScanAll()
		datasource.SortDataSourceMovies(searchParam.SortField, searchParam.SortType, true)
	}
	datasource.SortDataSourceMovies(searchParam.SortField, searchParam.SortType, false)
	dataSource := datasource.FileList

	if searchParam.OnlyRepeat {
		dataSource = fs.OnlyRepeat(dataSource)
	}

	searchList, searchSize := fs.SearchByKeyWord(dataSource, datasource.FileSize, searchParam.Keyword, searchParam.MovieType)
	result.TotalCnt = len(searchList)
	result.PageSize = searchParam.PageSize
	result.TotalSize = utils.GetSizeStr(datasource.FileSize)
	result.ResultSize = utils.GetSizeStr(searchSize)
	result.SetResultCnt(result.TotalCnt, searchParam.Page)
	pageList, pageSize := fs.GetPage(searchList, searchParam.Page, searchParam.PageSize)

	result.CurSize = utils.GetSizeStr(pageSize)
	result.CurCnt = len(searchList)
	result.Data = pageList
	return result

}

func (fs FileService) SetMovieType(movie datamodels.Movie, movieType string) utils.Result {

	//video
	if movie.MovieType != "" {
		originVideoType := utils.GetMovieType(movie.Path)
		if originVideoType == movieType {
			return utils.NewSuccessByMsg("执行成功")
		}
		path := strings.ReplaceAll(movie.Path, originVideoType, movieType)
		os.Rename(movie.Path, path)
		path = strings.ReplaceAll(movie.Jpg, originVideoType, movieType)
		os.Rename(movie.Jpg, path)
		path = strings.ReplaceAll(movie.Png, originVideoType, movieType)
		os.Rename(movie.Png, path)
		path = strings.ReplaceAll(movie.Nfo, originVideoType, movieType)
		os.Rename(movie.Nfo, path)
		return utils.NewSuccessByMsg("执行成功")
	}
	newMovieType := "{{" + movieType + "}}"
	fmt.Println(movieType)
	suffix := "." + utils.GetSuffux(movie.Path)
	newSuffix := newMovieType + suffix
	newName := strings.ReplaceAll(movie.Path, suffix, newSuffix)
	os.Rename(movie.Path, newName)
	//png
	if utils.ExistsFiles(movie.Png) {
		suffix = "." + utils.GetSuffux(movie.Png)
		newSuffix = newMovieType + suffix
		newName = strings.ReplaceAll(movie.Png, suffix, newSuffix)
		os.Rename(movie.Png, newName)
	}

	//ssr
	// if utils.ExistsFiles(movie.Png) {
	// 	suffix = "." + utils.GetSuffux(movie.Png)
	// newSuffix = newMovieType + suffix
	// newName = strings.ReplaceAll(movie.Png, suffix, newSuffix)
	// os.Rename(movie.Png, newName)
	// }

	//jpg
	if utils.ExistsFiles(movie.Jpg) {
		suffix = "." + utils.GetSuffux(movie.Jpg)
		newSuffix = newMovieType + suffix
		newName = strings.ReplaceAll(movie.Jpg, suffix, newSuffix)
		os.Rename(movie.Jpg, newName)
	}

	//nfo
	if utils.ExistsFiles(movie.Nfo) {
		suffix = "." + utils.GetSuffux(movie.Nfo)
		newSuffix = newMovieType + suffix
		newName = strings.ReplaceAll(movie.Nfo, suffix, newSuffix)
		os.Rename(movie.Nfo, newName)

	}
	return utils.NewSuccessByMsg("执行成功")
}

func (fs FileService) MoveCut(srcFile datamodels.Movie, toFile datamodels.Movie) utils.Result {
	result := utils.Result{}
	root := srcFile.DirPath
	path := root + "\\" + toFile.Actress
	if toFile.Studio != "" {
		path = path + "\\" + toFile.Studio
	}
	title := toFile.Title
	title = strings.ReplaceAll(title, ":", "~")
	title = strings.ReplaceAll(title, ".", "~")

	dirname := "[" + toFile.Actress + "][" + toFile.Code + "]" + title
	dirpath := path + "\\" + dirname
	os.MkdirAll(dirpath, os.ModePerm)
	filename := dirname + "." + utils.GetSuffux(srcFile.Path)
	finalpath := dirpath + "\\" + filename
	jpgpath := utils.GetPng(finalpath, "jpg")
	nfopath := utils.GetPng(finalpath, "nfo")
	jpgOut, createErr := os.Create(jpgpath)
	if createErr != nil {
		//TODO 创建失败  标题 特殊字符处理 改为 演员+番号
		dirname = "[" + toFile.Actress + "][" + toFile.Code + "]"
		dirpath = path + "\\" + dirname
		os.MkdirAll(dirpath, os.ModePerm)
		filename = dirname + "." + utils.GetSuffux(srcFile.Path)
		finalpath = dirpath + "\\" + filename
		jpgpath = utils.GetPng(finalpath, "jpg")
		jpgOut, createErr = os.Create(jpgpath)
		if createErr != nil {
			result.Fail()
			fmt.Println("createErr:", createErr)
			os.Rename(finalpath, srcFile.Path)
			result.Message = "文件创建失败：" + jpgpath
			return result
		}
	}
	url := toFile.Jpg
	if !strings.Contains(url, cons.OSSetting.BaseUrl) {
		url = cons.OSSetting.BaseUrl + url
	}
	fmt.Println(url)
	resp, downErr := httpGet(url)
	if downErr != nil {
		result.Fail()
		fmt.Println("downErr:", downErr)
		os.Rename(finalpath, srcFile.Path)
		result.Message = "文件下载失败：" + toFile.Jpg
		return result
	}
	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		result.Fail()
		fmt.Println("readErr:", readErr)
		os.Rename(finalpath, srcFile.Path)
		result.Message = "请求读取response失败"
		return result
	}
	jpgOut.Write(body)
	jpgOut.Close()
	pngErr := utils.ImageToPng(jpgpath)
	if pngErr != nil {
		result.Fail()
		fmt.Println("pngErr:", pngErr)
		os.Rename(finalpath, srcFile.Path)
		result.Message = "png生成失败"
		return result
	}
	os.Rename(srcFile.Path, finalpath)
	toFile.Jpg = jpgpath
	toFile.Nfo = nfopath
	toFile.Png = utils.GetPng(finalpath, "png")
	fs.MakeNfo(toFile)
	result.Success()
	result.Message = "【" + dirname + "】" + result.Message
	return result
}

func (fs FileService) DownImage(toFile datamodels.Movie) utils.Result {
	if len(toFile.ImageList) <= 0 {
		return utils.NewFailByMsg("No Image avaliable")
	}
	var wg sync.WaitGroup
	wg.Add(1)
	wg.Add(len(toFile.ImageList))

	jpgUrl := toFile.JpgUrl
	if !strings.HasPrefix(jpgUrl, "http") {
		jpgUrl = cons.OSSetting.BaseUrl + strings.Replace(jpgUrl, "/", "", 1)
	}
	go downImageItem(jpgUrl, toFile.DirPath, toFile.Actress, "", &wg)
	for i := 0; i < len(toFile.ImageList); i++ {
		go downImageItem(toFile.ImageList[i], toFile.DirPath, toFile.Code, fmt.Sprintf("%d", i), &wg)
	}
	wg.Wait()
	return utils.NewSuccessByMsg("下载完成!")

}

func downImageItem(url string, dirPath string, prefix string, sufix string, wg *sync.WaitGroup) utils.Result {
	defer wg.Done()
	result := utils.NewResult()
	filepath := dirPath + "\\" + prefix
	if len(sufix) > 0 {
		filepath = filepath + "-" + sufix + ".jpg"
	}
	filepath = filepath + ".jpg"
	fmt.Println(filepath)
	jpgOut, createErr := os.Create(filepath)
	if createErr != nil {
		result.Message = "png生成失败"
		return result
	}
	defer jpgOut.Close()
	resp, downErr := httpGet(url)
	if downErr != nil {
		result.Fail()
		fmt.Println("downErr:", downErr)
		result.Message = "文件下载失败：" + url
		return result
	}
	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		result.Fail()
		fmt.Println("readErr:", readErr)
		result.Message = "请求读取response失败"
		return result
	}
	jpgOut.Write(body)
	jpgOut.Close()
	resp.Body.Close()
	return result
}

func (fs FileService) MakeNfo(toFile datamodels.Movie) {
	nfo, _ := os.Create(toFile.Nfo)
	defer nfo.Close()
	nfoStr := "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?> \n"
	nfoStr += "<movie>\n"
	nfoStr += "<year>" + toFile.PTime + "</year>\n"
	nfoStr += "<title>" + toFile.Title + "</title>\n"
	nfoStr += "<releasedate>" + toFile.PTime + "</releasedate>\n"
	nfoStr += "<runtime>" + toFile.PTime + "</runtime>\n"
	nfoStr += "<poster>" + toFile.Jpg + "</poster>\n"
	nfoStr += "<thumb>" + toFile.Jpg + "</thumb>\n"
	nfoStr += "<fanart>" + toFile.Jpg + "</fanart>\n"
	nfoStr += "<maker>" + toFile.Supplier + "</maker>\n"
	nfoStr += "<studio>" + toFile.Studio + "</studio>\n"
	nfoStr += "<num>" + toFile.Code + "</num>\n"
	nfoStr += "<release>" + toFile.PTime + "</release>\n"
	nfoStr += "<cover>" + toFile.Jpg + ".jpg" + "</cover>\n"
	nfoStr += "<art>"
	nfoStr += "<poster>" + toFile.Png + "</poster>\n"
	nfoStr += "</art>"
	nfoStr += "<actor>"
	nfoStr += "<name>" + toFile.Actress + "</name>\n"
	nfoStr += "<type>Actor</type>\n"
	nfoStr += "</actor>\n"
	nfoStr += "<year>" + toFile.PTime + "</year>\n"
	nfoStr += "</movie>\n"
	nfo.WriteString(nfoStr)
}

func httpGet(url string) (*http.Response, error) {

	request, _ := http.NewRequest("GET", url, nil)
	request.Header.Add("User-Agent", "Mozilla/6.0")
	client := &http.Client{}
	resp, err := client.Do(request)
	return resp, err

}

func isOM(name string) bool {
	return strings.Contains(name, "斯巴达")
}

func (fs FileService) RequestToFile(srcFile datamodels.Movie) (utils.Result, datamodels.Movie) {

	result := utils.Result{}
	newFile := datamodels.Movie{}
	if srcFile.Code == "" {
		result.Fail()
		return result, newFile
	}
	url := cons.OSSetting.BaseUrl + srcFile.Code
	if isOM(srcFile.Name) {
		url = cons.OSSetting.OMUrl + srcFile.Code
		url = strings.ReplaceAll(url, "{{斯巴达}}", "")
	}

	resp, err := httpGet(url)
	if err != nil {
		fmt.Println("err", err)
		result.Fail()
		return result, newFile
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		if strings.Contains(url, "_") {
			url = strings.ReplaceAll(url, "_", "-")
		} else if strings.Contains(url, "-") {
			url = strings.ReplaceAll(url, "-", "_")
		}
		fmt.Println(url)
		resp, _ = httpGet(url)
		if resp.StatusCode != 200 {
			fmt.Println("status error:", resp.StatusCode, resp.Status)
			result.Fail()
			result.Message = "请求失败：" + resp.Status + " url:" + url
			return result, newFile
		}

	}
	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		result.Fail()
		result.Message = "html解析失败"
		fmt.Println("err:", err)
	}
	bigImage := doc.Find(".bigImage img")

	newFile.Id = srcFile.Id
	newFile.Title = bigImage.AttrOr("title", "")
	newFile.Jpg = bigImage.AttrOr("src", "")
	info := doc.Find(".header")
	info.Each(func(i int, selection *goquery.Selection) {
		item := selection.Text()
		if strings.HasPrefix(item, "發行日期:") {
			newFile.PTime = selection.Parent().Text()
			newFile.PTime = strings.Replace(newFile.PTime, "發行日期:", "", 1)
		} else if strings.HasPrefix(item, "長度:") {
			newFile.Length = selection.Parent().Text()
			newFile.Length = strings.Replace(newFile.Length, "長度:", "", 1)
		} else if strings.HasPrefix(item, "演員") {
			stars := doc.Find(".star-name")
			stars.Each(func(i int, selection *goquery.Selection) {
				starName := selection.Text()
				newFile.Actress += strings.TrimSpace(starName)
			})
		} else if strings.HasPrefix(item, "導演:") {
			newFile.Director = selection.Next().Text()
		} else if strings.HasPrefix(item, "製作商:") {
			newFile.Supplier = selection.Next().Text()
		} else if strings.HasPrefix(item, "發行商:") {
			newFile.Studio = selection.Next().Text()
		} else if strings.HasPrefix(item, "系列:") {
			newFile.Series = selection.Next().Text()
		} else if strings.HasPrefix(item, "識別碼:") {
			newFile.Code = selection.Next().Text()
		}
	})
	waterFall := doc.Find(".sample-box")
	var imageList = []string{}
	waterFall.Each(func(i int, selection *goquery.Selection) {
		item := selection.AttrOr("href", "")
		if len(item) > 0 {
			imageList = append(imageList, item)
		}

	})
	newFile.ImageList = imageList
	result.Success()
	result.Data = newFile
	return result, newFile
}

func (fs FileService) FindOne(Id int64) datamodels.Movie {
	if cons.IndexOver {
		db := CreateOrmService()
		return db.Find(Id)
	}
	if len(datasource.FileLib) == 0 {
		fs.ScanAll()
	}
	curFile := datasource.FileLib[Id]
	return curFile
}

func (fs FileService) GetPng(c *gin.Context) {
	//path := c.Param("path")
	id, _ := strconv.Atoi(c.Param("path"))
	file := fs.FindOne(int64(id))
	if !file.IsNull() && utils.ExistsFiles(file.Png) {
		c.File(file.Png)
	} else if !file.IsNull() && utils.ExistsFiles(file.Jpg) {
		c.File(file.Jpg)
	} else {
		writeNoPic(c)
	}

}

func (fs FileService) GetJpg(c *gin.Context) {
	//path := c.Param("path")
	id, _ := strconv.Atoi(c.Param("path"))
	file := fs.FindOne(int64(id))
	if !file.IsNull() && utils.ExistsFiles(file.Jpg) {
		c.File(file.Jpg)
	} else if !file.IsNull() && utils.ExistsFiles(file.Png) {
		c.File(file.Png)
	} else {
		writeNoPic(c)
	}

}
func writeNoPic(c *gin.Context) {
	response, err := http.Get("https://images-cn.ssl-images-amazon.cn/images/I/613FYYzEjGL._AC_SX679_.jpg")
	if err != nil || response.StatusCode != http.StatusOK {
		c.Status(http.StatusServiceUnavailable)
		return
	}

	reader := response.Body
	defer reader.Close()
	contentLength := response.ContentLength
	contentType := response.Header.Get("Content-Type")

	extraHeaders := map[string]string{
		"Content-Disposition": `jpeg; filename="gopher.png"`,
	}

	c.DataFromReader(http.StatusOK, contentLength, contentType, reader, extraHeaders)
}

func (fs FileService) Rename(movie datamodels.Movie) utils.Result {
	res := utils.NewSuccess()
	movieLib := fs.FindOne(movie.Id)
	if movieLib.IsNull() {
		res.FailByMsg("数据不存在")
		return res
	}
	oldPath := movieLib.Path
	if !utils.ExistsFiles(oldPath) {
		res.FailByMsg("文件不存在")
		return res
	}
	newPath := movieLib.DirPath + "\\" + movie.Name
	err := os.Rename(oldPath, newPath)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		res.FailByMsg("执行失败")
		return res
	}

	//png
	targetSuffix := ".png"
	suffix := "." + utils.GetSuffux(oldPath)
	oldPath = strings.ReplaceAll(oldPath, suffix, targetSuffix)
	newPath = strings.ReplaceAll(newPath, suffix, targetSuffix)
	if utils.ExistsFiles(oldPath) {
		os.Rename(oldPath, newPath)
	}

	//jpg
	targetSuffix = ".jpg"
	suffix = "." + utils.GetSuffux(oldPath)
	oldPath = strings.ReplaceAll(oldPath, suffix, targetSuffix)
	newPath = strings.ReplaceAll(newPath, suffix, targetSuffix)
	if utils.ExistsFiles(oldPath) {
		os.Rename(oldPath, newPath)
	}

	//nfo
	targetSuffix = ".nfo"
	suffix = "." + utils.GetSuffux(oldPath)
	oldPath = strings.ReplaceAll(oldPath, suffix, targetSuffix)
	newPath = strings.ReplaceAll(newPath, suffix, targetSuffix)
	if utils.ExistsFiles(oldPath) {
		os.Rename(oldPath, newPath)
	}

	return res
}

func (fs FileService) FindNext(Id int64, sourceLib []datamodels.Movie, offset int) datamodels.Movie {

	length := len(sourceLib)
	for i := 0; i < length; i++ { //looping from 0 to the length of the array
		if sourceLib[i].Id == Id {
			if i+offset < 0 || i+offset > length {
				return sourceLib[i]
			}
			return sourceLib[i+offset]
		}
	}
	curFile := datasource.FileLib[Id]
	return curFile
}

func (fs FileService) SortAct(lib []datamodels.Actress, sortType string) {
	if sortType == "desc" {
		sort.Slice(lib, func(i, j int) bool {
			return lib[i].Cnt > lib[j].Cnt
		})
	} else {
		sort.Slice(lib, func(i, j int) bool {
			return lib[i].Cnt < lib[j].Cnt
		})
	}

}

func (fs FileService) ScanAll() {
	//统计初始化
	cons.TypeMenu = make(map[string]cons.MenuSize)
	cons.SmallDir = []cons.MenuSize{}
	//初始化查询条件
	dirList := []string{}
	setting := cons.OSSetting
	dirList = append(dirList, setting.Dirs...)
	cons.QueryTypes = []string{}
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.VideoTypes)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.DocsTypes)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.ImageTypes)
	fs.ScanDisk(dirList, cons.QueryTypes)
}
func (fs FileService) Delete(id int64) {
	file := fs.FindOne(id)
	DeleteOne(file.DirPath, file.Title)

}
func DeleteOne(dirName string, fileName string) {
	if len(fileName) == 0 {
		return
	}
	files, _ := ioutil.ReadDir(dirName)
	for _, f := range files {
		if strings.Contains(f.Name(), fileName) {
			path := dirName + "\\" + f.Name()
			err := os.Remove(path)
			if err != nil {
				fmt.Println(err)
			}
		}
	}
	// 删除父文件夹
	filesThen, _ := ioutil.ReadDir(dirName)
	if len(filesThen) == 0 {
		UpDeleteDir(dirName)
	}

}
func DownDeleteDir(dirname string) {
	files2, _ := ioutil.ReadDir(dirname)
	if len(files2) > 0 {
		for _, ff := range files2 {
			path := dirname + "\\" + ff.Name()
			if ff.IsDir() {
				DownDeleteDir(path)
			} else {
				os.Remove(path)
			}
		}
	}
	UpDeleteDir(dirname)

}
func UpDeleteDir(dirname string) {
	files2, _ := ioutil.ReadDir(dirname)
	if len(files2) == 0 {
		err := os.Remove(dirname)
		if err != nil {
			fmt.Println(err)
		}
		newpath := dirname[0:strings.LastIndex(dirname, "\\")]
		UpDeleteDir(newpath)
	} else {
		return

	}

}

func (fs FileService) ScanDisk(baseDir []string, types []string) {
	// utils.PKIdRest()
	datasource.FileLib = make(map[int64]datamodels.Movie)
	files := Walks(baseDir, types)
	fileMap, actressMap, _, fileSize := ArrayToMap(files)
	var newFiles []datamodels.Movie
	for _, item := range fileMap {
		newFiles = append(newFiles, item)

	}
	datasource.FileLib = fileMap
	datasource.FileList = newFiles

	datasource.ActressLib = actressMap
	// 添加索引
	db := CreateOrmService()
	go db.InsertBatchPage(newFiles)

	var newActress []datamodels.Actress
	for _, item := range actressMap {
		newActress = append(newActress, item)
	}
	datasource.ActressList = newActress
	//datasource.SupplierLib = supplierMap
	datasource.FileSize = fileSize

}

func (fs FileService) OnlyRepeat(files []datamodels.Movie) []datamodels.Movie {
	var result []datamodels.Movie
	codeMap := make(map[string]datamodels.Movie)
	for _, movie := range files {
		if movie.Code == "" {
			continue
		}
		ele, ok := codeMap[movie.Code]
		if ok {
			result = append(result, ele)
			result = append(result, movie)
			continue
		} else {
			codeMap[movie.Code] = movie
		}

	}
	return result
}

func (fs FileService) SearchByKeyWord(files []datamodels.Movie, totalSize int64, keyWord string, movieType string) ([]datamodels.Movie, int64) {

	if (keyWord == "" || keyWord == "undefined") && (movieType == "" || movieType == "undefined") {
		return files, totalSize
	}
	var result []datamodels.Movie
	var size int64
	for _, file := range files {
		isMovieType := true
		if movieType != "" {
			if file.MovieType != movieType {
				continue
			}
		}
		if strings.Contains(strings.ToUpper(file.Code), strings.ToUpper(keyWord)) && isMovieType {
			result = append(result, file)
			size = size + file.Size
		} else if strings.Contains(strings.ToUpper(file.Name), strings.ToUpper(keyWord)) && isMovieType {
			result = append(result, file)
			size = size + file.Size
		} else if strings.Contains(strings.ToUpper(file.Actress), strings.ToUpper(keyWord)) && isMovieType {
			result = append(result, file)
			size = size + file.Size
		} else if strings.Contains(strings.ToUpper(file.Path), strings.ToUpper(keyWord)) && isMovieType {
			result = append(result, file)
			size = size + file.Size
		}
	}

	return result, size
}

func (fs FileService) SearchActressByKeyWord(files []datamodels.Actress, keyWord string) ([]datamodels.Actress, int) {

	if keyWord == "" || keyWord == "undefined" {
		return files, len(files)
	}
	var result []datamodels.Actress
	cnt := 0
	for _, file := range files {
		if strings.Contains(strings.ToUpper(file.Name), strings.ToUpper(keyWord)) {
			result = append(result, file)
		}
	}

	return result, cnt
}

func (fs FileService) GetActressPage(files []datamodels.Actress, pageNo int, pageSize int) []datamodels.Actress {

	if len(files) == 0 {
		return files
	}
	size := len(files)
	start := (pageNo - 1) * pageSize

	end := size
	if size-start > pageSize {
		end = start + pageSize
	}
	if len(files) <= pageSize {
		return files
	}

	data := files[start:end]
	return data
}

func (fs FileService) GetPage(files []datamodels.Movie, pageNo int, pageSize int) ([]datamodels.Movie, int64) {
	return GetPage(files, pageNo, pageSize)
}

func GetPage(files []datamodels.Movie, pageNo int, pageSize int) ([]datamodels.Movie, int64) {
	if len(files) == 0 {
		return files, 0
	}
	length := len(files)
	start := (pageNo - 1) * pageSize

	end := length
	if length-start >= pageSize {
		end = start + pageSize
	}
	if len(files) <= pageSize {
		return files, 0
	}

	data := []datamodels.Movie{}
	var volume int64
	for i := start; i < end; i++ {
		curFile := files[i]
		volume += curFile.Size
		data = append(data, curFile)
	}
	return data, volume
}

func (fs FileService) DataSize(data []datamodels.Movie) int64 {
	var dataSize int64
	for _, d := range data {
		dataSize = dataSize + d.Size
	}
	return dataSize
}

func ArrayToMap(files []datamodels.Movie) (map[int64]datamodels.Movie, map[string]datamodels.Actress, map[string]datamodels.Supplier, int64) {
	filemap := make(map[int64]datamodels.Movie)
	actessmap := make(map[string]datamodels.Actress)
	suppliermap := make(map[string]datamodels.Supplier)
	var size int64
	for i := 0; i < len(files); i++ {
		curFile := files[i]
		cons.TypeSizePlus(curFile.MovieType, curFile.Size)
		//curFile.SetId("pk" + string(i))
		size = size + curFile.Size
		existMoive, ok := filemap[curFile.Id]
		if ok {
			//重名处理
			existMoive.SetId(utils.PKId())
			filemap[existMoive.Id] = existMoive
		} else {
			filemap[curFile.Id] = curFile
		}

		curActress, ok := actessmap[curFile.Actress]
		if ok {
			curActress.PlusCnt()
			curActress.PlusSize(curFile.Size)
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
	return filemap, actessmap, suppliermap, size
}
func Walks(baseDir []string, types []string) []datamodels.Movie {

	var wg sync.WaitGroup
	var dataMovie = make(chan []datamodels.Movie, 10000)
	var result []datamodels.Movie
	wg.Add(len(baseDir))
	for i := 0; i < len(baseDir); i++ {
		go goWalk(baseDir[i], types, &wg, dataMovie)
	}
	wg.Wait()
	close(dataMovie)
	for {
		data, ok := <-dataMovie
		if !ok {
			break
		}
		result = ExpandsMovie(result, data)
	}
	return result

}

func goWalk(baseDir string, types []string, wg *sync.WaitGroup, datas chan []datamodels.Movie) {
	defer wg.Done()
	files, _ := WalkInnter(baseDir, types, 0)
	datas <- files

}

//遍历目录 获取文件库
func Walk(baseDir string, types []string) []datamodels.Movie {
	var result []datamodels.Movie
	files, _ := ioutil.ReadDir(baseDir)
	if len(files) > 0 {
		for _, path := range files {
			pathAbs := filepath.Join(baseDir, path.Name())
			if path.IsDir() {
				childResult := Walk(pathAbs, types)
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
func WalkInnter(baseDir string, types []string, totalSize int64) ([]datamodels.Movie, int64) {
	var result []datamodels.Movie
	currentSize := int64(0)
	files, _ := ioutil.ReadDir(baseDir)
	if len(files) > 0 {
		for _, path := range files {

			pathAbs := filepath.Join(baseDir, path.Name())
			if path.IsDir() {
				childResult, innerSize := WalkInnter(pathAbs, types, currentSize)
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
		os.Remove(baseDir)
	}
	totalSize += currentSize
	if currentSize <= 20000000 && utils.IndexOf(cons.OSSetting.Dirs, baseDir) < 0 {

		cons.SmallDir = append(cons.SmallDir, cons.NewMenuSizeFold(baseDir, int64(currentSize), true))
	}
	return result, currentSize
}

func ExpandsMovie(originArr []datamodels.Movie, insertArr []datamodels.Movie) []datamodels.Movie {
	if len(insertArr) == 0 {
		return originArr
	}

	for i := 0; i < len(insertArr); i++ {
		originArr = append(originArr, insertArr[i])
	}
	return originArr
}
func ExpandsActess(originArr []datamodels.Actress, insertArr []datamodels.Actress) []datamodels.Actress {
	if len(insertArr) == 0 {
		return originArr
	}

	for i := 0; i < len(insertArr); i++ {
		originArr = append(originArr, insertArr[i])
	}
	return originArr
}
func ExpandsSupplier(originArr []datamodels.Supplier, insertArr []datamodels.Supplier) []datamodels.Supplier {
	if len(insertArr) == 0 {
		return originArr
	}

	for i := 0; i < len(insertArr); i++ {
		originArr = append(originArr, insertArr[i])
	}
	return originArr
}
