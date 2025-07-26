const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
const passportLocalMongoose = require('passport-local-mongoose')

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
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)