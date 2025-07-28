const express = require('express'); 
const authRoute = express.Router();

authRoute.get('/',(req,res)=>{
    res.json({isAuthenticated: req.isAuthenticated})
});

module.exports = authRoute