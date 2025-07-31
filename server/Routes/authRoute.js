const express = require('express'); 
const authRoute = express.Router();

authRoute.get('/', (req, res) => {
    try {
      // Debugging output
      console.log('Session ID:', req.sessionID);
      console.log('Authenticated:', req.isAuthenticated());
      console.log('User:', req.user);
      
      if (req.isAuthenticated()) {
        return res.json({ 
          isAuthenticated: true,
          user: req.user 
        });
      }
      
      res.json({ isAuthenticated: false });
    } catch (error) {
      console.error('Auth check error:', error);
      res.status(500).json({ error: 'Authentication check failed' });
    }
});

module.exports = authRoute