package debugTest

import (
	"fmt"
	"github.com/shirou/gopsutil/v3/disk"
	"testing"
)

// disk_test ...go t
func Test_1(test *testing.T) {
	fmt.Println("start")
	partitions, err := disk.Partitions(true)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(partitions)
	fmt.Println("over")
}
