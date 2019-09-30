const express = require('express');
const router = express.Router();
const dbQuery = require('../database/dbQuery');
const verifyToken = require('../middleware/verifyToken');


router.get('/', async (req, res) => {
    try{
        let result = await dbQuery.fetchAllTracks();
        res.render('index', {result});

    }
    catch (err) {
        console.log('Error while fetching Spotify.....');
        res.json(err);    
    }
});

router.post('/artist=:artist', verifyToken , async (req, res) => {
    try {
        let result  = await dbQuery.insertArtist(req.params.artist);
        res.json(result);
    }
    catch (err) {
        console.log('Error while inserting track.....');
        res.json(err);
    }
});


router.post('/track', verifyToken, async (req, res) => {
    try {
        let result  = await dbQuery.insertTrack(req.body);
        res.json(result);
    }
    catch (err) {
        console.log('Error while inserting track.....');
        console.log(err);
        res.json(err);
    }
});


module.exports = router;