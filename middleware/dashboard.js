const dbQuery = require("../database/dbQuery");

async function dashboard(req, res) {
  const newTrack = {
    artist: req.body.artist,
    track: req.body.track
  };

  try {
    await dbQuery.insertTrack(newTrack);
    res.render("dashboard", { status: "New track added." });
    res.status(200);
  } catch (err) {
    res.render("dashboard", { status: "New track addition unsuccessful." });
    res.status(400);
  }
}

module.exports = dashboard;
