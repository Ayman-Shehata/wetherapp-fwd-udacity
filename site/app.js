
let apiURL =  `https://api.openweathermap.org/data/2.5/weather?apikey=c93f60dd39d984124ac32ea0beaa7de5&zip=`
/*let apiKey = "c93f60dd39d984124ac32ea0beaa7de5";*/

let myDate = new Date();
let newDate = myDate.getMonth()+'.'+ myDate.getDate()+'.'+ myDate.getFullYear();

// Event listener 
document.getElementById('generate').addEventListener('click', performAction);

/* Function */
function performAction(e){
  
    const newZip=  document.getElementById('zipcode').value;
  console.log('newzip:'+ newZip);
    const feelings=document.getElementById('feelings').value;
    console.log('you feel:'+feelings);
    //----------------------------------------------
    getWeather(apiURL, newZip)
    .then(function(data){
      console.log(data);
        postData('/addWeather', { temp:data.main.temp, date:newDate,feelings:feelings ,city:data.name});
        console.log('City :'+data.name);
    })
       .then(
        updateUI()
      )
    }
   // ------get the url with the user zip--------------------------
    const getWeather = async (apiURL, zip)=>{
      const res = await fetch(apiURL+zip)
      try {
      const data = await res.json();
        return data;
      }  catch(error) {
        console.log("error", error);
      }
    }
   
//  POST
const postData = async ( url = "", data = {} )=>{
  
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),   
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
   
    }
}

// GET
const getData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const Data = await request.json()
  return data;
  }
  catch(error) {
    console.log("error", error);
    
  }
};

//Update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      const c =allData[0].temp-273;
      var num = c.toFixed(2);
      console.log("Temp in c:"+num);
      document.getElementById('date').innerHTML = " Today is "+allData[0].date;
      document.getElementById('city').innerHTML = " in "+allData[0].city;
      document.getElementById('temp').innerHTML = " The tempreture is "+(num)+' °C';
      document.getElementById('content').innerHTML = " and you feel: "+allData[0].feelings;
  
    }catch(error){
      console.log("error", error);
    }
}