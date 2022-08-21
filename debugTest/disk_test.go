package debugTest

import (
	"fmt"
	"searchGin/datamodels"
	"searchGin/utils"
	"testing"
)

func TestDisk(t *testing.T) {
	d := datamodels.DiskUseStatus("e://")
	fmt.Println("diskStatus")
	fmt.Println(utils.GetSizeStr(d.All))
	fmt.Println(utils.GetSizeStr(d.Used))
	fmt.Println(utils.GetSizeStr(d.Free))
}
