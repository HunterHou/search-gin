package service

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"search-gin/utils"
	"strings"
)
import (
	"search-gin/cons"
	"search-gin/datamodels"
)

func FlushDictionart(path string) {
	dict := datamodels.NewDictionary()
	dict.PutProperty("BaseUrl", cons.BaseUrl)
	for _, dir := range cons.BaseDir {
		dict.PutProperty("dir", dir)
	}
	for _, image := range cons.Images {
		dict.PutProperty("Images", image)
	}
	for _, video := range cons.VideoTypes {
		dict.PutProperty("VideoTypes", video)
	}
	for _, doc := range cons.Docs {
		dict.PutProperty("Docs", doc)
	}
	for _, typ := range cons.Types {
		dict.PutProperty("Types", typ)
	}
	WriteDictionaryToJson(path, dict)

}

func ReadDictionaryFromJson(path string) datamodels.Dictionary {
	/**
	read setting
	*/
	reader, _ := os.ReadFile(path)
	dict := datamodels.NewDictionary()
	json.Unmarshal(reader, &dict)
	return dict
}
func WriteDictionaryToJson(path string, dict datamodels.Dictionary) {
	data, _ := json.Marshal(dict)
	if !utils.ExistsFiles(path) {
		os.Create(path)
	}
	outStream, openErr := os.OpenFile(path, os.O_TRUNC|os.O_RDWR, os.ModePerm)
	defer outStream.Close()
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	writer := bufio.NewWriter(outStream)
	writer.Write(data)
	writer.Flush()
}

func ReadDictionaryFromTxt(path string) datamodels.Dictionary {
	outStream, openErr := os.Open(path)
	defer outStream.Close()
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	reader := bufio.NewReader(outStream)
	dict := datamodels.NewDictionary()
	for {
		lineStr, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		lineStr = strings.TrimSpace(lineStr)
		if lineStr == "" {
			continue
		}
		line := strings.Split(lineStr, "=")
		dict.PutProperty(line[0], line[1])
	}
	return dict
}
func WriteDictionaryToText(path string, dict datamodels.Dictionary) {
	outStream, openErr := os.OpenFile(path, os.O_TRUNC|os.O_RDWR, os.ModePerm)
	defer outStream.Close()
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	writer := bufio.NewWriter(outStream)
	for key, value := range dict.LibMap {
		for _, v := range value {
			writer.WriteString(key + "=" + v + "\n")
		}
	}
	writer.Flush()
}
