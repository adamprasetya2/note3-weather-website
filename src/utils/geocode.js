const request = require('request')

const geocode = (address, callback) => {
      const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRhbXByYXNldHlhMiIsImEiOiJja3U1cDRoYmgyNnd2Mm5wZ2RoM3c1bHNrIn0.-kv2gjAF2XFpSeOn0ksjSQ&limit=1'

      request({url, json: true}, (error, {body}) => {
            if(error){
                  callback('Unable to connect to geo location service', undefined)
            } else if(body.features.length === 0){
                  callback('Location not found', undefined)
            } else {
                  const latitude = body.features[0].center[1]
                  const longitude  = body.features[0].center[0]
                  const place_name  = body.features[0].place_name
                  callback(undefined, {
                        latitude: latitude,
                        longitude: longitude,
                        place_name: place_name
                  })
            }
      })
}

module.exports = geocode