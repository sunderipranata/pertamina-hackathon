package helper

func CreateSelectFields(strs []string) (selectFields string) {
	selectFields = ""
	for i, str := range strs {
		selectFields += str
		if i != len(strs)-1 {
			selectFields += ", "
		}
	}
	return
}

func CreateWhereFields(condition string, strs ...string) (whereFields string) {
	whereFields = ""
	for i, str := range strs {
		whereFields += str + " = ?"
		if i != len(strs)-1 {
			whereFields += " " + condition + " "
		}
	}
	return
}
