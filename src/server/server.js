const dotenv = require('dotenv');
dotenv.config();

//app.js
const app = require("./index");

// Spin up the server
const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log(`running on localhost: ${port}`);
})
