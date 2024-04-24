package service

import (
	"searchGin/datamodels"
	"searchGin/datasource"
	"sync"
)

var FileApp = new(fileService)
var SearchApp = new(searchService)

// SearchEngin BucketSearchEngin 搜索引擎
var SearchEngin = datasource.SearchEnginCore{
	SearchIndex:    sync.Map{}, // map[string]BucketFile{},
	CodeRepeat:     []datamodels.Movie{},
	ActressLib:     map[string]datamodels.Actress{},
	KeywordHistory: map[string]datamodels.PageResultWrapper{},
	Keywords:       []string{},
}
