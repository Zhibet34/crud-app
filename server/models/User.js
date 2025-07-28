// models/User.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
  // No need for explicit password field when using passport-local-mongoose
  // It will add username, hash and salt fields automatically
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);