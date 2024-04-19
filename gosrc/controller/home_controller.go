package controller

import (
	"net/http"
	"searchGin/cons"
	"searchGin/utils"
	"sort"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	// c.JSON(http.StatusOK, "1")
	c.HTML(http.StatusOK, "index.html", gin.H{"title": "首页"})
}

func GetTypeSize(c *gin.Context) {
	var res []cons.MenuSize
	cons.TypeMenu.Range(func(_, value interface{}) bool {
		res = append(res, value.(cons.MenuSize))
		return true
	})
	for i := 0; i < len(res); i++ {
		res[i].SizeStr = utils.GetSizeStr(res[i].Size)
	}
	sort.Slice(res, func(i, j int) bool {
		return res[i].Size > res[j].Size
	})
	smallCount := len(cons.SmallDir)
	if smallCount > 0 {
		smallSize := cons.NewMenuSize("小文件数量", int64(smallCount))
		smallSize.SizeStr = utils.GetSizeStr(smallSize.Size)
		res = append(res, smallSize)
		for i := 0; i < len(cons.SmallDir); i++ {
			cons.SmallDir[i].SizeStr = utils.GetSizeStr(cons.SmallDir[i].Size)
			res = append(res, cons.SmallDir[i])
		}
	}

	c.JSON(http.StatusOK, res)
}

func GetTagSize(c *gin.Context) {
	var res []cons.MenuSize
	cons.TagMenu.Range(func(_, value interface{}) bool {
		res = append(res, value.(cons.MenuSize))
		return true
	})
	for i := 0; i < len(res); i++ {
		res[i].SizeStr = utils.GetSizeStr(res[i].Size)
	}
	sort.Slice(res, func(i, j int) bool {
		return res[i].Size > res[j].Size
	})
	c.JSON(http.StatusOK, res)
}
func GetScanTime(c *gin.Context) {
	c.JSON(http.StatusOK, cons.FolderTime)
}
func GetHeartBeat(c *gin.Context) {
	c.JSON(http.StatusOK, cons.IndexDone)
}
