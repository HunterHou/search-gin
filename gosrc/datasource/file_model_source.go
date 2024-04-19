package datasource

import (
	"searchGin/cons"
	"searchGin/datamodels"
	"sort"
	"strings"
	// "github.com/huichen/sego"
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

func GetPageOfFiles(files []datamodels.Movie, pageNo int, pageSize int) ([]datamodels.Movie, int64) {
	if len(files) == 0 {
		return files, 0
	}
	if pageNo <= 0 {
		pageNo = 1
	}
	length := len(files)
	start := (pageNo - 1) * pageSize

	end := length
	if length-start >= pageSize {
		end = start + pageSize
	}
	if len(files) <= pageSize {
		return files, 0
	}

	var data []datamodels.Movie
	var volume int64
	for i := start; i < end; i++ {
		curFile := files[i]
		volume += curFile.Size
		data = append(data, curFile)
	}
	return data, volume
}

func SearchByKeyWord(files map[string]datamodels.Movie, keyWord string, movieType string) datamodels.SearchResultWrapper {

	resultWrapper := datamodels.NewSearchWrapper()
	if (keyWord == "" || keyWord == "undefined") && (movieType == "" || movieType == "undefined") {
		for _, file := range files {
			resultWrapper.AddWrapperItem(file)
		}
		return resultWrapper
	}
	for _, file := range files {
		if movieType != "" {
			if file.MovieType != movieType {
				continue
			}
		}
		isAdd := false
		if len(keyWord) > 0 {
			arr := strings.Split(keyWord, " ")
			for i := 0; i < len(arr); i++ {
				words := arr[i]
				if len(words) == 0 || words == " " {
					break
				}
				if strings.Contains(strings.ToUpper(file.Code), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Name), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Actress), strings.ToUpper(words)) {
					isAdd = true
					break
				} else if strings.Contains(strings.ToUpper(file.Path), strings.ToUpper(words)) {
					isAdd = true
					break
				}
			}
		} else {
			isAdd = true
		}

		if isAdd {
			resultWrapper.AddWrapperItem(file)
		}

	}

	return resultWrapper
}
