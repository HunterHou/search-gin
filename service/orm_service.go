package service

import (
	"fmt"
	"os"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/utils"
	"strings"
	"sync"

	_ "github.com/mattn/go-sqlite3"
	"xorm.io/xorm"
	"xorm.io/xorm/names"
)

var dbEngine *xorm.Engine

func init() {
	var err error
	os.Remove("searchGin")
	dbEngine, err = xorm.NewEngine("sqlite3", "searchGin")
	if err != nil {
		fmt.Println(err)
	}
	movie := new(datamodels.Movie)
	dbEngine.Sync2(movie)
	// dbEngine.ShowSQL(true)
	dbEngine.SetMapper(names.SnakeMapper{})
	total, _ := dbEngine.Count(movie)
	fmt.Printf("movie total:%d", total)
}

type OrmService struct {
}

func CreateOrmService() OrmService {
	service := OrmService{}
	return service
}

func (o *OrmService) Find(Id string) datamodels.Movie {
	var res datamodels.Movie
	has, err := dbEngine.ID(Id).Get(&res)
	if err != nil {
		fmt.Println(err)
	}
	if has {
		return res
	}
	return res

}

func (o *OrmService) UpdateOne(Id string, path string) datamodels.Movie {
	var res datamodels.Movie
	res.Id = Id
	res.Path = path
	_, err := dbEngine.ID(Id).Update(&res)
	if err != nil {
		fmt.Println(err)
	}
	return res

}

func (o *OrmService) query(param datamodels.SearchParam) ([]datamodels.Movie, int64) {

	var res []datamodels.Movie
	orderBy := strings.Join(param.GetSort(), ",")
	orderBy = utils.Camel2Case(orderBy)
	session := o.NewSessionBySearchParam(param)
	if param.Sql != "" {
		session.And(param.Sql)
	}
	session.Engine().ShowSQL(true)
	err := session.OrderBy(orderBy).Limit(param.GetPageSize(), param.StartNum()).Find(&res)
	if err != nil {
		fmt.Println(err)
	}
	session.Engine().ShowSQL(false)
	size := int64(0)
	for _, re := range res {
		size += re.Size
	}
	return res, size

}
func (o *OrmService) NewSessionBySearchParam(param datamodels.SearchParam) *xorm.Session {
	session := dbEngine.Where("1=1")

	if param.GetMovieType() != "" {
		session.And("movie_type = ?", param.GetMovieType())
	}
	if param.DirPath != "" {
		session.And("dir_path = ?", param.DirPath)
	}
	if param.GetKeywords() != "" {
		session.And("(name like ?  or path like ? )", param.GetFuzzyKeywords(), param.GetFuzzyKeywords())
	}
	return session

}
func (o *OrmService) queryCount(param datamodels.SearchParam) (int64, int64) {
	session := o.NewSessionBySearchParam(param)
	cnt, err := session.SumsInt(new(datamodels.Movie), "flag", "size")
	if err != nil {
		fmt.Println(err)
	}
	return cnt[0], cnt[1]

}

//全部删除 并添加
func (o *OrmService) InsertAllIndex(movies []datamodels.Movie) utils.Result {
	total := int64(len(movies))
	pageSize := int64(1000)
	totalPage := total/pageSize + 1
	startIndex := 0
	var wg sync.WaitGroup
	wg.Add(int(totalPage))
	cons.OSSetting.IsDb = false
	o.DeleteAll()
	for i := 0; i < int(totalPage); i++ {
		lastIndex := startIndex + int(pageSize)
		if lastIndex > int(total) {
			lastIndex = int(total)
		}
		pageNo := i + 1
		fmt.Printf("开始启动，页码：%d", pageNo)
		curMovies := movies[startIndex:lastIndex]
		go o.InsertBatch(curMovies, &wg, pageNo)
		startIndex = lastIndex
	}
	wg.Wait()
	cons.OSSetting.IsDb = true
	res := utils.NewSuccess()
	res.EffectRows = total
	return res
}

// 批量添加
func (o *OrmService) InsertBatch(movies []datamodels.Movie, wg *sync.WaitGroup, pageNo int) utils.Result {
	defer wg.Done()
	return o.InsertS(movies, pageNo)
}

func (o *OrmService) InsertS(movies []datamodels.Movie, pageNo int) utils.Result {
	effectRows, err := dbEngine.Insert(&movies)
	if err != nil {
		fmt.Println("insert error:", pageNo, err)
		var repeat datamodels.Movie
		errorMap := make(map[string]datamodels.Movie)
		for i := 0; i < len(movies); i++ {
			current := movies[i]
			target, ok := errorMap[current.Id]
			if ok {
				fmt.Println("----------------------------")
				fmt.Println("----------------------------")
				fmt.Printf("key repeat:%s \n", current.Path)
				fmt.Printf("key repeat:%s \n", target.Path)
				fmt.Printf("key repeat:%s \n", current.Id)
				fmt.Printf("key repeat:%s \n", target.Id)
				fmt.Println("----------------------------")
				fmt.Println("----------------------------")
				repeat = target
			} else {
				errorMap[current.Id] = current
			}
		}
		return utils.NewFailByMsg(repeat.Path + err.Error())
	}
	fmt.Printf("pageNo:%d , insert total:%d \n", pageNo, len(movies))
	res := utils.NewSuccess()
	res.EffectRows = effectRows
	return res
}

// 全部删除
func (o *OrmService) DeleteAll() utils.Result {

	effectRows, err := dbEngine.Where("1=1").Delete(new(datamodels.Movie))
	if err != nil {
		return utils.NewFailByMsg(err.Error())
	}
	res := utils.NewSuccess()
	res.EffectRows = effectRows
	return res
}

// 删除指定文件夹下的数据
func (o *OrmService) DeleteByDirPath(dirPath string) utils.Result {

	queryParam := datamodels.SearchParam{
		DirPath:  dirPath,
		Page:     1,
		PageSize: 10000,
	}
	res := utils.NewSuccess()
	dirMovies, _ := o.query(queryParam)
	if len(dirMovies) > 0 {
		for i := 0; i < len(dirMovies); i++ {
			_, err := dbEngine.ID(dirMovies[i].Id).Delete(new(datamodels.Movie))
			if err != nil {
				fmt.Println("delete error", err)
			}
		}
	}
	return res
}

func (o *OrmService) SyncMovieTable() utils.Result {

	err := dbEngine.Sync2(new(datamodels.Movie))
	if err != nil {
		return utils.NewFailByMsg(err.Error())
	}
	res := utils.NewSuccess()
	return res
}
