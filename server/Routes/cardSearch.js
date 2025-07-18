const express = require('express');
const searchRoute = express.Router();
const DB = require('../models/Date_Planingf')

searchRoute.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.name;
         console.log(searchTerm)
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: 'Search term is required'
            });
        }

        const results = await DB.find({ 
            title: { $regex: searchTerm, $options: 'i' } 
        });

        res.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during search',
            error: error.message 
        });
    }
});

module.exports = searchRoute;