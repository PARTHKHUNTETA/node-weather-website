const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=189809e1c09d4848cee083902ed8e0f9&query=${longitude},${latitude}&units=f`
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to conect to weather service ! !', undefined)

        }
        else if (body.error) {
            callback('Unable to find location ', undefined)
        }
        else {
            callback(undefined,
                `${body.current.weather_descriptions[0]} , It is Currently ${body.current.temperature} F out . It feels like ${body.current.feelslike} and the visiblity is ${body.current.visibility}`
            )
        }
    })
}

module.exports = forecast