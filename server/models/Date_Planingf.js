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
    favorite: Number,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: [Number],
            require: true
        }
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,  // Store reference to User model
        ref: 'User',  // Reference to your User model
        required: true
    }
});

const Planing = mongoose.model('DatePlaning', PlaningSchema);

module.exports = Planing;