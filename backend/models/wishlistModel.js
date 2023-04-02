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
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Wishlist", wishlistModel);
