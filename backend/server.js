const express = require("express");
const dotenv = require("dotenv").config(); // TODO: ADD .env for PRODUCTION
const mongoose = require("mongoose");
const Books = require("./models/booksModel");
const User = require("./models/userModel");
const Author = require("./models/authorModel");
const cors = require("cors");

// CONTROLLERS
const BookBrowsingController = require("./controllers/BookBrowsingController");
const BookDetailsController = require("./controllers/BookDetailsController");

// TODO: move into .env for PRODUCTION
const PORT = 3000;
const MONGO_URI =
  "mongodb+srv://admin1:1234@cluster0.qngmqvw.mongodb.net/GeekTextDB?retryWrites=true&w=majority";

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

// CONTROLLERS/ROUTERS
app.use("/browser", BookBrowsingController); // Feature 1
app.use("/details", BookDetailsController); // Feature 4

// ------------------------------- DATABASE TEST ROUTES ---------------------------------
// "/books" returns all books within the database
app.get("/books", async (request, response) => {
  try {
    const books = await Books.find(); // wait for books to be retrieved ASYNCHRONOUSLY
    response.status(200).json(books);
  } catch (error) {
    response.status(404).json({ message: error });
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

// "/authors" returns all authors within the database
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
// -------------------------------------------------------------------------------------

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
