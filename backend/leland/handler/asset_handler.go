package handler

import (
	"errors"
	"net/http"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland/utility/writer"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2/bson"
)

// ALL PACKAGES DOES NOT RETURN error BECAUSE WE DONT NEED THEM TO BE LOGGED YET
// USE WRAPPER / MIDDLEWARE / DECORATORS IF LOGGING FUNC ARE NEEDED

// GetAssets is for GET /assets
func (h *Handler) GetAssets(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	//this endpoint is for admin, should check if user is admin
	assets, err := h.leland.GetAssets()
	if err != nil {
		writer.WriteError(w, errors.New("failed to get assets"), 500)
		return
	}

	writer.WriteData(w, assets, 200)
	return
}

// GetRunningAssets is for GET /assets/running
func (h *Handler) GetRunningAssets(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	urlParams := r.URL.Query()
	category := urlParams.Get("category")
	assetType := urlParams.Get("asset_type")

	assets, err := h.leland.GetRunningAssets(category, assetType)
	if err != nil {
		writer.WriteError(w, errors.New("failed to get running assets"), 500)
		return
	}

	writer.WriteData(w, assets, 200)
	return
}

// GetAsset is for GET /assets/:id
func (h *Handler) GetAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")
	asset, err := h.leland.GetAsset(id)
	if err != nil {
		writer.WriteError(w, errors.New("failed to get asset"), 400)
		return
	}

	writer.WriteData(w, asset, 200)
	return
}

// NewAsset is for POST /assets
func (h *Handler) NewAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	// parsing user_id is unsecure (obviously)
	// but this is only for prototype purposes, no auth needed

	newAsset, err := parseAsset(r)
	if err != nil {
		writer.WriteError(w, err, 400)
		return
	}

	newAsset.ID = bson.NewObjectId()

	err = h.leland.InsertNewAsset(newAsset)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}

	writer.WriteMessage(w, "Inserted", 201)
	return
}

// UpdateAsset is for PATCH /_exclusive/awards/:id
func (h *Handler) UpdateAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")

	updatedAsset, err := parseAsset(r)
	if err != nil {
		writer.WriteError(w, err, 400)
		return
	}

	oldAsset, err := h.leland.GetAsset(id)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}

	updatedAsset.ID = oldAsset.ID
	updatedAsset.Running = oldAsset.Running

	err = h.leland.UpdateAsset(id, updatedAsset)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}
	writer.WriteMessage(w, "Asset has been updated", 201)
	return
}

// ToggleAsset is for PATCH /assets/:id/running
func (h *Handler) ToggleAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")

	asset, err := h.leland.GetAsset(id)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}
	asset.Running = !asset.Running
	err = h.leland.UpdateAsset(id, asset)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}

	responseMsg := "activated"
	if !asset.Running {
		responseMsg = "deactivated"
	}

	writer.WriteMessage(w, responseMsg, 201)
	return
}

// PredictAsset is for GET /assets/prediction
func (h *Handler) PredictAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")

	asset, err := h.leland.GetAsset(id)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}
	asset.Running = !asset.Running
	err = h.leland.UpdateAsset(id, asset)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}

	responseMsg := "activated"
	if !asset.Running {
		responseMsg = "deactivated"
	}

	writer.WriteMessage(w, responseMsg, 201)
	return
}
