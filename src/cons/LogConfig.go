package cons

import (
	"io"
	"os"
)

var fLog, _ = os.OpenFile("gin.log", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0644)
var LogWriter = io.MultiWriter(fLog, os.Stdout)
