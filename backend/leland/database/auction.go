package database

import (
	"fmt"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/constant"
	"github.com/pkg/errors"
	"gopkg.in/mgo.v2/bson"
)

// InsertAuction insert new auction
func (db *MongoDB) InsertAuction(auction leland.Auction) (err error) {
	c := db.Collection(constant.AuctionCollectionName)
	err = c.Insert(auction)
	return errors.Wrap(err, "database insert failed")
}

// GetAuctions get all auctions
func (db *MongoDB) GetAuctions(assetID string) (auctions []leland.Auction, err error) {
	if !bson.IsObjectIdHex(assetID) {
		msg := fmt.Sprintf("%s is not valid ObjectID", assetID)
		return auctions, errors.New(msg)
	}

	objID := bson.ObjectIdHex(assetID)
	query := bson.M{
		"asset_id": objID,
	}
	c := db.Collection(constant.AuctionCollectionName)
	err = c.Find(query).Sort("-created_at").All(&auctions)
	return auctions, errors.Wrap(err, "database find failed")
}

// GetAuction get an auction by id
func (db *MongoDB) GetAuction(id string) (auction leland.Auction, err error) {
	if !bson.IsObjectIdHex(id) {
		msg := fmt.Sprintf("%s is not valid ObjectID", id)
		return auction, errors.New(msg)
	}

	c := db.Collection(constant.AuctionCollectionName)
	err = c.FindId(bson.ObjectIdHex(id)).One(&auction)
	return auction, errors.Wrapf(err, "database find failed with id %s", id)
}
