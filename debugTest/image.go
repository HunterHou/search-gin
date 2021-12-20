package debugTest

import (
	"fmt"
	"image"
	_ "image/jpeg"
	"image/png"
	"os"
	"testing"
)

// TestScan2 ..
func TestImage(test *testing.T) {
	src := "d:\\5.jpg"
	des := "d:\\111.png"
	fmt.Printf("src: %s des:%s", src, des)
	fin, _ := os.Open(src)
	fin2, _ := os.Open(src)
	defer fin.Close()
	defer fin2.Close()
	fout, _ := os.Create(des)
	defer fout.Close()
	config, _, _ := image.DecodeConfig(fin2)
	srcImage, str, err := image.Decode(fin)
	fmt.Println(str)
	if err != nil {
		fmt.Println("err:", err)
	}
	height := config.Height
	width := config.Width
	left := int(float64(0.53) * float64(width))
	rgbImg := srcImage.(*image.YCbCr)
	subImg := rgbImg.SubImage(image.Rect(left, 0, width, height)).(*image.YCbCr)
	png.Encode(fout, subImg)

}
