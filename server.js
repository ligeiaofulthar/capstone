// express to run server and routes
const express = require('express')

// start-up instance of app
const app = express();

/* include dependencies */
//bodyParser as middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//cors
const cors = require('cors')
app.use(cors());

const path = require('path');

/* Initializing the main project folder */
app.use(express.static(path.join('website')));

// Spin up the server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// app endpoint
let projectData = {};

/* get route */
app.get('/get', sendData);

function sendData(req, res) {
    res.send(projectData);
}

/* post route */
app.post('/addData', addData);

function addData(req,res){
    projectData['userName'] = req.body.userName;
    projectData['date'] = req.body.date;
    projectData['temperature'] = req.body.temperature;
    projectData['userFeel'] = req.body.userFeel;
    res.send(projectData);
}