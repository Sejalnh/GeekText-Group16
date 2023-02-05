const mongoose = require("mongoose");

const authorModel = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  biography: {
    type: String,
    default: "No biography provided!",
    required: true,
    trim: true
  },
  publisher: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model("Author", authorModel);
