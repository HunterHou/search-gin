package datamodels

import (
	"searchGin/utils"
)

type Actress struct {
	Name    string
	Url     string
	Cnt     int
	Size    int64
	SizeStr string
	// JpgUrl  string
	Images []string
}

func NewActres(name string, url string, size int64) Actress {
	return Actress{
		Name:    name,
		Url:     url,
		Cnt:     1,
		Size:    size,
		SizeStr: utils.GetSizeStr(size),
		// JpgUrl:  "/api/actressImgae/" + name,
		Images: []string{url},
	}
}
func (act *Actress) PlusCnt() {
	act.Cnt = act.Cnt + 1
}

func (act *Actress) PlusSize(size int64) {
	act.Size = act.Size + size
	act.SizeStr = utils.GetSizeStr(act.Size)
}
func (act *Actress) AddImage(image string) {
	if !utils.HasItem(act.Images, image) {
		act.Images = append(act.Images, image)
	}
}

// func (act Actress) PngBase64() string {
// 	path := act.Url
// 	if !utils.ExistsFiles(path) {
// 		path = act.Url
// 	}
// 	return utils.ImageToString(path)
// }
