package leland

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

// Asset holds data for asset
type Asset struct {
	ID              bson.ObjectId `bson:"_id" json:"id" schema:"-"`
	Scheme          string        `json:"scheme" bson:"scheme"`
	Name            string        `json:"name" bson:"name" schema:"name,required"`
	Address         string        `json:"address" bson:"address"`
	City            string        `json:"city" bson:"city"`
	Category        string        `json:"category" bson:"category"`
	LandArea        float32       `json:"land_area" bson:"land_area"`
	BuildingArea    float32       `json:"building_area" bson:"building_area"`
	CertificateType string        `json:"certificate_type" bson:"certificate_type"`
	Info            string        `json:"info" bson:"info"`
	StartPrice      uint          `json:"start_price" bson:"start_price"`
	StartTime       time.Time     `json:"start_time" bson:"start_time"`
	EndTime         time.Time     `json:"end_time" bson:"end_time"`
	Running         bool          `json:"running" bson:"running"`
}

type Auction struct {
	ID        bson.ObjectId `bson:"_id" json:"id" schema:"-"`
	AssetID   uint          `json:"asset_id" bson:"id"`
	BidPrice  uint          `json:"start_price" bson:"start_price"`
	CreatedAt time.Time     `json:"created_at" bson:"created_at"`
}
