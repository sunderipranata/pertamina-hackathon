import request from 'superagent'

const baseUrl = 'http://10.50.0.68:1234'
const getAllAssetsPath = '/assets'
const postInsertAssetsPath = '/assets'
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

assetService.insertAsset = function (payload, callback) {
  request
    .post(baseUrl + postInsertAssetsPath)
    .set('Content-Type', 'application/json')
    .send(payload)
    .end(function (err, res) {
      if(err) {
        let result = {
          success: false,
          data: err
        }
        callback(result)
      } else {
        let result = {
          success: true
        }
        callback(result);
      }
    });
}

assetService.toggle = function(id, callback) {
  request
    .post(baseUrl + provideToggleRunningAssetPath(id))
    .set('Content-Type', 'application/json')
    .end(function (err, res) {
      if(err) {
        let result = {
          success: false,
          data: err
        }
        callback(result)
      } else {
        let result = {
          success: true
        }
        callback(result);
      }
    });
}

let provideToggleRunningAssetPath = function(id) {
  return "/assets/" + id + "/running"
}

export default assetService