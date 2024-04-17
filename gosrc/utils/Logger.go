package utils

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"os"
)

var fLog, _ = os.OpenFile("gin.log", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0644)
var LogWriter = io.MultiWriter(fLog, os.Stdout)

func Info(v ...interface{}) {
	_, err := fmt.Fprintln(gin.DefaultWriter, v)
	if err != nil {
		return
	}
}
