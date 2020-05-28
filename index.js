const express = require('express'); //This is running the express we downloaded 
const hbs = require('hbs'); // This runs the handle bars we downloaded >>> npm i express hbs
const path = require('path');
const request = require('request');

const app = express(); // This makes sure the app is running

const publicDirectory = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './views');

app.use(express.static(publicDirectory));

app.use(express.urlencoded());

app.use(express.json()); //Converts to a json format 

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.get("/", (req, res) => {
    res.render('index');
});               

app.post('/api/weather', (req, res) => {
    console.log(req.body);

    const city = req.body.cityName;                                             //You are assigning category here and adding it with the ${} inside the jokeUrl

    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b676a0d89937b83a7833bb6f9059d562`;
        console.log(weatherUrl);                   //this will show the url you requested from the api and show in the console
    request({ url: weatherUrl, json: true }, (error, response) => {        //error is any errors while grabbing what you need. response is the data you are trying to get

        console.log(response.body);
        console.log(error);

        if(response.body.error) {
            res.render('index', {
                weather: "Sorry that City does not exist"
            });
        } else {
            res.render('index', {
                weather: response.body.main.temp
            })
        }

        res.render('index', {
            weather: response.body.main.temp
        })


    });
});



app.listen(5000, () => {
    console.log('Server is running on port 5000'); //React runs on port 3000 so run node.js on 5000 best practice not to run on the same 
});