import request from 'superagent'

const baseUrl = 'http://10.50.0.68:1234'
const postPlaceBidPath = '/auctions'
let bidService = {};

bidService.placeBid = function (payload, callback) {
  request
    .post(baseUrl + postPlaceBidPath)
    .set('Content-Type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    .send(payload)
    .end(function (err, res) {
      if(err) {
        let result = {
          isSuccess: false,
          data: err
        }
        callback(result)
      } else {
        let result = {
          isSuccess: true
        }
        callback(result);
      }
    });
}

export default bidService