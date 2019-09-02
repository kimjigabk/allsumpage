// const path = require("path");
const mongoose = require("mongoose");

const Song = mongoose.model("songs");

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

  app.post("/api/songs", async (req, res) => {
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
      authorId,
      imageUrl,
      id: Date.now()
    });
    try {
      await song.save();
      res.send(song);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.patch("/api/songs/:id", (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);
    Song.findOneAndUpdate({ id: req.params.id }, req.body, function(
      err,
      response
    ) {
      if (err) {
        res.status(422).send(err);
      } else {
        res.send(response);
      }
    });
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
