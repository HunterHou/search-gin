package datasource

import (
	"searchGin/datamodels"
)

type BucketFile struct {
	InstanceName   string
	FileLib        map[string]datamodels.Movie
	KeywordHistory map[string]datamodels.SearchResultWrapper
}

func NewInstance(name string) BucketFile {
	return BucketFile{
		InstanceName:   name,
		FileLib:        map[string]datamodels.Movie{},
		KeywordHistory: map[string]datamodels.SearchResultWrapper{},
	}
}

func (fs BucketFile) Clear() {
	fs.FileLib = map[string]datamodels.Movie{}
	fs.KeywordHistory = map[string]datamodels.SearchResultWrapper{}
}

func (fs BucketFile) ClearHistory() {
	fs.KeywordHistory = map[string]datamodels.SearchResultWrapper{}
}

func (fs BucketFile) Put(model datamodels.Movie) {
	fs.FileLib[model.Id] = model
}

func (fs BucketFile) Get(id string) datamodels.Movie {
	return fs.FileLib[id]
}

func (fs BucketFile) Page(searchParam datamodels.SearchParam) datamodels.PageResultWrapper {
	resultWrapper := datamodels.NewPageWrapper()
	searchWrapper := fs.Filter(searchParam)
	resultWrapper.SearchCount = len(searchWrapper.FileList)
	resultWrapper.SearchSize = searchWrapper.Size
	list, size := GetPageOfFiles(searchWrapper.FileList, searchParam.Page, searchParam.PageSize)
	resultWrapper.FileList = list
	resultWrapper.Size = size
	return resultWrapper
}

func (fs BucketFile) Filter(searchParam datamodels.SearchParam) datamodels.SearchResultWrapper {
	wrapper, ok := fs.KeywordHistory[searchParam.UniWords()]
	if ok {
		if len(fs.KeywordHistory) > 40 {
			fs.ClearHistory()
		}
		return wrapper
	}
	resultWrapper := SearchByKeyWord(fs.FileLib, searchParam.Keyword, searchParam.MovieType)
	resultWrapper.SortMovies(searchParam.SortField, searchParam.SortType)
	fs.KeywordHistory[searchParam.UniWords()] = resultWrapper

	return resultWrapper
}
