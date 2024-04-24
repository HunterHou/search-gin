package service

import (
	"searchGin/datamodels"
	"sync"
)

var FileApp = new(fileService)
var SearchApp = new(searchService)

// SearchEngin BucketSearchEngin 搜索引擎
var SearchEngin = searchEnginCore{
	SearchIndex:    sync.Map{}, // map[string]bucketFile{},
	CodeRepeat:     []datamodels.Movie{},
	ActressLib:     map[string]datamodels.Actress{},
	KeywordHistory: map[string]datamodels.PageResultWrapper{},
	Keywords:       []string{},
}
