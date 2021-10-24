
/* Global Variables */
const form = document.querySelector('.app__form');
// Base URL and API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=c93f60dd39d984124ac32ea0beaa7de5';

//Get the date
let d = new Date();
let newDate = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();
//let newDate = d.format("{Month:2}-{Date:2}-{FullYear}"); // mm-dd-yyyy

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values
  
  const newZip = document.getElementById('zip').value;
  const contentText = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (data) {
      console.log(data);
      // add data to POST request
      postData('/addWeather', { date: newDate, temp: data.main.temp, content:contentText, city: data.name})
    }).then(
      // call updateUI to update browser content
      updateUI()
    )
  // reset form
  //form.reset();
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  console.log("postdata function: " + data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    
    // update new entry values
    document.getElementById('date').innerHTML = `Date: ${allData[0].date}`; // allData[0].date;
    document.getElementById('temp').innerHTML = `Temp: ${allData[0].temp}`;
    document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`;
    document.getElementById('city').innerHTML = `City: ${allData[0].city}`;
  }
  catch (error) {
    console.log("error", error);
  }
};

