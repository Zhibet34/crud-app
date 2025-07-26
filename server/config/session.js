const session = require('express-session');

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use env variable
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

module.exports = session(sessionConfig); // Returns configured session middleware