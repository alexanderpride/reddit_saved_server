const randomString = require('randomstring');
const axios = require('axios');
const snoowrap = require('snoowrap');
let btoa = require('btoa');

exports.auth_link = function(req, res, next){
    // Generates the link for the user to allow access to the api

    // Generate random string and store it to validate session request
    let state_string = randomString.generate(10);
    req.session.state_string = state_string;
    console.log(req.sessionID);

    let url = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=${state_string}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&duration=temporary&scope=identity history`;
    res.json({auth_link: url});
};

exports.test_auth_link = function(req, res, next){

    console.log(req.session.state_string, 'blah');
    console.log(req.sessionID);

};

exports.link = function (req, res, next) {
    // Is called by the API to return to the web-page, stores the access token to allow continued requests to the API

    // Params passed to server on success
    let state = req.query.state;
    let code = req.query.code;


    if (state !== req.session.state_string){
        res.status(403);
        res.send({error: 'Forbidden'});
    }

    // Variables to be sent to the API
    let address = "https://www.reddit.com/api/v1/access_token";
    let data_string = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}`;
    let encode = btoa(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`);
    let headers = {
        "Authorization": `Basic ${encode}`
    };

    axios.post(address, data_string,{headers}).then(function (response) {

        // Save access token for subsequent requests to the API
        req.session.access_token = response.data['access_token'];

    }).catch(function (error) {
        console.log(error)
    })


};
