const randomString = require('randomstring');
const axios = require('axios');
const snoowrap = require('snoowrap');
let btoa = require('btoa');

exports.auth_link = function(req, res, next){
    // Generates the link for the user to allow access to the api
    let state_string = randomString.generate(10);
    let url = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_CLIENT_ID}&response_type=code&state=${state_string}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}&duration=temporary&scope=identity history`;
    res.json({auth_link: url});
};

exports.link = function (req, res, next) {
    //Params passed to server on success
    let state = req.query.state;
    let code = req.query.code;

    res.send('Thank you, you may close the page');

    let address = "https://www.reddit.com/api/v1/access_token";
    let data_string = `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDDIT_REDIRECT_URI}`;
    let encode = btoa(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`);
    let headers = {
        "Authorization": `Basic ${encode}`
    };

    axios.post(address, data_string,{headers}).then(function (response) {

        let access_token = response.data['access_token'];

        const reddit = new snoowrap({
            userAgent: process.env.REDDIT_USER_AGENT,
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            accessToken: access_token
        });

        reddit.getMe().getSavedContent().fetchAll().then(function (saved) {
            console.log(saved);
        }).catch(function (error) {
            console.log(error)
        })

    }).catch(function (error) {
        console.log(error)
    })


};
