const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(()=>{
        console.log('the database is connected')
    })


app.get('/',(req,res)=>{
    res.send('welcome')
})

const port = 3000
app.listen(port, ()=>{
    console.log(`the server is live on port ${port}`)
})