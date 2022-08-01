//go:build dev

package config

var IndexHtml = "./vuehome/dist/index.html"
var StaticFs = map[string]string{
	"/_nuxt": "./vuehome/dist/_nuxt",
}
