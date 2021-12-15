package service

import (
	"fmt"
	"github.com/blevesearch/bleve"
	"os"
	"strings"

	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/utils"
)

func CreateIndex() utils.Result {
	mapping := bleve.NewIndexMapping()
	os.RemoveAll(cons.IndexName)
	index, err := bleve.New(cons.IndexName, mapping)
	if err != nil {
		fmt.Println("create index err", err)
	}
	defer index.Close()
	return utils.NewSuccessByMsg("创建成功")
}

func UpdateIndex(movies []datamodels.Movie) utils.Result {
	index, err := bleve.Open(cons.IndexName)
	if err != nil {
		fmt.Println("open index err", err)
	}
	defer index.Close()
	for _, movie := range movies {
		index.Index(movie.Id, movie)
	}
	return utils.NewSuccessByMsg("更新成功")
}
func DeleteIndex(movies []datamodels.Movie) utils.Result {
	index, err := bleve.Open(cons.IndexName)
	if err != nil {
		fmt.Println("open index err", err)
	}
	defer index.Close()
	for _, movie := range movies {
		index.Index(movie.Id, movie)
	}
	return utils.NewSuccessByMsg("删除成功")
}

func SearchIndex(searchParam datamodels.SearchParam) ([]datamodels.Movie, int64) {
	index, err := bleve.Open(cons.IndexName)
	if err != nil {
		fmt.Println("open index err", err)
	}
	defer index.Close()
	var queryString = ""
	if searchParam.Keyword != "" {
		for _, s := range strings.Split(searchParam.Keyword, " ") {
			queryString += "+Name:" + s
		}
	}
	query := bleve.NewQueryStringQuery(queryString)
	searchRequest := bleve.NewSearchRequestOptions(query, searchParam.GetPageSize(), searchParam.StartNum(), false)
	searchRequest.Fields = cons.MovieFields
	searchRequest.SortBy(searchParam.GetSort())
	searchResult, _ := index.Search(searchRequest)
	results := searchResult.Hits
	totalModels := make([]datamodels.Movie, results.Len())
	totalSize := int64(0)
	for _, v := range results {
		mo := datamodels.Movie{}
		utils.FieldsMapToStruck(&mo, v.Fields)
		totalSize += mo.Size
		totalModels = append(totalModels, mo)
	}
	return totalModels, totalSize

}
