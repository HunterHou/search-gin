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
	SearchIndex    sync.Map // map[string]BucketFile
	CodeRepeat     []datamodels.Movie
	ActressLib     map[string]datamodels.Actress
	TotalSize      int64
	TotalCount     int
	KeywordHistory map[string]datamodels.PageResultWrapper
	Keywords       []string
}

// BucketSearchEngin 搜索引擎
var BucketSearchEngin = &SearchEnginCore{
	SearchIndex:    sync.Map{}, // map[string]BucketFile{},
	CodeRepeat:     []datamodels.Movie{},
	ActressLib:     map[string]datamodels.Actress{},
	KeywordHistory: map[string]datamodels.PageResultWrapper{},
	Keywords:       []string{},
}

func (se *SearchEnginCore) Reset() {
	se.SearchIndex.Range(func(key, value interface{}) bool {
		se.SearchIndex.Delete(key)
		return true
	})
	clear(se.CodeRepeat)
	clear(se.ActressLib)
	clear(se.KeywordHistory)
	clear(se.Keywords)
}

func (se *SearchEnginCore) Init(baseDirs []string) {
	for _, dir := range baseDirs {
		_, ok := se.SearchIndex.Load(dir)
		if !ok {
			se.SearchIndex.Store(dir, NewInstance(dir))
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
func (se *SearchEnginCore) clearHistory(uniqueWords []string) {
	if len(uniqueWords) > 0 {
		for _, word := range uniqueWords {
			delete(se.KeywordHistory, word)
		}
	} else {
		clear(se.KeywordHistory)
	}

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
		if len(se.Keywords) > 20 {
			for _, s := range se.Keywords[0:5] {
				delete(se.KeywordHistory, s)
			}
			se.Keywords = se.Keywords[5:]
		}
	} else {
		resultWrapper = datamodels.NewPageWrapper()
		resultWrapper.ResultCount = searchParam.PageSize
		se.SearchIndex.Range(func(key, value interface{}) bool {
			index := value.(BucketFile)
			if index.IsEmpty() {
				return true
			}
			indexWrapper := index.SearchBucket(searchParam)
			if !indexWrapper.IsNotEmpty() {
				return true
			}
			resultWrapper.FileList = utils.ExtendsItems(resultWrapper.FileList, indexWrapper.FileList)
			resultWrapper.SearchCount = resultWrapper.SearchCount + len(indexWrapper.FileList)
			resultWrapper.SearchSize = resultWrapper.SearchSize + indexWrapper.Size
			return true
		})
		datamodels.SortMoviesUtils(resultWrapper.FileList, searchParam.SortField, searchParam.SortType, se.LastSortField, se.LastSortType)
		se.LastSortField = searchParam.SortField
		se.LastSortType = searchParam.SortType
		se.addHistory(searchParam.UniWords(), resultWrapper)
	}
	resultWrapper.FileList, resultWrapper.ResultSize = datamodels.GetPageOfFiles(resultWrapper.FileList, searchParam.Page, searchParam.PageSize)
	return resultWrapper
}

func (se *SearchEnginCore) addHistory(uniqueWords string, resultWrapper datamodels.PageResultWrapper) {
	se.Keywords = append(se.Keywords, uniqueWords)
	se.KeywordHistory[uniqueWords] = resultWrapper
}

func (se *SearchEnginCore) FindById(id string) datamodels.Movie {
	var model = datamodels.Movie{}
	se.SearchIndex.Range(func(key, value interface{}) bool {
		index := value.(BucketFile)
		if index.IsEmpty() {
			return true
		}
		model = index.Get(id)
		if !model.IsNull() {
			return false
		}
		return true
	})
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
	se.clearHistory()
	se.SearchIndex.LoadOrStore(baseDir, bucket)
}

func (se *SearchEnginCore) BuildActress() {
	se.clearHistory([]string{})
	actressLib := map[string]datamodels.Actress{}
	var fileRepeats []datamodels.Movie
	codeRepeats := map[string]RepeatModel{}
	totalSize := int64(0)
	totalCount := 0
	se.SearchIndex.Range(func(key, value interface{}) bool {
		index := value.(BucketFile)
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
		return true
	})
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
