package service

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/datasource"
	"searchGin/utils"
	"sort"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
)

type SearchService struct {
}

func CreateSearchService() SearchService {
	return SearchService{}
}

func (fs SearchService) SortMovieForce() {
	datasource.SortMovieForce()
}

func (fs SearchService) SearchIndex(searchParam datamodels.SearchParam) utils.Page {
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
	fmt.Fprintf(cons.LogWriter, "query over :searchCnt[%d] searchSize [%d]", searchCount, searchSize)
	result.Data = pageList
	return result

}

func (fs SearchService) SearchDataSource(searchParam datamodels.SearchParam) utils.Page {

	result := utils.NewPage()
	if len(datasource.FileList) == 0 {
		fs.ScanAll()
		datasource.SortDataSourceMovies(searchParam.SortField, searchParam.SortType, true)
	}
	datasource.SortDataSourceMovies(searchParam.SortField, searchParam.SortType, true)
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

func (fs SearchService) SetMovieType(movie datamodels.Movie, movieType string) utils.Result {

	//video
	if movie.MovieType != "" && movie.MovieType != "无" {
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
		// 执行当前目录搜索
		fs.ScanTarget(movie.DirPath, movie.BaseDir)
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
	// 执行当前目录搜索
	// fs.ScanTarget(movie.DirPath)
	return utils.NewSuccessByMsg("执行成功")
}

func (fs SearchService) AddTag(id string, tag string) utils.Result {
	movie := fs.FindOne(id)
	//video
	if len(movie.Tags) > 0 {
		originTagStr := utils.GetTagStr(movie.Path)
		if originTagStr == tag {
			return utils.NewSuccessByMsg("执行成功")
		}
		newTagStr := "《" + originTagStr + "," + tag + "》"
		originTagStr = "《" + utils.GetTagStr(movie.Path) + "》"
		path := strings.ReplaceAll(movie.Path, originTagStr, newTagStr)
		err := os.Rename(movie.Path, path)
		if err != nil {
			fmt.Println(err)
			return utils.NewFailByMsg(err.Error())
		}
		path = strings.ReplaceAll(movie.Jpg, originTagStr, newTagStr)
		err = os.Rename(movie.Jpg, path)
		if err != nil {
			fmt.Println(err)
		}
		path = strings.ReplaceAll(movie.Png, originTagStr, newTagStr)
		err = os.Rename(movie.Png, path)
		if err != nil {
			fmt.Println(err)
		}
		path = strings.ReplaceAll(movie.Nfo, originTagStr, newTagStr)
		err = os.Rename(movie.Nfo, path)
		if err != nil {
			fmt.Println(err)
		}
		// 执行当前目录搜索
		fs.ScanTarget(movie.DirPath, movie.BaseDir)
		return utils.NewSuccessByMsg("执行成功")
	}

	newMovieType := "《" + tag + "》"
	fmt.Println(tag)
	suffix := "." + utils.GetSuffux(movie.Path)
	newSuffix := newMovieType + suffix
	newName := strings.ReplaceAll(movie.Path, suffix, newSuffix)
	if strings.Contains(newName, "《") && strings.Contains(newName, "》") {
		newName = strings.ReplaceAll(newName, ",", "")
		newName = strings.ReplaceAll(newName, "《》", "")
	}
	err := os.Rename(movie.Path, newName)
	if err != nil {
		fmt.Println(err)
		return utils.NewFailByMsg(err.Error())
	}
	//png
	if utils.ExistsFiles(movie.Png) {
		suffix = "." + utils.GetSuffux(movie.Png)
		newSuffix = newMovieType + suffix
		newName = strings.ReplaceAll(movie.Png, suffix, newSuffix)
		os.Rename(movie.Png, newName)
	}

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
	// 执行当前目录搜索
	fs.ScanTarget(movie.DirPath, movie.BaseDir)
	return utils.NewSuccessByMsg("执行成功")
}
func (fs SearchService) ClearTag(id string, tag string) utils.Result {
	movie := fs.FindOne(id)
	//video
	if len(movie.Tags) == 0 {
		return utils.NewSuccessByMsg("执行成功")
	}

	originTagStr := utils.GetTagStr(movie.Path)

	newTagStr := strings.ReplaceAll(originTagStr, tag, "")
	if len(movie.Tags) == 1 {
		newTagStr = strings.ReplaceAll(newTagStr, "《", "")
		newTagStr = strings.ReplaceAll(newTagStr, "》", "")
		newTagStr = strings.ReplaceAll(newTagStr, ",", "")
	}
	for i := 0; i < len(movie.Tags); i++ {
		if movie.Tags[i] == tag {
			movie.Tags[i] = ""
		}
	}
	path := strings.ReplaceAll(movie.Path, originTagStr, newTagStr)
	os.Rename(movie.Path, path)
	fs.UpdateOne(id, path)
	path = strings.ReplaceAll(movie.Jpg, originTagStr, newTagStr)
	os.Rename(movie.Jpg, path)
	path = strings.ReplaceAll(movie.Png, originTagStr, newTagStr)
	os.Rename(movie.Png, path)
	path = strings.ReplaceAll(movie.Nfo, originTagStr, newTagStr)
	os.Rename(movie.Nfo, path)
	// 执行当前目录搜索
	fs.ScanTarget(movie.DirPath, movie.BaseDir)
	return utils.NewSuccessByMsg("执行成功")
}

func (fs SearchService) MoveCut(srcFile datamodels.Movie, toFile datamodels.Movie) utils.Result {
	result := utils.Result{}
	root := srcFile.DirPath
	fmt.Fprintf(cons.LogWriter, "MoveCut： srcFile [%v]", srcFile)
	fmt.Fprintf(cons.LogWriter, "MoveCut： toFile [%v]", toFile)
	if toFile.Actress == "" && toFile.Code == "" {
		result.Message = "信息不全"
		return result
	}
	path := root + utils.PathSeparator + toFile.Actress
	if toFile.Studio != "" {
		path = path + utils.PathSeparator + toFile.Studio
	}
	title := toFile.Title
	title = strings.ReplaceAll(title, ":", "~")
	title = strings.ReplaceAll(title, ".", "~")
	title = strings.ReplaceAll(title, "!", "~")

	dirname := "[" + toFile.Actress + "][" + toFile.Code + "]" + title
	dirpath := path + utils.PathSeparator + dirname
	os.MkdirAll(dirpath, os.ModePerm)
	filename := dirname + "." + utils.GetSuffux(srcFile.Path)
	finalpath := dirpath + utils.PathSeparator + filename
	jpgpath := utils.GetPng(finalpath, "jpg")
	pngpath := utils.GetPng(finalpath, "png")
	nfopath := utils.GetPng(finalpath, "nfo")
	jpgOut, createErr := os.Create(jpgpath)
	if createErr != nil {
		//TODO 创建失败  标题 特殊字符处理 改为 演员+番号
		dirname = "[" + toFile.Actress + "][" + toFile.Code + "]"
		dirpath = path + utils.PathSeparator + dirname
		os.MkdirAll(dirpath, os.ModePerm)
		filename = dirname + "." + utils.GetSuffux(srcFile.Path)
		finalpath = dirpath + utils.PathSeparator + filename
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
	if toFile.Png == "" {
		pngErr := utils.ImageToPng(jpgpath)
		if pngErr != nil {
			result.Fail()
			fmt.Println("pngErr:", pngErr)
			os.Rename(finalpath, srcFile.Path)
			result.Message = "png生成失败"
			// return result
		}
	} else {
		pngOut, createErr := os.Create(pngpath)
		if createErr != nil {
			result.Fail()
			fmt.Println("downErr:", downErr)
			os.Rename(finalpath, srcFile.Path)
			result.Message = "png文件下载失败：" + toFile.Png
			return result
		}
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
		pngOut.Write(body)
		pngOut.Close()
	}

	os.Rename(srcFile.Path, finalpath)
	toFile.Jpg = jpgpath
	toFile.Nfo = nfopath
	toFile.Png = pngpath
	fs.MakeNfo(toFile)
	result.Success()
	result.Message = "【" + dirname + "】" + result.Message
	return result
}

func (fs SearchService) DownJpgMakePng(finalpath string, url string) utils.Result {
	result := utils.Result{}
	jpgpath := utils.GetPng(finalpath, "jpg")
	jpgOut, createErr := os.Create(jpgpath)
	if createErr != nil {

	}
	if !strings.Contains(url, cons.OSSetting.BaseUrl) {
		url = cons.OSSetting.BaseUrl + url
	}
	fmt.Println(url)
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
	pngErr := utils.ImageToPng(jpgpath)
	if pngErr != nil {

	}
	result.Success()
	return result
}

func (fs SearchService) DownImage(toFile datamodels.Movie) utils.Result {
	if len(toFile.ImageList) <= 0 {
		return utils.NewFailByMsg("No Image avaliable")
	}
	var wg sync.WaitGroup
	wg.Add(len(toFile.ImageList))

	//主图下载
	// wg.Add(1)
	//jpgUrl := toFile.JpgUrl
	//if !strings.HasPrefix(jpgUrl, "http") {
	//	jpgUrl = cons.OSSetting.BaseUrl + strings.Replace(jpgUrl, "/", "", 1)
	//}
	//go downImageItem(jpgUrl, toFile.DirPath, toFile.Actress, "", &wg)
	for i := 0; i < len(toFile.ImageList); i++ {
		go downImageItem(toFile.ImageList[i], toFile.DirPath, toFile.Code, fmt.Sprintf("%d", i), &wg)
	}
	wg.Wait()
	return utils.NewSuccessByMsg("下载完成!")

}

func downImageItem(url string, dirPath string, prefix string, sufix string, wg *sync.WaitGroup) utils.Result {
	defer wg.Done()
	result := utils.NewResult()
	filepath := dirPath + utils.PathSeparator + prefix
	if len(sufix) > 0 {
		filepath = filepath + "-" + sufix + ".jpg"
	}
	filepath = filepath + ".jpg"
	if !strings.HasPrefix(url, "http") {
		url = cons.OSSetting.BaseUrl + url
	}
	fmt.Println("jpg url:", url)
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

func (fs SearchService) MakeNfo(toFile datamodels.Movie) {
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

func (fs SearchService) RequestBusToFile(srcFile datamodels.Movie) (utils.Result, datamodels.Movie) {

	result := utils.Result{}
	newFile := datamodels.Movie{}
	code := srcFile.Code
	if code == "" {
		fmt.Fprintf(cons.LogWriter, "RequestBusToFile srcFile [%v]", srcFile)
		result.Fail()
		result.Message = "Code：" + code + " srcFile:" + srcFile.Name
		return result, newFile
	}
	if strings.Contains(code, "{{") {
		code = strings.Split(code, "{{")[0]
	}
	url := cons.OSSetting.BaseUrl + code
	if isOM(srcFile.Name) {
		url = cons.OSSetting.OMUrl + code
		url = strings.ReplaceAll(url, "{{斯巴达}}", "")
	}

	resp, err := httpGet(url)
	if err != nil {
		fmt.Println("err", err)
		result.Fail()
		result.Message = "请求失败：" + resp.Status + " url:" + url
		fmt.Fprintf(cons.LogWriter, "请求失败： url [%v]", url)
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
			fmt.Fprintf(cons.LogWriter, "请求失败： url [%v]", url)
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
	info.Each(func(_ int, selection *goquery.Selection) {
		item := selection.Text()
		if strings.HasPrefix(item, "發行日期:") {
			newFile.PTime = selection.Parent().Text()
			newFile.PTime = strings.Replace(newFile.PTime, "發行日期:", "", 1)
		} else if strings.HasPrefix(item, "長度:") {
			newFile.Length = selection.Parent().Text()
			newFile.Length = strings.Replace(newFile.Length, "長度:", "", 1)
		} else if strings.HasPrefix(item, "演員") {
			stars := doc.Find(".star-name")
			stars.Each(func(_ int, selection *goquery.Selection) {
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
	var imageList []string
	waterFall.Each(func(_ int, selection *goquery.Selection) {
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

func (fs SearchService) RequestLibToFile(srcFile datamodels.Movie) (utils.Result, datamodels.Movie) {

	result := utils.Result{}
	newFile := datamodels.Movie{}
	newFile.Id = srcFile.Id
	if srcFile.Code == "" || isOM(srcFile.Name) {
		result.Fail()
		return result, newFile
	}
	// 搜索列表信息
	url := "https://g60y.com/cn/vl_searchbyid.php?keyword=" + srcFile.Code
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
	targetUrl := ""
	listVideo := doc.Find(" .videos .video")
	fmt.Println(listVideo.Text())
	listVideo.Each(func(i int, s *goquery.Selection) {
		code := s.Find(".id").Text()
		if strings.EqualFold(code, srcFile.Code) {
			// if strings.ToUpper(code) == strings.ToUpper(srcFile.Code) {
			newFile.Code = code
			newFile.Title = s.Find(".title").Text()
			newFile.Png = s.Find("img").AttrOr("src", "")
			targetUrl = s.Find("a").AttrOr("href", "")
		}
	})
	var detailDoc *goquery.Document
	if targetUrl == "" {
		result.Fail()
		result.Message = "未找到"
		fmt.Println("err:", err)
		return result, newFile
	} else {
		detailUrl := "https://g60y.com/cn/" + targetUrl
		detailResp, err2 := httpGet(detailUrl)
		if err2 != nil {
			fmt.Println("err:", err2)
		}
		detailDoc, err2 = goquery.NewDocumentFromReader(detailResp.Body)
		if err2 != nil {
			fmt.Println("err:", err2)
		}
	}
	imageDiv := detailDoc.Find("#video_jacket_img")
	newFile.Jpg = imageDiv.AttrOr("src", "")
	actressDiv := detailDoc.Find(".star a")
	makerDiv := detailDoc.Find(".maker a")
	newFile.Studio = makerDiv.Text()
	newFile.Actress = actressDiv.Text()
	result.Success()
	result.Data = newFile
	return result, newFile
}

func (fs SearchService) FindOne(Id string) datamodels.Movie {
	if cons.OSSetting.IsDb {
		db := CreateOrmService()
		return db.Find(Id)
	}
	if len(datasource.FileLib) == 0 {
		fs.ScanAll()
	}
	curFile := datasource.FileLib[Id]
	return curFile
}

func (fs SearchService) UpdateOne(Id string, path string) {
	if cons.OSSetting.IsDb {
		db := CreateOrmService()
		db.UpdateOne(Id, path)
	}
}

func cleanPath(name string) string {
	newName := strings.Trim(name, " ")
	newName = strings.ReplaceAll(newName, "《", "")
	newName = strings.ReplaceAll(newName, "》", "")
	newName = strings.ReplaceAll(newName, "{{", "")
	newName = strings.ReplaceAll(newName, "}}", "")
	return newName
}

func (fs SearchService) Rename(movie datamodels.MovieEdit) utils.Result {
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
	if movie.Jpg != "" && strings.HasPrefix(movie.Jpg,"http") {
		res = fs.DownJpgMakePng(movieLib.Path, movie.Jpg)
		if !res.IsSuccess() {
			return res
		}
	}
	newPath := cleanPath(movieLib.DirPath)
	newDir := newPath
	if movie.MoveOut {
		// os.MkdirAll(movie.Actress, os.ModePerm)
		if movie.Actress != "" {
			arr := strings.Split(newPath, utils.PathSeparator)
			if utils.HasItem(arr, movie.Actress) {
				arr2 := strings.Split(newPath, movie.Actress)
				newDir = arr2[0]
			}
			newDir += utils.PathSeparator + movie.Actress
		}

		if movie.Title != "" {
			newDir += utils.PathSeparator
			newDir += choose2To1(!strings.Contains(movie.Title, "["+movie.Actress+"]"), choose2To1(movie.Actress != "", "["+movie.Actress+"]", ""), "")
			newDir += choose2To1(!strings.Contains(movie.Title, "["+movie.Actress+"]"), choose2To1(movie.Code != "", "["+movie.Code+"]", ""), "")
			newTitle := strings.Split(movie.Title, "{{")
			newDir += cleanPath(newTitle[0])
		}
		err := os.MkdirAll(newDir, os.ModePerm)
		if err != nil {
			fmt.Fprintf(cons.LogWriter, "err: %v\n", err)
			res.FailByMsg("执行失败")
			res.Data = err
			return res
		}
	}
	newPath = newDir + utils.PathSeparator + movie.Name
	fmt.Fprintf(cons.LogWriter, "oldPath: %s", oldPath)
	fmt.Fprintf(cons.LogWriter, "newPath: %s", newPath)
	err := os.Rename(oldPath, newPath)
	if err != nil {
		fmt.Fprintf(cons.LogWriter, "err: %v\n", err)
		res.FailByMsg("执行失败")
		res.Data = err
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

	//gif
	targetSuffix = ".gif"
	suffix = "." + utils.GetSuffux(oldPath)
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
	if !movie.NoRefresh {
		fs.ScanTarget(movieLib.DirPath, movieLib.BaseDir)
	}
	return res
}

func choose2To1(tr bool, str1 string, str2 string) string {
	if tr {
		return str1
	} else {
		return str2
	}
}

func (fs SearchService) FindNext(Id string, sourceLib []datamodels.Movie, offset int) datamodels.Movie {

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

func (fs SearchService) SortAct(lib []datamodels.Actress, sortType string) {
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

// 全局扫描
func (fs SearchService) ScanAll() {
	//统计初始化
	cons.TypeMenu = sync.Map{}
	cons.TagMenu = sync.Map{}
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

// 扫描指定文佳佳
func (fs SearchService) ScanTarget(dirPath string, BaseDir string) {
	//统计初始化
	service := CreateFileService()
	cons.TypeMenu = sync.Map{}
	cons.TagMenu = sync.Map{}
	cons.SmallDir = []cons.MenuSize{}
	//初始化查询条件
	setting := cons.OSSetting
	cons.QueryTypes = []string{}
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.VideoTypes)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.DocsTypes)
	cons.QueryTypes = utils.ExtandsItems(cons.QueryTypes, setting.ImageTypes)
	targetFiles, _ := service.WalkInnter(dirPath, cons.QueryTypes, 0, false, BaseDir)
	if cons.OSSetting.IsDb {
		db := CreateOrmService()
		db.DeleteByDirPath(dirPath)
		fmt.Println("删除文件夹:" + dirPath)
		db.InsertS(targetFiles, 1)
		fmt.Fprintf(cons.LogWriter, "添加文件:%d", len(targetFiles))
	}
	service.fileMapUpdateFileListFromDatasource(dirPath, targetFiles)

}

func (fs SearchService) Delete(id string) {
	file := fs.FindOne(id)
	service := CreateFileService()
	service.DeleteOne(file.DirPath, file.Title)
	fs.ScanTarget(file.DirPath, file.BaseDir)
}

func (fs SearchService) ScanDisk(baseDir []string, types []string) {
	// utils.PKIdRest()
	fileService := CreateFileService()
	datasource.FileLib = make(map[string]datamodels.Movie)
	files := fileService.Walks(baseDir, types)
	fileService.makeDatasourceMap(files)
	// 添加索引

}

func (fs SearchService) OnlyRepeat(files []datamodels.Movie) []datamodels.Movie {
	var result []datamodels.Movie
	codeMap := make(map[string]datamodels.Movie)
	for _, movie := range files {
		forCode := movie.Code
		if forCode == "" {
			continue
		}
		forCode = strings.ReplaceAll(forCode, "-", "")
		forCode = strings.ReplaceAll(forCode, "_", "")
		ele, ok := codeMap[forCode]
		if ok {
			result = append(result, ele)
			result = append(result, movie)
			continue
		} else {
			codeMap[forCode] = movie
		}

	}
	return result
}

func (fs SearchService) SearchByKeyWord(files []datamodels.Movie, totalSize int64, keyWord string, movieType string) ([]datamodels.Movie, int64) {

	if (keyWord == "" || keyWord == "undefined") && (movieType == "" || movieType == "undefined") {
		return files, totalSize
	}
	var result []datamodels.Movie
	var size int64
	for _, file := range files {
		if movieType != "" {
			if file.MovieType != movieType {
				continue
			}
		}
		isAdd := false
		if len(keyWord) > 0 {
			arr := strings.Split(keyWord, " ")
			for i := 0; i < len(arr); i++ {
				words := arr[i]
				if len(words) == 0 || words == " " {
					break
				}
				if strings.Contains(strings.ToUpper(file.Code), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Name), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Actress), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Path), strings.ToUpper(words)) {
					isAdd = true
					break
				}
			}
		} else {
			isAdd = true
		}

		if isAdd {
			result = append(result, file)
			size = size + file.Size
		}

	}

	return result, size
}

func (fs SearchService) SearchActressByKeyWord(files []datamodels.Actress, keyWord string) ([]datamodels.Actress, int) {

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

func (fs SearchService) GetActressPage(files []datamodels.Actress, pageNo int, pageSize int) []datamodels.Actress {

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

func (fs SearchService) GetPage(files []datamodels.Movie, pageNo int, pageSize int) ([]datamodels.Movie, int64) {
	return GetPage(files, pageNo, pageSize)
}

func GetPage(files []datamodels.Movie, pageNo int, pageSize int) ([]datamodels.Movie, int64) {
	if len(files) == 0 {
		return files, 0
	}
	if pageNo <= 0 {
		pageNo = 1
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

func (fs SearchService) DataSize(data []datamodels.Movie) int64 {
	var dataSize int64
	for _, d := range data {
		dataSize = dataSize + d.Size
	}
	return dataSize
}
