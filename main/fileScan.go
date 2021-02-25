package main

import (
	"fmt"
	"testing"

	"search-gin/cons"
	"search-gin/service"
	"search-gin/utils"
)

// TestScan ..
func TestScan(test testing.T) {

	var baseDir = "f:\\"
	var videoTypes = []string{cons.AVI, cons.MKV, cons.WMV, cons.MP4}
	// var imageTypes = []string{cons.JPG, cons.PNG, cons.GIF}
	var queryTypes []string
	queryTypes = utils.ExtandsItems(queryTypes, videoTypes)
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
