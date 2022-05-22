const request = require('request');

const mapboxAccessToken = process.env.MAP_BOX_ACCESS_TOKEN;

function geocode(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxAccessToken}`;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Location service :(', undefined)
        } else {
            const features = body.features;
            console.log(body);
            if (features.length === 0 ){
                callback('Unable to find location :(', undefined);
            } else {
                const [longitude, latitude] = features[0].center;
                callback(undefined, {
                    latitude,
                    longitude,
                    location: features[0].place_name
                })
            }
        }
    })
}

module.exports = {
    geocode
};