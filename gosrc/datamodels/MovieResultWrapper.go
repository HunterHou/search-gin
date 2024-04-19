package datamodels

type SearchResultWrapper struct {
	FileList []Movie
	Size     int64
}

func NewSearchWrapper() SearchResultWrapper {
	return SearchResultWrapper{
		FileList: []Movie{},
		Size:     0,
	}
}

func (fsw *SearchResultWrapper) IsNotEmpty() bool {
	return len(fsw.FileList) > 0
}
func (fsw *SearchResultWrapper) IsEmpty() bool {
	return !fsw.IsNotEmpty()
}

func (fsw *SearchResultWrapper) AddWrapperItem(model Movie) {
	fsw.FileList = append(fsw.FileList, model)
	fsw.Size += model.Size
}
