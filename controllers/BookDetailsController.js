const express = require("express");
const router = express.Router();
const Books = require("../models/booksModel");
const Author = require("../models/authorModel");

class BookDetailsController {
  // 4.1 An administrator must be able to create a book with the book ISBN, book
  //    name, book description, price, author, genre, publisher , year published and
  //    copies sold. POST
  static createBook = async (request, response) => {
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
    } = request.body;

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
      //response.status(200).json(books);
      response.status(200).send("Book added!");
    } catch (error) {
      response.status(404).send(error.message);
    }
  };

  // 4.2 Must be able retrieve a book’s details by the ISBN GET
  static getByISBN = async (request, response) => {
    const ISBN = request.params.ISBN; // retrieve the genre from the URL

    try {
      const books = await Books.find({ ISBN }); // wait for books to be retrieved ASYNCHRONOUSLY
      response.status(200).json(books);
    } catch (error) {
      response.status(404).json({ message: error });
    }
  };

  // 4.3 An administrator must be able to create an author with first name, last
  //     name, biography and publisher POST
  static createAuthor = async (request, response) => {
    const { firstname, lastname, biography, publisher } = request.body;

    const author = new Author({
      firstname,
      lastname,
      biography,
      publisher
    });

    try {
      await author.save();
      response.status(200).send("Author added!");
    } catch (error) {
      response.status(404).send(error.message);
    }
  };

  // 4.4 Must be able to retrieve a list of books associated with an author GET
  static getByAuthor = async (request, response) => {
    const author = request.params.author; // retrieve the genre from the URL

    try {
      const books = await Books.find({ author }); // wait for books to be retrieved ASYNCHRONOUSLY
      response.status(200).json(books);
    } catch (error) {
      response.status(404).json({ message: error });
    }
  };
}

// routes
router.post("/createBook", BookDetailsController.createBook); // POST -> "/books/createBook"
router.get("/ISBN/:ISBN", BookDetailsController.getByISBN); // GET -> "books/ISBN/:ISBN"
router.post("/createAuthor", BookDetailsController.createAuthor); // POST -> "books/createAuthors"
router.get("/author/:author", BookDetailsController.getByAuthor); // GET -> "books/author/:author"

module.exports = router;
