const express = require("express");
const dotenv = require("dotenv").config(); // TODO: ADD .env for PRODUCTION
const mongoose = require("mongoose");
const Books = require("./models/booksModel");
const User = require("./models/userModel");
const Author = require("./models/authorModel");
const cors = require("cors");

const BookBrowsingController = require("./controllers/BookBrowsingController");
const BookDetailsController = require("./controllers/BookDetailsController");

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
// ------------------------------- Test -----------------------------------------
// "/books" returns all books within the database
app.get("/books", async (request, response) => {
  try {
    const books = await Books.find(); // wait for books to be retrieved ASYNCHRONOUSLY
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error });
  }
});

// "/books/isbn/ISBN_NUMBER" returns the book with specified ISBN
app.get("/books/isbn/:isbn", async (req, res) => {
  const isbn = parseInt(req.params.isbn);

  try {
    const book = await Books.find({ ISBN: isbn });
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

// "/users/username/USERNAME" returns the user with specified username
app.get("/users/username/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.find({ username });
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
// -------------------------------------------------------------------------------

// ------------------------------ Feature 1 ---------------------------------------
app.use("/browser", BookBrowsingController); // Feature 1
// ----------------------------------------------------------------------------------

// ------------------------------ Feature 4 ---------------------------------------
app.use("/books", BookDetailsController); // Feature 4
// ----------------------------------------------------------------------------------

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
