// models/Song.js
const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    genre: String,
    year: Number,
    rating: { type: Number, min: 1, max: 10 },
    releaseDate: { type: Date },
});

module.exports = mongoose.model('Song', SongSchema);
