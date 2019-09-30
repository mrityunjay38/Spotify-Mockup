const dbQuery = require('./connect');

async function fetchAllTracks() {
    let sql = 'select * from Artists, Tracks where Artists.artist = Tracks.artist';
    return await dbQuery(sql);
}

async function insertTrack(data) {

    let result = await dbQuery('select artist from Artists where artist = ?', Object.values(data)[0]);
    
    const addArtist = 'insert into Artists (artist) values (?)';
    const addTrack = 'insert into Tracks (artist, track) values (?, ?)';

    if(result.length === 0){
        return await Promise.all([dbQuery(addArtist,Object.values(data)[0]),dbQuery(addTrack,Object.values(data))]);
    }
    else{
        return await dbQuery(addTrack,Object.values(data));
    }
    
}


module.exports = {
    fetchAllTracks,
    insertTrack
}