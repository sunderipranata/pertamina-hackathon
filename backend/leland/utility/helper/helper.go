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

func MinMax(array []uint) (uint, uint) {
	var max uint = array[0]
	var min uint = array[0]
	for _, value := range array {
		if max < value {
			max = value
		}
		if min > value {
			min = value
		}
	}
	return min, max
}

func Avg(array []uint) uint {
	var sum uint
	sum = 0
	for _, value := range array {
		sum += value
	}
	return sum / uint(len(array))
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
