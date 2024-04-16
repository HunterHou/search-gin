package cons

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"os"
)

var fLog, _ = os.OpenFile("gin.log", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0644)
var LogWriter = io.MultiWriter(fLog, os.Stdout)

func Logger(format string, v ...interface{}) {
	_, err := fmt.Fprintln(gin.DefaultWriter, format, v)
	if err != nil {
		return
	}
}
