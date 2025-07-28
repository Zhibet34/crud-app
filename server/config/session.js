const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';
// Session configuration
const sessionConfig = {
  secret: 'your-secret-key-at-least-32-characters-long',
  store: MongoStore.create({
    mongoUrl: mongoUrl,
    collectionName: 'sessions', // optional
    ttl: 14 * 24 * 60 * 60, // session TTL (optional, in seconds)
    autoRemove: 'native' // automatic cleanup of expired sessions
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
};

module.exports = session(sessionConfig); // Returns configured session middleware