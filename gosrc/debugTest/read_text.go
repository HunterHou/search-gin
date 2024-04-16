package debugTest

import (
	"fmt"
	"searchGin/service"
	"testing"
)

// TestReadFile TestScan4 ..
func TestReadFile(test *testing.T) {
	Dictionary := service.ReadDictionaryFromTxt("D:\\code\\search-iris\\src\\dirList.ini")
	for index, name := range Dictionary.LibMap {
		if len(name) <= 1 {
			fmt.Println(index, ":", name)
		} else {
			for _, s := range name {
				fmt.Println(index, ":", s)
			}

		}

	}
	test.Log("over")
}
