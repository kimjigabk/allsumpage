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
        "https://cdnimg.melon.co.kr/cm/album/images/026/81/021/2681021_1000.jpg/melon/quality/80/optimize";
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
      function(err, response) {
        if (err) {
          res.status(422).send(err);
        } else {
          res.send(response);
        }
      }
    );
  });

  app.delete("/api/songs/:id", requireLogin, (req, res) => {
    Song.findOneAndDelete({ id: req.params.id }, function(err, response) {
      if (err) {
        res.status(422).send(err);
      } else {
        res.send(response);
      }
    });
  });
};
