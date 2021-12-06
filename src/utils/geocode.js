const request = require('request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJjeDA0ODE2IiwiYSI6ImNrd3A4cjE4dTBhajAydWxjZzEza2R1NXEifQ.hGOMDTNA0WKJeQQcO6EX0Q`
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to conect to Geocoding services !', undefined)

        }
        else if (body.features.length === 0) {
            callback('Unable to find location , Try another search', undefined)
            console.log('Unable to find location , Try another search', undefined)
        }
        else {
            //const data = response.body.features[0].center;

            //console.log(`LAT:=>${data[0]}  , LONG:=>${data[1]} `)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode