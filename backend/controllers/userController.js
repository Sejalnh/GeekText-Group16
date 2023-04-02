const express = require("express");
const router = express.Router();
const User = require("./../models/userModel");

// Automate try/catch blocks in Features
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Structure error messages
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class userController {
  static createUser = catchAsync(async (req, res) => {
    const {
      username,
      password,
      passwordConfirm,
      name,
      email,
      homeAddress,
      creditCards,
      wishList,
      shoppingCart
    } = req.body;

    const user = new User({
      username,
      password,
      passwordConfirm,
      name,
      email,
      homeAddress,
      creditCards,
      wishList,
      shoppingCart
    });

    await user.save();
    res.status(201).send("User added!");
  });

  static getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
  });

  // "/users/username/:username" returns the user with queried username
  static getUser = catchAsync(async (req, res, next) => {
    const username = req.params.username;

    const user = await User.find({ username });

    if (!user) {
      return next(new AppError("user not found", 404));
    }
    res.status(200).json(user);
  });

  // finds requested user and updates all user allowed fields per feature checklist
  static updatedUser = catchAsync(async (req, res, next) => {
    let username = req.params.username;

    // updated user fields to be updated in Postman
    let updatedusername = req.body.username;
    let updatedpassword = req.body.password;
    let updatedpasswordConfirm = req.body.passwordConfirm;
    let updatedname = req.body.name;
    let updatedhomeAddress = req.body.homeAddress;

    // find by username and update allowed fields
    User.findOneAndUpdate(
      { username },
      {
        $set: {
          username: updatedusername,
          password: updatedpassword,
          passwordConfirm: updatedpasswordConfirm,
          name: updatedname,
          homeAddress: updatedhomeAddress
        }
      },
      {
        new: true
      },
      (error, data) => {
        if (error) {
          return next(new AppError("ERROR", 404));
        } else {
          if (data == null) {
            res.send("username not found");
          } else {
            res.send(data);
          }
        }
      }
    );
  });

  // finds requested user and updates and adds credit card to user
  static createCreditCards = catchAsync(async (req, res, next) => {
    let username = req.params.username;

    // store credit card details
    let createcreditCard = req.body.creditCards;

    // find by username and update/add credit card
    User.findOneAndUpdate(
      { username },
      { $set: { creditCards: createcreditCard } },
      {
        new: true
      },
      (error, data) => {
        if (error) {
          return next(new AppError("ERROR", 404));
        } else {
          if (data == null) {
            res.send("username not found");
          } else {
            res.send(data);
          }
        }
      }
    );
  });
}

// Routes
router.post("/create", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/username/:username", userController.getUser);
router.put("/updateuser/:username", userController.updatedUser);
router.post("/creditcards/:username", userController.createCreditCards);

module.exports = router;
