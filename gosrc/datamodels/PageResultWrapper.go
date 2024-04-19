package datamodels

type PageResultWrapper struct {
	FileList    []Movie
	Size        int64
	SearchCount int
	ResultCount int
	LibCount    int
	SearchSize  int64
	ResultSize  int64
	LibSize     int64
}

func NewPageWrapper() PageResultWrapper {
	return PageResultWrapper{
		FileList:    []Movie{},
		Size:        0,
		SearchCount: 0,
		SearchSize:  0,
		ResultCount: 0,
		ResultSize:  0,
		LibCount:    0,
		LibSize:     0,
	}
}

func (fsw PageResultWrapper) IsNotEmpty() bool {
	return len(fsw.FileList) > 0
}
