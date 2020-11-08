const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup hbs engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//HBS Setup
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nitin'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nitin'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nitin',
        helpMessage: 'Welcome to the help page'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'An address must be specified'
        });
        return;
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            res.send({
                error: `Couldn't fetch location data`
            });
            return;
        }
        //console.log('Data', data);
    
        forecast(latitude, longitude, (error, fcData) => {
            if(error) {
                res.send({
                    error: `Couldn't fetch weather data`
                });
                return;
            }
            res.send({
                data: fcData,
                location
            });
        });
    });
});

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Help Article Not Found',
        name: 'Nitin'
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This page doesn\'t exist',
        name: 'Nitin'
    });
});

app.listen(3000, () => {
    console.log('Started Server');
});