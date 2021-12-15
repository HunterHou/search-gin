package datamodels

type SearchParam struct {
	Keyword   string
	Page      int
	PageSize  int
	SortField string
	SortType  string
}

func NewSearchParam(keyword string, page int, pageSize int, sortField string, sortType string) SearchParam {
	res := SearchParam{
		Keyword:   keyword,
		Page:      page,
		PageSize:  pageSize,
		SortField: sortField,
		SortType:  sortType,
	}
	return res

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
