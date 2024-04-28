package service

import (
	"searchGin/datamodels"
	"searchGin/utils"
	"sync"
)

type bucketFile struct {
	InstanceName string
	TotalSize    int64
	TotalCount   int
	FileLib      map[string]datamodels.Movie
}

func newInstance(name string) bucketFile {
	return bucketFile{
		InstanceName: name,
		TotalSize:    0,
		TotalCount:   0,
		FileLib:      map[string]datamodels.Movie{},
	}
}

func newInstanceWithFiles(baseDir string, files []datamodels.Movie) bucketFile {
	bucket := newInstance(baseDir)
	for _, file := range files {
		bucket.put(file)
	}
	return bucket
}

func (fs *bucketFile) isNotEmpty() bool {
	return len(fs.FileLib) > 0
}

func (fs *bucketFile) isEmpty() bool {
	return !fs.isNotEmpty()
}

func (fs *bucketFile) FetchInfo() {
	for s, movie := range fs.FileLib {
		movie.Actress = utils.GetActress(movie.Name)
		movie.Code = utils.GetCode(movie.Name)
		fs.FileLib[s] = movie
	}
}

func (fs *bucketFile) put(model datamodels.Movie) {
	fs.FileLib[model.Id] = model
	fs.TotalSize = fs.TotalSize + model.Size
	fs.TotalCount = fs.TotalCount + 1
}
func (fs *bucketFile) set(data map[string]datamodels.Movie) {
	fs.FileLib = data
}

func (fs *bucketFile) get(id string) datamodels.Movie {
	model, ok := fs.FileLib[id]
	if ok {
		return model
	}
	return datamodels.Movie{}
}

func (fs *bucketFile) searchBucket(searchParam datamodels.SearchParam) datamodels.SearchResultWrapper {
	resultWrapper := datamodels.SearchByKeyWord(fs.FileLib, searchParam.Keyword, searchParam.MovieType)
	return resultWrapper
}

var wg sync.WaitGroup

func (fs *bucketFile) searchBucketAsync(searchParam datamodels.SearchParam, wg sync.WaitGroup, result chan datamodels.SearchResultWrapper) {
	defer wg.Done()
	resultWrapper := datamodels.SearchByKeyWord(fs.FileLib, searchParam.Keyword, searchParam.MovieType)
	result <- resultWrapper
}
