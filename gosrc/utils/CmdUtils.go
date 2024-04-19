package utils

import (
	"os/exec"
	"runtime"
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
			InfoFormat("%v", cmdErr)
			return 0
		}
		InfoFormat("ExecCmdSuccess:%v" + cmdType + ":" + path)
		return 1
	}
	return 0
}
