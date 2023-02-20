const express = require("express");
const router = express.Router();
const Books = require("../models/booksModel");
const Author = require("../models/authorModel");

class ProfileManagementController {
  static createBook = async (req, res) => {
    const {
      title,
      ISBN,
      author,
      genre,
      copiesSold,
      rating,
      publisher,
      price,
      description,
      yearPublished,
      ratings,
      comments
    } = req.body;

    const books = new Books({
      title,
      ISBN,
      author,
      genre,
      copiesSold,
      rating,
      publisher,
      price,
      description,
      yearPublished,
      ratings,
      comments
    });

    try {
      await books.save();
      res.status(200).send("Book added!");
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  static getByISBN = async (req, res) => {
    const ISBN = req.params.ISBN; // retrieve the genre from the URL

    try {
      const books = await Books.find({ ISBN }); // wait for books to be retrieved ASYNCHRONOUSLY
      res.status(200).json(books);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  static createAuthor = async (req, res) => {
    const { firstname, lastname, biography, publisher } = req.body;

    const author = new Author({
      firstname,
      lastname,
      biography,
      publisher
    });

    try {
      await author.save();
      res.status(200).send("Author added!");
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  static getByAuthor = async (req, res) => {
    const author = req.params.author; // retrieve the genre from the URL

    try {
      const books = await Books.find({ author }); // wait for books to be retrieved ASYNCHRONOUSLY
      res.status(200).json(books);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };
}

// routes
router.post("/books/create", ProfileManagementController.createBook);
router.get("/books/ISBN/:ISBN", ProfileManagementController.getByISBN);
router.post("/authors/create", ProfileManagementController.createAuthor);
router.get("/authors/:author", ProfileManagementController.getByAuthor);

module.exports = router;
