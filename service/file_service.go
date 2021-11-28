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
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
)

type FileService struct {
}

func (fs FileService) SetMovieType(movie datamodels.Movie, movieType string) {

	//video
	if movie.MovieType != "" {
		originVideoType := utils.GetMovieType(movie.Path)
		fmt.Println(movieType)
		fmt.Println(originVideoType)
		if originVideoType == movieType {
			return
		}
		path := strings.ReplaceAll(movie.Path, originVideoType, movieType)
		os.Rename(movie.Path, path)
		path = strings.ReplaceAll(movie.Jpg, originVideoType, movieType)
		os.Rename(movie.Jpg, path)
		path = strings.ReplaceAll(movie.Png, originVideoType, movieType)
		os.Rename(movie.Png, path)
		path = strings.ReplaceAll(movie.Nfo, originVideoType, movieType)
		os.Rename(movie.Nfo, path)

		return
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
	result := utils.NewResult()
	if len(toFile.ImageList) <= 0 {
		result.Message = "No Image avaliable"
		return result
	}

	var wg sync.WaitGroup
	wg.Add(len(toFile.ImageList))
	for i := 0; i < len(toFile.ImageList); i++ {
		go downImageItem(toFile, i, &wg)
	}
	wg.Wait()
	result.Fail()
	result.Message = "执行成功!"
	return result

}

func downImageItem(currentFile datamodels.Movie, i int, wg *sync.WaitGroup) utils.Result {
	defer wg.Done()
	result := utils.NewResult()
	url := currentFile.ImageList[i]
	filepath := currentFile.DirPath + "\\" + currentFile.Code + "-" + fmt.Sprint(i) + ".jpg"
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
		result.Message = "文件下载失败：" + currentFile.Jpg
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

func (fs FileService) FindOne(Id string) datamodels.Movie {
	if len(datasource.FileLib) == 0 {
		fs.ScanAll()
	}
	curFile := datasource.FileLib[Id]
	return curFile
}

func (fs FileService) Rename(movie datamodels.Movie) utils.Result {
	res := utils.NewSuccess()
	movieLib := fs.FindOne(movie.Id)
	if movieLib.IsNull() {
		res.FailMsg("文件不存在")
		return res
	}
	newPath := movieLib.DirPath + "\\" + movie.Name
	err := os.Rename(movieLib.Path, newPath)
	if err != nil {
		fmt.Printf("err: %v\n", err)
		res.FailMsg("执行失败")
		return res
	}
	return res
}

func (fs FileService) FindNext(Id string, sourceLib []datamodels.Movie, offset int) datamodels.Movie {

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
	dirList := []string{}
	setting := cons.OSSetting
	dirList = append(dirList, setting.Dirs...)
	// for _, v := range setting.Dirs {
	// 	dirList = append(dirList, v)
	// }
	cons.QueryTypes = []string{}
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.VideoTypes)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.DocsTypes)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.ImageTypes)
	fs.ScanDisk(dirList, cons.QueryTypes)
}
func (fs FileService) Delete(id string) {
	file := fs.FindOne(id)
	list := []string{file.Path, file.Png, file.Jpg, file.Nfo}
	for i := 0; i < len(list); i++ {
		err := os.Remove(list[i])
		if err != nil {
			fmt.Println(err)
		}
	}
	//TODO 删除父文件夹
	//dirname := path.Dir(file.Path)
	//fmt.Println(dirname)
	//deleteDir(dirname)

}

// func deleteDir(filename string) {
// 	dirname, _ := path.Split(filename)
// 	files2, _ := ioutil.ReadDir(dirname)
// 	if len(files2) == 0 {
// 		os.Remove(dirname)
// 		return
// 	}
// 	dirname2, _ := path.Split(dirname)
// 	deleteDir(dirname2)
// }

func (fs FileService) ScanDisk(baseDir []string, types []string) {
	datasource.FileLib = make(map[string]datamodels.Movie)
	files := Walks(baseDir, types)
	fileMap, actressMap, supplierMap, fileSize := ArrayToMap(files)
	var newFiles []datamodels.Movie
	for _, item := range fileMap {
		newFiles = append(newFiles, item)
	}
	datasource.FileLib = fileMap
	datasource.FileList = newFiles
	datasource.ActressLib = actressMap

	var newActress []datamodels.Actress
	for _, item := range actressMap {
		newActress = append(newActress, item)
	}
	datasource.ActressList = newActress
	datasource.SupplierLib = supplierMap
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
	fmt.Println("movieType:" + movieType)
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

func (fs FileService) GetPage(files []datamodels.Movie, pageNo int, pageSize int) []datamodels.Movie {

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

func (fs FileService) DataSize(data []datamodels.Movie) int64 {
	var dataSize int64
	for _, d := range data {
		dataSize = dataSize + d.Size
	}
	return dataSize
}

func ArrayToMap(files []datamodels.Movie) (map[string]datamodels.Movie, map[string]datamodels.Actress, map[string]datamodels.Supplier, int64) {
	filemap := make(map[string]datamodels.Movie)
	actessmap := make(map[string]datamodels.Actress)
	suppliermap := make(map[string]datamodels.Supplier)
	var size int64
	for i := 0; i < len(files); i++ {
		curFile := files[i]
		size = size + curFile.Size
		//curFile.Id = string(i)
		filemap[curFile.Id] = curFile
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
	files := Walk(baseDir, types)
	datas <- files
}

//遍历目录 获取文件库
func Walk(baseDir string, types []string) []datamodels.Movie {
	var result []datamodels.Movie
	files, _ := ioutil.ReadDir(baseDir)
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
	return result
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
