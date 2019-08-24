package database

import (
	"fmt"

	"github.com/devinryanriota/pertamina-hackathon/backend/leland"
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/constant"
	"github.com/pkg/errors"
	"gopkg.in/mgo.v2/bson"
)

// InsertAsset insert new asset
func (db *MongoDB) InsertAsset(asset leland.Asset) (err error) {
	c := db.Collection(constant.AssetCollectionName)
	err = c.Insert(asset)
	return errors.Wrap(err, "database insert failed")
}

// GetAsset get an asset by id
func (db *MongoDB) GetAsset(id string) (asset leland.Asset, err error) {
	if !bson.IsObjectIdHex(id) {
		msg := fmt.Sprintf("%s is not valid ObjectID", id)
		return asset, errors.New(msg)
	}

	c := db.Collection(constant.AssetCollectionName)
	err = c.FindId(bson.ObjectIdHex(id)).One(&asset)
	return asset, errors.Wrapf(err, "database find failed with id %s", id)
}

// GetAssets get all assets
func (db *MongoDB) GetAssets() (assets []leland.Asset, err error) {
	c := db.Collection(constant.AssetCollectionName)
	err = c.Find(nil).Sort("-created_at", "-running").All(&assets)
	return assets, errors.Wrap(err, "database find failed")
}

// GetRunningAssets get all running assets
func (db *MongoDB) GetRunningAssets() (assets []leland.Asset, err error) {
	c := db.Collection(constant.AssetCollectionName)
	query := bson.M{
		"running": true,
	}
	err = c.Find(query).Sort("-created_at").All(&assets)
	return assets, errors.Wrap(err, "database find failed")
}

// UpdateAsset update an asset
func (db *MongoDB) UpdateAsset(id string, asset leland.Asset) (err error) {
	if !bson.IsObjectIdHex(id) {
		msg := fmt.Sprintf("%s is not valid ObjectID", id)
		return errors.New(msg)
	}

	c := db.Collection(constant.AssetCollectionName)
	err = c.UpdateId(bson.ObjectIdHex(id), &asset)
	return errors.Wrapf(err, "database update failed with id %s", id)
}

// // DeleteAsset delete an asset
// func (db *MongoDB) DeleteAsset(id string) (err error) {
// 	if !bson.IsObjectIdHex(id) {
// 		msg := fmt.Sprintf("%s is not valid ObjectID", id)
// 		return errors.New(msg)
// 	}

// 	c := db.Collection(constant.AssetCollectionName)
// 	err = c.RemoveId(bson.ObjectIdHex(id))
// 	return errors.Wrapf(err, "database remove failed with id %s", id)
// }
