//go:build prod

package config

var IndexHtml = "./vitehome/dist/index.html"
var StaticFs = map[string]string{
	"/css": "./vitehome/dist/css",
	"/js":  "./vitehome/dist/js",
}
