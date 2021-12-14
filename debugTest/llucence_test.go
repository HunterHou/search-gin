package debugTest

import (
	"github.com/blevesearch/bleve"
	"os"
	"search-gin/datamodels"
	"testing"
)

var m1 = datamodels.Movie{
	Id:   "zhangsan",
	Name: "zhangsandename",
}

var m2 = datamodels.Movie{
	Id:   "lisi",
	Name: "lisidename",
}
var indexName = "hd.test"

func TestCreateIndex(t *testing.T) {

	documentMapping := bleve.NewDocumentMapping()
	documentMapping.AddFieldMappingsAt("Id", bleve.NewTextFieldMapping())
	documentMapping.AddFieldMappingsAt("Name", bleve.NewTextFieldMapping())

	mapping := bleve.NewIndexMapping()
	mapping.DefaultMapping = documentMapping

	os.RemoveAll(indexName)
	index, err := bleve.New(indexName, mapping)
	if err != nil {
		t.Log("create index err", err)
	}
	index.Index(m1.Id, m1)
}
func TestUpdateIndex(t *testing.T) {

	index, err := bleve.Open(indexName)
	if err != nil {
		t.Log("open index err", err)
	}
	index.Index(m1.Id, m1)
	index.Index(m2.Id, m2)
}
func TestQueryIndex(t *testing.T) {
	index, err := bleve.Open(indexName)
	if err != nil {
		t.Log("create index err", err)
	}
	query := bleve.NewQueryStringQuery("**")
	//query.SetField("Name")
	searchRequest := bleve.NewSearchRequestOptions(query, 10, 0, true)
	searchResult, _ := index.Search(searchRequest)
	results := searchResult.Hits
	t.Errorf("total:%d", results.Len())
	for _, v := range results {
		t.Errorf("id:%v", v.ID)
		t.Errorf("id:%v", v.Fields["Name"])
		for k, vs := range v.Fragments {
			t.Errorf("%s", k)
			for _, frag := range vs {
				t.Errorf("%s \n", frag)
			}
		}

	}
	t.Log(searchResult)
}
