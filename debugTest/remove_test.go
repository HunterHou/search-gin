package debugTest

import (
	"fmt"
	"searchGin/cons"
	"searchGin/service"
	"searchGin/utils"
	"testing"
)

const baseUrl = "D:\\emby\\emby"
const target = "1.txt"
const targetDir = "D:\\emby\\emby\\ww\\qq\\ww"

func TestWalk(t *testing.T) {
	files := service.Walk(baseUrl, []string{"jpg", "jpeg"},true)
	for _, file := range files {
		fmt.Println(file.Name)
	}
}
func TestWalkInnter(t *testing.T) {
	service.WalkInnter("D:\\emby\\emby", []string{"jpg"}, 0)
	for _, dir := range cons.SmallDir {
		fmt.Println(dir.Name, utils.GetSizeStr(dir.Size))
	}
}

func TestRemove(t *testing.T) {
	service.DeleteOne(targetDir, target)
}
