const express = require('express');
const router = express.Router();
const runQuery = require('../database/runQuery');

router.get('/', async (req, res) => {
    try{
        let result = await runQuery.fetchAllTracks();
        console.log(result);
        res.json(result);
    }
    catch (err) {
        console.log('Error while fetching Spotify.....');
        console.log(err);
        res.json(err);    
    }
});

router.post('/artist=:artist', async (req, res) => {
    try {
        let result  = await runQuery.insertArtist(req.params.artist);
        console.log(result);
        res.json(result);
    }
    catch (err) {
        console.log('Error while inserting track.....');
        console.log(err);
        res.json(err);
    }
});


router.post('/track', async (req, res) => {
    try {
        let result  = await runQuery.insertTrack(req.body);
        console.log(result);
        res.json(result);
    }
    catch (err) {
        console.log('Error while inserting track.....');
        console.log(err);
        res.json(err);
    }
});


module.exports = router;