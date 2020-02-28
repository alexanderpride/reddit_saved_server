const snoowrap = require('snoowrap');

exports.getDefault = function (req, res, next) {

    const reddit = new snoowrap({
        userAgent: 'Saved for Reddit',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        accessToken: req.session.access_token
    });

    reddit.getMe().getSavedContent().then(function (response) {
        res.send(response);
    })
};