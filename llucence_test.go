package main

import (
	"fmt"
	"github.com/blevesearch/bleve"
	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/datasource"
	"search-gin/service"
	"search-gin/utils"
	"testing"
)

var m1 = datamodels.Movie{
	Id:        "zhangsan",
	Name:      "中文",
	Series:    "aaaa",
	Size:      500,
	ImageList: []string{"1", "2"},
}

var m2 = datamodels.Movie{
	Id:        "lisi",
	Name:      "中国",
	Series:    "bbbb",
	Size:      800,
	ImageList: []string{"11", "22"},
}
var m3 = datamodels.Movie{
	Id:        "wangwu",
	Name:      "中人",
	Series:    "cccc",
	Size:      200,
	ImageList: []string{"111", "2222"},
}
var indexName = "searchTest"
var mFields = utils.InterfaceFields(m1)

func TestMan(t *testing.T) {
	service.BIndex, _ = bleve.Open(cons.IndexName)
	searchParam := datamodels.SearchParam{
		Keyword:   "中文",
		Page:      1,
		PageSize:  15,
		SortField: "Size",
		SortType:  "desc",
	}
	results, size, count := service.SearchIndex(searchParam)
	fmt.Printf("size:%v \n", utils.GetSizeStr(size))
	fmt.Printf("count:%v \n", count)
	for indx, mo := range results {
		fmt.Printf("%d:%d:%v \n", indx, mo.Size, mo.Name)
	}

}
func TestQueryIndex(t *testing.T) {
	index := service.OpenIndex()
	queryString := ""
	//keyword := "777"
	//if keyword != "" {
	//	queryString = "+Name:*"
	//}
	query := bleve.NewQueryStringQuery(queryString)
	searchRequest := bleve.NewSearchRequestOptions(query, 10, 0, false)
	searchRequest.Fields = mFields
	// searchRequest.Highlight = keyword
	searchResult, _ := index.Search(searchRequest)
	results := searchResult.Hits
	fmt.Printf("total:%d \n", searchResult.Total)
	fmt.Printf("Size:%d \n", searchResult.Size())
	fmt.Printf("StatusTotal:%d \n", searchResult.Status.Total)
	for indx, v := range results {
		mo := datamodels.Movie{}
		utils.FieldsMapToStruck(&mo, v.Fields)
		fmt.Printf("%d:%v \n", indx, mo.Name)
	}
	// t.Log(searchResult)
}

func TestCreateIndex(t *testing.T) {
	service.CreateIndex()
}
func TestUpdateIndex(t *testing.T) {

	fileService := service.FileService{}
	fileService.ScanAll()
	index := service.OpenIndex()
	for _, e := range datasource.FileList {
		index.Index(e.Id, e)
	}

}
func TestFind(t *testing.T) {
	index, err := bleve.Open(indexName)
	if err != nil {
		t.Log("create index err", err)
	}
	mm1, _ := index.Document(m1.Id)
	for _, field := range mm1.Fields {
		t.Logf("%s:%s", field.Name(), field.Value())
	}
}
