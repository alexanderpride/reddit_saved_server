const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session =  require('express-session');
const mongo_storage = require('connect-mongo')(session);


let mongoDB = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0-vbimk.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Elias Pettersson',
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: false}
    // store: new mongo_storage({mongooseConnection: db}),
    // autoRemove: 'native'
}));




app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
