package debugTest

import (
	"fmt"
	"testing"
)

// Test ...go t
func Test(test *testing.T) {
	path := "d:\\111.amr"
	fmt.Println(utils.ImageToString(path))
}