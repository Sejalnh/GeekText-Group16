const mongoose = require("mongoose");
const userSchema = require("./userModel");

const ratingSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    get: v => Math.round(v),
    set: v => Math.round(v)
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
    required: true,
    get: v => Math.floor(v),
    set: v => Math.floor(v)
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  isbn: {
    type: Number,
    required: true,
    get: v => Math.floor(v),
    set: v => Math.floor(v)
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
    required: true,
    get: v => Math.floor(v),
    set: v => Math.floor(v)
  },
  ratings: [ratingSchema],
  comments: [commentSchema]
});

module.exports = mongoose.model("Books", booksSchema);
