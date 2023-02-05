const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  datestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  comment: {
    type: String,
    default: "No comment was left.",
    required: false,
    trim: true
  },
  datestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const booksSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true,
    trim: true
  },
  copiesSold: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  isbn: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: "No description found!",
    required: false,
    minLength: 0,
    maxLength: 1000,
    trim: true
  },
  yearPublished: {
    type: Number,
    required: true
  },
  ratings: [ratingSchema],
  comments: [commentSchema]
});

module.exports = mongoose.model("Books", booksSchema);
