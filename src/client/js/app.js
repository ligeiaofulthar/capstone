// import { checkUrl } from './urlChecker';

function getGeonames(event) {
    event.preventDefault();
    let newCity = document.getElementById('city').value;
    console.log(newCity);
    let newCountry = document.getElementById('country').value;
    console.log(newCountry);
    let travelDate = new Date(document.getElementById("travel-date").value);
    console.log("travelDate", travelDate);
    console.log("::: Form Submitted :::")
    
    const diff = calcTravelTime(travelDate);
    console.log(diff);
    fetchSingleTrip(newCity, newCountry, diff);    
    // calcTravelTime(travelDate);
    diff;
};

const fetchAllTrips = async(diff) => {
    if (diff <= 7) {
        try {
            const result = await fetch('http://localhost:5000/trips')
            const allResults = await result.json()
            console.log('allresults', allResults)

            allResults.forEach(trip => {
            const {coordinates, weather, image} = trip
            console.log("info so new", coordinates, weather, image);
            document.getElementById('weather-info').innerHTML = `The current temperature is ${weather.temp}°C and the felt temperature is ${weather.feels}°C, ${weather.description}`;
            document.getElementById('weather-icon').innerHTML = `<img src="../img/${weather.icon}.png">`;

            document.getElementById('location-img').innerHTML = `<img src="${image.image_url}">`;
            // document.getElementById('date-info').innerHTML = `Weather info: ${weather.min} ${weather.max} ${weather.description}`;
        })
    } catch(error) {
        console.log('error from fetchAllTrips in app.js', error);
    }
    }

    else if (diff > 7 && diff <= 16){

        try {
            const result = await fetch('http://localhost:5000/trips')
            const allResults = await result.json()
            console.log('allresults', allResults)

            allResults.forEach(trip => {
            const {coordinates, weather, image} = trip

            document.getElementById('weather-info').innerHTML = `Minimum temperature is ${weather.min}°C and maximum temperature is ${weather.max}°C, ${weather.description}`;
            document.getElementById('weather-icon').innerHTML = `<img src="../img/${weather.icon}.png">`;

            document.getElementById('location-img').innerHTML = `<img src="${image.image_url}">`;
            // document.getElementById('date-info').innerHTML = `Weather info: ${weather.min} ${weather.max} ${weather.description}`;
        })
        } catch(error) {
            console.log('error from fetchAllTrips in app.js', error);
        }
    }
}

const fetchSingleTrip = async(newCity = '', newCountry = '', diff = '') => {
    const result = await fetch('http://localhost:5000/trip', {
        method: 'POST',
        // mode: 'cors',
        // credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newCity, newCountry, diff }),
        })
        console.log(result)

        if (!result.ok) {

        } else {
            fetchAllTrips(diff)
        }
    // try {
    //     const apiAnswer = await result.json()
    //     console.log('JSON:', apiAnswer)
    //     return apiAnswer;

    // } catch(error) {
    //     console.log('error from fetchSingleTrip in app.js', error);
    // }
}


function calcTravelTime(travelDate) {
    let today = new Date();

    // let todayTimeZone = new Intl.DateTimeFormat().format(today);
    // console.log("timezone", todayTimeZone);

    // let travelTimeZone = new Intl.DateTimeFormat().format(travelDate);
    // console.log("traveltimezone", travelTimeZone);
    
    const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day

    let daysAway = (travelDate.getTime() - today.getTime())/msPerDay;
    daysAway = Math.floor(daysAway);
    let dateInfo = document.getElementById('date-info');
    dateInfo.innerHTML = "";

    const p = document.createElement("P");
    p.innerHTML = `Your trip is ${daysAway} days away`;
    dateInfo.appendChild(p);

    return daysAway;

}
export { getGeonames }