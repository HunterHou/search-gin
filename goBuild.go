package main
import (
	"fmt"
	"os/exec"
)
func main() {
	err := exec.Command("powershell", "/C", " sh buildQuasar.sh 2").Run()
	if err != nil {
		fmt.Println(err)
	}
}