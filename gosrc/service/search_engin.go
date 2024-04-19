package service

import (
	"searchGin/datamodels"
	"searchGin/datasource"
)

type SearchEnginCore struct {
	SearchIndex map[string]datasource.BucketFile
}

var BucketSearchEngin = SearchEnginCore{
	SearchIndex: map[string]datasource.BucketFile{},
}

func (se SearchEnginCore) Init(baseDirs []string) {
	for _, dir := range baseDirs {
		_, ok := se.SearchIndex[dir]
		if !ok {
			se.SearchIndex[dir] = datasource.NewInstance(dir)
		}
	}
}

func (se SearchEnginCore) Reset() {
	for _, si := range se.SearchIndex {
		si.Clear()
	}
}

func (se SearchEnginCore) put(baseDir string, movie datamodels.Movie) {
	bucket, ok := se.SearchIndex[baseDir]
	if !ok {
		bucket = datasource.NewInstance(baseDir)
	}
	bucket.Put(movie)
}

func (se SearchEnginCore) Set(baseDir string, bucket datasource.BucketFile) {
	se.SearchIndex[baseDir] = bucket
}
