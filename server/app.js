const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRoute = require('./Routes/homeRoute');
const deleteRoute = require('./Routes/deleteRoute');
const postRoute = require('./Routes/postRoute');
const cardViewRoute = require('./Routes/cardViewRoute');
const searchRoute = require('./Routes/cardSearch');

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

// Routes
app.use('/', homeRoute);
app.use('/delete', deleteRoute);
app.use('/restaurants', postRoute);
app.use('/cards/search', searchRoute);
app.use('/cards', cardViewRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;