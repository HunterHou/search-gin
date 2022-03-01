package debugTest

import (
	"fmt"
	"search-gin/service"
	"testing"
)

const baseUrl = "D:\\emby\\emby"
const target = "1.txt"
const targetDir = "D:\\emby\\emby\\ww\\qq\\ww"

func TestWalk(t *testing.T) {
	files := service.Walk(baseUrl, []string{"jpg", "jpeg"})
	for _, file := range files {
		fmt.Println(file.Name)
	}
}
func TestRemove(t *testing.T) {
	service.DeleteOne(targetDir, target)
}
