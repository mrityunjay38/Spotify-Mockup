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

router.put('/artist=:artist', verifyToken , async (req, res) => {
    try {
        let result  = await dbQuery.modifyArtist(req.params.artist);
        res.json(result);
        res.status(200);
    }
    catch (err) {
        console.log('Error while modifying artist.....');
        res.json(err);
        res.status(403);
    }
});


router.delete('/artist=:artist', verifyToken, async (req, res) => {
    try {
        let result  = await dbQuery.deleteArtist(req.params.artist);
        res.json(result);
        res.status(200);
    }
    catch (err) {
        console.log('Error while deleting artist.....');
        res.json(err);
        res.status(403);

    }
});


module.exports = router;