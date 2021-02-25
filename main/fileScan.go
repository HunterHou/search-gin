package main

import (
	"fmt"
	"search-gin/cons"
	"search-gin/service"
	"search-gin/utils"
)

// TestScan ..
func main() {

	var baseDir = "d:\\emby"
	//var videoTypes = []string{cons.AVI, cons.MKV, cons.WMV, cons.MP4}
	var imageTypes = []string{cons.JPG, cons.PNG, cons.GIF}
	var queryTypes []string
	queryTypes = utils.ExtandsItems(queryTypes, imageTypes)
	items := service.Walk(baseDir, queryTypes)
	i := 0
	for {
		if len(items) == i {
			break
		}
		fmt.Println(items[i].GetFileInfo())
		i++
	}
}
