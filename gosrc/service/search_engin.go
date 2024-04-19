package service

import (
	"searchGin/datamodels"
	"searchGin/datasource"
	"searchGin/utils"
)

type RepeatModel struct {
	Code  string
	Files []datamodels.Movie
	Count int
}

type SearchEnginCore struct {
	LastSortField string
	LastSortType  string
	SearchIndex   map[string]datasource.BucketFile
	CodeRepeat    []datamodels.Movie
	ActressLib    map[string]datamodels.Actress
	TotalSize     int64
	TotalCount    int
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

func (se SearchEnginCore) Page(searchParam datamodels.SearchParam) datamodels.PageResultWrapper {
	resultWrapper := datamodels.NewPageWrapper()
	resultWrapper.ResultCount = searchParam.PageSize
	for _, index := range se.SearchIndex {
		indeWrapper := index.Page(searchParam)
		resultWrapper.FileList = utils.ExtendsItems(resultWrapper.FileList, indeWrapper.FileList)
		resultWrapper.SearchCount = resultWrapper.SearchCount + indeWrapper.SearchCount
		resultWrapper.SearchSize = resultWrapper.SearchSize + indeWrapper.SearchSize
	}
	datamodels.SortMoviesUtils(resultWrapper.FileList, searchParam.SortField, searchParam.SortType, se.LastSortField, se.LastSortType)
	se.LastSortField = searchParam.SortField
	se.LastSortType = searchParam.SortType
	resultWrapper.FileList, resultWrapper.ResultSize = datamodels.GetPageOfFiles(resultWrapper.FileList, searchParam.Page, searchParam.PageSize)
	return resultWrapper
}

func (se SearchEnginCore) BuildActress() {
	actressLib := map[string]datamodels.Actress{}
	fileRepeats := []datamodels.Movie{}
	codeRepeats := map[string]RepeatModel{}
	totalSize := int64(0)
	totalCount := 0
	for _, index := range se.SearchIndex {
		if index.IsNotEmplty() {
			totalSize += index.TotalSize
			totalCount += index.TotalCount
			for _, movie := range index.FileLib {
				if len(movie.Actress) > 0 {
					curActress, ok := actressLib[movie.Actress]
					if ok {
						curActress.PlusCnt()
						curActress.PlusSize(movie.Size)
						curActress.AddImage(movie.Png)
						curActress.AddImage(movie.Jpg)
					} else {
						actressLib[movie.Actress] = datamodels.NewActress(movie.Actress, movie.Jpg, movie.Size)
					}

				}
				repeatFile, ok := codeRepeats[movie.Code]
				if ok {
					repeatFile.Count = repeatFile.Count + 1
					repeatFile.Files = append(repeatFile.Files, movie)
				} else {
					codeRepeats[movie.Code] = RepeatModel{
						Code:  movie.Code,
						Files: []datamodels.Movie{movie},
						Count: 1,
					}
				}

			}
		}
	}
	for _, model := range codeRepeats {
		if model.Count > 0 {
			fileRepeats = utils.ExtendsItems(fileRepeats, model.Files)
		}
	}
	se.ActressLib = actressLib
	se.CodeRepeat = fileRepeats
	se.TotalCount = totalCount
	se.TotalSize = totalSize
}

func (se SearchEnginCore) FindById(id string) datamodels.Movie {
	var model = datamodels.Movie{}
	for _, si := range se.SearchIndex {
		model = si.Get(id)
		if !model.IsNull() {
			break
		}
	}
	return model
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
