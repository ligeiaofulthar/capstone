function getGeonames(event) {
    event.preventDefault();
    let newCity = document.getElementById('city').value;
    let newCountry = document.getElementById('country').value;
    let travelDate = new Date(document.getElementById("travel-date").value);
    
    // get the days until departure
    const diff = calcTravelTime(travelDate);
    fetchSingleTrip(newCity, newCountry, diff);    
    diff;
};

// with the value how many days the trip is away, determine wheter to request the date from the forecast or the current api
const fetchAllTrips = async(diff) => {
    if (diff <= 7) {
        try {
            const result = await fetch('http://localhost:5000/trips')
            const allResults = await result.json()

            allResults.forEach(trip => {
            const {coordinates, weather, image} = trip

            document.getElementById('weather-info').innerHTML = `<p>The current temperature is ${weather.temp}°C and the felt temperature is ${weather.feels}°C, ${weather.description}</p>`;
            document.getElementById('weather-icon').innerHTML = `<img src="../img/${weather.icon}.png">`;
            document.getElementById('location-img').innerHTML = `<img src="${image.image_url}">`;
        })
        } catch(error) {
            console.log('error from fetchAllTrips in app.js', error);
        }
    }

    else if (diff > 7 && diff <= 16){

        try {
            const result = await fetch('http://localhost:5000/trips')
            const allResults = await result.json()

            allResults.forEach(trip => {
            const {coordinates, weather, image} = trip

            document.getElementById('weather-info').innerHTML = `<p>Minimum temperature is ${weather.min}°C and maximum temperature is ${weather.max}°C, ${weather.description}</p>`;
            document.getElementById('weather-icon').innerHTML = `<img src="../img/${weather.icon}.png">`;
            document.getElementById('location-img').innerHTML = `<img src="${image.image_url}">`;
        })
        } catch(error) {
            console.log('error from fetchAllTrips in app.js', error);
        }
    }
}

// get the info of the trip to the server
const fetchSingleTrip = async(newCity = '', newCountry = '', diff = '') => {
    const result = await fetch('http://localhost:5000/trip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newCity, newCountry, diff }),
        })

        if (!result.ok) {
            error 
        } else {
            fetchAllTrips(diff)
        }
}

// calculate how many days till departure
function calcTravelTime(travelDate) {
    let today = new Date();
    // Number of milliseconds per day
    const msPerDay = 24 * 60 * 60 * 1000; 

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