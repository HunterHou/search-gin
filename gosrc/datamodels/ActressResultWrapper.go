package datamodels

type PageActressResultWrapper struct {
	FileList    []Actress
	Size        int64
	LibCount    int
	LibSize     int64
	SearchCount int
	SearchSize  int64
	ResultSize  int64
	ResultCount int
}

func NewActressPageWrapper() PageActressResultWrapper {
	return PageActressResultWrapper{
		FileList:    []Actress{},
		Size:        0,
		SearchCount: 0,
		SearchSize:  0,
		ResultCount: 0,
		ResultSize:  0,
		LibCount:    0,
		LibSize:     0,
	}
}

func (fsw PageActressResultWrapper) IsNotEmpty() bool {
	return len(fsw.FileList) > 0
}

func (fsw PageActressResultWrapper) AddItem(act Actress) {
	fsw.FileList = append(fsw.FileList, act)
	fsw.LibCount = fsw.LibCount + 1
	fsw.SearchCount = fsw.SearchCount + 1
}
