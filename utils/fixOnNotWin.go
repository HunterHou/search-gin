//go:build darwin
// +build darwin

package utils

import (
	"os/exec"
	"syscall"
)

func FixOnWin(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{}
}
