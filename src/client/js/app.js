// import { checkUrl } from './urlChecker';

function getGeonames(event) {
    event.preventDefault();
    let newCity = document.getElementById('city').value;
    console.log(newCity);
    let newCountry = document.getElementById('country').value;
    console.log(newCountry);
    let travelDate = document.getElementById("travel-date").value;
    console.log(travelDate);

    console.log("::: Form Submitted :::")
    fetchData(newCity, newCountry)
};

const fetchData = async(newCity = '', newCountry = '') => {
    const result = await fetch('http://localhost:5000/geonames', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newCity, newCountry }),
        })
    try {
        const apiAnswer = await result.json()
        console.log('JSON:', apiAnswer)
        return apiAnswer;

    } catch(error) {
        console.log('error', error);
    }
}

export { getGeonames }