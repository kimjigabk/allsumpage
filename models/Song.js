const mongoose = require("mongoose");
const { Schema } = mongoose;

const songSchema = new Schema({
  title: String,
  artist: String,
  description: String,
  youtubeUrl: String,
  imageUrl: String,
  authorId: String,
  id: Number
});

mongoose.model("songs", songSchema);
