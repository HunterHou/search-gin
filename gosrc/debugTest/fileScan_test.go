package debugTest

import (
	"fmt"
	"searchGin/cons"
	"searchGin/service"
	"searchGin/utils"
	"testing"

	"github.com/gin-gonic/gin"
)

// TestMain TestScan ..
func TestMain(m *testing.M) {

	var baseDir = "/Users/harmay/Documents"
	//var videoTypes = []string{cons.AVI, cons.MKV, cons.WMV, cons.MP4}
	var imageTypes = []string{cons.JPG, cons.PNG, cons.GIF}
	var queryTypes []string
	queryTypes = utils.ExtendsItems(queryTypes, imageTypes)
	items := service.FileApp.Walk(baseDir, queryTypes, true)
	i := 0
	for {
		if len(items) == i {
			break
		}
		fmt.Fprintln(gin.DefaultWriter, "open folder", items[i].GetFileInfo())
		i++
	}
}
