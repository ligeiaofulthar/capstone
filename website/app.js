// Make date
let d = new Date();
let newDate = + d.getDate()+'.'+d.getMonth()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=ccadabc74cb18925fcd2f9f952730b48&units=metric";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', getData);

/* Function called by event listener */
function getData(e){
    e.preventDefault();
    let newCity = document.getElementById('city').value;
    let newCountry = document.getElementById('country').value;
    let feelings = document.getElementById("feelings").value;
    let name = document.getElementById("name").value;

    if (newCity == "" && newCountry == "") {
        alert("please insert name of a city and the corresponding country");
    } else if (newCity == ""){
        alert("please insert name of a city");
    } else if(newCountry == ""){
        alert("please insert name of a country");
    }
    getWeather(newCity+','+newCountry)
    .then(function (data) {
        postData('/addData', {
            userName: name,
            temperature: data.main.temp,
            date: newDate,
            userFeel: feelings

        })
    }).then(renderUI);
};

/* Function to GET Web API Data*/
const getWeather = async (newCity,newCountry)=>{
    const res = await fetch(url+newCity+','+newCountry+apiKey)
    try {
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const req = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    });

    try {
        const newData = await req.json();
        return newData;
    }
    catch(error) {
        console.log("error", error);
    }
  }

/* Function to GET Project Data */
const renderUI = async () =>{
    const request = await fetch('/get');
    try {
    const htmlData = await request.json();
    document.getElementById("name-content").innerHTML = `Name: ${htmlData.userName}`;
    document.getElementById("date").innerHTML = `Date: ${htmlData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${htmlData.temperature+' °C'}`;
    document.getElementById("content").innerHTML = `Your feelings: ${htmlData.userFeel}`;
    }
    catch(error) {
        console.log("error", error);
    }
};