// express to run server and routes
const express = require('express');

// start-up instance of app
const app = express();

/* include dependencies */
//bodyParser as middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
//cors
app.use(cors());

// to use url encoded values
app.use(express.urlencoded({extended: true}));
// to use json
app.use(express.json());

/* Initializing the main project folder */
app.use(express.static('dist'));

// Spin up the server
const port = process.env.PORT | 5000;
app.listen(port, function() {
    console.log(`running on localhost: ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

//geonames api call
const fetchCoordinates = async (city, country) => {
    const url = "http://api.geonames.org/searchJSON?formatted=true";
    const geonamesApi = process.env.GEONAMES_USERNAME;
    const encodeCity = encodeURIComponent(city)
    const geonamesResponse = await fetch(`${url}&name=${encodeCity}&countryCode=${country}&username=${geonamesApi}&charset=ISO8859-1`);
    console.log(geonamesResponse);
    try {
        const geonamesData = await geonamesResponse.json();

        const projectData = {
            lat: geonamesData.geonames[0].lat,
            lng: geonamesData.geonames[0].lng,
        }
        console.log(geonamesData.geonames[0]);
        return projectData;
    } catch (error) {
        console.log('error from index.js: fetchCoordinates', error);
    }
}

const travelData = [];
console.log('traveldata'+travelData);

// https://api.weatherbit.io/v2.0/forecast/daily?lat=35.7796&lon=-78.6382&key=API_KEY
// weatherbit api call
const fetchWeather = async (lat, lng, date) => {
    const url = "https://api.weatherbit.io/v2.0/";
    const weatherbitApi = process.env.WEATHERBIT_KEY;
    const weatherbitResponse = await fetch(`${url}forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitApi}`);
    console.log(weatherbitResponse);
    try {
        const weatherbitData = await weatherbitResponse.json();
        // console.log('bit', weatherbitData);

        const weatherData = {
            min: weatherbitData.data[0].min_temp,
            max: weatherbitData.data[0].max_temp,
            description: weatherbitData.data[0].weather.description,
        }
        // console.log('final', weatherData);
        return weatherData;

    } catch (error) {
        console.log('error from index.js: fetchWeather', error);
    }
}

// post route
app.post('/geonames', async (req, res) => {
    try {
    const city = req.body.newCity;
    const country = req.body.newCountry;
    const date = req.body.travelDate;

    let coordinates = await fetchCoordinates(city, country);
    let weather = await fetchWeather(coordinates.lat, coordinates.lng, date);
    // let image = await fetchImage(city);

    console.log('post', image);
    // const trip = {
    //     coordinates,
    //     // weather
    // }
    // travelData.push(trip);
    res.send(coordinates);
    } catch(error) {
        console.log('error from post geonames in server.js', error)
    }
})