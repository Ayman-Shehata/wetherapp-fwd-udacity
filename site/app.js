
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=c93f60dd39d984124ac32ea0beaa7de5';

//Get the date
let today = new Date();
let newDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// click listener
document.getElementById('generate').addEventListener('click', clickAction);

function clickAction(e) {
  e.preventDefault();
    const newZip = document.getElementById('zip').value;
    
  const contentText = document.getElementById('feelings').value;
  
  getWeather(baseURL, newZip, apiKey)
    .then(function (data) {
      postData('/addWeather', { date: newDate, temp: data.main.temp, content:contentText, city: data.name})
    }).then(
      
      ()=> updateUI()
    );
}

const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {}) => {
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
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};
//update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    
      document.getElementById('result').innerHTML = "Result";
      document.getElementById('city').innerHTML = `City: ${allData[0].city}`;
      document.getElementById('temp').innerHTML = `Temp: ${allData[0].temp}`;
      document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`;
      document.getElementById('date').innerHTML = `Date: ${allData[0].date}`; 
  }
  catch (error) {
    console.log("error", error);
  }
}

