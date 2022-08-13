package utils

import (
	"fmt"
	"os/exec"
	"runtime"
	"syscall"
)

func ExecCmdStart(path string) int {
	
	if runtime.GOOS == "windows" {
		md := exec.Command("cmd", "/C", "start", path)
		return excCommand(md)
	}else{}
	fmt.Println("runtime.GOOS"+runtime.GOOS)
	md := exec.Command("deepin-movie", "/C", path)
	return excCommand(md)
}

func ExecCmdExplorer(path string) int {
	if runtime.GOOS == "windows" {
		md := exec.Command("cmd", "/C", "start", path)
		return excCommand(md)
	}else{}
	fmt.Println("runtime.GOOS"+runtime.GOOS)
	md := exec.Command("dde-file-manager", "/C", path)
	return excCommand(md)
}


func excCommand(cmd *exec.Cmd) int{
	if runtime.GOOS == "windows" {
		// cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	if cmd != nil {
		cmdErr := cmd.Start()
		// fmt.Println( "cmd:" + cmd.Env)
		if cmdErr != nil {
			fmt.Println(cmdErr)
			return 0
		}
		return 1
	}
	return 0
}
