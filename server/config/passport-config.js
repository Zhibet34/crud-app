// config/passport-config.js
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email' // using email as username
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }

          // passport-local-mongoose provides authenticate method
          return user.authenticate(password, (err, user, info) => {
            if (err) return done(err);
            if (!user) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};