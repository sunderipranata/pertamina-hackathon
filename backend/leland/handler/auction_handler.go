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

// GetAuctions is for GET /auctions
func (h *Handler) GetAuctions(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")
	//this endpoint is for admin, should check if user is admin
	auctions, err := h.leland.GetAuctions(id)

	if err != nil {
		writer.WriteError(w, errors.New("failed to get auctions"), 500)
		return
	}

	writer.WriteData(w, auctions, 200)
	return
}

// GetAuctionInfo is for GET /auction/:id
func (h *Handler) GetAuctionInfo(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")
	//this endpoint is for admin, should check if user is admin
	auctions, err := h.leland.GetAuctionInfo(id)
	if err != nil {
		writer.WriteError(w, errors.New("failed to get auctions"), 500)
		return
	}

	writer.WriteData(w, auctions, 200)
	return
}

// NewAuction is for POST /auctions
func (h *Handler) NewAuction(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	// parsing user_id is unsecure (obviously)
	// but this is only for prototype purposes, no auth needed
	newAuction, err := parseAuction(r)
	if err != nil {
		writer.WriteError(w, err, 400)
		return
	}

	newAuction.ID = bson.NewObjectId()
	//newAuction.CreatedAt = time.Now().UnixNano() / int64(time.Millisecond)

	err = h.leland.InsertNewAuction(newAuction)
	if err != nil {
		writer.WriteError(w, err, 500)
		return
	}

	writer.WriteMessage(w, "Inserted", 201)
	return
}
