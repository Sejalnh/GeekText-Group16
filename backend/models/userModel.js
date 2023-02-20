const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    required: true,
    minlength: 5
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same"
    }
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
      minlength: [2, "State must have 2 letters"],
      maxlength: [2, "State must have 2 letters"]
    },
    zipCode: {
      type: Number,
      required: false,
      minlength: [5, "Zip code must be 5 numbers"],
      maxlength: [5, "Zip code must be 5 numbers"]
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
    required: false
  },
  creditCards: [creditCardSchema],
  shoppingCart: [String]
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was modified
  if (!this.isModified("password")) return next();

  // Hash the password with a cost of 12
  this.passwordConfirm = await bcrypt.hash(this.password, 12);

  //Delete passwordCOnfirm filed
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model("User", userSchema);
