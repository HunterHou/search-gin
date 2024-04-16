package debugTest

import (
	"image"
	_ "image/jpeg"
	"image/png"
	"log"
	"os"
	"testing"
)

// TestImage TestScan2 ..
func TestImage(test *testing.T) {
	src := "d:\\5.jpg"
	des := "d:\\111.png"
	log.Fatalf("src: %s des:%s", src, des)
	fin, _ := os.Open(src)
	fin2, _ := os.Open(src)
	defer fin.Close()
	defer fin2.Close()
	fout, _ := os.Create(des)
	defer fout.Close()
	config, _, _ := image.DecodeConfig(fin2)
	srcImage, str, err := image.Decode(fin)
	log.Fatalln(str)
	if err != nil {
		log.Fatalln("err:", err)
	}
	height := config.Height
	width := config.Width
	left := int(float64(0.53) * float64(width))
	rgbImg := srcImage.(*image.YCbCr)
	subImg := rgbImg.SubImage(image.Rect(left, 0, width, height)).(*image.YCbCr)
	png.Encode(fout, subImg)

}
