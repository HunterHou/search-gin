package debugTest

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"search-gin/datamodels"
	"search-gin/service"
	"search-gin/utils"
	"testing"
)

var jsonPath = "../setting.json"

func TestExists(t *testing.T) {
	url := "J:\\emby\\0Brazzers\\TeensLikeItBig.18.10.28.Rebecca.Volpetti.The.Farmers.Daughter\\[Rebecca Volpetti] [TeensLikeItBig-18-10-28]The Farmers Daughter{{斯巴达}}.png"
	if utils.ExistsFiles(url) {
		fmt.Println("11")
	}

}

func TestReadJsonReflect(t *testing.T) {
	if !utils.ExistsFiles(jsonPath) {
		fmt.Println("file not found")
	}
	data, readErr := os.ReadFile(jsonPath)
	if readErr != nil {
		fmt.Println("readErr", readErr)
	}
	dic := datamodels.Setting{}
	json.Unmarshal(data, &dic)
	mapp := utils.InterfaceToMap(dic)
	for k, v := range mapp {
		fmt.Println("name: ", k, " value: ", v)
	}

}

func TestReadJson(t *testing.T) {
	if !utils.ExistsFiles(jsonPath) {
		fmt.Println("file not found")
	}
	data, readErr := os.ReadFile(jsonPath)
	if readErr != nil {
		fmt.Println("readErr", readErr)
	}
	dic := datamodels.Setting{}
	json.Unmarshal(data, &dic)
	fmt.Println("dic", dic)
}

func TestWriteJson(t *testing.T) {
	DirFile := "..\\dirList.ini"
	dict := service.ReadDictionaryFromTxt(DirFile)
	data, _ := json.Marshal(dict.LibMap)
	if !utils.ExistsFiles(jsonPath) {
		os.Create(jsonPath)
	}
	outStream, openErr := os.OpenFile(jsonPath, os.O_TRUNC|os.O_RDWR, os.ModePerm)
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	defer outStream.Close()
	writer := bufio.NewWriter(outStream)
	writer.Write(data)
	writer.Flush()
}
