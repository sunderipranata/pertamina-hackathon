package helper

import (
	"strconv"
)

// StrToInt is a helper function to convert string to integer
func StrToInt(val string) int {
	result, _ := strconv.Atoi(val)
	return result
}

// BoolToStr is a helper function to convert boolean to string
func BoolToStr(val bool) string {
	return strconv.FormatBool(val)
}

// func DecodeRequest(i interface{}, req *http.Request) (interface{}, []string) {
// 	var errs []string
// 	decoder := json.NewDecoder(req.Body)
// 	err := decoder.Decode(&i)
// 	if err != nil {
// 		// to change to write error
// 		errs = append(errs, err.Error())
// 	}
// 	return i, errs
// }
