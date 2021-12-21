package debugTest

import (
	"fmt"
	"testing"

	"github.com/huichen/sego"
)

func TestWorld(t *testing.T) {
	//  载入词典
	var segmenter sego.Segmenter
	segmenter.LoadDictionary("dictionary.txt")

	// 分词
	text := []byte("中文,博大精深,中国人民政府")
	segments := segmenter.InternalSegment(text, true)

	// 处理分词结果
	// 支持普通模式和搜索模式两种分词，见代码中SegmentsToString函数的注释。
	str := sego.SegmentsToSlice(segments, true)
	for i := 0; i < len(str); i++ {
		fmt.Println(str[i])
	}

}
