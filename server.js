//express
const express = require('express');
//app
const app = express();

//body-parser
const bodyParser = require('body-parser')
//use
//app.use(express.urlencoded({ extended: true }))

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
//cors
const cors = require('cors');
app.use(cors());
//main folder
app.use(express.static('site'));
//port
const port = 4000;
//server
const server = app.listen(port, listening);
//listen
function listening(){
    console.log(`running on localhost: ${port}`);
};

projectData =[];
//rout
//1-GET
 //const projectData=[];
 //app.get('/all', (req, res) => {
 // res.send(projectData);
  //console.log(projectData);
//})
app.get('/all',sendData);

function sendData(req,res){
    res.send(projectData);
    projectData=[];
}

//2-POST
app.post('/addWeather', addWeather);

function addWeather(req, res) {
    console.log( req.body);
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content,
        city: req.body.city,
    }
    projectData.push(newEntry);
    res.send(projectData);
    console.log('data posted ');

}
