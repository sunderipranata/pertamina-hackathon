package leland

import (
	"github.com/devinryanriota/pertamina-hackathon/backend/leland/utility/helper"
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

// UpdateAsset update an asset by id
func (leland *Leland) UpdateAsset(id string, updatedAsset Asset) (err error) {
	err = leland.database.UpdateAsset(id, updatedAsset)
	return errors.Wrap(err, "could not update asset")
}

// InsertNewAsset insert new auction
func (leland *Leland) InsertNewAsset(newAsset Asset) (err error) {
	err = leland.database.InsertAsset(newAsset)
	return errors.Wrap(err, "could not insert new auction")
}

// GetAuction get an asset by id
func (leland *Leland) GetAuction(id string) (auction Auction, err error) {
	auction, err = leland.database.GetAuction(id)
	return auction, errors.Wrap(err, "could not retrieve auction")
}

// GetAuctions get all auctions
func (leland *Leland) GetAuctions(assetID string) (auctions []Auction, err error) {
	auctions, err = leland.database.GetAuctions(assetID)
	return auctions, errors.Wrap(err, "could not retrieve all auctions")
}

// GetAuctionInfo get auction info
func (leland *Leland) GetAuctionInfo(assetID string) (auctionInfo AuctionInfo, err error) {
	var auctions []Auction
	auctions, err = leland.database.GetAuctions(assetID)
	var prices []uint

	for _, auction := range auctions {
		prices = append(prices, auction.BidPrice)
	}
	_, max := helper.MinMax(prices)
	avg := helper.Avg(prices)

	auctionInfo = AuctionInfo{
		MaxPrice: max,
		AvgPrice: avg,
	}
	return auctionInfo, errors.Wrap(err, "could not retrieve all auction info")
}

// InsertNewAuction insert new auction
func (leland *Leland) InsertNewAuction(newAuction Auction) (err error) {
	err = leland.database.InsertAuction(newAuction)
	return errors.Wrap(err, "could not insert new auction")
}
