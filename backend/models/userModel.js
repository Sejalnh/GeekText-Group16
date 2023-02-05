const mongoose = require("mongoose");
const validator = require("validator");

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
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 5
  },
  name: {
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    }
  },
  homeAddress: {
    street: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false,
      uppercase: true,
      minlength: 2,
      maxlength: 2
    },
    zipCode: {
      type: Number,
      required: false,
      minlength: 5,
      maxlength: 5
    }
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
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
