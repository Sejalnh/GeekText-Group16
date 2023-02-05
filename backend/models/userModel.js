const mongoose = require("mongoose");

const creditCardSchema = mongoose.Schema({
  creditCardNumber: {
    type: Number,
    required: true
  },
  securityCode: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  }
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  wishlist: {
    type: Map,
    of: [String],
    required: true
  },
  creditCards: [creditCardSchema],
  shoppingCart: [String]
});

module.exports = mongoose.model("User", userSchema);
