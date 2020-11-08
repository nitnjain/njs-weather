const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=04438a9ae93109d48b7a5eb09dabf788&units=f&query=${long},${lat}`;
    request({
        url,
        json: true
    }, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(body.error) {
            callback(`Unable to find location`, undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}! The temparature is ${body.current.temperature} out. It feels like ${body.current.feelslike}`);
        }
    })
}

module.exports = forecast;