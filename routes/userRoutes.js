const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");
const Song = mongoose.model("songs");

module.exports = app => {
  //유저 추가, returns a user model as response
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

  //유저 정보 수정
  //returns user (user.array is not updated.)
  app.patch("/api/user", async (req, res) => {
    const user = await User.findOneAndUpdate(
      { googleId: req.body.userId },
      { $addToSet: { favoritedSongsIds: req.body.songId } }
    );
    res.send(user);
  });
};
