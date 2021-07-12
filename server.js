// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Spin up the server
// Callback to debug
const port = 8080;
const server = app.listen(port, listening);

function listening(){
	console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
	response.send(projectData);
};

// Post Route
app.post('/add', callBack);

function callBack(request, response){
	info = {
		temp: request.body.temp,
        date: request.body.date,
        content: request.body.content
	};
	projectData = info;
	response.send(projectData);
};
