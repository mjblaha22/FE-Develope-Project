// whole bunch of server needed stuff ;-)
var path = require('path')
const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const mockAPIResponse = require('./mockAPI.js')
const fetch = require("node-fetch");
const app = express()
app.use("src/client", express.static('src/client'))
app.use(express.static('dist'))
const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY
const cors = require('cors');
// set global variable to be used in server
let outcome = ''
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// the single page app page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
// posts meaningCloud output to endpoint
app.post('/api', async function(req, res) {
    userInput = req.body.url;
    const apiURL = `${baseUrl}${apiKey}&url=${userInput}&lang=en`
    const response = await fetch(apiURL)
    const responseData = await response.json()
    outcome = { 
        status: responseData.status,
        model: responseData.model,
        score_tag: responseData.score_tag,
        agreement: responseData.agreement,
        subjectivity: responseData.subjectivity,
        confidence: responseData.confidence,
        irony: responseData.irony
    }
    res.send(outcome)
})
// fetch the outcome from meaningCloud output
app.get('/api', function (req, res) {
    res.send(outcome)
})

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8081!')
})
// old from past exercise.. good go.. but it just looks good here
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
