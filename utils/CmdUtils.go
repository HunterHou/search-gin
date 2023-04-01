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

func TransferFormatter(input string) Result{
	fmt.Println("TransferFormatter:"+input )
	cmd := exec.Command("./ffmpeg.exe", input)
	if cmd != nil {
		if runtime.GOOS == "windows" {
			cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		}
		cmdErr := cmd.Start()
		if cmdErr != nil {
			fmt.Println(cmdErr)
			NewFailByMsg("转换失败")
		}
		return NewSuccessByMsg("转换成功")
	}
	return  NewSuccessByMsg("转换成功")
}

func ExecCmd(path string, cmdType string) int {
	cmd := exec.Command("cmd", "/C", cmdType, "", path)
	if cmd != nil {
		if runtime.GOOS == "windows" {
			cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		}
		cmdErr := cmd.Start()
		if cmdErr != nil {
			fmt.Println(cmdErr)
			return 0
		}
		fmt.Println("ExecCmdSuccess:"+cmdType + ":" + path)
		return 1
	}
	return 0
}
