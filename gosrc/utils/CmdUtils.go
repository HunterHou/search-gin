package utils

import (
	"fmt"
	"os/exec"
	"runtime"
	"searchGin/cons"
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
			FixOnWin(cmd)
		}
		cmdErr := cmd.Start()
		if cmdErr != nil {
			cons.Logger("%v", cmdErr)
			return 0
		}
		cons.Logger("ExecCmdSuccess:" + cmdType + ":" + path)
		return 1
	}
	return 0
}
