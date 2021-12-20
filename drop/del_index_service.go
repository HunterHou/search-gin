package drop

import (
	"fmt"
	"log"
	"os"
	"search-gin/drop/data"

	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/utils"

	"github.com/blevesearch/bleve"
	"github.com/blevesearch/bleve/mapping"
)

var BIndex bleve.Index

//  载入词典
// var segmenter sego.Segmenter
func OpenIndex() bleve.Index {
	index, _ := bleve.Open(cons.IndexName)
	return index
}

func GetIndex() bleve.Index {
	if BIndex == nil {
		BIndex = CreateIndex()
		return BIndex
	}
	return BIndex
}

func GetMapping() *mapping.IndexMappingImpl {
	mapping := bleve.NewIndexMapping()
	err := mapping.AddCustomTokenizer("sego",
		map[string]interface{}{
			"files": "data/dictionary.txt",
			"type":  data.TokenizerName,
		})
	if err != nil {
		log.Fatal(err)
	}

	// create a custom analyzer
	err = mapping.AddCustomAnalyzer("sego",
		map[string]interface{}{
			"type":      "standard",
			"tokenizer": "sego",
			"token_filters": []string{
				"possessive_en",
				"to_lower",
				"stop_en",
			},
		})

	if err != nil {
		log.Fatal(err)
	}
	mapping.DefaultAnalyzer = "sego"
	return mapping
}

func CreateIndex() bleve.Index {
	if BIndex != nil {
		BIndex.Close()
	}

	os.RemoveAll(cons.IndexName)
	index, err := bleve.New(cons.IndexName, GetMapping())
	if err != nil {
		fmt.Println("create index err", err)
	}
	BIndex = index
	return BIndex
}

func UpdateIndex(movies []datamodels.Movie) utils.Result {
	index := GetIndex()
	//batch := index.NewBatch()
	for _, movie := range movies {
		index.Index(movie.Id, movie)
		//batch.Index(movie.Id, movie)
		// &cons.IndexProgress = &cons.IndexProgress + 1
	}
	//err := index.Batch(batch)
	//if err != nil {
	//	return utils.NewFailByMsg(err.Error())
	//}
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
		queryString += "+Name:" + searchParam.Keyword
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
