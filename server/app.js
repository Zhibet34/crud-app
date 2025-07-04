const express = require('express')
const cors = require('cors'); // Enable CORS
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRoute = require('./Routes/homeRoute');
const deleteRoute = require('./Routes/deleteRoute');

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(()=>{
        console.log('the database is connected')
    })

app.use(cors());
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.use('/',homeRoute)
app.use('/delete', deleteRoute)

const port = 3000
app.listen(port, ()=>{
    console.log(`the server is live on port ${port}`)
})