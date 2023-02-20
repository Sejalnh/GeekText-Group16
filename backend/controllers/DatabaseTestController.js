const express = require("express");
const router = express.Router();

// model imports
const Books = require("../models/booksModel");
const User = require("../models/userModel");
const Author = require("../models/authorModel");

class DatabaseTestController {
  // "/books" returns all books within the database
  static getAllBooks = async (req, res) => {
    try {
      const books = await Books.find(); // wait for books to be retrieved ASYNCHRONOUSLY
      res.status(200).json(books);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  // "/users" returns all books within the database
  static getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  // "/authors" returns all authors within the database
  static getAllAuthors = async (req, res) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };
}

router.get("/books", DatabaseTestController.getAllBooks);
router.get("/users", DatabaseTestController.getAllUsers);
router.get("/authors", DatabaseTestController.getAllAuthors);

module.exports = router;
