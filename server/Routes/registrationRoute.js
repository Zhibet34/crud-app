const express = require('express')
const registrationRoute = express.Router();
const User = require('../models/User');

registrationRoute.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Register new user
        const user = new User({ email, username });
        await User.register(user, password);
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ 
            error: "Registration failed",
            details: error.message 
        });
    }
});

module.exports = registrationRoute