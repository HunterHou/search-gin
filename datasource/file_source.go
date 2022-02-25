package datasource

import (
	"sort"

	"search-gin/datamodels"
	// "github.com/huichen/sego"
)

var DefSortField = "MTime"
var DefSortType = "desc"

var CurSortField = ""
var CurSortType = ""

var FileLib = map[int64]datamodels.Movie{}
var FileList []datamodels.Movie

var FileSize int64

var ActressLib = map[string]datamodels.Actress{}
var ActressList []datamodels.Actress
var SupplierLib = map[string]datamodels.Supplier{}

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
