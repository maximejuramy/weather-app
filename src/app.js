const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { geocode }= require('./utils/geocode');
const { forecast }= require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates/views');
const partialsPath = path.join(__dirname, '..', 'templates/partials');

const port = process.env.PORT || 3000

// Setup view engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'This is my weather app',
        name: 'Max'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Max'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help section',
        name: 'Max',
        message: 'You need help ?'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "no address provided :("
        })
    }

    address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, { temperature, feelslike }) => {
            if (error) {
                return res.send({
                    error: "no address provided :("
                })
            }

            res.send( {
                location,
                temperature,
                feelslike
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Max',
        errorMessagecl: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Max',
        errorMessage: 'Page not found'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})