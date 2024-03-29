package service

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/utils"
	"strings"
)

func FlushDictionary(path string) {
	WriteDictionaryToJson(path, cons.OSSetting)
}

func ReadDictionaryFromJson(path string) datamodels.Setting {
	reader, _ := os.ReadFile(path)
	dict := datamodels.Setting{}
	json.Unmarshal(reader, &dict)
	return dict
}
func WriteDictionaryToJson(path string, dict datamodels.Setting) {
	data, _ := json.Marshal(dict)
	if !utils.ExistsFiles(path) {
		os.Create(path)
	}
	outStream, openErr := os.OpenFile(path, os.O_TRUNC|os.O_RDWR, os.ModePerm)
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	defer outStream.Close()
	writer := bufio.NewWriter(outStream)
	writer.Write(data)
	writer.Flush()
}

func ReadDictionaryFromTxt(path string) datamodels.Dictionary {
	outStream, openErr := os.Open(path)
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	defer outStream.Close()

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
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	defer outStream.Close()
	writer := bufio.NewWriter(outStream)
	for key, value := range dict.LibMap {
		for _, v := range value {
			writer.WriteString(key + "=" + v + "\n")
		}
	}
	writer.Flush()
}
