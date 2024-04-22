package datasource

import (
	"searchGin/datamodels"
)

type BucketFile struct {
	InstanceName string
	TotalSize    int64
	TotalCount   int
	FileLib      map[string]datamodels.Movie
}

func NewInstance(name string) BucketFile {
	return BucketFile{
		InstanceName: name,
		TotalSize:    0,
		TotalCount:   0,
		FileLib:      map[string]datamodels.Movie{},
	}
}

func NewInstanceWithFiles(baseDir string, files []datamodels.Movie) BucketFile {
	bucket := NewInstance(baseDir)
	for _, file := range files {
		bucket.Put(file)
	}
	return bucket
}

func (fs *BucketFile) IsNotEmpty() bool {
	return len(fs.FileLib) > 0
}

func (fs *BucketFile) IsEmpty() bool {
	return !fs.IsNotEmpty()
}

func (fs *BucketFile) Clear() {
	clear(fs.FileLib)
}

func (fs *BucketFile) Put(model datamodels.Movie) {
	fs.FileLib[model.Id] = model
	fs.TotalSize = fs.TotalSize + model.Size
	fs.TotalCount = fs.TotalCount + 1
}

func (fs *BucketFile) Get(id string) datamodels.Movie {
	model, ok := fs.FileLib[id]
	if ok {
		return model
	}
	return datamodels.Movie{}
}

func (fs *BucketFile) SearchBucket(searchParam datamodels.SearchParam) datamodels.SearchResultWrapper {
	resultWrapper := datamodels.SearchByKeyWord(fs.FileLib, searchParam.Keyword, searchParam.MovieType)
	return resultWrapper

}
