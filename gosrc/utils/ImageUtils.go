package utils

import (
	"encoding/base64"
	"image"
	_ "image/jpeg"
	"image/png"
	"os"
)

func ImageToString(path string) string {
	if !ExistsFiles(path) {
		return ""
	}
	file, _ := os.Open(path)
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)
	sourceBuffer := make([]byte, 50000000)
	n, _ := file.Read(sourceBuffer)
	return base64.StdEncoding.EncodeToString(sourceBuffer[:n])
}

func ImageToPng(src string) error {
	des := GetPng(src, "png")
	fin, _ := os.Open(src)
	fin2, _ := os.Open(src)
	defer func(fin *os.File) {
		err := fin.Close()
		if err != nil {

		}
	}(fin)
	defer func(fin2 *os.File) {
		err := fin2.Close()
		if err != nil {

		}
	}(fin2)
	fout, createErr := os.Create(des)
	if createErr != nil {
		Info("err:", createErr)
		return createErr
	}
	defer func(fout *os.File) {
		err := fout.Close()
		if err != nil {

		}
	}(fout)
	config, _, _ := image.DecodeConfig(fin2)
	srcImage, fm, err := image.Decode(fin)
	if err != nil {
		Info("err:", err)
		return err
	}
	height := config.Height
	width := config.Width
	left := int(0.53 * float64(width))
	switch fm {
	case "jpeg":
		rgbImg := srcImage.(*image.YCbCr)
		subImg := rgbImg.SubImage(image.Rect(left, 0, width, height)).(*image.YCbCr)
		err := png.Encode(fout, subImg)
		if err != nil {
			return err
		}
	case "png":
		switch srcImage.(type) {
		case *image.NRGBA:
			img := srcImage.(*image.NRGBA)
			subImg := img.SubImage(image.Rect(left, 0, width, height)).(*image.NRGBA)
			return png.Encode(fout, subImg)
		case *image.RGBA:
			img := srcImage.(*image.RGBA)
			subImg := img.SubImage(image.Rect(left, 0, width, height)).(*image.RGBA)
			return png.Encode(fout, subImg)
		}
	}
	return nil

}
