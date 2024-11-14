//songRoutes.js 
const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

// Route 1: GET all songs
router.get('/getall', async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route 2: GET a song by ID
router.get('/get/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ success: false, message: 'Song not found' });
        res.status(200).json({ success: true, data: song });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route 3: POST add a new song
router.post('/add', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const newSong = new Song(req.body);
        const savedSong = await newSong.save();
        res.status(201).json({ success: true, data: savedSong });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Route 4: PUT update a song by ID
router.put('/update/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    const { rating } = req.body; // Get the rating from the request body

    try {
        // Find the song by ID and update the rating
        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ success: false, message: 'Song not found' });

        song.rating = rating; // Update the rating
        const updatedSong = await song.save(); // Save the updated song

        res.status(200).json({ success: true, data: updatedSong });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Route 5: DELETE a song by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedSong) return res.status(404).json({ success: false, message: 'Song not found' });
        res.status(200).json({ success: true, message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route 6: GET search songs by artist
router.get('/search', async (req, res) => {
    try {
        const artist = req.query.artist;
        const songs = await Song.find({ artist: new RegExp(artist, 'i') });
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Route 7: GET top 5 songs by rating
router.get('/top5', async (req, res) => {
    try {
        const topSongs = await Song.find().sort({ rating: -1 }).limit(5);
        res.status(200).json({ success: true, data: topSongs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
