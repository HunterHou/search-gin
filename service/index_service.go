package service

import (
	"fmt"
	"os"
	"strings"

	"github.com/blevesearch/bleve"

	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/utils"
)

var bIndex bleve.Index

func GetIndex() bleve.Index {
	if bIndex == nil {
		bIndex = CreateIndex()
		return bIndex
	}
	return bIndex
}

func CreateIndex() bleve.Index {
	if bIndex != nil {
		bIndex.Close()
	}
	mapping := bleve.NewIndexMapping()
	os.RemoveAll(cons.IndexName)
	index, err := bleve.New(cons.IndexName, mapping)
	if err != nil {
		fmt.Println("create index err", err)
	}
	bIndex = index
	return bIndex
}

func UpdateIndex(movies []datamodels.Movie) utils.Result {
	index := GetIndex()
	for _, movie := range movies {
		index.Index(movie.Id, movie)
		// &cons.IndexProgress = &cons.IndexProgress + 1
	}
	return utils.NewSuccessByMsg("更新成功")
}
func DeleteIndexes(movies []datamodels.Movie) utils.Result {
	index := GetIndex()
	for _, movie := range movies {
		index.Delete(movie.Id)
	}
	return utils.NewSuccessByMsg("删除成功")
}
func DeleteIndex(id string) utils.Result {
	index := GetIndex()
	index.Delete(id)
	return utils.NewSuccessByMsg("删除成功")
}

func SearchIndex(searchParam datamodels.SearchParam) ([]datamodels.Movie, int64, int) {
	index := GetIndex()
	var queryString = ""
	if searchParam.Keyword != "" {
		queryString += "+Name:["
		for _, s := range strings.Split(searchParam.Keyword, " ") {
			queryString += s
		}
		queryString += "]"
	} else {
		queryString = "*"
	}
	from := searchParam.StartNum()
	size := searchParam.GetPageSize()
	query := bleve.NewQueryStringQuery(queryString)
	searchRequest := bleve.NewSearchRequestOptions(query, size, from, false)
	searchRequest.Fields = cons.MovieFields
	searchRequest.Highlight = bleve.NewHighlight()
	searchRequest.SortBy(searchParam.GetSort())
	searchResult, ere := index.Search(searchRequest)
	totalModels := []datamodels.Movie{}
	totalSize := int64(0)
	total := int(searchResult.Total)
	if ere != nil {
		fmt.Println(ere)
		return totalModels, totalSize, total
	}
	results := searchResult.Hits
	for _, v := range results {
		mo := datamodels.Movie{}
		utils.FieldsMapToStruck(&mo, v.Fields)
		totalSize += mo.Size
		totalModels = append(totalModels, mo)
	}
	return totalModels, totalSize, total

}
