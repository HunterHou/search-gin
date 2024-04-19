package datasource

import (
	"searchGin/datamodels"
)

type BucketFile struct {
	InstanceName   string
	LastSortField  string
	LastSortType   string
	TotalSize      int64
	TotalCount     int
	FileLib        map[string]datamodels.Movie
	KeywordHistory map[string]datamodels.SearchResultWrapper
}

func NewInstance(name string) BucketFile {
	return BucketFile{
		InstanceName:   name,
		TotalSize:      0,
		TotalCount:     0,
		FileLib:        map[string]datamodels.Movie{},
		KeywordHistory: map[string]datamodels.SearchResultWrapper{},
	}
}

func (fs *BucketFile) IsNotEmpty() bool {
	return len(fs.FileLib) > 0
}

func (fs *BucketFile) IsEmpty() bool {
	return !fs.IsNotEmpty()
}

func (fs *BucketFile) Clear() {
	fs.FileLib = map[string]datamodels.Movie{}
	fs.KeywordHistory = map[string]datamodels.SearchResultWrapper{}
}

func (fs *BucketFile) ClearHistory() {
	fs.KeywordHistory = map[string]datamodels.SearchResultWrapper{}
}

func (fs *BucketFile) Put(model datamodels.Movie) {
	fs.FileLib[model.Id] = model
	fs.TotalSize = fs.TotalSize + model.Size
	fs.TotalCount = fs.TotalCount + 1
}

func (fs *BucketFile) Get(id string) datamodels.Movie {
	model, ok := fs.FileLib[id]
	if ok {
		return model
	}
	return datamodels.Movie{}
}

func (fs *BucketFile) Page(searchParam datamodels.SearchParam) datamodels.PageResultWrapper {
	resultWrapper := datamodels.NewPageWrapper()
	searchWrapper := fs.Filter(searchParam)
	if searchWrapper.IsEmpty() {
		return resultWrapper
	}
	resultWrapper.SearchCount = len(searchWrapper.FileList)
	resultWrapper.SearchSize = searchWrapper.Size
	list, size := datamodels.GetPageOfFiles(searchWrapper.FileList, searchParam.Page, searchParam.PageSize)
	resultWrapper.FileList = list
	resultWrapper.Size = size
	return resultWrapper
}

func (fs *BucketFile) Filter(searchParam datamodels.SearchParam) datamodels.SearchResultWrapper {
	wrapper, ok := fs.KeywordHistory[searchParam.UniWords()]
	if ok {
		if len(fs.KeywordHistory) > 40 {
			fs.ClearHistory()
		}
		return wrapper
	}
	resultWrapper := datamodels.SearchByKeyWord(fs.FileLib, searchParam.Keyword, searchParam.MovieType)
	if resultWrapper.IsEmpty() {
		return resultWrapper
	}
	datamodels.SortMoviesUtils(resultWrapper.FileList, searchParam.SortField, searchParam.SortType, fs.LastSortField, fs.LastSortType)
	fs.LastSortField = searchParam.SortField
	fs.LastSortType = searchParam.SortType
	if resultWrapper.IsNotEmpty() {
		fs.KeywordHistory[searchParam.UniWords()] = resultWrapper
	}
	return resultWrapper
}
