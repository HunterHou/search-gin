package datasource

import (
	"searchGin/cons"
	"searchGin/datamodels"
	"sort"
)

var DefSortField = "MTime"
var DefSortType = "desc"

var FileLib = map[string]datamodels.Movie{}
var FileList []datamodels.Movie

var FileSize int64

var ActressLib = map[string]datamodels.Actress{}
var ActressList []datamodels.Actress

func SortMovieForce() {
	if cons.CurSortField == "" {
		cons.CurSortField = DefSortField
	}
	if cons.CurSortType == "" {
		cons.CurSortType = DefSortType
	}
	SortDataSourceMovies(cons.CurSortField, cons.CurSortType, true)
}

func SortMovies(movies []datamodels.Movie, sF string, sT string, refresh bool) {

	if sF == cons.CurSortField && sT == cons.CurSortType && !refresh {
		return
	}
	cons.CurSortField = sF
	cons.CurSortType = sT
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
