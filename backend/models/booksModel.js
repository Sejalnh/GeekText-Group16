const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  copiesSold: Number,
  rating: Number,
  publisher: String,
  price: Number,
});

module.exports = mongoose.model("Books", booksSchema);
