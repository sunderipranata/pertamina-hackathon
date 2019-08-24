package leland

import (
	"github.com/pkg/errors"
)

// GetAssets get all assets
func (leland *Leland) GetAssets() (assets []Asset, err error) {
	assets, err = leland.database.GetAssets()
	return assets, errors.Wrap(err, "could not retrieve all assets")
}

// GetRunningAssets get all assets
func (leland *Leland) GetRunningAssets(category string, assetType string) (assets []Asset, err error) {
	assets, err = leland.database.GetRunningAssets(category, assetType)
	return assets, errors.Wrap(err, "could not retrieve all assets")
}

// GetAsset get an asset by id
func (leland *Leland) GetAsset(id string) (asset Asset, err error) {
	asset, err = leland.database.GetAsset(id)
	return asset, errors.Wrap(err, "could not retrieve asset")
}

// InsertNewAsset insert new award
func (leland *Leland) InsertNewAsset(newAsset Asset) (err error) {
	err = leland.database.InsertAsset(newAsset)
	return errors.Wrap(err, "could not insert new award")
}

// UpdateAsset update an award by id
func (leland *Leland) UpdateAsset(id string, updatedAsset Asset) (err error) {
	err = leland.database.UpdateAsset(id, updatedAsset)
	return errors.Wrap(err, "could not update award")
}
