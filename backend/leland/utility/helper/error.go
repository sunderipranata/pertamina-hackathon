package helper

type Error struct {
	Code    int    `json:"code,omitempty"`
	Message string `json:"message"`
}

// AppendError is a helper function to append error to an Error struct
func AppendError(errs *[]Error, err string, errCode ...int) {
	if len(errCode) == 1 {
		*errs = append(*errs, Error{Code: errCode[0], Message: err})
	} else {
		*errs = append(*errs, Error{Message: err})
	}
}
