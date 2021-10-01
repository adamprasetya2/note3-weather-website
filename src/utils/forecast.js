const request = require('request')

const forecast = (latitude, longitude, callback) => {
      const url  = 'http://api.weatherstack.com/current?access_key=f4fac0fdc4bacfe3a74b9eed530c2ed1&query='+latitude+','+longitude+'&units=m';

      request({url, json: true}, (error, {body}) => {
            if(error){
                  callback('Unable to connect to weather service', undefined)
            } else if(body.error){
                  callback('Unable to find location', undefined)
            } else {
                  callback(undefined, body.current)
            }
      })
}

module.exports = forecast