package service

import (
	"searchGin/datasource"
)

type SearchEnginCore struct {
	SearchIndex map[string]datasource.BucketFile
}

var SearchIndexEngin = SearchEnginCore{
	SearchIndex: map[string]datasource.BucketFile{},
}

func (se SearchEnginCore) Init(baseDirs []string) {
	for _, dir := range baseDirs {
		se.SearchIndex[dir] = datasource.NewInstance(dir)
	}
}
