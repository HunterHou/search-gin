package datasource

import (
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/utils"
	"sort"
	"strings"
	"sync"
)

type RepeatModel struct {
	Code  string
	Files []datamodels.Movie
	Count int
}

type SearchEnginCore struct {
	LastSortField  string
	LastSortType   string
	SearchIndex    map[string]BucketFile
	CodeRepeat     []datamodels.Movie
	ActressLib     map[string]datamodels.Actress
	TotalSize      int64
	TotalCount     int
	KeywordHistory map[string]datamodels.PageResultWrapper
}

var mutex sync.RWMutex

// BucketSearchEngin 搜索引擎
var BucketSearchEngin = SearchEnginCore{}

func InitSearchEngine(BucketSearchEngin SearchEnginCore) {
	BucketSearchEngin = SearchEnginCore{
		SearchIndex:    map[string]BucketFile{},
		CodeRepeat:     []datamodels.Movie{},
		ActressLib:     map[string]datamodels.Actress{},
		KeywordHistory: map[string]datamodels.PageResultWrapper{},
	}
}
func init() {
	InitSearchEngine(BucketSearchEngin)
}

func (se *SearchEnginCore) Reset() {
	InitSearchEngine(BucketSearchEngin)
}

func (se *SearchEnginCore) Init(baseDirs []string) {
	for _, dir := range baseDirs {
		_, ok := se.SearchIndex[dir]
		if !ok {
			se.SearchIndex[dir] = NewInstance(dir)
		}
	}
}

func (se *SearchEnginCore) IsEmpty() bool {
	return se.TotalCount == 0
}

func (se *SearchEnginCore) PageActress(searchParam datamodels.SearchParam) datamodels.PageActressResultWrapper {
	resultWrapper := datamodels.SearchActressByKeyWord(se.ActressLib, searchParam.Keyword)
	sort.Slice(resultWrapper.FileList, func(i, j int) bool {
		return resultWrapper.FileList[i].Size > resultWrapper.FileList[j].Size
	})
	list, size := datamodels.GetActressPageOfFiles(resultWrapper.FileList, searchParam.Page, searchParam.PageSize)
	resultWrapper.FileList = list
	resultWrapper.Size = size
	resultWrapper.ResultCount = len(list)
	return resultWrapper
}
func (se *SearchEnginCore) clearHistory() {
	se.KeywordHistory = map[string]datamodels.PageResultWrapper{}
}

func (se *SearchEnginCore) Page(searchParam datamodels.SearchParam) datamodels.PageResultWrapper {
	if searchParam.OnlyRepeat {
		resultWrapper := datamodels.NewPageWrapper()
		resultWrapper.FileList = se.CodeRepeat
		resultWrapper.ResultCount = len(se.CodeRepeat)
		resultWrapper.LibCount = len(se.CodeRepeat)
		resultWrapper.SearchCount = len(se.CodeRepeat)
		return resultWrapper
	}
	resultWrapper, ok := se.KeywordHistory[searchParam.UniWords()]
	if ok {
		if len(se.KeywordHistory) > 10 {
			se.clearHistory()
		}
	} else {
		resultWrapper = datamodels.NewPageWrapper()
		resultWrapper.ResultCount = searchParam.PageSize
		for _, index := range se.SearchIndex {
			if index.IsEmpty() {
				continue
			}
			indexWrapper := index.SearchBucket(searchParam)
			if !indexWrapper.IsNotEmpty() {
				continue
			}
			resultWrapper.FileList = utils.ExtendsItems(resultWrapper.FileList, indexWrapper.FileList)
			resultWrapper.SearchCount = resultWrapper.SearchCount + len(indexWrapper.FileList)
			resultWrapper.SearchSize = resultWrapper.SearchSize + indexWrapper.Size
		}
		datamodels.SortMoviesUtils(resultWrapper.FileList, searchParam.SortField, searchParam.SortType, se.LastSortField, se.LastSortType)
		se.LastSortField = searchParam.SortField
		se.LastSortType = searchParam.SortType
		se.KeywordHistory[searchParam.UniWords()] = resultWrapper
	}
	resultWrapper.FileList, resultWrapper.ResultSize = datamodels.GetPageOfFiles(resultWrapper.FileList, searchParam.Page, searchParam.PageSize)
	return resultWrapper
}

func (se *SearchEnginCore) FindById(id string) datamodels.Movie {
	var model = datamodels.Movie{}
	for _, si := range se.SearchIndex {
		model = si.Get(id)
		if !model.IsNull() {
			break
		}
	}
	return model
}

func (se *SearchEnginCore) FindActressByName(id string) datamodels.Actress {
	act, ok := se.ActressLib[id]
	if ok {
		return act
	}
	return datamodels.Actress{}
}

func (se *SearchEnginCore) SetBucket(baseDir string, bucket BucketFile) {
	mutex.Lock()
	if se.SearchIndex == nil {
		se.SearchIndex = map[string]BucketFile{}
	}
	se.clearHistory()
	se.SearchIndex[baseDir] = bucket
	defer mutex.Unlock()
}

func (se *SearchEnginCore) BuildActress() {
	actressLib := map[string]datamodels.Actress{}
	var fileRepeats []datamodels.Movie
	codeRepeats := map[string]RepeatModel{}
	totalSize := int64(0)
	totalCount := 0
	for _, index := range se.SearchIndex {
		if index.IsNotEmpty() {
			totalSize += index.TotalSize
			totalCount += index.TotalCount
			for _, movie := range index.FileLib {
				cons.TypeSizePlus(movie.MovieType, movie.Size)
				if len(movie.Tags) > 0 {
					for i := 0; i < len(movie.Tags); i++ {
						cons.TagSizePlus(movie.Tags[i], movie.Size)
					}

				}
				if len(movie.Actress) > 0 {
					curActress, ok := actressLib[movie.Actress]
					if ok {
						curActress.PlusCnt()
						curActress.PlusSize(movie.Size)
						curActress.AddImage(movie.Png)
						curActress.AddImage(movie.Jpg)
						actressLib[movie.Actress] = curActress
					} else {
						actressLib[movie.Actress] = datamodels.NewActress(movie.Actress, movie.Jpg, movie.Size)
					}

				}
				pkCode := movie.Code
				strings.ReplaceAll(pkCode, "-", "")
				strings.ReplaceAll(pkCode, "_", "")
				repeatFile, ok := codeRepeats[pkCode]
				if ok {
					repeatFile.Count = repeatFile.Count + 1
					repeatFile.Files = append(repeatFile.Files, movie)
					codeRepeats[pkCode] = repeatFile
				} else {
					codeRepeats[pkCode] = RepeatModel{
						Code:  movie.Code,
						Files: []datamodels.Movie{movie},
						Count: 1,
					}
				}

			}
		}
	}
	for _, model := range codeRepeats {
		if model.Count > 1 {
			fileRepeats = utils.ExtendsItems(fileRepeats, model.Files)
		}
	}
	se.ActressLib = actressLib
	se.CodeRepeat = fileRepeats
	se.TotalCount = totalCount
	se.TotalSize = totalSize
}
