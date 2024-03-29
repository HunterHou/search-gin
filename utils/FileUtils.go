package utils

import (
	"bytes"
	"fmt"
	"log"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"unicode"
)

var rootId = 0

func GeneratInt() string {
	rootId = rootId + 1
	return fmt.Sprintf("a%d", rootId)
}

func PKId(path string) string {
	abbr, _ := DirpathForId(path)
	return abbr
	// return GeneratInt()
}

func DirpathForId(path string) (string, string) {
	res, _ := url.QueryUnescape(path)
	res = strings.ReplaceAll(res, PathSeparator+PathSeparator, PathSeparator)
	res = strings.ReplaceAll(res, PathSeparator, "~")
	res = strings.ReplaceAll(res, PathSeparator, "~")
	res = strings.ReplaceAll(res, ":", "1")
	res = strings.ReplaceAll(res, ".", "2")
	res = strings.ReplaceAll(res, ",", "3")
	res = strings.ReplaceAll(res, "!", "4")
	res = strings.ReplaceAll(res, "》", "5")
	res = strings.ReplaceAll(res, "《", "6")
	arr := strings.Split(res, "~")
	newpath := ""
	for i := 0; i < len(arr); i++ {
		curArr := arr[i]
		length := len(curArr)
		if i != 0 {
			newpath += "~"
		}
		if length > 30 {
			// newpath += curArr[0:100]
			// newpath += fmt.Sprintf("%d", (length))
			// newpath += curArr[length-100 : length]
			j := 0
			for _, value := range curArr {
				if j%4 == 0 {
					newpath += string(value)
				}
				j++
			}
		} else {
			newpath += curArr
		}

	}
	return res, newpath
}

func GetPng(path string, suffix string) string {
	path = strings.ReplaceAll(path, GetSuffux(path), suffix)
	return path
}

func ExistsFiles(path string) bool {
	_, err := os.Stat(path)
	if err != nil {
		return os.IsExist(err)
	}
	return true
}

func GetSuffux(fielname string) string {

	var suffix string
	if fielname == "" {
		return suffix
	}
	suffix = filepath.Ext(fielname)
	suffix = strings.ToLower(suffix)
	if strings.Contains(suffix, ".") {
		suffix = strings.TrimPrefix(suffix, ".")
	}
	return suffix

}
func GetMovieType(fileName string) string {

	code := ""
	rights := strings.Split(fileName, "{{")
	if len(rights) <= 1 {
		return "无"
	}
	for index, value := range rights {
		if index == 0 {
			continue
		}
		right := value
		lefts := strings.Split(right, "}}")
		for _, left := range lefts {
			return left
		}
	}
	return code

}

// 获取文件名
func GetTitle(filename string) string {
	result := ""
	if filename == "" {
		return result
	}
	last_suffix := path.Ext(filename)
	filename = strings.TrimSuffix(filename, last_suffix)
	return filename

}

// 根据 文件名称  分析番号 [] 中包含 '-'符号...
func GetActress(fileName string) string {
	code := ""
	rights := strings.Split(fileName, "[")
	if len(rights) <= 1 {
		return GetTitle(fileName)
	}
	for index, value := range rights {
		if index == 0 {
			continue
		}
		right := value
		lefts := strings.Split(right, "]")
		for _, left := range lefts {
			if !strings.Contains(left, "-") {
				return left
			}
		}
	}
	return code
}

func GetTags(fileName string, movieType string) []string {
	res := []string{}
	if movieType != "" {
		res = append(res, movieType)
	}
	rights := strings.Split(fileName, "《")
	if len(rights) <= 1 {
		return nil
	}
	for index, value := range rights {
		if index == 0 {
			continue
		}
		right := value
		lefts := strings.Split(right, "》")
		arr := strings.Split(lefts[0], ",")
		for i := 0; i < len(arr); i++ {
			if arr[i] != "" && IndexOf(res, arr[i]) == -1 {
				res = append(res, arr[i])
			}
		}
	}

	return res
}
func GetTagStr(fileName string) string {

	rights := strings.Split(fileName, "《")
	if len(rights) <= 1 {
		return ""
	}
	for index, value := range rights {
		if index == 0 {
			continue
		}
		right := value
		lefts := strings.Split(right, "》")
		return lefts[0]
	}
	return ""
}

// 根据 文件名称  分析番号 [] 中包含 '-'符号...
func GetCode(fileName string) string {
	code := ""
	rights := strings.Split(fileName, "[")
	if len(rights) <= 1 {
		return GetTitle(fileName)
	}
	for index, value := range rights {
		if index == 0 {
			continue
		}
		right := value
		lefts := strings.Split(right, "]")
		for _, left := range lefts {
			if strings.Contains(left, "-") || strings.Contains(left, "_") {
				return left
			} else {
				code = left
			}
		}
	}
	if strings.Contains(code, ".mp4") {
		code = strings.ReplaceAll(code, ".mp4", "")
	}
	return code
}

func GetSizeStr(fSize int64) string {

	fileSize := float64(fSize)
	result := ""
	if fileSize <= 1024 {
		result = fmt.Sprintf("%.f", fileSize)
	} else if fileSize <= 1024*1024 {
		size := float64(fileSize / 1024)
		result = fmt.Sprintf("%.f", size) + " k"
	} else if fileSize <= 1024*1024*1024 {
		size := float64(fileSize / (1024 * 1024))
		result = fmt.Sprintf("%.2f", size) + " M"
	} else if fileSize <= 1024*1024*1024*1024 {
		size := float64(fileSize / (1024 * 1024 * 1024))
		result = fmt.Sprintf("%.2f", size) + " G"
	} else if fileSize <= 1024*1024*1024*1024*1024 {
		size := float64(fileSize / (1024 * 1024 * 1024 * 1024))
		result = fmt.Sprintf("%.2f", size) + " T"
	} else {
		size := float64(fileSize / (1024 * 1024 * 1024 * 1024))
		result = fmt.Sprintf("%.2f", size) + " T"
	}
	return result
}

// 驼峰式写法转为下划线写法
func Camel2Case(name string) string {
	buffer := NewBuffer()
	for i, r := range name {
		if unicode.IsUpper(r) {
			if i != 0 {
				buffer.Append('_')
			}
			buffer.Append(unicode.ToLower(r))
		} else {
			buffer.Append(r)
		}
	}
	return buffer.String()
}

// 下划线写法转为驼峰写法
func Case2Camel(name string) string {
	name = strings.Replace(name, "_", " ", -1)
	name = strings.Title(name)
	return strings.Replace(name, " ", "", -1)
}

// 内嵌bytes.Buffer，支持连写
type Buffer struct {
	*bytes.Buffer
}

func NewBuffer() *Buffer {
	return &Buffer{Buffer: new(bytes.Buffer)}
}

func (b *Buffer) Append(i interface{}) *Buffer {
	switch val := i.(type) {
	case int:
		b.append(strconv.Itoa(val))
	case int64:
		b.append(strconv.FormatInt(val, 10))
	case uint:
		b.append(strconv.FormatUint(uint64(val), 10))
	case uint64:
		b.append(strconv.FormatUint(val, 10))
	case string:
		b.append(val)
	case []byte:
		b.Write(val)
	case rune:
		b.WriteRune(val)
	}
	return b
}

func (b *Buffer) append(s string) *Buffer {
	defer func() {
		if err := recover(); err != nil {
			log.Println("*****内存不够了！******")
		}
	}()
	b.WriteString(s)
	return b
}
