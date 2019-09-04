const keys = require("../config/keys");
const mongoose = require("mongoose");
const Song = mongoose.model("songs");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get("/api/songs", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "test.json"));
    Song.find({}, "-_id -__v", function(err, songs) {
      res.send(songs);
    });
  });

  app.get("/api/songs/:id", (req, res) => {
    // res.sendFile(path.resolve(__dirname, "test.json"));
    Song.findOne({ id: req.params.id }, function(err, song) {
      res.send(song);
    });
  });

  app.post("/api/songs", requireLogin, async (req, res) => {
    // if (req.body.authorId !== keys.adminId) {
    //   return res.status(401).send({ error: "You must log in" });
    // }
    const { title, artist, description, youtubeUrl, authorId } = req.body;
    let imageUrl;
    if (!req.body.imageUrl) {
      imageUrl =
        "https://musicmeta-phinf.pstatic.net/album/000/466/466579.jpg?type=r360Fll&v=20141128120110";
    } else {
      imageUrl = req.body.imageUrl;
    }
    const song = new Song({
      title,
      artist,
      description,
      youtubeUrl,
      imageUrl,
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

  app.patch("/api/songs/:id", requireLogin, (req, res) => {
    const { title, artist, description, youtubeUrl, imageUrl } = req.body;
    Song.findOneAndUpdate(
      { id: req.params.id },
      { title, artist, description, youtubeUrl, imageUrl },
      function(err, song) {
        if (err) {
          res.status(422).send(err);
        } else {
          res.send(song);
        }
      }
    );
  });

  app.delete("/api/songs/:id", requireLogin, (req, res) => {
    Song.findOneAndDelete({ id: req.params.id }, function(err, song) {
      if (err) {
        res.status(422).send(err);
      } else {
        res.send(song);
      }
    });
  });
};
