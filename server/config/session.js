const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = {
  secret: process.env.SESSION_ID || 'your-secret-key-32-chars-min',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/your-db-name',
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // 14 days
    autoRemove: 'native',
    crypto: {
      secret: process.env.SESSION_CRYPTO_SECRET || 'your-crypto-secret-32-chars'
    }
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
};

module.exports = session(sessionConfig);