package writer

import (
	"encoding/json"
	"net/http"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland/utility/helper"
)

type Response struct {
	Meta    *Meta          `json:"meta"`
	Data    interface{}    `json:"data,omitempty"`
	Message string         `json:"message,omitempty"`
	Errors  []helper.Error `json:"errors,omitempty"`
}

type Meta struct {
	HTTPStatus int `json:"http_status"`
}

// WriteMessage returns HTTP Meta and a message in JSON
func WriteMessage(w http.ResponseWriter, message string, httpStatus int) error {
	r := &Response{
		Meta:    &Meta{HTTPStatus: httpStatus},
		Message: message,
	}
	return r.respWrite(w)
}

// WriteError returns HTTP Meta and array of errors in JSON
// SHOULD be used only for writing server errors
func WriteError(w http.ResponseWriter, err error, httpStatus int) error {
	var errs []helper.Error
	helper.AppendError(&errs, err.Error())
	r := &Response{
		Meta:   &Meta{HTTPStatus: httpStatus},
		Errors: errs,
	}
	return r.respWrite(w)
}

// WriteData returns HTTP Meta and data in JSON
func WriteData(w http.ResponseWriter, data interface{}, httpStatus int) error {
	r := &Response{
		Meta: &Meta{HTTPStatus: httpStatus},
		Data: data,
	}
	return r.respWrite(w)
}

// WriteDataMessage returns HTTP Meta, data, and a message in JSON
func WriteDataMessage(w http.ResponseWriter, data interface{}, message string, httpStatus int) error {
	r := &Response{
		Meta:    &Meta{HTTPStatus: httpStatus},
		Data:    data,
		Message: message,
	}
	return r.respWrite(w)
}

func (r *Response) respWrite(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(r.Meta.HTTPStatus)

	encoder := json.NewEncoder(w)
	err := encoder.Encode(r)

	if err != nil {
		return err
	}
	return nil
}
