package main

import (
	"fmt"
	"github.com/blevesearch/bleve"
	"os"
	"search-gin/datamodels"
	"search-gin/datasource"
	"search-gin/service"
	"search-gin/utils"
	"testing"
	"time"
)

var m1 = datamodels.Movie{
	Id:        "zhangsan",
	Name:      "zhangsandename",
	Series:    "aaaa",
	Size:      500,
	ImageList: []string{"1", "2"},
}

var m2 = datamodels.Movie{
	Id:        "lisi",
	Name:      "lisidename",
	Series:    "bbbb",
	Size:      800,
	ImageList: []string{"11", "22"},
}
var m3 = datamodels.Movie{
	Id:        "wangwu",
	Name:      "wangwudename",
	Series:    "cccc",
	Size:      200,
	ImageList: []string{"111", "2222"},
}
var indexName = "searchTest"
var mFields = utils.InterfaceFields(m1)

func TestMan(t *testing.T) {
	searchParam := datamodels.SearchParam{
		Keyword:   "",
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
	index, err := bleve.Open(indexName)
	if err != nil {
		t.Log("create index err", err)
	}
	keyword := "777"
	queryString := ""
	if keyword != "" {
		queryString = "+Name:*"
	}
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

func createIndex() {
	mapping := bleve.NewIndexMapping()
	//mapping.DefaultMapping = documentMapping

	os.RemoveAll(indexName)
	index, err := bleve.New(indexName, mapping)
	if err != nil {

	}
	defer index.Close()
	index.Index(m1.Id, m1)
}

func TestCreateIndex(t *testing.T) {

	//documentMapping := bleve.NewDocumentMapping()
	//documentMapping.AddFieldMappingsAt("Id", bleve.NewTextFieldMapping())
	//documentMapping.AddFieldMappingsAt("Name", bleve.NewTextFieldMapping())

	createIndex()
}
func TestUpdateIndex(t *testing.T) {
	createIndex()
	index, err := bleve.Open(indexName)
	if err != nil {
		t.Log("open index err", err)
	}
	defer index.Close()
	serviceFile := service.FileService{}
	serviceFile.ScanAll()
	start := time.Now()
	fmt.Printf("%v 开始执行:%d \n", start, len(datasource.FileList))
	for idx, v := range datasource.FileList {
		index.Index(v.Id, v)
		if idx > 500 {
			break
		}
	}
	end := time.Now()
	fmt.Printf("%v 结束执行:%d \n", end, end.UnixNano()-start.UnixNano())

}

func TestBatchUpdateIndex(t *testing.T) {
	createIndex()
	index, err := bleve.Open(indexName)
	if err != nil {
		t.Log("open index err", err)
	}
	defer index.Close()
	serviceFile := service.FileService{}
	serviceFile.ScanAll()
	batch := index.NewBatch()
	start := time.Now()
	fmt.Printf("%v 开始执行:%d \n", start, len(datasource.FileList))
	for idx, v := range datasource.FileList {
		batch.Index(v.Id, v)
		if idx > 500 {
			break
		}
	}
	index.Batch(batch)
	end := time.Now()
	fmt.Printf("%v 结束执行:%d \n", end, end.UnixNano()-start.UnixNano())

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
