const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Books = require("./models/booksModel");
const Author = require("./models/authorModel");

const cors = require("cors");

// Controllers
const WishlistManagementController = require("./controllers/WishlistManagementController");
const BookBrowsingController = require("./controllers/BookBrowsingController");
const userController = require("./controllers/userController");
const ShoppingCartController = require("./controllers/ShoppingCartController");
const BookDetailsController = require("./controllers/BookDetailsController");
const BookCommentController = require("./controllers/BookCommentController");
const BookRatingController = require("./controllers/BookRatingController");

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 3000; // port 3000 by default
const MONGO_URI = process.env.MONGO_URI;

if (PORT === undefined || MONGO_URI === undefined) {
  throw new Error("Please check .env for PORT and MONGO_URI!");
}

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
app.use("/browser", BookBrowsingController);
// --------------------------------------------------------------------------------

// ------------------------------ Feature 2 ---------------------------------------
app.use("/users", userController);
// --------------------------------------------------------------------------------

// ------------------------------ Feature 3 ---------------------------------------
app.use("/shoppingCart", ShoppingCartController);
// --------------------------------------------------------------------------------

// ------------------------------ Feature 4 ---------------------------------------
app.use("/books", BookDetailsController);
// --------------------------------------------------------------------------------

// ------------------------------ Feature 6 ---------------------------------------
app.use("/wishlists", WishlistManagementController);
// ----------------------------------------------------------------------------------
// ------------------------------ Feature5---------------------------------------
app.use("/books-comment", BookCommentController); // Feature 5
app.use("/books-rating", BookRatingController); // Feature 5
// ----------------------------------------------------------------------------------

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
