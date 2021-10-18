//express
const express = require('express');
//app
const app = express();
/* Middleware*/
//body-parser
const bodyParser = require('body-parser')
//use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//cors
const cors = require('cors');
app.use(cors());
//main folder
app.use(express.static('site'));
//port
const port = 8000;
//server
const server = app.listen(port, listening);
//listen
function listening(){
    console.log(`running on localhost: ${port}`);
};

//rout
//1-GET
 const projectData=[];
 app.get('/all', (req, res) => {
  res.send(projectData)
  console.log(projectData);
})

//2-POST
app.post('/addWeather', addWeather);
function addWeather(req, res) {
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings,
        city:req.body.city
    }
    projectData.push(newEntry)
    res.send(projectData)
    console.log('POST')

}
