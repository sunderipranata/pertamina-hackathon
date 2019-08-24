package leland

import (
	"gopkg.in/mgo.v2/bson"
)

// Asset holds data for asset
type Asset struct {
	ID              bson.ObjectId `json:"id" bson:"_id"`
	Scheme          string        `json:"scheme" bson:"scheme"`
	AssetType       string        `json:"asset_type" bson:"asset_type"`
	Name            string        `json:"name" bson:"name"`
	Address         string        `json:"address" bson:"address"`
	City            string        `json:"city" bson:"city"`
	Category        string        `json:"category" bson:"category"`
	LandArea        float32       `json:"land_area" bson:"land_area"`
	BuildingArea    float32       `json:"building_area" bson:"building_area"`
	CertificateType string        `json:"certificate_type" bson:"certificate_type"`
	Info            string        `json:"info" bson:"info"`
	StartPrice      uint          `json:"start_price" bson:"start_price"`
	StartTime       int64         `json:"start_time" bson:"start_time"`
	EndTime         int64         `json:"end_time" bson:"end_time"`
	Running         bool          `json:"running" bson:"running"`
}

// Auction holds data for auction
type Auction struct {
	ID       bson.ObjectId `json:"id" bson:"_id"`
	AssetID  bson.ObjectId `json:"asset_id" bson:"asset_id"`
	BidPrice uint          `json:"bid_price" bson:"bid_price"`
	UserID   uint          `json:"user_id" bson:"user_id"`
}

// AuctionInfo holds data for auction response
type AuctionInfo struct {
	MaxPrice uint `json:"max_price" bson:"max_price"`
	AvgPrice uint `json:"avg_price" bson:"avg_price"`
}

type AssetMLRequest struct {
}

// AssetMLInfo holds predicted AssetML data.
type AssetMLInfo struct {
	PredictedPrice    uint   `json:"predicted_price"`
	PredictedCategory string `json:"predicted_category"`
}
