package debugTest

import (
	"github.com/blevesearch/bleve"
	"os"
	"search-gin/datamodels"
	"search-gin/utils"
	"testing"
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
var indexName = "hd.test"
var mFields = utils.InterfaceFields(m1)

func TestCreateIndex(t *testing.T) {

	//documentMapping := bleve.NewDocumentMapping()
	//documentMapping.AddFieldMappingsAt("Id", bleve.NewTextFieldMapping())
	//documentMapping.AddFieldMappingsAt("Name", bleve.NewTextFieldMapping())

	mapping := bleve.NewIndexMapping()
	//mapping.DefaultMapping = documentMapping

	os.RemoveAll(indexName)
	index, err := bleve.New(indexName, mapping)
	defer index.Close()
	if err != nil {
		t.Log("create index err", err)
	}
	index.Index(m1.Id, m1)
}
func TestUpdateIndex(t *testing.T) {

	index, err := bleve.Open(indexName)
	defer index.Close()
	if err != nil {
		t.Log("open index err", err)
	}
	//index.Index(m1.Id, m1)
	index.Index(m2.Id, m2)
	index.Index(m3.Id, m3)

}
func TestQueryIndex(t *testing.T) {
	index, err := bleve.Open(indexName)
	if err != nil {
		t.Log("create index err", err)
	}
	query := bleve.NewQueryStringQuery("+Name:*name*")
	searchRequest := bleve.NewSearchRequestOptions(query, 10, 0, false)
	searchRequest.Fields = mFields
	searchResult, _ := index.Search(searchRequest)
	results := searchResult.Hits
	t.Errorf("total:%d", results.Len())
	for _, v := range results {
		mo := datamodels.Movie{}
		utils.FieldsMapToStruck(&mo, v.Fields)
		t.Logf("%s:%v", mo.Id, mo)
	}
	t.Log(searchResult)
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
