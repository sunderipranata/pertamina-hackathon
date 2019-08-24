import request from 'superagent'

const baseUrl = 'https://jsonplaceholder.typicode.com/todos/1'
// const baseUrl = ''
const getAssetPath = '/asset/:id'
let assetService = {};

assetService.getAssets = function (assetId, callback) {

  request
  // .get(baseUrl + getAssetsByAssetId(assetId))
    .get(baseUrl)
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
        result.data = res
      }

      callback(result)
    });
}

let getAssetsByAssetId = function (assetId) {
  if(assetId !== null)
    return getAssetPath + assetId
  else
    return getAssetPath
}

export default assetService