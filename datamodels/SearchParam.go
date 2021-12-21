package datamodels

import "strings"

// SearchParam 查询参数
type SearchParam struct {
	Keyword    string
	OnlyRepeat bool
	MovieType  string
	Page       int
	PageSize   int
	SortField  string
	SortType   string
}

func NewSearchParam(keyword string, page int, pageSize int, sortField string, sortType string, moiveType string) SearchParam {
	res := SearchParam{
		Keyword:   strings.TrimSpace(keyword),
		Page:      page,
		PageSize:  pageSize,
		SortField: sortField,
		SortType:  sortType,
		MovieType: strings.TrimSpace(moiveType),
	}
	return res

}

func (p *SearchParam) GetKeywords() string {
	p.Keyword = strings.TrimSpace(p.Keyword)
	return p.Keyword
}

func (p *SearchParam) GetMovieType() string {
	p.MovieType = strings.TrimSpace(p.MovieType)
	return p.MovieType
}

func (p *SearchParam) SetOnlyRepeat(b bool) {
	p.OnlyRepeat = b
}

func (p *SearchParam) StartNum() int {
	if p.Page == 0 {
		return 0
	}
	return (p.Page - 1) * p.PageSize
}

func (p *SearchParam) GetPageSize() int {
	if p.PageSize == 0 {
		return 0
	}
	return p.PageSize
}

func (p *SearchParam) GetPage() int {
	if p.Page == 0 {
		return 0
	}
	return p.Page
}

func (p *SearchParam) GetSort() []string {
	var sortType = "+"
	if p.SortType == "desc" {
		sortType = "-"
	}
	sortType += p.GetSortField()
	return []string{sortType}
}

func (p *SearchParam) GetSortField() string {
	if p.SortField == "" {
		p.SortField = "mtime"
	}
	return p.SortField
}
