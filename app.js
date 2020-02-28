const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session =  require('express-session');
const mongo_storage = require('connect-mongo')(session);
const cors = require('cors');


// let mongoDB = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0-vbimk.mongodb.net/test?retryWrites=true&w=majority`;
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const valid = ['http://localhost:8080'];

const contentRouter = require('./routes/content');
const usersRouter = require('./routes/users');

const app = express();

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    secret: 'Quinn Hughes',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false
    }
}));




app.use('/content', contentRouter);
app.use('/users', usersRouter);

module.exports = app;
