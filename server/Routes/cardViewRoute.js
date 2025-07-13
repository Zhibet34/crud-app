const express = require('express')
const cardViewRoute = express.Router();
const DB = require('../models/Date_Planingf')

cardViewRoute.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const card = await DB.findById(id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        };

        res.json(card)
    } catch (error) {
        
    }
})

module.exports = cardViewRoute;