package handler

import (
	"net/http"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/utility/writer"
	"github.com/julienschmidt/httprouter"
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
