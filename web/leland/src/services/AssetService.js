import request from 'superagent'

const baseUrl = 'http://10.50.0.68:1234'
const getAllAssetsPath = '/assets'
const getRunningAssetsPath = '/running-assets'
const getAuctionInfoPath = '/auctions-info'
let assetService = {};

assetService.getAllAssets = function (callback) {

  request
    .get(baseUrl + getAllAssetsPath)
    .end(function (err, res) {
      let result = {
        success: '',
        data: ''
      }

      if (err) {
        console.log('error', err)
        result.success = false
      } else {
        result.success = true
        result.data = res.body
      }

      callback(result)
    });
}

assetService.getAssetsById = function (id, callback) {
  console.log('id', id)
  request
    .get(baseUrl + provideGetAssetByIdPath(id))
    .end(function (err, res) {
      let result = {
        success: '',
        data: ''
      }

      if(err) {
        console.log('error', err)
        result.success = false
      } else {
        result.success = true
        result.data = res.body
      }

      callback(result)
    });
}

assetService.getRunningAssets = function (callback) {
  request
    .get(baseUrl + getRunningAssetsPath)
    .end(function (err, res) {
      let result = {
        success: '',
        data: ''
      }

      if (err) {
        console.log('error', err)
        result.success = false
      } else {
        result.success = true
        result.data = res.body
      }

      callback(result)
    });
}

assetService.getAuctionInfo = function(assetId, callback) {
  request
    .get(baseUrl + provideGetAuctionInfoByAssetIdPath(assetId))
    .end(function (err, res) {
      let result = {
        success: '',
        data: ''
      }

      if (err) {
        console.log('error', err)
        result.success = false
      } else {
        result.success = true
        result.data = res.body
      }

      callback(result)
    })
}

assetService.getByCategory = function(category, callback) {
  request
    .get(baseUrl + provideGetByCategoryPath(category))
    .end(function (err, res) {
      let result = {
        success: '',
        data: ''
      }

      if (err) {
        console.log('error', err)
        result.success = false
      } else {
        result.success = true
        result.data = res.body
      }
      console.log('service get by category result', result)
      callback(result)
    })
}

assetService.getByType = function(type, callback) {
  request
    .get(baseUrl + provideGetByTypePath(type))
    .end(function (err, res) {
      let result = {
        success: '',
        data: ''
      }

      if (err) {
        console.log('error', err)
        result.success = false
      } else {
        result.success = true
        result.data = res.body
      }

      console.log('service get by type result', result)
      callback(result)
    })
}

let provideGetAssetByIdPath = function (id) {
  return getAllAssetsPath + "/" + id;
}

let provideGetAuctionInfoByAssetIdPath = function(id) {
  return getAuctionInfoPath + "/" + id;
}

let provideGetByCategoryPath = function(category) {
  return getRunningAssetsPath + "?category=" + category
}

let provideGetByTypePath = function(type) {
  return getRunningAssetsPath + "?asset_type=" + type
}

export default assetService