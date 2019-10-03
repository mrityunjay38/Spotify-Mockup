const dbQuery = require("./connect");

async function fetchAllTracks() {
  let sql =
    "select * from Artists, Tracks where Artists.artist = Tracks.artist";
  return await dbQuery(sql);
}

async function insertTrack(data) {
  let result = await dbQuery(
    "select id from Artists where artist = ?",
    Object.values(data)[0]
  );

  const addArtist = "insert into Artists (artist) values (?)";
  const addTrack = `insert into Tracks (artist_id, artist, track) values ((select id from Artists where artist = '${
    Object.values(data)[0]
  }'), ?, ?)`;

  if (result.length === 0) {
    try {
      await dbQuery(addArtist, Object.values(data)[0]);
      await dbQuery(addTrack, Object.values(data));
    } catch (err) {
      return err;
    }
  } else {
    try {
      await dbQuery(addTrack, Object.values(data));
    } catch (err) {
      return err;
    }
  }
}

async function modifyArtist(artist) {
  let result = await dbQuery(
    "select artist from Artists where artist = ?",
    artist
  );
  if (result.length !== 0) {
    try {
      await dbQuery(
        `update Artists set artist = ? where artist = '${artist}'`,
        artist
      );
      await dbQuery(
        `update Tracks set artist = ? where artist = '${artist}'`,
        artist
      );
    } catch (err) {
      return err;
    }
  }
}

async function modifyTrack(track) {
  let result = await dbQuery("select track from Tracks where track = ?", track);
  if (result.length !== 0) {
    await dbQuery(
      `update Tracks set track = ? where track = '${track}'`,
      track
    );
  }
}

async function deleteArtist(artist) {
  let result = await dbQuery(
    "select artist from Artists where artist = ?",
    artist
  );
  if (result.length !== 0) {
    await dbQuery(`delete from Artists where artist = ?`, artist);
  }
}

async function deleteTrack(track) {
  let result = await dbQuery("select track from Tracks where track = ?", track);
  if (result.length !== 0) {
    await dbQuery(`delete from Tracks where track = ?`, track);
  }
}

module.exports = {
  fetchAllTracks,
  insertTrack,
  modifyArtist,
  modifyTrack,
  deleteArtist,
  deleteTrack
};
