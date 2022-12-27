package debugTest

import (
	"fmt"
	"os/exec"
	"testing"
)

func ShutdownTest(t *testing.T) {
	err := exec.Command("cmd", "/C", "shutdown -s -t 0").Run()
	if err != nil {
		fmt.Println(err)
	}
	err = exec.Command("cmd", "/C", "start d://").Run()
	if err != nil {
		fmt.Println(err)
	}
}
