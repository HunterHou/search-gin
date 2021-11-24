package controller

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"search-gin/cons"
	"search-gin/datamodels"
	"search-gin/service"
	"search-gin/utils"
	"testing"
)

var jsonPath = "../setting.json"

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
	cons.DirFile = "..\\dirList.ini"
	dict := service.ReadDictionaryFromTxt(cons.DirFile)
	data, _ := json.Marshal(dict.LibMap)
	if !utils.ExistsFiles(jsonPath) {
		os.Create(jsonPath)
	}
	outStream, openErr := os.OpenFile(jsonPath, os.O_TRUNC|os.O_RDWR, os.ModePerm)
	defer outStream.Close()
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	writer := bufio.NewWriter(outStream)
	writer.Write(data)
	writer.Flush()
}
