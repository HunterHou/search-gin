package service

import (
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"search-gin/datamodels"
	"search-gin/utils"
	"xorm.io/xorm"
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
	o.Engine, err = xorm.NewEngine("sqlite3", "search-gin")
	if err != nil {
		fmt.Println(err)
	}
}

func CreateOrmService() OrmService {
	driveName := "sqlite3"
	dataSourceName := "test"
	service := OrmService{}
	service.DriveName(driveName)
	service.DataSourceName(dataSourceName)
	service.Builder()
	return service
}

func (o *OrmService) query(param datamodels.SearchParam) ([]datamodels.Movie, int64) {
	engine := o.Engine
	var res []datamodels.Movie

	err := engine.Where("name like ?  ", param.GetFuzzyKeywords()).Limit(param.GetPageSize(), param.StartNum()).Find(&res)
	if err != nil {
		fmt.Println(err)
	}
	size := int64(0)
	for _, re := range res {
		size += re.Size
	}
	return res, size

}

func (o *OrmService) InsertBatch(movies []datamodels.Movie) utils.Result {
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
	err := engine.Sync(new(datamodels.Movie))
	if err != nil {
		return utils.NewFailByMsg(err.Error())
	}
	res := utils.NewSuccess()
	return res
}
