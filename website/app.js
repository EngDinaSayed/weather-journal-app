/* Global Variables */
const generateBtn = document.getElementById('generate');
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiID = '1ac308d7083d5ae7a8452d8369c55784';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather';

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
generateBtn.addEventListener('click', (event) => {
	const zipValue = zip.value;
	const feelingsValue = feelings.value;
	weatherData(apiID, apiURL, zipValue)
    .then(function(data) {
    	postData('http://localhost:8080/add', {
    		temp: data.main.temp,
    		date: newDate,
    		content: feelingsValue
    	});
    	getData('http://localhost:8080/all');
    });  
});

/* Function to GET Web API Data*/
const weatherData = async (apiID, apiURL, zip) => {
	const request = await fetch(`${apiURL}?zip=${zip},us&units=metric&APPID=${apiID}`);
	try {
		const temp = await request.json();
		return temp;
	} catch (error) {
		console.log("error", error);
  };
};

/* Function to POST data */
const postData = async ( url = '', data = {} ) => {
    const response = await fetch( url, {
    	method: 'POST',
    	credentials: 'same-origin',
    	headers: {
    		'Content-Type': 'application/json',
    	},      
    	body: JSON.stringify(data), 
    });
    try {
    	const newData = await response.json();
    	return newData;
    } catch (error) {
    	console.log("error", error);
    }
};

/* Function to GET Project Data */
const getData = async ( url = '' ) => {
	const request = await fetch(url);
	try{
		const allData = await request.json();
		temp.innerHTML = allData.temp;
		date.innerHTML = allData.date;
		content.innerHTML = allData.content;		
	} catch (error) {
		console.log("error", error);
	}
};
