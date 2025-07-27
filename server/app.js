const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const sessionMiddleware = require('./config/session');
const passport = require('./config/passport');
const homeRoute = require('./Routes/homeRoute');
const deleteRoute = require('./Routes/deleteRoute');
const postRoute = require('./Routes/postRoute');
const cardViewRoute = require('./Routes/cardViewRoute');
const searchRoute = require('./Routes/cardSearch');
const registrationRoute = require('./Routes/registrationRoute');

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test')
    .then(() => {
        console.log('Database is connected');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session())

// Routes
app.use('/', homeRoute);
app.use('/delete', deleteRoute);
app.use('/restaurants', postRoute);
app.use('/cards/search', searchRoute);
app.use('/cards', cardViewRoute);
app.use('/register', registrationRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;