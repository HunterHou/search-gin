package datamodels

type PageResultWrapper struct {
	FileList    []Movie
	Size        int64
	SearchCount int
	SearchSize  int64
}

func NewPageWrapper() PageResultWrapper {
	return PageResultWrapper{
		FileList:    []Movie{},
		Size:        0,
		SearchCount: 0,
		SearchSize:  0,
	}
}

func (fsw PageResultWrapper) IsEmpty() bool {
	return len(fsw.FileList) == 0
}
