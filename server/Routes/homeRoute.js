const express = require('express');
const DB = require('../models/Date_Planingf')
const homeRoute = express.Router()

homeRoute.get('/',async (req,res)=>{
    let home_data = await DB.find({});
    res.send(home_data)
})

module.exports = homeRoute;