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
app.use(express.json())  
//cors
const cors = require('cors');
app.use(cors());
//main folder
app.use(express.static('site'));
//port
const port = 3000;
//server
const server = app.listen(port, listening);
//listen
function listening(){
    console.log(`running on localhost: ${port}`);
};

let projectData =[];
app.get('/all',sendData);
function sendData(req,res){
    res.send(projectData);
    projectData=[];
}

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
