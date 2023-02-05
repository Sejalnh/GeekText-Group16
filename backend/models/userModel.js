const mongoose = require("mongoose");

const creditCardSchema = mongoose.Schema({
  number: {
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
    of: [mongoose.Types.ObjectId],
    required: true
  },
  creditCards: [creditCardSchema],
  shoppingCart: [mongoose.Types.ObjectId]
});

module.exports = mongoose.model("User", userSchema);
