const mongoose = require("mongoose");

const wishlistModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true
  },
  items: [String]
});

module.exports = mongoose.model("Wishlist", wishlistModel);
