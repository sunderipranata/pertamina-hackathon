package handler

import (
	"errors"
	"net/http"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/utility/writer"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2/bson"
)

// Handler control http request flow
type Handler struct {
	leland *leland.Leland
}

// New returns a pointer of Handler instance
func New(leland *leland.Leland) *Handler {
	return &Handler{
		leland: leland,
	}
}

// Healthz is used to control the flow of GET /healthz endpoint
func (h *Handler) Healthz(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	writer.WriteMessage(w, "OK", 200)
}

// ALL PACKAGES DOES NOT RETURN error BECAUSE WE DONT NEED THEM TO BE LOGGED YET
// USE WRAPPER / MIDDLEWARE / DECORATORS IF LOGGING FUNC ARE NEEDED

// GetAssets is for GET /assets
func (h *Handler) GetAssets(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	//this endpoint is for admin, should check if user is admin
	assets, err := h.leland.GetAssets()
	if err != nil {
		writer.WriteError(w, errors.New("failed to get assets"), 500)
	}

	writer.WriteData(w, assets, 200)
}

// GetRunningAssets is for GET /assets/running
func (h *Handler) GetRunningAssets(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	urlParams := r.URL.Query()
	category := urlParams.Get("category")
	assetType := urlParams.Get("asset_type")

	assets, err := h.leland.GetRunningAssets(category, assetType)
	if err != nil {
		writer.WriteError(w, errors.New("failed to get running assets"), 500)
	}

	writer.WriteData(w, assets, 200)
}

// GetAsset is for GET /assets/:id
func (h *Handler) GetAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")

	asset, err := h.leland.GetAsset(id)
	if err != nil {
		writer.WriteError(w, errors.New("failed to get asset"), 400)
	}

	//asset.PictureURL, _ = h.leland.GetPictureURL(ctx, asset)
	writer.WriteData(w, asset, 200)
}

// NewAsset is for POST /assets
func (h *Handler) NewAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	// parsing user_id is unsecure (obviously)
	// but this is only for prototype purposes, no auth needed

	newAsset, err := parseAsset(r)
	if err != nil {
		writer.WriteError(w, err, 400)
	}

	newAsset.ID = bson.NewObjectId()

	err = h.leland.InsertNewAsset(newAsset)
	if err != nil {
		writer.WriteError(w, err, 500)
	}

	newAsset, err = h.leland.GetAsset(newAsset.ID.Hex())
	if err != nil {
		writer.WriteError(w, err, 500)
	}

	// if picture != nil {
	// 	fileName := newAsset.ID.Hex() + "-" + fmt.Sprint(time.Now().UnixNano()) + ext
	// 	err = h.leland.UploadPicture(ctx, fileName, picture)
	// 	if err != nil {
	// 		response.Error(w, customerror.UploadError)
	// 		return err
	// 	}
	// 	newAsset.PictureFileName = fileName
	// 	err = h.leland.UpdateAsset(ctx, newAsset.ID.Hex(), newAsset)
	// 	if err != nil {
	// 		response.Error(w, err)
	// 		return err
	// 	}
	// }

	// newAsset.PictureURL, _ = h.leland.GetPictureURL(newAsset)
	writer.WriteMessage(w, "Inserted", 201)
}

// UpdateAsset is for PATCH /_exclusive/awards/:id
func (h *Handler) UpdateAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")

	updatedAsset, err := parseAsset(r)
	if err != nil {
		writer.WriteError(w, err, 400)
	}

	oldAsset, err := h.leland.GetAsset(id)
	if err != nil {
		writer.WriteError(w, err, 500)
	}

	updatedAsset.ID = oldAsset.ID
	updatedAsset.Running = oldAsset.Running

	err = h.leland.UpdateAsset(id, updatedAsset)
	if err != nil {
		writer.WriteError(w, err, 500)
	}
	writer.WriteMessage(w, "Asset has been updated", 201)
}

// ToggleAsset is for PATCH /assets/:id/running
func (h *Handler) ToggleAsset(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")

	asset, err := h.leland.GetAsset(id)
	if err != nil {
		writer.WriteError(w, err, 500)
	}
	asset.Running = !asset.Running
	err = h.leland.UpdateAsset(id, asset)
	if err != nil {
		writer.WriteError(w, err, 500)
	}

	responseMsg := "activated"
	if !asset.Running {
		responseMsg = "deactivated"
	}

	writer.WriteMessage(w, responseMsg, 201)
}
