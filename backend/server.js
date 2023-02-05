const express = require("express");
const dotenv = require("dotenv").config(); // TODO: ADD .env for PRODUCTION
const mongoose = require("mongoose");
const Books = require("./models/booksModel");
const User = require("./models/userModel");
const Author = require("./models/authorModel");
const cors = require("cors");

// TODO: move into .env for PRODUCTION
const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://admin1:1234@cluster0.qngmqvw.mongodb.net/GeekTextDB?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// START THE APP
const app = express();

// MIDDLE-WARE
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ensure we can parse the URL parameters correctly
app.use(cors());

// CONNECT TO DATABASE
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () =>
  console.log(`MongoDB connected...`)
);

// ROUTES
// "/books" returns all books within the database
app.get("/books", async (request, response) => {
  try {
    const books = await Books.find(); // wait for books to be retrieved ASYNCHRONOUSLY
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error });
  }
});

// "/books/id/BOOK_ID" returns the book with specified _id
app.get("/books/id/:bookID", async (req, res) => {
  const bookID = req.params.bookID;
  if (!mongoose.Types.ObjectId.isValid(bookID))
    return res.status(404).json({ message: `No book with id: ${bookID}` });

  try {
    const book = await Books.findById(bookID);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// "/users" returns all books within the database
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// "/users/id/BOOK_ID" returns the user with specified _id
app.get("/users/id/:userID", async (req, res) => {
  const userID = req.params.userID;
  if (!mongoose.Types.ObjectId.isValid(userID))
    return res.status(404).json({ message: `No user with id: ${userID}` });

  try {
    const user = await User.findById(userID);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// "/authors" returns all authors within the database
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// "/authors/id/AUTHOR_ID" returns the user with specified _id
app.get("/authors/id/:authorID", async (req, res) => {
  const authorID = req.params.authorID;
  if (!mongoose.Types.ObjectId.isValid(authorID))
    return res.status(404).json({ message: `No author with id: ${authorID}` });

  try {
    const author = await Author.findById(authorID);
    res.status(200).json(author);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ------------------------------ Feature 1 ---------------------------------------
// 1.1 Retrieve List of Books by Genre
app.get("/books/genre/:genre", async (request, response) => {
  const genre = request.params.genre; // retrieve the genre from the URL

  try {
    const books = await Books.find({ genre }); // wait for books to be retrieved ASYNCHRONOUSLY
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error });
  }
});

// 1.2 Retrieve List of Top Sellers (Top 10 books that have sold the most copied)
app.get("/books/top10", async (req, res) => {
  try {
    const books = await Books.find().sort({ copiesSold: -1 }).limit(10);
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// 1.3 Retrieve List of Books for a particular rating and higher
app.get("/books/rating/:rating", async (req, res) => {
  const rating_param = parseFloat(req.params.rating);

  try {
    const books = await Books.find({ rating: { $gte: rating_param } });
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// 1.4 Discount books by publisher
app.put("/books/discount", async (req, res) => {
  const percentDiscount = 1.0 - parseFloat(req.body.percentDiscount) / 100.0;
  const publisher_param = req.body.publisher;

  try {
    const books = await Books.updateMany(
      { publisher: publisher_param },
      { $mul: { price: percentDiscount } }
    );
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ----------------------------------------------------------------------------------

// ------------------------------ Feature 3 ---------------------------------------
// 3.1 Retrieve the subtotal price of all items in the user’s shopping cart. 

// 3.2 Add a book to the shopping cart. 

// 3.3 Retrieve the list of book(s) in the user’s shopping cart. 

// 3.4 Delete a book from the shopping cart instance for that user.
// ----------------------------------------------------------------------------------
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
