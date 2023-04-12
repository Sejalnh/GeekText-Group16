const mongoose = require("mongoose");
const {ratingSchema}=require('./ratingSchema')
const {commentSchema}=require('./commentSchema')
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
  ISBN: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: "No description found!",
    required: true,
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
