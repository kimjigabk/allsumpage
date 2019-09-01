// const path = require("path");
const mongoose = require("mongoose");

const Song = mongoose.model("songs");

module.exports = app => {
  app.get("/api/songs", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "test.json"));
    Song.find({}, function(err, songs) {
      res.send(songs);
    });
  });

  app.get("/api/songs/:id", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "test.json"));
    Song.findOne({ id: req.params.id }, function(err, song) {
      res.send(song);
    });
  });

  app.post("/api/songs", async (req, res) => {
    const { title, artist, description, youtubeUrl, authorId } = req.body;

    const song = new Song({
      title,
      artist,
      description,
      youtubeUrl,
      authorId,
      id: Date.now()
    });
    try {
      await song.save();
      res.send(song);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete("/api/songs/:id", (req, res) => {
    Song.findOneAndDelete({ id: req.params.id }, function(err, response) {
      if (err) {
        res.status(422).send(err);
      } else {
        res.send(response);
      }
    });
  });
};
