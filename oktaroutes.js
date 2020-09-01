var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();
var config = require('../config/config.json');
const fs = require('fs')
const IncomingForm = require('formidable').IncomingForm;
var bodyParser = require('body-parser')
var filename = ""


// parse application/x-www-form-urlencoded
oktapost.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
oktapost.use(bodyParser.json());


oktapost.post("/createUser",function (req, res) {
    console.log(req.body);
    var url=config.url;
    var apikey=config.token;
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });
    firstName = req.body['firstName'],
    lastName = req.body['lastName'],
    email = req.body['email'],
    login = req.body['email'],
    company = req.body['company']
    const newUser = {
    profile: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        login: login,
        organization : company
    }
    }
    console.log(newUser);
    client.createUser(newUser)
    .then(user => res.send(true))
        .catch(err =>{
		console.log(err);
        res.send(false)}
    );
});


module.exports = oktapost;