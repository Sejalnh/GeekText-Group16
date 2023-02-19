const mongoose = require("mongoose");

const wishlistModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  items: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model("Wishlist", wishlistModel);