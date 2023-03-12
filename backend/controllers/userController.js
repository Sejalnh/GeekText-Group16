const express = require('express');
const router = express.Router();
const User = require('./../models/userModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

class userController {

static getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

static createUser = async (req, res) => {
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
    try {
        await user.save();
        res.status(201).send("User added!");
      } catch (error) {
        res.status(404).json({ message: error });
      }
    };

// "/users/username/USERNAME" returns the user with specified username
static getUser = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.find({ username });
    res.status(200).json(user);

   /* if (!user) {
      return ('No user with that username found', 404);
    }
    */
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

static updateUser = async (req, res) => {
  const username = req.params.username;
console.log(username);
try{
  const filteredBody = filterObj(req.body, 
    'username', 'password', 'passwordConfirm', 'name', 
    'homeAddress', 'creditCards', 'wishList', 'shoppingCart');

 console.log(req.body);
 const updatedUser = await User.findManyAndUpdate(username, filteredBody, {
  new: true,
  runValidators: true
 });

 res.status(200).json({
  status: 'success',
  data: {
    user: updatedUser
  }
 });
} catch (error) {
  res.status(404).json({ message: error });
}
};

static updateMe = async (req, res) => {
  const username = req.params.id;
    try{
        // Filter out fileds that are not allowed to be updated
    const filteredBody = filterObj(req.body, 
      'username', 'password', 'passwordConfirm', 'name', 
      'homeAddress', 'creditCards', 'wishList', 'shoppingCart');

    // Update user documnet
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
} catch (error) {
    res.status(404).json({ message: error });
}
}
}

// Routes
router.get("/users", userController.getAllUsers);
router.post('/users/create', userController.createUser);
router.get('/users/username/:username', userController.getUser);
router.patch('/users/updateuser/:username', userController.updateUser); //.delete(userController.deleteUser);
//router.patch('/users/updateMe', userController.updateMe);

module.exports = router;
