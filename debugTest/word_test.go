package debugTest

import (
	"fmt"
	"search-gin/utils"
	"testing"

	"github.com/huichen/sego"
)

func TestWorld(t *testing.T) {
	//  载入词典
	var segmenter sego.Segmenter
	segmenter.LoadDictionary("dictionary.txt")

	// 分词
	text := []byte("微信图片_20211221095110.jpg")
	segments := segmenter.InternalSegment(text, true)

	// 处理分词结果
	// 支持普通模式和搜索模式两种分词，见代码中SegmentsToString函数的注释。
	str := sego.SegmentsToSlice(segments, true)
	for i := 0; i < len(str); i++ {
		fmt.Println(str[i])
	}

}

func TestId(t *testing.T) {
	Id := "D:\\emby\\泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}\\泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}\\泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}泰勒·斯威夫特5K壁纸图片_彼岸图网{{斯巴达}}.jpeg"
	id, pId := utils.DirpathForId(Id)
	fmt.Println(id)
	fmt.Println(pId)
}
