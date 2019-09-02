const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  favoritedSongsIds: [Number]
});

mongoose.model("users", userSchema);
