import request from 'superagent'

const baseUrl = 'http://10.50.0.68:1234'
const getAllAssetsPath = '/assets'
const getRunningAssetsPath = '/running-assets'
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

export default assetService