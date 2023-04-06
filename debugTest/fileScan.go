package debugTest

import (
	"log"
	"searchGin/service"
	"searchGin/utils"
	"testing"
)

// TestScan ..
func TestMain(t *testing.T) {

	var baseDir = "d:\\emby"
	//var videoTypes = []string{cons.AVI, cons.MKV, cons.WMV, cons.MP4}
	var imageTypes = []string{main2.JPG, main2.PNG, main2.GIF}
	var queryTypes []string
	queryTypes = utils.ExtandsItems(queryTypes, imageTypes)
	items := service.Walk(baseDir, queryTypes, true)
	i := 0
	for {
		if len(items) == i {
			break
		}
		log.Fatalln(items[i].GetFileInfo())
		i++
	}
}
