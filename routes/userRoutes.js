const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");
const Song = mongoose.model("songs");

module.exports = app => {
  app.post("/api/user", async (req, res) => {
    // console.log(req.body);
    const existingUser = await User.findOne(
      { googleId: req.body.userId },
      "-_id -__v"
    );
    if (existingUser) {
      res.send(existingUser);
    } else {
      const user = await new User({
        googleId: req.body.userId,
        displayName: req.body.displayName
      }).save();
      res.send(user);
    }
  });

  app.patch("/api/user", async (req, res) => {
    const user = await User.findOneAndUpdate(
      { googleId: req.body.userId },
      { $addToSet: { favoritedSongsIds: req.body.songId } }
    );
    res.send([...user.favoritedSongsIds, req.body.songId]);
  });
};
