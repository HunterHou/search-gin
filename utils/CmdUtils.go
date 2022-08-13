package utils

import (
	"fmt"
	"os/exec"
	"runtime"
	"syscall"
)

func ExecCmdStart(path string) int {
	return ExecCmd(path, "start")
}

func ExecCmdExplorer(path string) int {
	return ExecCmd(path, "start")
}

func ExecCmd(path string, cmdType string) int {
	cmd := exec.Command("cmd", "/C", cmdType, "", path)
	if cmd != nil {
		if runtime.GOOS == "windows" {
			// cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
			cmd.SysProcAttr = &syscall.SysProcAttr{}
		}
		cmdErr := cmd.Start()
		fmt.Println(cmdType + ":" + path)
		if cmdErr != nil {
			fmt.Println(cmdErr)
			return 0
		}
		return 1
	}
	return 0
}
