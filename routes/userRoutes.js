const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");
const Song = mongoose.model("songs");

module.exports = app => {
  app.post("/api/user", async (req, res) => {
    console.log(req.body);
    const existingUser = await User.findOne({ googleId: req.body.userId });
    if (existingUser) {
      res.send("Hi");
    } else {
      const user = await new User({ googleId: req.body.userId }).save();
      res.send("Created");
    }
  });
};
