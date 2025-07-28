// Routes/loginRoute.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: info.message || 'Authentication failed' 
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Login error' });
      }
      return res.json({ 
        success: true, 
        message: 'Logged in successfully',
        user: { id: user._id, email: user.email }
      });
    });
  })(req, res, next);
});

module.exports = router;