package handler

import (
	"encoding/json"
	"net/http"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland"

	"github.com/gorilla/schema"
	"github.com/pkg/errors"
)

var decoder = schema.NewDecoder()

func parseAsset(r *http.Request) (asset leland.Asset, err error) {
	if r.Body == nil {
		return asset, errors.Wrap(err, "Please send a request body")
	}

	err = json.NewDecoder(r.Body).Decode(&asset)
	return asset, errors.Wrap(err, "json decode failed")
}
