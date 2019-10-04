const express = require("express");
const router = express.Router();
const dbQuery = require("../database/dbQuery");
const verifyToken = require("../middleware/verifyToken");


router.put("/track=:track", async (req, res) => {
  try {
    let result = await dbQuery.modifyTrack(req.params.track);
    res.json(result);
    res.status(200);
  } catch (err) {
    console.log("Error while modifying track.....");
    res.json(err);
    res.status(404);
  }
});

router.delete("/track=:track", async (req, res) => {
  try {
    let result = await dbQuery.deleteTrack(req.params.track);
    res.json(result);
    res.status(200);
  } catch (err) {
    console.log("Error while deleting track.....");
    res.json(err);
    res.status(404);
  }
});

module.exports = router;
