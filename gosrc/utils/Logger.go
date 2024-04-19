package utils

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"os"
)

var fLog, _ = os.OpenFile("gin.log", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0644)
var LogWriter = io.MultiWriter(fLog, os.Stdout)

func InfoFormat(format string, v ...any) {
	output, _ := json.Marshal(&v)
	_, err := fmt.Fprintln(gin.DefaultWriter, format+string(output))
	if err != nil {
		return
	}
}

func InfoNormal(v ...any) {
	output, _ := json.Marshal(&v)
	_, err := fmt.Fprintln(gin.DefaultWriter, output)
	if err != nil {
		return
	}
}
