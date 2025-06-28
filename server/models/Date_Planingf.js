const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const PlaningSchema = new mongoose.Schema({
    title: String,
    photo: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    body: String,
    address: String,
    meta: {
        favorite: Number
    }
});

const Planing = mongoose.model('DatePlaning', PlaningSchema);

module.exports = Planing;