package service

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"searchGin/cons"
	"searchGin/datamodels"
	"searchGin/utils"
)

func InitSetting() {
	curDir, _ := filepath.Abs(".")
	osSetting := cons.OSSetting
	settingPath := curDir + utils.PathSeparator + cons.OSSetting.SelfPath
	dict := ReadDictionaryFromJson(settingPath)
	dict.SelfPath = osSetting.SelfPath
	ip := GetIpAddr()
	dict.ControllerHost = "http://" + ip + cons.PortNo
	dict.ImageHost = "http://" + ip + cons.PortNo2
	dict.StreamHost = "http://" + ip + cons.PortNo3
	cons.OSSetting = dict
}

func FlushDictionary(path string) {
	WriteDictionaryToJson(path, cons.OSSetting)
}

func ReadDictionaryFromJson(path string) datamodels.Setting {
	reader, _ := os.ReadFile(path)
	dict := datamodels.Setting{}
	err := json.Unmarshal(reader, &dict)
	if err != nil {
		return datamodels.Setting{}
	}
	return dict
}
func WriteDictionaryToJson(path string, dict datamodels.Setting) {
	data, _ := json.Marshal(dict)
	if !utils.ExistsFiles(path) {
		_, err := os.Create(path)
		if err != nil {
			return
		}
	}
	outStream, openErr := os.OpenFile(path, os.O_TRUNC|os.O_RDWR, os.ModePerm)
	if openErr != nil {
		fmt.Println("openErr", openErr)
	}
	defer func(outStream *os.File) {
		err := outStream.Close()
		if err != nil {

		}
	}(outStream)
	writer := bufio.NewWriter(outStream)
	_, err := writer.Write(data)
	if err != nil {
		return
	}
	err = writer.Flush()
	if err != nil {
		return
	}
}

//func ReadDictionaryFromTxt(path string) datamodels.Dictionary {
//	outStream, openErr := os.Open(path)
//	if openErr != nil {
//		fmt.Println("openErr", openErr)
//	}
//	defer func(outStream *os.File) {
//		err := outStream.Close()
//		if err != nil {
//
//		}
//	}(outStream)
//
//	reader := bufio.NewReader(outStream)
//	dict := datamodels.NewDictionary()
//	for {
//		lineStr, err := reader.ReadString('\n')
//		if err != nil {
//			break
//		}
//		lineStr = strings.TrimSpace(lineStr)
//		if lineStr == "" {
//			continue
//		}
//		line := strings.Split(lineStr, "=")
//		dict.PutProperty(line[0], line[1])
//	}
//	return dict
//}
//func WriteDictionaryToText(path string, dict datamodels.Dictionary) {
//	outStream, openErr := os.OpenFile(path, os.O_TRUNC|os.O_RDWR, os.ModePerm)
//	if openErr != nil {
//		fmt.Println("openErr", openErr)
//	}
//	defer func(outStream *os.File) {
//		err := outStream.Close()
//		if err != nil {
//
//		}
//	}(outStream)
//	writer := bufio.NewWriter(outStream)
//	for key, value := range dict.LibMap {
//		for _, v := range value {
//			_, err := writer.WriteString(key + "=" + v + "\n")
//			if err != nil {
//				return
//			}
//		}
//	}
//	err := writer.Flush()
//	if err != nil {
//		return
//	}
//}
