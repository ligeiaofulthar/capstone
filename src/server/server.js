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
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}));

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
    const geonamesResponse = await fetch(`${url}&name=${city}&countryCode=${country}&username=${geonamesApi}`);
    try {
        const geonamesData = await geonamesResponse.json();

        const projectData = {
            lat: geonamesData.geonames[0].lat,
            lng: geonamesData.geonames[0].lng,
        }
        return projectData;

    } catch (error) {
        console.log('error from index.js: fetchCoordinates', error);
    }
}

// https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely


// post route
app.post('/geonames', function (req, res) {
    const city = req.body.newCity;
    const country = req.body.newCountry;
    const date = req.body.travelDate;

    fetchCoordinates(city, country);
    fetchWeather(lat, lng, date);
})