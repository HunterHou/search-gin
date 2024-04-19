package datamodels

import "sort"

type SearchResultWrapper struct {
	LastSortField string
	LastSortType  string
	FileList      []Movie
	Size          int64
}

func NewSearchWrapper() SearchResultWrapper {
	return SearchResultWrapper{
		FileList:      []Movie{},
		LastSortField: "",
		LastSortType:  "",
		Size:          0,
	}
}

func (fsw SearchResultWrapper) IsEmpty() bool {
	return len(fsw.FileList) == 0
}

func (fsw SearchResultWrapper) SortMovies(sF string, sT string) {
	if sF == fsw.LastSortField && sT == fsw.LastSortField {
		return
	}
	sort.Slice(fsw.FileList, func(i, j int) bool {
		if sF == "Code" && sT == "desc" {
			return fsw.FileList[i].Code > fsw.FileList[j].Code
		} else if sF == "Code" && sT == "asc" {
			return fsw.FileList[i].Code < fsw.FileList[j].Code
		} else if sF == "Size" && sT == "desc" {
			return fsw.FileList[i].Size > fsw.FileList[j].Size
		} else if sF == "Size" && sT == "asc" {
			return fsw.FileList[i].Size < fsw.FileList[j].Size
		} else if sF == "MTime" && sT == "desc" {
			return fsw.FileList[i].MTime > fsw.FileList[j].MTime
		} else if sF == "MTime" && sT == "asc" {
			return fsw.FileList[i].MTime < fsw.FileList[j].MTime
		} else {
			return fsw.FileList[i].MTime > fsw.FileList[j].MTime
		}
	})
}

func (fsw SearchResultWrapper) AddWrapperItem(model Movie) {
	fsw.FileList = append(fsw.FileList, model)
	fsw.Size += model.Size
}
