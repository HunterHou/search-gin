package utils

import "reflect"

func InterfaceToMap(setting interface{}) map[string]interface{} {
	data := make(map[string]interface{})
	refType := reflect.TypeOf(setting)
	refValue := reflect.ValueOf(setting)
	for i := 0; i < refValue.NumField(); i++ {
		data[refType.Field(i).Name] = refValue.Field(i)
	}
	return data
}
