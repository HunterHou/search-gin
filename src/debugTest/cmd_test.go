package debugTest

import (
	"fmt"
	"os/exec"
	"testing"
)

func ShutdownTest(t *testing.T) {
	// ./ffmpeg -i '[仙儿媛] [MD-0118]你爲什麽這麽著急呢？百變性感制服劇場{{国产}}.ts' -codec copy '[仙儿媛] [MD-0118]你爲什麽這麽著急呢？百變性感制服劇場{{国产}}.mp4'
	from:="D:\\emby\\[仙儿媛] [MD-0118]你爲什麽這麽著急呢？百變性感制服劇場{{国产}}.ts"
	to:="D:\\emby\\[仙儿媛] [MD-0118]你爲什麽這麽著急呢？百變性感制服劇場{{国产}}.mp4"
	cmdSt:= "-i "+from +" -codec copy "+to
	err := exec.Command("cmd", "/C", "./ffmpeg "+cmdSt).Run()
	if err != nil {
		fmt.Println(err)
	}
	// err = exec.Command("cmd", "/C", "start d://").Run()
	// if err != nil {
	// 	fmt.Println(err)
	// }
}
