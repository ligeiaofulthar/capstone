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
const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`running on localhost: ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

const travelData = [];
console.log('traveldata', travelData);

app.get('/trips', function (req, res) {
    res.send(travelData);
    console.log(travelData)

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

// https://api.weatherbit.io/v2.0/forecast/daily?lat=35.7796&lon=-78.6382&key=API_KEY
// weatherbit api call
const fetchWeather = async (lat, lng, date) => {
    const url = "https://api.weatherbit.io/v2.0/";
    const weatherbitApi = process.env.WEATHERBIT_KEY;

    if (date <= 7){
    const weatherbitResponse = await fetch(`${url}current?lat=${lat}&lon=${lng}&key=${weatherbitApi}`);
    console.log(weatherbitResponse);
    console.log("less than 7")

        try {
            const weatherbitData = await weatherbitResponse.json();
            // console.log('bit', weatherbitData);

            const weatherData = {
                temp: weatherbitData.data[0].temp,
                feels: weatherbitData.data[0].app_temp,
                description: weatherbitData.data[0].weather.description,
                icon: weatherbitData.data[0].weather.icon,
                // diff: date
            }
            // console.log('final', weatherData);
            return weatherData;

        } catch (error) {
            console.log('error from index.js: fetchWeather', error);
        }
    } else if (date > 7 && date <= 16){
        console.log("hello is 7 and 16")
        const weatherbitResponse = await fetch(`${url}forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitApi}`);
        console.log(weatherbitResponse);
        const diff = (16 - date);
        const arrayDiff = (diff - 1);

            try {
                const weatherbitData = await weatherbitResponse.json();
                // console.log('bit', weatherbitData);

                const weatherData = {
                    min: weatherbitData.data[arrayDiff].min_temp,
                    max: weatherbitData.data[arrayDiff].max_temp,
                    description: weatherbitData.data[arrayDiff].weather.description,
                    icon: weatherbitData.data[arrayDiff].weather.icon,
                    diff: date
                }
                // console.log('final', weatherData);
                return weatherData;

            } catch (error) {
                console.log('error from index.js: fetchWeather', error);
            }
    } else {
        console.log("more than 16")

    }


}

// https://pixabay.com/api/?key=20750786-14149fcb1191f54f15308757e&q=yellow+flowers&image_type=photo
// pixabay api call
const fetchImage = async (city) => {
    const url = "https://pixabay.com/api/";
    city_encoded= encodeURIComponent(city);
    console.log(city_encoded);
    const pixabayApi = process.env.PIXABAY_KEY;
    const pixabayResponse = await fetch(`${url}?key=${pixabayApi}&q=${city_encoded}&image_type=photo`);
    console.log(pixabayResponse);
    try {
        const pixabayData = await pixabayResponse.json();
        // console.log('pixa', pixabayData);

        const pixaData = {
            image_url: pixabayData.hits[0].largeImageURL
        }
        // console.log('final', pixaData);
        return pixaData;

    } catch (error) {
        console.log('error from index.js: fetchImage', error);
    }
}

// post route
app.post('/trip', async (req, res) => {
    try {
    const city = req.body.newCity;
    const country = req.body.newCountry;
    const date = req.body.diff;
    console.log("daysaway", date);

    let coordinates = await fetchCoordinates(city, country);
    let weather = await fetchWeather(coordinates.lat, coordinates.lng, date);
    let image = await fetchImage(city);

    const trip = {
        coordinates,
        weather,
        image
    }
    travelData.push(trip);
    // travelData.push(date);

    res.status(201).send();

    console.log('post', trip);
        console.log('post', date);


    } catch(error) {
        console.log('error from post rout in server.js', error)
    }
})