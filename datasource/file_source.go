package datasource

import (
	"sort"

	"search-gin/datamodels"
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

func SortMovieForce() {
	if CurSortField == "" {
		CurSortField = DefSortField
	}
	if CurSortType == "" {
		CurSortType = DefSortType
	}
	SortMovies(CurSortField, CurSortType, true)
}

func SortMovies(sF string, sT string, refresh bool) {
	if sF == CurSortField && sT == CurSortType && !refresh {
		return
	}
	CurSortField = sF
	CurSortType = sT
	sort.Slice(FileList, func(i, j int) bool {

		if sF == "Code" && sT == "desc" {
			return FileList[i].Code > FileList[j].Code
		} else if sF == "Code" && sT == "asc" {
			return FileList[i].Code < FileList[j].Code
		} else if sF == "Size" && sT == "desc" {
			return FileList[i].Size > FileList[j].Size
		} else if sF == "Size" && sT == "asc" {
			return FileList[i].Size < FileList[j].Size
		} else if sF == "MTime" && sT == "desc" {
			return FileList[i].MTime > FileList[j].MTime
		} else if sF == "MTime" && sT == "asc" {
			return FileList[i].MTime < FileList[j].MTime
		} else {
			return FileList[i].MTime > FileList[j].MTime
		}

	})
}
