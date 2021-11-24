package main

import (
	"fmt"
	"search-gin/datasource"
	"search-gin/service"
	"testing"
)

// TestScan4 ..
func TestScan4(test testing.T) {
	service.ReadDictionaryFromTxt("D:\\code\\search-iris\\src\\dirList.ini")
	for index, name := range datasource.DictLib.LibMap {
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
