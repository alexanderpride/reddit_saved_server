const randomString = require('randomstring');
const axios = require('axios');
let btoa = require('btoa');
const snoowrap = require('snoowrap');

exports.auth_link = function(req, res, next){
    // Generates the link for the user to allow access to the api

    // Generate random string and store it to validate session request
    let state_string = randomString.generate(32);
    req.session.auth_state_string = state_string;

    console.log('SessionID for auth link', req.sessionID);

    let url = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=${state_string}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&duration=temporary&scope=identity history`;

    res.json({auth_link: url});
    };

exports.link = function (req, res, next) {
    // Is called by the API to return to the web-page, stores the access token to allow continued requests to the API

    // Params passed to server on success
    console.log(req.body);
    console.log(req.data);
    let state = req.body.state;
    let code = req.body.code;

    console.log('SessionID', req.sessionID);
    console.log('State', state);
    console.log('Code', code);
    console.log('Session State', req.session.auth_state_string);

    // Check to make sure session strings are the same
    if (state !== req.session.auth_state_string){
        res.cookie('failtest', '1234');
        res.status(403);
        res.send({error: 'Forbidden'});
    }
    else {
        // Variables to be sent to the API
        let address = "https://www.reddit.com/api/v1/access_token";
        let data_string = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}`;
        let encode = btoa(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`);
        let headers = {
            "Authorization": `Basic ${encode}`
        };

        axios.post(address, data_string,{headers})
            .then(function (response) {

                // Save access token for subsequent requests to the API
                req.session.access_token = response.data['access_token'];

                res.cookie('alive', true);
                res.send();

            }).catch(function (error) {
            console.log(error)
        });

    }


};
