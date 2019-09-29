const dbQuery = require('./connect');


async function fetchAllTracks() {
    let sql = 'select * from Artists, Tracks where Artists.id = Tracks.artist_id Group by Artists.id';
    return await dbQuery(sql);
}

async function insertTrack(data) {
    let sql = `insert into Tracks (artist_id, track) values (${data.artist_id}, "${data.track}")`;
    return await dbQuery(sql);
}

async function insertArtist(artist) {
    let sql = `insert into Artists (artist) values ("${artist}")`;
    return await dbQuery(sql);
}

module.exports = {
    fetchAllTracks,
    insertTrack,
    insertArtist,
}