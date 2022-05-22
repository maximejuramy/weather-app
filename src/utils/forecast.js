const request = require('request');

const weatherStackToken = process.env.WEATHERSTACK_ACCESS_TOKEN;

function forecast(latitude, longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackToken}&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Could not reach weather service :(', undefined);
        } else if (body.error) {
            callback('Wrong coordinates', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current;
            callback(undefined, {
                weather: weather_descriptions[0],
                temperature,
                feelslike,
            })
        }
    });
}

module.exports = {
    forecast
}