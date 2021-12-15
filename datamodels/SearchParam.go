package datamodels

type SearchParam struct {
	Keyword            string
	Page               int
	PageSize           int
	SortFieldSortField string
	SortType           string
}

func (p *SearchParam) StartNum() int {
	if p.Page == 0 {
		return 0
	}
	return (p.Page - 1) * p.PageSize
}

func (p *SearchParam) GetPageSize() int {
	if p.Page == 0 {
		return 0
	}
	return (p.Page - 1) * p.PageSize
}

func (p *SearchParam) GetPage() int {
	if p.Page == 0 {
		return 0
	}
	return p.Page
}

func (p *SearchParam) GetSort() []string {
	return []string{p.SortType}
}
