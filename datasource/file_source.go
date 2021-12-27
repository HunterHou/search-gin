package datasource

import (
	"sort"
	"strings"

	"search-gin/datamodels"
	"search-gin/utils"

	"github.com/huichen/sego"
)

var DefSortField = "MTime"
var DefSortType = "desc"

var CurSortField = ""
var CurSortType = ""

var FileLib = map[string]datamodels.Movie{}
var FileList []datamodels.Movie

var FileSize int64

var ActressLib = map[string]datamodels.Actress{}
var ActressList []datamodels.Actress
var SupplierLib = map[string]datamodels.Supplier{}

var IndexData = map[string][]string{}

var segmenter sego.Segmenter

func init() {
	//  载入词典
	// segmenter.LoadDictionary("./data/dictionary.txt")
}

func GoAddMovieByPage(movie []datamodels.Movie, pageSize int, indexOver *bool) {
	*indexOver = false
	IndexData = map[string][]string{}
	AddMovieByPage(movie, pageSize)
	*indexOver = true
}

func AddMovieByPage(movie []datamodels.Movie, pageSize int) {
	start := 0
	length := len(movie)
	var current []datamodels.Movie
	for i := 0; i < len(movie); i++ {
		start++
		current = append(current, movie[i])
		if start == pageSize || start == (length-1) {
			addMovie(current)
			start = 0
		}
	}
}

func addMovie(movie []datamodels.Movie) {
	for i := 0; i < len(movie); i++ {
		updateSearchData(movie[i])
	}
}

// 更新搜索库
func updateSearchData(movie datamodels.Movie) {
	words := []string{movie.Actress, movie.Code}
	words = utils.ExtandsItems(words, getKeywords(movie.Name))
	words = utils.RemoveItem(words, " ")
	for i := 0; i < len(words); i++ {
		word := strings.TrimSpace(words[i])
		arr, ok := IndexData[word]
		if ok {
			if utils.HasItem(arr, movie.Id) {
				continue
			}
			arr = append(arr, movie.Id)
		} else {
			arr = []string{movie.Id}
		}
		IndexData[word] = arr
	}
}

//分词
func getKeywords(str string) []string {
	text := []byte(str)
	segments := segmenter.Segment(text)
	arr := sego.SegmentsToSlice(segments, true)
	arr = utils.RemoveItem(arr, "-")
	arr = utils.RemoveItem(arr, "[")
	arr = utils.RemoveItem(arr, "_")
	arr = utils.RemoveItem(arr, ".")
	arr = utils.RemoveItem(arr, "{")
	arr = utils.RemoveItem(arr, "}")
	return arr
}

func SortMovieForce() {
	if CurSortField == "" {
		CurSortField = DefSortField
	}
	if CurSortType == "" {
		CurSortType = DefSortType
	}
	SortDataSourceMovies(CurSortField, CurSortType, true)
}

func SortMovies(movies []datamodels.Movie, sF string, sT string, refresh bool) {

	if sF == CurSortField && sT == CurSortType && !refresh {
		return
	}
	CurSortField = sF
	CurSortType = sT
	sort.Slice(movies, func(i, j int) bool {

		if sF == "Code" && sT == "desc" {
			return movies[i].Code > movies[j].Code
		} else if sF == "Code" && sT == "asc" {
			return movies[i].Code < movies[j].Code
		} else if sF == "Size" && sT == "desc" {
			return movies[i].Size > movies[j].Size
		} else if sF == "Size" && sT == "asc" {
			return movies[i].Size < movies[j].Size
		} else if sF == "MTime" && sT == "desc" {
			return movies[i].MTime > movies[j].MTime
		} else if sF == "MTime" && sT == "asc" {
			return movies[i].MTime < movies[j].MTime
		} else {
			return movies[i].MTime > movies[j].MTime
		}

	})
}

func SortDataSourceMovies(sF string, sT string, refresh bool) {
	SortMovies(FileList, sF, sT, refresh)
}
