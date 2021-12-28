package service

import (
	"fmt"
	"os"
	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/utils"
	"strings"
	"sync"

	_ "github.com/mattn/go-sqlite3"
	"xorm.io/xorm"
	"xorm.io/xorm/names"
)

type OrmService struct {
	driveName      string
	dataSourceName string
	Engine         *xorm.Engine
}

func (o *OrmService) DriveName(driveName string) {
	o.driveName = driveName
}
func (o *OrmService) DataSourceName(dataSourceName string) {
	o.dataSourceName = dataSourceName
}

func (o *OrmService) Builder() {
	var err error
	os.Remove("search-gin")
	o.Engine, err = xorm.NewEngine("sqlite3", "search-gin")
	if err != nil {
		fmt.Println(err)
	}
	o.Engine.ShowSQL(true)
	o.Engine.SetMapper(names.SnakeMapper{})
}

func CreateOrmService() OrmService {
	driveName := "sqlite3"
	dataSourceName := "test"
	service := OrmService{}
	service.DriveName(driveName)
	service.DataSourceName(dataSourceName)
	service.Builder()
	service.SyncMovieTable()
	return service
}

func (o *OrmService) Find(Id string) datamodels.Movie {
	engine := o.Engine
	var res datamodels.Movie
	has, err := engine.Where("id = ?", Id).Get(&res)
	if err != nil {
		fmt.Println(err)
	}
	if has {
		return res
	}
	return res

}

func (o *OrmService) query(param datamodels.SearchParam) ([]datamodels.Movie, int64) {
	engine := o.Engine
	var res []datamodels.Movie
	orderBy := strings.Join(param.GetSort(), ",")
	orderBy = utils.Camel2Case(orderBy)
	err := engine.Where("name like ?  ", param.GetFuzzyKeywords()).OrderBy(orderBy).Limit(param.GetPageSize(), param.StartNum()).Find(&res)
	if err != nil {
		fmt.Println(err)
	}
	size := int64(0)
	for _, re := range res {
		size += re.Size
	}
	return res, size

}
func (o *OrmService) queryCount(param datamodels.SearchParam) (int64, int64) {
	engine := o.Engine
	cnt, err := engine.Where("name like ?  ", param.GetFuzzyKeywords()).SumsInt(new(datamodels.Movie), "flag", "size")
	if err != nil {
		fmt.Println(err)
	}
	return cnt[0], cnt[1]

}

func (o *OrmService) InsertBatchPage(movies []datamodels.Movie) utils.Result {
	total := int64(len(movies))
	pageSize := int64(1000)
	totalPage := total/pageSize + 1
	startIndex := 0
	var wg sync.WaitGroup
	wg.Add(int(totalPage))
	cons.IndexOver = false
	o.DeleteAll()
	for i := 0; i < int(totalPage); i++ {
		lastIndex := startIndex + int(pageSize)
		if lastIndex > int(total) {
			lastIndex = int(total)
		}
		curMovies := movies[startIndex:lastIndex]
		go o.InsertBatch(curMovies, &wg)
		startIndex = lastIndex + 1
	}
	wg.Wait()
	cons.IndexOver = true
	res := utils.NewSuccess()
	res.EffectRows = total
	return res
}

func (o *OrmService) InsertBatch(movies []datamodels.Movie, wg *sync.WaitGroup) utils.Result {
	defer wg.Done()
	engine := o.Engine
	effectRows, err := engine.Insert(&movies)
	if err != nil {
		return utils.NewFailByMsg(err.Error())
	}
	res := utils.NewSuccess()
	res.EffectRows = effectRows
	return res
}

func (o *OrmService) DeleteAll() utils.Result {
	engine := o.Engine
	effectRows, err := engine.Where("1=1").Delete(new(datamodels.Movie))
	if err != nil {
		return utils.NewFailByMsg(err.Error())
	}
	res := utils.NewSuccess()
	res.EffectRows = effectRows
	return res
}

func (o *OrmService) SyncMovieTable() utils.Result {
	engine := o.Engine
	err := engine.Sync2(new(datamodels.Movie))
	if err != nil {
		return utils.NewFailByMsg(err.Error())
	}
	res := utils.NewSuccess()
	return res
}
