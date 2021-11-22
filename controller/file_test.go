package controller

import (
	"search-gin/datamodels"
	"search-gin/service"
	"testing"
)

func TestRequest(t *testing.T) {
	serviceFile := service.FileService{}
	src := datamodels.Movie{}
	src.Code = "ipx-001"
	res, tar := serviceFile.RequestToFile(src)
	t.Log("res:", res)
	t.Log("tar:", tar)
}
