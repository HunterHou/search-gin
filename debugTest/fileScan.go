package debugTest

import (
	"log"
	"searchGin/cons"
	"searchGin/service"
	"searchGin/utils"
	"testing"
)

// TestScan ..
func TestMain(t *testing.T) {

	var baseDir = "d:\\emby"
	//var videoTypes = []string{cons.AVI, cons.MKV, cons.WMV, cons.MP4}
	var imageTypes = []string{cons.JPG, cons.PNG, cons.GIF}
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
